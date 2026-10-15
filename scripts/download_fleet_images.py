import os
import sys
import time
import json
import urllib.request
import urllib.parse
from pathlib import Path

# Mapping of aircraft IDs to authentic photos on Wikimedia Commons
AIRCRAFT_IMAGES = {
    "citation-cj3-plus": {
        "exterior": "File:N264CE Cessna 525B Citation CJ3+ 3.jpg",
        "interior": "File:Citation CJ3+ cabin, EBACE 2023, Le Grand-Saconnex (EB237565).jpg",
        "gallery": [
            "File:Cessna Citation CJ3 Cabin.JPG",
            "File:Cessna 525B Citation CJ3 N111KJ.jpg",
            "File:Cessna CitationJet CJ3 N1H FDK MD2.jpg"
        ]
    },
    "phenom-300e": {
        "exterior": "File:Hamburg Airport Herrenknecht Aviation Embraer EMB-505 Phenom 300 D-CHMD (DSC09097).jpg",
        "interior": "File:Embraer Phenom 300 cabin, EBACE 2019 (EB190435, cropped).jpg",
        "gallery": [
            "File:Embraer Phenom 300E, EBACE 2019, Le Grand-Saconnex (EB190442).jpg",
            "File:Embraer EMB-505 Phenom 300 cabin forward view.jpg",
            "File:Embraer Phenom 300 N235EE FDK MD2.jpg"
        ]
    },
    "learjet-75-liberty": {
        "exterior": "File:Bombardier Learjet 75 ‘G-USHA’.jpg",
        "interior": "File:EBACE 2019, Le Grand-Saconnex (EB190571).jpg",
        "gallery": [
            "File:Braunschweig Airport Lycoair Learjet 75 OE-GJW (DSC01625).jpg",
            "File:N577LJ Learjet 75 cabin.jpg",
            "File:Learjet 75 on static display, EBACE 2018, Le Grand-Saconnex (BL7C0612).jpg"
        ]
    },
    "praetor-600": {
        "exterior": "File:Embraer Praetor 600, SIAE 2019, Le Bourget (SIAE0693).jpg",
        "interior": "File:Embraer, EBACE 2019, Le Grand-Saconnex (EB190421).jpg",
        "gallery": [
            "File:Embraer Praetor 500, EBACE 2019, Le Grand-Saconnex (EB190420).jpg",
            "File:EBACE 2019, Le Grand-Saconnex (EB190242).jpg",
            "File:Paris Air Show 2019, Le Bourget (SIAE0700).jpg"
        ]
    },
    "challenger-350": {
        "exterior": "File:Bombardier Challenger 350 N360VJ BWI MD1.jpg",
        "interior": "File:EBACE 2019, Le Grand-Saconnex (EB190479).jpg",
        "gallery": [
            "File:Bombardier Challenger 350 N1980Z.jpg",
            "File:Bombardier BD-100-1A10 Challenger 350 (N595FX, cn 20825) (2-13-2024).jpg",
            "File:Bombardier Challenger 300 interior.JPG"
        ]
    },
    "gulfstream-g550": {
        "exterior": "File:Gulfstream G550, EBACE 2018, Le Grand-Saconnex (BL7C0707).jpg",
        "interior": "File:Gulfstream G550, EBACE 2018, Le Grand-Saconnex (BL7C0719).jpg",
        "gallery": [
            "File:Gulfstream G550, EBACE 2018, Le Grand-Saconnex (BL7C0710).jpg",
            "File:Gulfstream G550 cabin interior.JPG",
            "File:Gulfstream G550, EBACE 2018, Le Grand-Saconnex (BL7C0727).jpg"
        ]
    },
    "gulfstream-g650er": {
        "exterior": "File:EC-MLR Gulfstream G650 SCQ 03.jpg",
        "interior": "File:Gulfstream G650ER, EBACE 2018, Le Grand-Saconnex (BL7C0740).jpg",
        "gallery": [
            "File:Qatar Executive G650, EBACE 2019, Le Grand-Saconnex (EB190516).jpg",
            "File:Gulfstream G650ER, EBACE 2018, Le Grand-Saconnex (BL7C0744).jpg",
            "File:Private, RA-10205, Gulfstream G650 (29270376557).jpg"
        ]
    },
    "global-7500": {
        "exterior": "File:Bombardier Global 7500 CS-ESS BWI MD1.jpg",
        "interior": "File:Bombardier Global 7500, Paris Air Show 2019, Le Bourget (SIAE8909).jpg",
        "gallery": [
            "File:Bombardier Global 7500, Paris Air Show 2019, Le Bourget (SIAE8905).jpg",
            "File:Bombardier Global 7500, Paris Air Show 2019, Le Bourget (SIAE8903).jpg",
            "File:Bombardier BD-700-2A12 Global 7500 (9H-VIG, cn 70086) (1-19-2023).jpg"
        ]
    }
}

