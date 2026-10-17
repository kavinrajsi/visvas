"""Generate the four Visvas email-signature variants.

    python3 scripts/generate-email-signatures.py

Hybrid ("spongy") layout: blocks are inline-block divs, so they sit side by
side on wide screens and wrap on phones without relying on <style>/media
queries (Gmail strips those when a signature is pasted). Outlook for Windows
ignores inline-block and max-width, so MSO conditional ghost tables give it
fixed columns instead.
"""
import sys

OUT = sys.argv[1] if len(sys.argv) > 1 else "public/email-signature"
BASE = 'https://www.visvas.in/email-signature'
FONT = 'font-family:Helvetica, Arial, sans-serif;'
GREEN = '#1E5F2F'
GOLD = '#E4A025'
TEXT = '#303030'
RULE = '#E0E0E0'


def text(size, lh, extra=''):
    return f'{FONT} font-size:{size}px; line-height:{lh}px; mso-line-height-rule:exactly; color:{TEXT};{extra}'


LOGO = (
    f'<a href="https://www.visvas.in" style="text-decoration:none;">'
    f'<img src="{BASE}/visvas-promoters-logo.png" width="247" height="100" '
    f'alt="Visvas Promoters - visit our website" border="0" '
    f'style="display:block; border:0; outline:none; width:247px; max-width:100%; height:auto; '
    f'{FONT} font-size:18px; font-weight:bold; color:{GREEN};"></a>'
)

NAME_ROWS = (
    f'<tr><td style="{text(18, 24, f" font-weight:bold; color:{GREEN}; padding-bottom:6px;")}">Your Name</td></tr>'
    f'<tr><td style="{text(14, 20)}">Your Designation</td></tr>'
)

WEB = f'<a href="https://www.visvas.in" style="color:{TEXT}; text-decoration:none; font-weight:bold;">www.visvas.in</a>'
PHONE = (
    f'<span style="color:{GREEN};">Ph.no:</span> '
    f'<a href="tel:+917568464320" style="color:{TEXT}; text-decoration:none;">+91&nbsp;75684&nbsp;64320</a>'
)
EMAIL = (
    f'<span style="color:{GREEN};">Email:</span> '
    f'<a href="mailto:your.email@visvas.in" style="color:{TEXT}; text-decoration:none;">your.email@visvas.in</a>'
)


def contact_rows(last_pad=0):
    return (
        f'<tr><td style="{text(14, 20, " padding-bottom:8px;")}">{WEB}</td></tr>'
        f'<tr><td style="{text(14, 20, " padding-bottom:8px;")}">{PHONE}</td></tr>'
        f'<tr><td style="{text(14, 20, f" padding-bottom:{last_pad}px;")}">{EMAIL}</td></tr>'
    )


def icon(name, label, href, last=False):
    pad = '0' if last else '0 8px 0 0'
    return (
        f'<td style="padding:{pad};"><a href="{href}" style="text-decoration:none;">'
        f'<img src="{BASE}/visvas-promoters-{name}.png" width="30" height="30" alt="Visvas Promoters on {label}" border="0" '
        f'style="display:block; border:0; outline:none; width:30px; height:30px; -ms-interpolation-mode:bicubic; '
        f'{FONT} font-size:10px; color:{GREEN};"></a></td>'
    )


ICONS = (
    '<table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr>'
    + icon('instagram', 'Instagram', 'https://www.instagram.com/visvas_promoters_madurai')
    + icon('facebook', 'Facebook', 'https://www.facebook.com/visvaspromoters')
    + icon('youtube', 'YouTube', 'https://www.youtube.com/@visvaspromoters', last=True)
    + '</tr></table>'
)

RULE_ROW = f'<tr><td height="1" bgcolor="{RULE}" style="height:1px; font-size:1px; line-height:1px; mso-line-height-rule:exactly;">&nbsp;</td></tr>'


def block(inner, style='', mso_width=None):
    """An inline-block column; returns (html, mso_td_open)."""
    return f'<div style="display:inline-block; vertical-align:middle; {style}">{inner}</div>'


def columns(cols, valign='middle'):
    """cols: list of (inner_html, div_style, mso_td_attrs)."""
    parts = ['<!--[if mso]><table role="presentation" cellpadding="0" cellspacing="0" border="0"><tr><![endif]-->']
    for inner, style, mso in cols:
        parts.append(f'<!--[if mso]><td valign="{valign}" {mso}><![endif]-->')
        parts.append(f'<div style="display:inline-block; vertical-align:{valign}; {style}">{inner}</div>')
        parts.append('<!--[if mso]></td><![endif]-->')
    parts.append('<!--[if mso]></tr></table><![endif]-->')
    return ''.join(parts)


