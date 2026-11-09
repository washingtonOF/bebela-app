#!/usr/bin/env python3
"""Optimize staged web images only. Android source assets remain unchanged."""
from pathlib import Path
from PIL import Image, ImageOps
root = Path("public/_cdn/static")
total_before = total_after = 0
for source in root.glob("*.png"):
    with Image.open(source) as image:
        image = ImageOps.exif_transpose(image)
        image.thumbnail((1600, 1600), Image.Resampling.LANCZOS)
        if image.mode not in ("RGB", "RGBA"):
            image = image.convert("RGBA")
        destination = source.with_suffix(".webp")
        image.save(destination, "WEBP", quality=85, method=6)
    total_before += source.stat().st_size
    total_after += destination.stat().st_size
    print(f"{source.name}: {source.stat().st_size // 1024} KB -> {destination.stat().st_size // 1024} KB")
print(f"WebP assets: {total_before // 1024} KB -> {total_after // 1024} KB")