def resolve_image_urls(titles):
    """Resolve direct image download URLs (1920px width thumbnail or original) via Commons API"""
    url_map = {}
    # Batch query in groups of 10
    title_list = list(titles)
    for i in range(0, len(title_list), 10):
        batch = title_list[i:i+10]
        params = {
            'action': 'query',
            'titles': '|'.join(batch),
            'prop': 'imageinfo',
            'iiprop': 'url|size|mime',
            'iiurlwidth': '1920',
            'format': 'json'
        }
        req_url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
        req = urllib.request.Request(req_url, headers={'User-Agent': 'PrivateJetFleet/1.0 (fleet@privatejet.app)'})
        try:
            with urllib.request.urlopen(req, timeout=20) as resp:
                data = json.loads(resp.read().decode('utf-8'))
                pages = data.get('query', {}).get('pages', {})
                for pid, p in pages.items():
                    title = p.get('title')
                    ii = p.get('imageinfo', [{}])[0]
                    thumb = ii.get('thumburl')
                    orig = ii.get('url')
                    target_url = thumb if thumb else orig
                    if title and target_url:
                        url_map[title] = target_url
        except Exception as e:
            print(f"Error resolving batch {i}: {e}", flush=True)
        time.sleep(0.5)
    return url_map

def download_file(url, dest_path, retries=3):
    """Download a file with user-agent and retries"""
    dest_path.parent.mkdir(parents=True, exist_ok=True)
    req = urllib.request.Request(url, headers={'User-Agent': 'PrivateJetFleet/1.0 (fleet@privatejet.app)'})
    for attempt in range(1, retries + 1):
        try:
            with urllib.request.urlopen(req, timeout=30) as resp:
                content = resp.read()
                if len(content) < 5000:
                    raise ValueError(f"Downloaded file suspiciously small ({len(content)} bytes)")
                with open(dest_path, 'wb') as f:
                    f.write(content)
            return True
        except Exception as e:
            print(f"  Attempt {attempt} failed for {dest_path.name}: {e}", flush=True)
            if attempt < retries:
                time.sleep(2 * attempt)
    return False

def main():
    root_dir = Path(__file__).resolve().parent.parent
    public_fleet_dir = root_dir / 'public' / 'images' / 'fleet'
    
    print("Collecting all image titles...", flush=True)
    all_titles = set()
    for jid, data in AIRCRAFT_IMAGES.items():
        all_titles.add(data['exterior'])
        all_titles.add(data['interior'])
        for g in data['gallery']:
            all_titles.add(g)
            
    print(f"Resolving {len(all_titles)} image URLs via Wikimedia Commons API...", flush=True)
    url_map = resolve_image_urls(all_titles)
    print(f"Resolved {len(url_map)} / {len(all_titles)} URLs successfully.", flush=True)
    
    missing = all_titles - set(url_map.keys())
    if missing:
        print(f"Warning: Missing URLs for {missing}", flush=True)
        
    download_results = {}
    
    for jid, data in AIRCRAFT_IMAGES.items():
        print(f"\nDownloading authentic images for [{jid}]...", flush=True)
        jet_dir = public_fleet_dir / jid
        jet_results = {"exterior": None, "interior": None, "gallery": []}
        
        # 1. Exterior
        ext_title = data['exterior']
        ext_url = url_map.get(ext_title)
        ext_dest = jet_dir / 'exterior.jpg'
        if ext_url and download_file(ext_url, ext_dest):
            jet_results["exterior"] = f"/images/fleet/{jid}/exterior.jpg"
            print(f"  + Exterior downloaded ({ext_dest.stat().st_size // 1024} KB)", flush=True)
        else:
            print(f"  x Failed exterior for {jid}", flush=True)
            
        time.sleep(0.3)
        
        # 2. Interior
        int_title = data['interior']
        int_url = url_map.get(int_title)
        int_dest = jet_dir / 'interior.jpg'
        if int_url and download_file(int_url, int_dest):
            jet_results["interior"] = f"/images/fleet/{jid}/interior.jpg"
            print(f"  + Interior downloaded ({int_dest.stat().st_size // 1024} KB)", flush=True)
        else:
            print(f"  x Failed interior for {jid}", flush=True)
            
        time.sleep(0.3)
        
        # 3. Gallery
        for idx, g_title in enumerate(data['gallery']):
            g_url = url_map.get(g_title)
            g_dest = jet_dir / f'gallery-{idx+1}.jpg'
            if g_url and download_file(g_url, g_dest):
                jet_results["gallery"].append(f"/images/fleet/{jid}/gallery-{idx+1}.jpg")
                print(f"  + Gallery {idx+1} downloaded ({g_dest.stat().st_size // 1024} KB)", flush=True)
            else:
                print(f"  x Failed gallery {idx+1} for {jid}", flush=True)
            time.sleep(0.3)
            
        download_results[jid] = jet_results

    # Save manifest
    manifest_path = root_dir / 'scripts' / 'download_manifest.json'
    with open(manifest_path, 'w', encoding='utf-8') as f:
        json.dump(download_results, f, indent=2)
    print(f"\nManifest saved to {manifest_path}", flush=True)
    
    # Check completeness
    all_ok = True
    for jid, res in download_results.items():
        if not res['exterior'] or not res['interior'] or len(res['gallery']) != 3:
            print(f"Incomplete download for {jid}: {res}")
            all_ok = False
            
    if all_ok:
        print("\nALL 8 JETS HAVE 100% COMPLETE AUTHENTIC PHOTOS DOWNLOADED SUCCESSFULLY!")
    else:
        print("\nSome images could not be downloaded.")

if __name__ == '__main__':
    main()
