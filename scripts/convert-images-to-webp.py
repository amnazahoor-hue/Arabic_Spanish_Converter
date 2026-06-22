"""Ensure all public raster assets are WebP and at most 100 KB."""

from __future__ import annotations

from pathlib import Path

from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
PUBLIC = ROOT / "public"
MAX_BYTES = 100 * 1024


def save_under_limit(img: Image.Image, dest: Path) -> int:
    """Save as WebP, lowering quality and optionally width until under MAX_BYTES."""
    width, height = img.size
    has_alpha = img.mode in ("RGBA", "LA", "PA") or (
        img.mode == "P" and "transparency" in img.info
    )

    for scale in (1.0, 0.85, 0.7, 0.55, 0.45):
        w = max(1, int(width * scale))
        h = max(1, int(height * scale))
        resized = img.resize((w, h), Image.Resampling.LANCZOS) if scale < 1.0 else img

        for quality in range(82, 38, -6):
            if has_alpha:
                save_img = resized.convert("RGBA") if resized.mode != "RGBA" else resized
            else:
                save_img = resized.convert("RGB")

            dest.parent.mkdir(parents=True, exist_ok=True)
            save_img.save(dest, format="WEBP", quality=quality, method=6)
            size = dest.stat().st_size
            if size <= MAX_BYTES:
                return size

    return dest.stat().st_size


def ensure_webp(path: Path) -> tuple[str, int]:
    rel = path.relative_to(PUBLIC).as_posix()
    if path.suffix.lower() != ".webp":
        dest = path.with_suffix(".webp")
        with Image.open(path) as img:
            size = save_under_limit(img, dest)
        path.unlink(missing_ok=True)
        return f"CONVERT {rel} -> {dest.name}", size

    if path.stat().st_size <= MAX_BYTES:
        return f"OK {rel}", path.stat().st_size

    with Image.open(path) as img:
        size = save_under_limit(img, path)
    return f"RECOMPRESS {rel}", size


def main() -> None:
    sources = sorted(
        [
            *PUBLIC.rglob("*.webp"),
            *PUBLIC.rglob("*.png"),
            *PUBLIC.rglob("*.jpg"),
            *PUBLIC.rglob("*.jpeg"),
        ]
    )

    if not sources:
        print("No raster images found in public/")
        return

    for path in sources:
        label, size = ensure_webp(path)
        print(f"{label} ({size // 1024} KB)")


if __name__ == "__main__":
    main()
