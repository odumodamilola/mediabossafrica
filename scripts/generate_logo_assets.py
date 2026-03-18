from __future__ import annotations

from pathlib import Path

from PIL import Image, ImageDraw, ImageFont


ROOT = Path(__file__).resolve().parents[1]
PUBLIC_DIR = ROOT / "public"
GRADIENT_START = (255, 0, 160, 255)
GRADIENT_END = (129, 9, 85, 255)
TEXT_PRIMARY = (17, 24, 39, 255)
TEXT_SECONDARY = (255, 0, 160, 255)
FONT_BOLD = Path(r"C:\Windows\Fonts\segoeuib.ttf")
FONT_REGULAR = Path(r"C:\Windows\Fonts\segoeui.ttf")
POLYLINE_POINTS = [
    (25, 45),
    (35, 25),
    (52, 72),
    (68, 28),
    (82, 58),
]


def render_mark(size: int) -> Image.Image:
    scale = 4
    canvas_size = size * scale
    gradient = Image.linear_gradient("L").resize(
        (canvas_size * 2, canvas_size * 2),
        Image.Resampling.BICUBIC,
    )
    rotated = gradient.rotate(135, resample=Image.Resampling.BICUBIC, expand=True)
    left = (rotated.width - canvas_size) // 2
    top = (rotated.height - canvas_size) // 2
    mask = rotated.crop((left, top, left + canvas_size, top + canvas_size))

    circle_mask = Image.new("L", (canvas_size, canvas_size), 0)
    circle_draw = ImageDraw.Draw(circle_mask)
    margin = round(canvas_size * 0.05)
    circle_draw.ellipse(
        (margin, margin, canvas_size - margin, canvas_size - margin),
        fill=255,
    )

    start = Image.new("RGBA", (canvas_size, canvas_size), GRADIENT_START)
    end = Image.new("RGBA", (canvas_size, canvas_size), GRADIENT_END)
    image = Image.composite(end, start, mask)
    image.putalpha(circle_mask)

    draw = ImageDraw.Draw(image)
    stroke_width = max(round(canvas_size * 0.11), 1)
    points = [(x * canvas_size / 100, y * canvas_size / 100) for x, y in POLYLINE_POINTS]
    draw.line(points, fill=(255, 255, 255, 255), width=stroke_width, joint="curve")

    return image.resize((size, size), Image.Resampling.LANCZOS)


def load_font(path: Path, size: int) -> ImageFont.FreeTypeFont:
    return ImageFont.truetype(str(path), size=size)


def tracked_width(font: ImageFont.FreeTypeFont, text: str, tracking: int) -> int:
    width = 0
    for index, char in enumerate(text):
        bbox = font.getbbox(char)
        width += bbox[2] - bbox[0]
        if index < len(text) - 1:
            width += tracking
    return width


def draw_tracked_text(
    draw: ImageDraw.ImageDraw,
    position: tuple[int, int],
    text: str,
    font: ImageFont.FreeTypeFont,
    fill: tuple[int, int, int, int],
    tracking: int,
) -> None:
    x, y = position
    for index, char in enumerate(text):
        draw.text((x, y), char, fill=fill, font=font)
        bbox = font.getbbox(char)
        x += bbox[2] - bbox[0]
        if index < len(text) - 1:
            x += tracking


def render_full_logo() -> Image.Image:
    mark_size = 320
    padding_x = 56
    padding_y = 40
    gap = 36
    main_font = load_font(FONT_BOLD, 180)
    sub_font = load_font(FONT_REGULAR, 64)
    subtitle_tracking = 14
    title = "Mediaboss"
    subtitle = "AFRICA"

    scratch = Image.new("RGBA", (1, 1), (0, 0, 0, 0))
    scratch_draw = ImageDraw.Draw(scratch)
    title_box = scratch_draw.textbbox((0, 0), title, font=main_font)
    subtitle_box = scratch_draw.textbbox((0, 0), subtitle, font=sub_font)

    title_width = title_box[2] - title_box[0]
    title_height = title_box[3] - title_box[1]
    subtitle_width = max(
        tracked_width(sub_font, subtitle, subtitle_tracking),
        subtitle_box[2] - subtitle_box[0],
    )
    subtitle_height = subtitle_box[3] - subtitle_box[1]
    text_block_width = max(title_width, subtitle_width)
    text_block_height = title_height + 10 + subtitle_height

    canvas_width = padding_x + mark_size + gap + text_block_width + padding_x
    canvas_height = max(mark_size, text_block_height) + padding_y * 2
    image = Image.new("RGBA", (canvas_width, canvas_height), (0, 0, 0, 0))

    mark = render_mark(mark_size)
    mark_y = (canvas_height - mark_size) // 2
    image.alpha_composite(mark, (padding_x, mark_y))

    draw = ImageDraw.Draw(image)
    text_x = padding_x + mark_size + gap
    text_y = (canvas_height - text_block_height) // 2 - title_box[1]
    draw.text((text_x, text_y), title, fill=TEXT_PRIMARY, font=main_font)

    subtitle_y = text_y + title_height + 10 - subtitle_box[1]
    draw_tracked_text(
        draw,
        (text_x + 4, subtitle_y),
        subtitle,
        sub_font,
        TEXT_SECONDARY,
        subtitle_tracking,
    )

    return image


def main() -> None:
    PUBLIC_DIR.mkdir(exist_ok=True)
    for filename, size in {
        "favicon.png": 180,
        "apple-touch-icon.png": 180,
    }.items():
        render_mark(size).save(PUBLIC_DIR / filename)
        print(f"Generated {PUBLIC_DIR / filename}")

    render_full_logo().save(PUBLIC_DIR / "logo.png")
    print(f"Generated {PUBLIC_DIR / 'logo.png'}")


if __name__ == "__main__":
    main()
