#!/usr/bin/env python3
import argparse
import base64
import json
import os
import re
import ssl
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urljoin, urlparse
from urllib.request import Request, urlopen


BASE_URL = "https://eotcdskm.org"
API_BASE = f"{BASE_URL}/api/content"


def fetch_bytes(url: str, timeout: int = 30) -> bytes:
    req = Request(url, headers={"User-Agent": "Mozilla/5.0"})
    ctx = ssl._create_unverified_context()
    with urlopen(req, timeout=timeout, context=ctx) as resp:
        return resp.read()


def fetch_text(url: str, timeout: int = 30) -> str:
    return fetch_bytes(url, timeout=timeout).decode("utf-8", errors="replace")


def safe_name(value: str) -> str:
    value = value.strip()
    value = value.replace("://", "_")
    value = value.replace("/", "_")
    value = value.replace("?", "_")
    value = value.replace("&", "_")
    value = value.replace("=", "_")
    value = value.replace("%", "_")
    value = value.replace(" ", "_")
    value = re.sub(r"[^A-Za-z0-9_.\-]+", "_", value)
    value = re.sub(r"_+", "_", value)
    return value.strip("._") or "index"


def ensure_parent(path: Path) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)


def save_text(path: Path, text: str) -> None:
    ensure_parent(path)
    path.write_text(text, encoding="utf-8")


def save_json(path: Path, obj) -> None:
    ensure_parent(path)
    path.write_text(json.dumps(obj, ensure_ascii=False, indent=2), encoding="utf-8")


def download_asset(asset_url: str, out_root: Path, seen: set[str]) -> Path | None:
    asset_url = asset_url.strip()
    if not asset_url:
        return None

    if asset_url.startswith("url(") and asset_url.endswith(")"):
        asset_url = asset_url[4:-1]
    asset_url = asset_url.strip("'\"")
    if asset_url.startswith("//"):
        asset_url = "https:" + asset_url
    elif asset_url.startswith("/"):
        asset_url = BASE_URL + asset_url
    elif asset_url.startswith("static/"):
        asset_url = BASE_URL + "/" + asset_url
    elif asset_url.startswith("manifest.json") or asset_url.startswith("favicon.ico"):
        asset_url = BASE_URL + "/" + asset_url
    elif not asset_url.startswith("http://") and not asset_url.startswith("https://"):
        return None

    parsed = urlparse(asset_url)
    if parsed.netloc and parsed.netloc != urlparse(BASE_URL).netloc:
        return None
    if asset_url in seen:
        return None
    seen.add(asset_url)

    rel = parsed.path.lstrip("/")
    if not rel:
        rel = "index"
    dest = out_root / rel
    if dest.exists():
        return dest

    try:
        data = fetch_bytes(asset_url, timeout=60)
    except (HTTPError, URLError, TimeoutError, OSError):
        return None
    ensure_parent(dest)
    dest.write_bytes(data)
    return dest


def collect_strings(obj, assets: set[str], links: set[str]) -> None:
    if isinstance(obj, dict):
        for key, value in obj.items():
            if key == "href" and isinstance(value, str):
                if value.startswith("/") and not value.startswith("//"):
                    links.add(value)
                continue
            if key in {"image", "src"} and isinstance(value, str):
                assets.add(value)
            elif key == "url" and isinstance(value, str):
                assets.add(value)
            elif key == "html" and isinstance(value, list):
                for item in value:
                    if isinstance(item, str):
                        try:
                            decoded = base64.b64decode(item).decode("utf-8", errors="replace")
                            for match in re.findall(r'(?:/)?(?:static/[^"\'\)\s>]+|favicon\.ico|manifest\.json)', decoded):
                                assets.add(match)
                        except Exception:
                            pass
            elif key == "backgroundImage" and isinstance(value, dict):
                bg_url = value.get("url")
                if isinstance(bg_url, str):
                    for match in re.findall(r'(?:/)?(?:static/[^"\'\)\s>]+|favicon\.ico|manifest\.json)', bg_url):
                        assets.add(match)

            if isinstance(value, (dict, list)):
                collect_strings(value, assets, links)
            elif isinstance(value, str):
                for match in re.findall(r'(?:/)?(?:static/[^"\'\)\s>]+|favicon\.ico|manifest\.json)', value):
                    assets.add(match)
    elif isinstance(obj, list):
        for item in obj:
            collect_strings(item, assets, links)


def decode_html_value(value: str) -> str:
    try:
        decoded = base64.b64decode(value).decode("utf-8", errors="replace")
        if "<" in decoded and ">" in decoded:
            return decoded
    except Exception:
        pass
    return value


