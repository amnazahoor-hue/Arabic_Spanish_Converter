"""Convert public raster images to WebP under 100 KB."""

from __future__ import annotations

import os
from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MAX_BYTES = 100 * 1024

# PNG/JPEG sources to convert (relative to public/)
CONVERT = [
    "common-phrases-bg.png",
    "hero-people-bg.png",
    "images/author-noelia-zahirin.png",
    "marroqui/marroqui-darija-section-bg.png",
    "marroqui/features/marroqui-feature-contexto-ia.png",
    "marroqui/features/marroqui-feature-espanol-natural.png",
    "marroqui/features/marroqui-feature-rapidez.png",
    "marroqui/features/marroqui-feature-voz-darija.png",
]

# Already webp — recompress if over limit
RECHECK_WEBP = [
    "hero-mobile-bg.webp",
    "images/logo.webp",
]


def save_under_limit(img: Image.Image, dest: Path) -> int:
    """Save as WebP, lowering quality and optionally width until under MAX_BYTES."""
    rgb = img.convert("RGB") if img.mode in ("RGBA", "P", "LA") else img
    if img.mode == "RGBA":
        rgba = img
    else:
        rgba = None

    width, height = img.size
    for scale in (1.0, 0.85, 0.7, 0.55, 0.45):
        w = max(1, int(width * scale))
        h = max(1, int(height * scale))
        resized = img.resize((w, h), Image.Resampling.LANCZOS) if scale < 1.0 else img
        for quality in range(82, 40, -6):
            if rgba is not None and scale == 1.0:
                out_img = resized
                save_img = out_img
                use_rgba = resized.mode == "RGBA"
            elif rgba is not None:
                save_img = resized.convert("RGBA") if resized.mode != "RGBA" else resized
                use_rgba = save_img.mode == "RGBA"
            else:
                save_img = resized.convert("RGB")
                use_rgba = False

            dest.parent.mkdir(parents=True, exist_ok=True)
            save_img.save(dest, format="WEBP", quality=quality, method=6)
            size = dest.stat().st_size
            if size <= MAX_BYTES:
                return size

    return dest.stat().st_size


def main() -> None:
    for rel in CONVERT:
        src = PUBLIC / rel
        if not src.exists():
            print(f"SKIP missing: {rel}")
            continue
        dest = src.with_suffix(".webp")
        with Image.open(src) as img:
            size = save_under_limit(img, dest)
        print(f"OK {rel} -> {dest.name} ({size // 1024} KB)")

    for rel in RECHECK_WEBP:
        src = PUBLIC / rel
        if not src.exists():
            continue
        if src.stat().st_size <= MAX_BYTES:
            print(f"OK already {rel} ({src.stat().st_size // 1024} KB)")
            continue
        with Image.open(src) as img:
            size = save_under_limit(img, src)
        print(f"RECOMPRESS {rel} ({size // 1024} KB)")


if __name__ == "__main__":
    main()
