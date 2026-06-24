"""Generate public/images/og-image.webp (1200x630) for Open Graph / Twitter."""

from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / "public" / "images" / "og-image.webp"
LOGO = ROOT / "public" / "images" / "logo.webp"
MAX_BYTES = 1090 * 1024
W, H = 1200, 630

TITLE = "Traductor Árabe Español"
HEADLINE = "Árabe y Español"
SUBLINE = "Traducción instantánea de texto y voz — gratis y bidireccional"


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        Path("C:/Windows/Fonts/segoeuib.ttf") if bold else Path("C:/Windows/Fonts/segoeui.ttf"),
        Path("C:/Windows/Fonts/arialbd.ttf") if bold else Path("C:/Windows/Fonts/arial.ttf"),
        Path("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf")
        if bold
        else Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
    ]
    for path in candidates:
        if path.exists():
            return ImageFont.truetype(str(path), size=size)
    return ImageFont.load_default()


def _gradient_background() -> Image.Image:
    img = Image.new("RGB", (W, H))
    px = img.load()
    top = (26, 107, 107)
    mid = (18, 63, 63)
    bottom = (26, 26, 46)
    for y in range(H):
        t = y / (H - 1)
        if t < 0.55:
            k = t / 0.55
            color = tuple(int(top[i] + (mid[i] - top[i]) * k) for i in range(3))
        else:
            k = (t - 0.55) / 0.45
            color = tuple(int(mid[i] + (bottom[i] - mid[i]) * k) for i in range(3))
        for x in range(W):
            px[x, y] = color
    return img


def _save_under_limit(img: Image.Image) -> int:
    OUT.parent.mkdir(parents=True, exist_ok=True)
    for quality in range(88, 40, -4):
        img.save(OUT, format="WEBP", quality=quality, method=6)
        size = OUT.stat().st_size
        if size <= MAX_BYTES:
            return size
    return OUT.stat().st_size


def main() -> None:
    img = _gradient_background()
    draw = ImageDraw.Draw(img)

    draw.rectangle((0, 0, W, 6), fill=(201, 148, 58))

    if LOGO.exists():
        with Image.open(LOGO) as logo:
            logo = logo.convert("RGBA")
            target_h = 96
            scale = target_h / logo.height
            logo = logo.resize((int(logo.width * scale), target_h), Image.Resampling.LANCZOS)
            img.paste(logo, (80, 72), logo)

    draw.text((80, 188), TITLE, font=_font(30, bold=True), fill=(232, 168, 62))
    draw.text((80, 248), HEADLINE, font=_font(72, bold=True), fill=(255, 255, 255))

    sub_font = _font(34)
    max_width = W - 160
    words = SUBLINE.split()
    lines: list[str] = []
    current = ""
    for word in words:
        trial = f"{current} {word}".strip()
        bbox = draw.textbbox((0, 0), trial, font=sub_font)
        if bbox[2] - bbox[0] <= max_width:
            current = trial
        else:
            if current:
                lines.append(current)
            current = word
    if current:
        lines.append(current)

    y = 360
    for line in lines:
        draw.text((80, y), line, font=sub_font, fill=(244, 236, 221))
        y += 46

    size = _save_under_limit(img.convert("RGB"))
    print(f"Wrote {OUT.relative_to(ROOT)} ({size // 1024} KB)")


if __name__ == "__main__":
    main()
