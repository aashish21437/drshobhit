import email
import os
import quopri

mhtml_file = 'template_code.mhtml'
out_dir = 'extracted'

if not os.path.exists(out_dir):
    os.makedirs(out_dir)

with open(mhtml_file, 'r', encoding='utf-8') as f:
    msg = email.message_from_file(f)

for i, part in enumerate(msg.walk()):
    content_type = part.get_content_type()
    if part.is_multipart():
        continue
    
    filename = part.get_filename()
    if not filename:
        ext = 'html' if content_type == 'text/html' else 'css' if content_type == 'text/css' else 'bin'
        if content_type == 'text/html':
            filename = 'index.html'
        else:
            filename = f"part_{i}.{ext}"
            
    # the content-location might contain the URL or useful filename
    content_location = part.get('Content-Location')
    
    # save the part
    payload = part.get_payload(decode=True)
    if payload:
        safe_name = filename.replace('/', '_').replace('\\', '_')
        if content_location:
            safe_name = content_location.split('/')[-1].split('?')[0]
            if not safe_name:
                safe_name = f"part_{i}.{ext}"
                
        # some filenames might be same, so let's just use part_i_name
        safe_name = f"part_{i}_{safe_name}"
        if content_type == 'text/html':
            safe_name = 'index.html'
            
        filepath = os.path.join(out_dir, safe_name)
        with open(filepath, 'wb') as out_f:
            out_f.write(payload)

print("Extraction complete")
