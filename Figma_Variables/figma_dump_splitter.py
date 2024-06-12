import json
import os

def split_into_sections(lines):
    sections = []
    section = []
    
    for line in lines:
        if line.endswith('.tokens.json'):
            if section:
                sections.append(section)
                section = []
            section.append(line)
        else:
            section.append(line)
    
    if section:
        sections.append(section)
    
    return sections

# Open the source file
with open('1_raw_file/raw_figma_dump.txt', 'r') as source_file:
    lines = [line.rstrip() for line in source_file]

sections = split_into_sections(lines)

for section in sections:
    if len(section) < 2:
        continue
    
    file_name = section[0]
    content = "\n".join(section[1:])
    
    try:
        with open(os.path.join("2_split_files", file_name), 'w') as output_file:
            output_file.write(json.dumps(json.loads(content), indent=2))
    except json.JSONDecodeError:
        print(f"Error processing file: {file_name}")
        print(content)