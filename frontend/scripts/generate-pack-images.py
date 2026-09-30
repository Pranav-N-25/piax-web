"""Generate a PIAX box photo for every product in the range.

Recolours the reference box photo (src/assets/13_recommended_xl_pack.png) to each
product's colour, keeping the photo's lighting, then replaces the pad count, size and
variant printed on the front with that product's details.

    python3 scripts/generate-pack-images.py            # run from frontend/

Needs Pillow and the Poppins font (the typeface printed on the real box).
"""
import colorsys
import os
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter, ImageFont

ROOT = Path(__file__).resolve().parent.parent
SOURCE = ROOT / 'src/assets/13_recommended_xl_pack.png'
OUT = ROOT / 'src/assets/products'
OUT_WIDTH = 820

FONT_DIRS = [Path.home() / '.fonts', Path('/usr/share/fonts'), Path('/usr/local/share/fonts'), Path.home() / '.local/share/fonts']

WHITE_BOX = '#F6F8F7'
TEAL = '#155A57'
LAVENDER, SAGE, TAUPE, SLATE = '#DBBCDF', '#AFC5AE', '#BEA28D', '#496995'

# slug, box colour, ink colour (None = derived from the box), pads line, size line, variant label, variant chip, colour dots
PRODUCTS = [
    ('vera-lite-20', LAVENDER, None, '20 Pads', 'L - 245mm', 'VERA', 'Lite', []),
    ('luma-everyday-20', SAGE, None, '20 Pads', 'XL - 280mm', 'LUMA', 'Everyday', []),
    ('luma-everyday-30', SAGE, None, '30 Pads', 'XL - 280mm', 'LUMA', 'Everyday', []),
    ('nocte-overnight-15', TAUPE, None, '15 Pads', 'XXL - 330mm', 'NOCTE', 'Overnight', []),
    ('nocte-overnight-30', TAUPE, None, '30 Pads', 'XXL - 330mm', 'NOCTE', 'Overnight', []),
    ('seren-ultra-12', SLATE, None, '12 Pads', 'XXXL - 360mm', 'SEREN', 'Ultra', []),
    ('discovery-4', WHITE_BOX, TEAL, '4 Pads', '1 of each size', 'Trial', 'Discovery', [LAVENDER, SAGE, TAUPE, SLATE]),
    ('cycle-pack-15', WHITE_BOX, TEAL, '15 Pads', '3 L · 8 XL · 4 XXL', 'Hero', 'Cycle Pack', [LAVENDER, SAGE, TAUPE]),
    ('stock-up-30', WHITE_BOX, TEAL, '30 Pads', '20 XL · 10 XXL', 'Value', 'Stock-Up', [SAGE, TAUPE]),
    ('luma-institutional-200', WHITE_BOX, TEAL, '200 Pads', 'XL - 280mm', 'LUMA', 'Institutional', []),
]

# Areas of the reference photo, in source pixels.
PADS_TEXT = (666, 514, 780, 590)      # "6 Pads / L - 280mm"
VARIANT_TEXT = (668, 598, 900, 668)   # "Regular [Extra Long]"
STRIPS = [(295, 690, 445, 895), (995, 620, 1100, 715)]  # anion strips on the two pads
BARCODE = (970, 825, 1195, 862)       # black-on-white sticker on the lower box, left as printed
TEXT_ANGLE = 2.5                      # the front face is turned slightly; its print rises to the right
INK_LUM = 0.12                        # lightness of the printed ink on the reference box


def font(weight, size):
    for folder in FONT_DIRS:
        for path in folder.rglob(f'Poppins-{weight}.ttf'):
            return ImageFont.truetype(str(path), size)
    raise SystemExit(f'Poppins-{weight}.ttf not found; install the Poppins font first.')


def rgb(hex_colour):
    hex_colour = hex_colour.lstrip('#')
    return tuple(int(hex_colour[i:i + 2], 16) for i in (0, 2, 4))


def lum(c):
    return (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]) / 255


def mix(a, b, t):
    return tuple(round(x + (y - x) * t) for x, y in zip(a, b))


def is_mint(c):
    r, g, b = c
    hi, lo = max(c), min(c)
    if hi == 0 or lum(c) < 0.42 or (hi - lo) / hi < 0.07:
        return False
    hue = colorsys.rgb_to_hsv(r / 255, g / 255, b / 255)[0] * 360
    return 110 <= hue <= 200


def ink_for(box):
    """Dark print in the box's own hue on light boxes; warm white on dark ones."""
    if lum(box) < 0.45:
        return (247, 243, 238)
    h, _, s = colorsys.rgb_to_hls(*(v / 255 for v in box))
    return tuple(round(v * 255) for v in colorsys.hls_to_rgb(h, 0.17, min(s, 0.5)))


def inside(x, y, rect):
    return rect[0] <= x <= rect[2] and rect[1] <= y <= rect[3]


