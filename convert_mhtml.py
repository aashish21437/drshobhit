import email
import os
import quopri
import base64
import re

mhtml_file = 'template_code.mhtml'
out_html = 'public/homepage.html'

with open(mhtml_file, 'r', encoding='utf-8') as f:
    msg = email.message_from_file(f)

html_content = ""
parts = {}

for part in msg.walk():
    if part.is_multipart():
        continue
    content_id = part.get('Content-ID')
    if content_id:
        content_id = content_id.strip('<>')
    
    content_type = part.get_content_type()
    payload = part.get_payload(decode=True)
    if not payload:
        continue

    if content_type == 'text/html' and not html_content:
        # assume first text/html is main
        html_content = payload.decode('utf-8', errors='ignore')
    elif content_id:
        parts[content_id] = {
            'type': content_type,
            'data': payload
        }

# Replace cid: references in HTML
def replace_cid(match):
    cid = match.group(1)
    if cid in parts:
        part = parts[cid]
        if part['type'] == 'text/css':
            # for CSS, we could inline it as <style> or a data URI
            data_uri = f"data:text/css;base64,{base64.b64encode(part['data']).decode('utf-8')}"
            return data_uri
        elif part['type'].startswith('image/'):
            data_uri = f"data:{part['type']};base64,{base64.b64encode(part['data']).decode('utf-8')}"
            return data_uri
        elif part['type'].startswith('font/'):
            data_uri = f"data:{part['type']};base64,{base64.b64encode(part['data']).decode('utf-8')}"
            return data_uri
        elif part['type'] == 'image/svg+xml':
            data_uri = f"data:image/svg+xml;base64,{base64.b64encode(part['data']).decode('utf-8')}"
            return data_uri
        else:
            return f"cid:{cid}" # unmodified
    return f"cid:{cid}"

html_content = re.sub(r'cid:([^"\'\s>]+)', replace_cid, html_content)

with open(out_html, 'w', encoding='utf-8') as f:
    f.write(html_content)

print(f"Successfully converted to {out_html}")
