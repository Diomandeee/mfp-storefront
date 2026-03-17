#!/usr/bin/env bash
# optimize-images.sh — Convert all PNGs in public/ to WebP using cwebp
# Keeps originals alongside WebP files for fallback.
# Usage: bash scripts/optimize-images.sh

set -euo pipefail

CWEBP="${CWEBP:-cwebp}"
QUALITY="${QUALITY:-80}"
PUBLIC_DIR="$(cd "$(dirname "$0")/../public" && pwd)"

if ! command -v "$CWEBP" &>/dev/null; then
  echo "ERROR: cwebp not found. Install with: brew install webp"
  exit 1
fi

converted=0
skipped=0

while IFS= read -r -d '' png; do
  webp="${png%.png}.webp"

  # Skip if WebP already exists and is newer than the PNG
  if [ -f "$webp" ] && [ "$webp" -nt "$png" ]; then
    ((skipped++))
    continue
  fi

  echo "Converting: ${png#"$PUBLIC_DIR/"}"
  "$CWEBP" -q "$QUALITY" -m 6 -sharp_yuv "$png" -o "$webp" -quiet
  ((converted++))
done < <(find "$PUBLIC_DIR" -name '*.png' -print0)

echo ""
echo "Done. Converted: $converted, Skipped (up-to-date): $skipped"
echo "Original PNGs retained for fallback."

# Show size comparison
if [ "$converted" -gt 0 ]; then
  echo ""
  echo "Size comparison (cards/):"
  png_total=$(find "$PUBLIC_DIR/cards" -name '*.png' -exec du -ck {} + 2>/dev/null | tail -1 | cut -f1)
  webp_total=$(find "$PUBLIC_DIR/cards" -name '*.webp' -exec du -ck {} + 2>/dev/null | tail -1 | cut -f1)
  if [ -n "$png_total" ] && [ -n "$webp_total" ]; then
    echo "  PNG total:  ${png_total}K"
    echo "  WebP total: ${webp_total}K"
    savings=$(( (png_total - webp_total) * 100 / png_total ))
    echo "  Savings:    ${savings}%"
  fi
fi