def render_block(block, depth: int = 0) -> str:
    parts = []
    prefix = "#" * min(depth + 2, 6)

    if isinstance(block, dict):
        title = block.get("title")
        subtitle = block.get("subTitle")
        text = block.get("text")
        html = block.get("html")
        image = block.get("image")
        video = block.get("video")
        link = block.get("link")
        items = block.get("items")
        images = block.get("images")
        contents = block.get("contents")
        block_type = block.get("type")

        if title:
            parts.append(f"{prefix} {title}\n")
        if subtitle:
            parts.append(f"{subtitle}\n")
        if text:
            for item in text if isinstance(text, list) else [text]:
                if item:
                    parts.append(f"{item}\n")
        if image:
            parts.append(f"![image]({image})\n")
        if video:
            if isinstance(video, dict):
                vid = video.get("id")
                source = video.get("source", "")
                parts.append(f"Video: {source} {vid}\n".strip() + "\n")
        if html:
            html_items = html if isinstance(html, list) else [html]
            for item in html_items:
                if isinstance(item, str):
                    parts.append("```html\n" + decode_html_value(item) + "\n```\n")
        if link:
            href = link.get("href", "")
            label = link.get("text", href)
            parts.append(f"[{label}]({href})\n")
        if items:
            parts.append("\n")
            for item in items:
                parts.append(f"- {item}\n")
        if images:
            parts.append("\n")
            for image_item in images:
                original = image_item.get("original")
                thumb = image_item.get("thumbnail")
                parts.append(f"- {original}")
                if thumb:
                    parts[-1] += f" | thumbnail: {thumb}"
                parts[-1] += "\n"
        if contents:
            for child in contents:
                parts.append(render_block(child, depth + 1))
        return "".join(parts)

    if isinstance(block, list):
        for item in block:
            parts.append(render_block(item, depth))
        return "".join(parts)

    if block_type:
        parts.append(f"{prefix} {block_type}\n")
    return "".join(parts)


def render_page(doc: dict, route: str) -> str:
    lines = [f"# {route}\n"]
    if "path" in doc:
        lines.append(f"_API path: `{doc['path']}`_\n")
    for block in doc.get("contents", []):
        lines.append(render_block(block, 0))
        if not lines[-1].endswith("\n"):
            lines[-1] += "\n"
        lines.append("\n")
    return "".join(lines)


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--out", default="eotcdskm-export")
    args = parser.parse_args()

    out_root = Path(args.out).resolve()
    raw_dir = out_root / "raw"
    md_dir = out_root / "pages"
    assets_dir = out_root / "assets"
    raw_dir.mkdir(parents=True, exist_ok=True)
    md_dir.mkdir(parents=True, exist_ok=True)
    assets_dir.mkdir(parents=True, exist_ok=True)

    html = fetch_text(BASE_URL + "/", timeout=30)
    save_text(out_root / "home.html", html)

    known_assets = set()
    known_links = set()
    for match in re.findall(r'(?:src|href)="([^"]+)"', html):
        known_assets.add(match)
    collect_strings(html, known_assets, known_links)

    # Mirror top-level static assets referenced by the shell.
    for asset in sorted(known_assets):
        download_asset(asset, assets_dir, set())

    # Save the JavaScript/CSS source maps and service worker if present.
    for extra in [
        "/static/js/2.9351abe0.chunk.js",
        "/static/js/2.9351abe0.chunk.js.map",
        "/static/js/main.c2179d82.chunk.js",
        "/static/js/main.c2179d82.chunk.js.map",
        "/static/css/2.ef69ffb0.chunk.css",
        "/static/css/main.12c0515f.chunk.css",
        "/service-worker.js",
        "/manifest.json",
        "/favicon.ico",
        "/asset-manifest.json",
    ]:
        download_asset(extra, assets_dir, set())

    seeds = [
        "home",
        "footer",
        "about",
        "welcome_to_our_church",
        "the_process_of_searching_and_buying_church_building",
        "sunday_school",
        "events",
        "sermons",
        "gallery",
        "mezmur",
    ]

    queue = list(seeds)
    seen_routes: set[str] = set()
    discovered_routes: set[str] = set(queue)
    discovered_assets: set[str] = set()

    while queue:
        route = queue.pop(0)
        if route in seen_routes:
            continue
        seen_routes.add(route)
        try:
            payload = json.loads(fetch_text(f"{API_BASE}/{route}", timeout=30))
        except Exception:
            continue

        save_json(raw_dir / f"{safe_name(route)}.json", payload)
        save_text(md_dir / f"{safe_name(route)}.md", render_page(payload, route))

        route_assets = set()
        route_links = set()
        collect_strings(payload, route_assets, route_links)
        for asset in route_assets:
            discovered_assets.add(asset)

        for link in route_links:
            slug = link.lstrip("/").split("?")[0].split("#")[0].strip("/")
            if not slug:
                continue
            if slug.endswith(".html"):
                slug = slug[:-5]
            if slug not in discovered_routes:
                discovered_routes.add(slug)
                queue.append(slug)

    # Download everything referenced from the payloads.
    asset_seen: set[str] = set()
    for asset in sorted(discovered_assets):
        download_asset(asset, assets_dir, asset_seen)

    # Also try to preserve any internal links exposed in the page text.
    for link in sorted(known_links | discovered_routes):
        if link.startswith("/"):
            continue

    index_lines = [
        "# eotcdskm.org scrape export\n",
        "\n",
        "This folder contains raw JSON content responses, rendered markdown, and mirrored assets pulled from the live site.\n",
        "\n",
        "## Routes captured\n",
    ]
    for route in sorted(seen_routes):
        index_lines.append(f"- `{route}`\n")
    save_text(out_root / "INDEX.md", "".join(index_lines))
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
