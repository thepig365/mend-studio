#!/usr/bin/env python3
"""Check vendored woff2 files can draw Latin text. Requires fontTools and brotli."""

import hashlib
import sys
from pathlib import Path

try:
    from fontTools.ttLib import TTFont
except ImportError:
    sys.exit("fontTools is required: pip install fonttools brotli")

ROOT = Path(__file__).resolve().parents[1] / "lib" / "fonts"
LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
PUNCT = " .,'’—–-()&:;!?/\""
EXPECTED = {
    "cormorant-garamond-latin-wght.woff2": "1bb61e9dff230db2a76abe09b0187ecc708a9f7f6b3b01beba509ca99d8b5c60",
    "jost-latin-variable.woff2": "235d8f8964bfdf105fc0c3e4c77b5e70f31bee1dad611d59318b5f2a5cb64d90",
}

def name(font, name_id):
    for record in font["name"].names:
        if record.nameID == name_id:
            try:
                return record.toUnicode()
            except Exception:
                continue
    return ""

failed = False
for filename, digest in EXPECTED.items():
    path = ROOT / filename
    data = path.read_bytes()
    actual = hashlib.sha256(data).hexdigest()
    font = TTFont(str(path))
    chars = {chr(code) for code in (font.getBestCmap() or {})}
    missing = [ch for ch in LETTERS + PUNCT if ch not in chars]
    axis = ""
    if "fvar" in font:
        axis = ", ".join(
            f"{item.axisTag} {item.minValue:g}-{item.maxValue:g}"
            for item in font["fvar"].axes
        )
    print(f"{filename}")
    print(f"  sha256 {actual}")
    print(f"  family {name(font, 1)} copyright {name(font, 0)}")
    print(f"  glyphs {len(chars)} axis {axis or 'none'}")
    print(f"  missing {''.join(missing) if missing else 'NONE'}")
    if actual != digest or missing or data[:4] != b"wOF2":
        failed = True

sys.exit(1 if failed else 0)
