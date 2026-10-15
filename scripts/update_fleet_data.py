import json
import re
from pathlib import Path

def main():
    root = Path(__file__).resolve().parent.parent
    fleet_file = root / "src" / "data" / "fleet.ts"
    manifest_file = root / "scripts" / "download_manifest.json"
    
    with open(manifest_file, "r", encoding="utf-8") as f:
        manifest = json.load(f)
        
    with open(fleet_file, "r", encoding="utf-8") as f:
        content = f.read()
        
    # Backup
    backup_file = root / "src" / "data" / "fleet.ts.bak"
    with open(backup_file, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Backed up fleet.ts to {backup_file}")
    
    # Update each aircraft's images
    for jid, img_data in manifest.items():
        ext = img_data["exterior"]
        interior = img_data["interior"]
        gallery = img_data["gallery"]
        
        # Regex to find the block for this aircraft id
        # Match from id: "jid" up to travelType: "..."
        pattern = re.compile(
            rf'(id:\s*"{re.escape(jid)}".*?)(imageExterior:\s*\n\s*"[^"]+",\s*\n\s*imageInterior:\s*\n\s*"[^"]+",\s*\n\s*imageGallery:\s*\[[\s\S]*?\])',
            re.DOTALL
        )
        
        gallery_str = "[\n" + ",\n".join(f'      "{g}"' for g in gallery) + ",\n    ]"
        replacement_images = (
            f'imageExterior:\n      "{ext}",\n'
            f'    imageInterior:\n      "{interior}",\n'
            f'    imageGallery: {gallery_str}'
        )
        
        def sub_func(match):
            return match.group(1) + replacement_images
            
        new_content, count = pattern.subn(sub_func, content)
        if count == 1:
            print(f"Successfully updated image paths for {jid}")
            content = new_content
        else:
            print(f"WARNING: Could not update image paths for {jid} (matches: {count})")
            
    with open(fleet_file, "w", encoding="utf-8") as f:
        f.write(content)
        
    print(f"Successfully wrote updated fleet data to {fleet_file}")

if __name__ == "__main__":
    main()