def inner_table(rows):
    return f'<table role="presentation" cellpadding="0" cellspacing="0" border="0">{rows}</table>'


def page(body_rows):
    return f'''<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex">
<meta name="color-scheme" content="light only">
<meta name="supported-color-schemes" content="light only">
<title>Visvas Promoters - Email Signature</title>
</head>
<body bgcolor="#ffffff" style="margin:0; padding:24px;">

<!--[if mso]><table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0"><tr><td><![endif]-->
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="width:100%; max-width:600px; {FONT}">
{body_rows}
</table>
<!--[if mso]></td></tr></table><![endif]-->

</body>
</html>
'''


# Logo | gold rule | name — wraps to logo over name on phones
HEADER_LOGO_NAME = columns([
    (LOGO, 'padding:0 24px 8px 0;', 'width="271" style="padding:0 24px 0 0;"'),
    (inner_table(NAME_ROWS), f'border-left:1px solid {GOLD}; padding:4px 0 4px 24px;',
     f'style="border-left:1px solid {GOLD}; padding:4px 0 4px 24px;"'),
])

SEP = f'<span style="color:{RULE};">&nbsp;&nbsp;|&nbsp;&nbsp;</span>'

variants = {}

# 1: header, rule, one wrapping line of contacts
variants[1] = page(
    f'<tr><td style="font-size:0; line-height:0; padding:0 0 8px 0;">{HEADER_LOGO_NAME}</td></tr>\n'
    f'{RULE_ROW}\n'
    f'<tr><td style="{text(14, 22, " padding:16px 0;")}">{WEB}{SEP}<span style="white-space:nowrap;">{PHONE}</span>{SEP}<span style="white-space:nowrap;">{EMAIL}</span></td></tr>'
)

# 2: logo, rule, name column + contacts/icons column
variants[2] = page(
    f'<tr><td style="padding:0 0 16px 0;">{LOGO}</td></tr>\n'
    f'{RULE_ROW}\n'
    '<tr><td style="font-size:0; line-height:0; padding:24px 0 0 0;">'
    + columns([
        (inner_table(NAME_ROWS), 'padding:0 24px 16px 0;', 'style="padding:0 24px 0 0;"'),
        (inner_table(contact_rows(8) + f'<tr><td>{ICONS}</td></tr>'),
         f'border-left:1px solid {RULE}; padding:0 0 0 24px;', f'style="border-left:1px solid {RULE}; padding:0 0 0 24px;"'),
    ], valign='top')
    + '</td></tr>'
)

# 3: header, rule, stacked contacts + icons
variants[3] = page(
    f'<tr><td style="font-size:0; line-height:0; padding:0 0 8px 0;">{HEADER_LOGO_NAME}</td></tr>\n'
    f'{RULE_ROW}\n'
    f'<tr><td style="padding:16px 0 0 0;">{inner_table(contact_rows(16) + f"<tr><td>{ICONS}</td></tr>")}</td></tr>'
)

# 4: logo | name + contacts, rule, icons
variants[4] = page(
    '<tr><td style="font-size:0; line-height:0; padding:0 0 16px 0;">'
    + columns([
        (LOGO, 'padding:0 24px 8px 0;', 'width="271" style="padding:0 24px 0 0;"'),
        (inner_table(
            f'<tr><td style="{text(18, 24, f" font-weight:bold; color:{GREEN}; padding-bottom:4px;")}">Your Name</td></tr>'
            f'<tr><td style="{text(14, 20, " padding-bottom:12px;")}">Your Designation</td></tr>'
            + contact_rows(0)),
         f'border-left:1px solid {RULE}; padding:0 0 0 24px;', f'style="border-left:1px solid {RULE}; padding:0 0 0 24px;"'),
    ])
    + '</td></tr>\n'
    f'{RULE_ROW}\n'
    f'<tr><td style="padding:16px 0;">{ICONS}</td></tr>'
)

for n, html in variants.items():
    path = f'{OUT}/visvas-signature-variant-{n}.html'
    with open(path, 'w') as f:
        f.write(html)
    print(path, len(html), 'bytes')
