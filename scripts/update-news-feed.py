#!/usr/bin/env python3
"""Génère data/autism-news.json à partir des flux Google Actualités."""
import json
import re
import urllib.request
import xml.etree.ElementTree as ET
from datetime import datetime, timezone
from pathlib import Path

FEEDS = [
    ("senegal", "Sénégal", "https://news.google.com/rss/search?q=autisme+OR+autism+Senegal&hl=fr&gl=SN&ceid=SN:fr"),
    ("afrique", "Afrique", "https://news.google.com/rss/search?q=autisme+OR+autism+Africa+OR+Afrique&hl=fr&gl=MA&ceid=MA:fr"),
    ("monde", "Monde", "https://news.google.com/rss/search?q=autisme+OR+autism+TSA&hl=fr&gl=FR&ceid=FR:fr"),
    ("science", "Science", "https://news.google.com/rss/search?q=autisme+recherche+OR+autism+research+study&hl=fr&gl=US&ceid=US:en"),
]

UA = "Plateforme-Autisme-Senegal-RSS/1.0"


def fetch(url):
    req = urllib.request.Request(url, headers={"User-Agent": UA})
    with urllib.request.urlopen(req, timeout=20) as r:
        return r.read()


def clean_title(title):
    title = re.sub(r"\s*-\s*[^-]+$", "", title)
    return title.strip()


def parse_items(xml_bytes, region, label):
    root = ET.fromstring(xml_bytes)
    items = []
    for item in root.findall(".//item"):
        title_el = item.find("title")
        link_el = item.find("link")
        if title_el is None or link_el is None:
            continue
        title = clean_title(title_el.text or "")
        link = (link_el.text or "").strip()
        if not title or not link:
            continue
        source_el = item.find("source")
        pub_el = item.find("pubDate")
        pub = pub_el.text if pub_el is not None else ""
        ts = 0
        if pub:
            try:
                ts = int(datetime.strptime(pub, "%a, %d %b %Y %H:%M:%S %Z").replace(tzinfo=timezone.utc).timestamp())
            except ValueError:
                pass
        items.append({
            "title": title,
            "link": link,
            "source": source_el.text if source_el is not None else "",
            "region": region,
            "label": label,
            "pubDate": pub,
            "ts": ts,
        })
    return items


def write_rss_xml(items, path):
    from xml.sax.saxutils import escape

    lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        "<channel>",
        "<title>Actualités autisme — Sénégal, Afrique, Monde &amp; Science | P.A.S</title>",
        "<link>https://www.plateforme-autisme-senegal.org/</link>",
        "<description>Fil agrégé des médias relatant des faits sur l'autisme au Sénégal, en Afrique et dans le monde, incluant la recherche scientifique.</description>",
        "<language>fr</language>",
        f"<lastBuildDate>{datetime.now(timezone.utc).strftime('%a, %d %b %Y %H:%M:%S +0000')}</lastBuildDate>",
        '<atom:link href="https://www.plateforme-autisme-senegal.org/feeds/actualites-autisme.xml" rel="self" type="application/rss+xml"/>',
    ]
    for item in items:
        title = escape(item["title"])
        link = escape(item["link"])
        desc = escape(f"[{item['label']}] {item['title']}" + (f" — {item['source']}" if item.get("source") else ""))
        pub = item.get("pubDate") or datetime.now(timezone.utc).strftime("%a, %d %b %Y %H:%M:%S GMT")
        lines += [
            "<item>",
            f"<title>{title}</title>",
            f"<link>{link}</link>",
            f"<guid isPermaLink=\"true\">{link}</guid>",
            f"<pubDate>{escape(pub)}</pubDate>",
            f"<description>{desc}</description>",
            f"<category>{escape(item['label'])}</category>",
            "</item>",
        ]
    lines += ["</channel>", "</rss>"]
    path.write_text("\n".join(lines), encoding="utf-8")


def main():
    all_items = []
    for region, label, url in FEEDS:
        try:
            xml = fetch(url)
            all_items.extend(parse_items(xml, region, label))
            print(f"OK {label}: fetched")
        except Exception as e:
            print(f"WARN {label}: {e}")

    seen = set()
    unique = []
    for item in sorted(all_items, key=lambda x: x["ts"], reverse=True):
        key = item["title"].lower()
        if key in seen:
            continue
        seen.add(key)
        unique.append(item)

    unique = unique[:40]
    out = {
        "updated": datetime.now(timezone.utc).isoformat(),
        "count": len(unique),
        "items": unique,
    }
    path = Path(__file__).resolve().parent.parent / "data" / "autism-news.json"
    path.parent.mkdir(parents=True, exist_ok=True)
    path.write_text(json.dumps(out, ensure_ascii=False, indent=2), encoding="utf-8")
    print(f"Written {len(unique)} items -> {path}")

    feed_path = Path(__file__).resolve().parent.parent / "feeds" / "actualites-autisme.xml"
    feed_path.parent.mkdir(parents=True, exist_ok=True)
    write_rss_xml(unique, feed_path)
    print(f"Written RSS feed -> {feed_path}")


if __name__ == "__main__":
    main()
