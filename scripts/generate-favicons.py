"""Generate lightweight favicons: SVG site icon, compressed ICO, small Apple PNG."""

from __future__ import annotations

import shutil
from pathlib import Path

from PIL import Image, ImageEnhance, ImageFilter

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / "public" / "images" / "logo.webp"
ICON_SVG = ROOT / "src" / "app" / "icon.svg"
BRAND_BG = (18, 63, 63)  # #123f3f — matches site footer teal
MAX_APPLE_BYTES = 8 * 1024


def content_bbox(image: Image.Image, tolerance: int = 30) -> tuple[int, int, int, int]:
    bg = image.getpixel((10, 10))[:3]
    width, height = image.size
    min_x, min_y = width, height
    max_x, max_y = 0, 0

    for y in range(height):
        for x in range(width):
            pixel = image.getpixel((x, y))[:3]
            if sum(abs(pixel[i] - bg[i]) for i in range(3)) > tolerance:
                min_x = min(min_x, x)
                min_y = min(min_y, y)
                max_x = max(max_x, x)
                max_y = max(max_y, y)

    return min_x, min_y, max_x, max_y


def build_master(source: Image.Image, padding_ratio: float = 0.12) -> Image.Image:
    rgba = source.convert("RGBA")
    min_x, min_y, max_x, max_y = content_bbox(rgba)
    side = max(max_x - min_x, max_y - min_y)
    pad = int(side * padding_ratio)
    cx = (min_x + max_x) // 2
    cy = (min_y + max_y) // 2
    half = side // 2 + pad

    cropped = rgba.crop((cx - half, cy - half, cx + half, cy + half))
    master = Image.new("RGBA", (512, 512), (*BRAND_BG, 255))
    resized = cropped.resize((420, 420), Image.Resampling.LANCZOS)
    resized = ImageEnhance.Contrast(resized).enhance(1.08)
    resized = ImageEnhance.Sharpness(resized).enhance(1.15)
    offset = (512 - 420) // 2
    master.paste(resized, (offset, offset), resized)
    return master


def save_ico(image: Image.Image, path: Path, sizes: tuple[int, ...]) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames = []
    for size in sizes:
        frame = image.resize((size, size), Image.Resampling.LANCZOS)
        if size <= 32:
            frame = frame.filter(ImageFilter.SHARPEN)
        frames.append(frame)
    frames[0].save(
        path,
        format="ICO",
        sizes=[(s, s) for s in sizes],
        append_images=frames[1:],
    )


def save_apple_png(image: Image.Image, path: Path, size: int = 180) -> int:
    path.parent.mkdir(parents=True, exist_ok=True)
    resized = image.resize((size, size), Image.Resampling.LANCZOS).convert("RGBA")
    flat = Image.new("RGB", resized.size, BRAND_BG)
    flat.paste(resized, mask=resized.split()[3])

    for palette_colors in (128, 64, 32):
        quantized = flat.quantize(colors=palette_colors, method=Image.Quantize.MEDIANCUT)
        for compress_level in (9, 6, 3):
            quantized.save(path, format="PNG", optimize=True, compress_level=compress_level)
            file_size = path.stat().st_size
            if file_size <= MAX_APPLE_BYTES:
                return file_size

    return path.stat().st_size


def sync_icon_svg(dest: Path) -> None:
    dest.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(ICON_SVG, dest)


def main() -> None:
    source = Image.open(SOURCE)
    master = build_master(source)

    app_dir = ROOT / "src" / "app"
    public_dir = ROOT / "public"

    save_ico(master, app_dir / "favicon.ico", (16, 32, 48))
    save_ico(master, public_dir / "favicon.ico", (16, 32, 48))

    sync_icon_svg(public_dir / "icon.svg")

    apple_targets = (app_dir / "apple-icon.png", public_dir / "apple-icon.png")
    for path in apple_targets:
        size = save_apple_png(master, path)
        print(f"OK {path.relative_to(ROOT)} ({size // 1024} KB)")

    print(f"OK {ICON_SVG.relative_to(ROOT)} ({ICON_SVG.stat().st_size} bytes)")
    print(f"OK {public_dir.relative_to(ROOT)}/icon.svg")

    for stale in (
        app_dir / "icon.png",
        app_dir / "icon.webp",
        app_dir / "apple-icon.webp",
        public_dir / "icon.png",
        public_dir / "icon.webp",
        public_dir / "apple-icon.webp",
    ):
        if stale.exists():
            stale.unlink()
            print(f"REMOVED {stale.relative_to(ROOT)}")


if __name__ == "__main__":
    main()