def analyse(source):
    """Split the photo into box colour (with its shading) and printed ink, once for all products."""
    w, h = source.size
    px = source.load()
    mint = Image.new('RGB', source.size)
    mp = mint.load()
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            if a and is_mint((r, g, b)):
                mp[x, y] = (r, g, b)
    # Local box colour behind the ink: the brightest nearby box pixel. Wide solid marks
    # (the leaf inside the logo) fall back to a coarser, wider search.
    near = mint.filter(ImageFilter.MaxFilter(21))
    small = near.resize((w // 4, h // 4), Image.NEAREST).filter(ImageFilter.MaxFilter(9))
    wide = small.resize((w, h), Image.NEAREST).load()
    backdrop = near.load()
    for y in range(h):
        for x in range(w):
            if backdrop[x, y] == (0, 0, 0):
                backdrop[x, y] = wide[x, y]
    return mp, backdrop


def recolour(source, mint, backdrop, box, ink, keep_strips):
    w, h = source.size
    base = 0.86  # lightness of the lit front face on the reference
    out = source.copy()
    src, dst = source.load(), out.load()

    def shade(c):
        s = lum(c) / base
        if s <= 1:
            return tuple(round(v * s) for v in box)
        return mix(box, (255, 255, 255), min(1, (s - 1) * 2.5))

    for y in range(h):
        for x in range(w):
            r, g, b, a = src[x, y]
            if not a:
                continue
            if keep_strips and any(inside(x, y, rect) for rect in STRIPS):
                continue
            own = mint[x, y]
            if own != (0, 0, 0):
                dst[x, y] = (*shade(own), a)
                continue
            back = backdrop[x, y]
            if back == (0, 0, 0) or inside(x, y, BARCODE):
                continue
            c = (r, g, b)
            hi, lo = max(c), min(c)
            if lum(c) > 0.55 and (hi - lo) / max(hi, 1) < 0.08:
                continue  # white pad
            depth = lum(back) - INK_LUM
            t = max(0.0, min(1.0, (lum(back) - lum(c)) / depth)) if depth > 0 else 1.0
            dst[x, y] = (*mix(shade(back), ink, t), a)

    # Wipe the old pad count and variant: rebuild each row of the front face from its edges.
    for x0, y0, x1, y1 in (PADS_TEXT, VARIANT_TEXT):
        for y in range(y0, y1 + 1):
            left, right = dst[x0 - 2, y], dst[x1 + 2, y]
            for x in range(x0, x1 + 1):
                dst[x, y] = mix(left, right, (x - x0) / (x1 - x0))[:3] + (left[3],)
    return out


def fit(draw, text, weight, size, max_width):
    while size > 10:
        f = font(weight, size)
        if draw.textlength(text, font=f) <= max_width:
            return f
        size -= 1
    return font(weight, size)


def print_details(image, ink, box, pads, size_line, label, chip, dots):
    """Set the new front-panel text flat, then turn it to match the box face."""
    layer = Image.new('RGBA', image.size, (0, 0, 0, 0))
    d = ImageDraw.Draw(layer)
    x0, y0 = PADS_TEXT[0] + 4, PADS_TEXT[1] + 10
    width = PADS_TEXT[2] - x0 - 2

    d.text((x0, y0), pads, font=fit(d, pads, 'SemiBold', 38, width), fill=ink, anchor='lt')
    d.text((x0, y0 + 42), size_line, font=fit(d, size_line, 'Regular', 20, width), fill=ink, anchor='lt')

    vx, vy = VARIANT_TEXT[0] + 8, VARIANT_TEXT[1] + 14
    label_font = font('Regular', 23)
    d.text((vx, vy + 24), label, font=label_font, fill=ink, anchor='lm')
    cx = vx + d.textlength(label, font=label_font) + 12
    chip_font = fit(d, chip, 'Medium', 23, VARIANT_TEXT[2] - cx - 30)
    chip_w = d.textlength(chip, font=chip_font) + 30
    d.rounded_rectangle((cx, vy, cx + chip_w, vy + 48), radius=9, fill=ink)
    d.text((cx + chip_w / 2, vy + 24), chip, font=chip_font, fill=box, anchor='mm')

    # Colour-coded sizes inside a mixed pack.
    for i, colour in enumerate(dots):
        dx = x0 + 4 + i * 20
        d.ellipse((dx - 7, VARIANT_TEXT[3] + 6, dx + 7, VARIANT_TEXT[3] + 20), fill=rgb(colour), outline=ink, width=1)

    centre = ((PADS_TEXT[0] + VARIANT_TEXT[2]) / 2, (PADS_TEXT[1] + VARIANT_TEXT[3]) / 2)
    layer = layer.rotate(TEXT_ANGLE, resample=Image.BICUBIC, center=centre)
    layer = layer.filter(ImageFilter.GaussianBlur(0.35))  # match the photo's softness
    image.alpha_composite(layer)
    return image


def main():
    OUT.mkdir(parents=True, exist_ok=True)
    source = Image.open(SOURCE).convert('RGBA')
    mint, backdrop = analyse(source)
    only = os.environ.get('ONLY')
    for slug, box_hex, ink_hex, pads, size_line, label, chip, dots in PRODUCTS:
        if only and only not in slug:
            continue
        box = rgb(box_hex)
        ink = rgb(ink_hex) if ink_hex else ink_for(box)
        image = recolour(source, mint, backdrop, box, ink, keep_strips=box_hex == WHITE_BOX)
        image = print_details(image, ink, box, pads, size_line, label, chip, dots)
        image = image.resize((OUT_WIDTH, round(image.height * OUT_WIDTH / image.width)), Image.LANCZOS)
        path = OUT / f'piax-{slug}.webp'
        image.save(path, 'WEBP', quality=86, method=6)
        print(f'{path.relative_to(ROOT)}  {path.stat().st_size // 1024} KB')


if __name__ == '__main__':
    main()
