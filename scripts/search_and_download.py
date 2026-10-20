import urllib.request
import urllib.parse
import json
import os
import sys

def search_commons(query, limit=10):
    params = {
        'action': 'query',
        'generator': 'search',
        'gsrsearch': query,
        'gsrnamespace': '6',
        'gsrlimit': limit,
        'prop': 'imageinfo',
        'iiprop': 'url|size|mime',
        'iiurlwidth': '1920',
        'format': 'json'
    }
    url = 'https://commons.wikimedia.org/w/api.php?' + urllib.parse.urlencode(params)
    req = urllib.request.Request(url, headers={'User-Agent': 'JetEliteScraper/1.0 (contact@jetelite.com)'})
    try:
        with urllib.request.urlopen(req) as resp:
            data = json.loads(resp.read().decode('utf-8'))
            pages = data.get('query', {}).get('pages', {})
            results = []
            for pid, page in pages.items():
                title = page.get('title')
                ii = page.get('imageinfo', [{}])[0]
                thumb = ii.get('thumburl', ii.get('url'))
                orig = ii.get('url')
                width = ii.get('width', 0)
                height = ii.get('height', 0)
                results.append({'title': title, 'thumb': thumb, 'orig': orig, 'width': width, 'height': height})
            return results
    except Exception as e:
        print("Error:", e)
        return []

if __name__ == "__main__":
    queries = [
        ("turboprop_exterior", '"Pilatus PC-12" OR "King Air 350" filetype:bitmap'),
        ("turboprop_interior", '"Pilatus PC-12" cabin OR "King Air" cabin filetype:bitmap'),
        ("piston_exterior", '"Cirrus SR22" OR "Beechcraft Baron" filetype:bitmap'),
        ("piston_interior", '"Cirrus SR22" cockpit OR "Cirrus SR22" interior OR "Cirrus SR22" cabin filetype:bitmap'),
    ]
    for tag, q in queries:
        print(f"=== {tag} ===")
        res = search_commons(q, 6)
        for r in res:
            try:
                print(f"{r['title']} ({r['width']}x{r['height']}) -> {r['thumb']}")
            except Exception:
                pass
