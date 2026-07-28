<?php
/**
 * Bibliothèque partagée — agrégation RSS actualités autisme P.A.S
 */

function pas_rss_feeds(): array
{
    return [
        ['region' => 'senegal', 'label' => 'Sénégal', 'url' => 'https://news.google.com/rss/search?q=autisme+OR+autism+Senegal&hl=fr&gl=SN&ceid=SN:fr'],
        ['region' => 'afrique', 'label' => 'Afrique', 'url' => 'https://news.google.com/rss/search?q=autisme+OR+autism+Africa+OR+Afrique&hl=fr&gl=MA&ceid=MA:fr'],
        ['region' => 'monde', 'label' => 'Monde', 'url' => 'https://news.google.com/rss/search?q=autisme+OR+autism+TSA&hl=fr&gl=FR&ceid=FR:fr'],
        ['region' => 'science', 'label' => 'Science', 'url' => 'https://news.google.com/rss/search?q=autisme+recherche+OR+autism+research+study+scientific&hl=fr&gl=US&ceid=US:en'],
    ];
}

function pas_rss_fetch(string $url): ?string
{
    if (function_exists('curl_init')) {
        $ch = curl_init($url);
        curl_setopt_array($ch, [
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_FOLLOWLOCATION => true,
            CURLOPT_TIMEOUT        => 20,
            CURLOPT_USERAGENT      => 'Plateforme-Autisme-Senegal-RSS/1.0',
        ]);
        $body = curl_exec($ch);
        $code = (int) curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        if ($body !== false && $code >= 200 && $code < 300) {
            return $body;
        }
    }

    $ctx = stream_context_create([
        'http' => [
            'timeout' => 20,
            'header'  => "User-Agent: Plateforme-Autisme-Senegal-RSS/1.0\r\n",
        ],
    ]);
    $body = @file_get_contents($url, false, $ctx);
    return $body !== false ? $body : null;
}

function pas_rss_clean_title(string $title): string
{
    $title = html_entity_decode($title, ENT_QUOTES | ENT_HTML5, 'UTF-8');
    $title = preg_replace('/\s*-\s*[^-]+$/u', '', $title);
    return trim($title);
}

function pas_rss_parse_items(string $xml, string $region, string $label): array
{
    libxml_use_internal_errors(true);
    $doc = simplexml_load_string($xml);
    if ($doc === false) {
        return [];
    }

    $items = [];
    foreach ($doc->channel->item as $item) {
        $title = pas_rss_clean_title((string) $item->title);
        $link  = trim((string) $item->link);
        if ($title === '' || $link === '') {
            continue;
        }

        $source  = isset($item->source) ? (string) $item->source : '';
        $pubDate = (string) $item->pubDate;
        $ts      = $pubDate !== '' ? strtotime($pubDate) : 0;

        $items[] = [
            'title'   => $title,
            'link'    => $link,
            'source'  => $source,
            'region'  => $region,
            'label'   => $label,
            'pubDate' => $pubDate,
            'ts'      => $ts ?: 0,
        ];
    }
    return $items;
}

function pas_rss_aggregate(): array
{
    $allItems = [];
    foreach (pas_rss_feeds() as $feed) {
        $xml = pas_rss_fetch($feed['url']);
        if ($xml !== null) {
            $allItems = array_merge($allItems, pas_rss_parse_items($xml, $feed['region'], $feed['label']));
        }
    }

    $seen   = [];
    $unique = [];
    foreach ($allItems as $item) {
        $key = mb_strtolower(preg_replace('/\s+/u', ' ', $item['title']), 'UTF-8');
        if (isset($seen[$key])) {
            continue;
        }
        $seen[$key] = true;
        $unique[]   = $item;
    }

    usort($unique, fn($a, $b) => $b['ts'] <=> $a['ts']);
    return array_slice($unique, 0, 40);
}

function pas_rss_build_payload(array $items): array
{
    return [
        'updated' => gmdate('c'),
        'count'   => count($items),
        'items'   => $items,
    ];
}

function pas_rss_write_xml(array $items, string $path): bool
{
    $lines = [
        '<?xml version="1.0" encoding="UTF-8"?>',
        '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">',
        '<channel>',
        '<title>Actualités autisme — Sénégal, Afrique, Monde &amp; Science | P.A.S</title>',
        '<link>https://www.plateforme-autisme-senegal.org/</link>',
        '<description>Fil agrégé des médias relatant des faits sur l\'autisme au Sénégal, en Afrique et dans le monde, incluant la recherche scientifique.</description>',
        '<language>fr</language>',
        '<lastBuildDate>' . gmdate('D, d M Y H:i:s') . ' +0000</lastBuildDate>',
        '<atom:link href="https://www.plateforme-autisme-senegal.org/feeds/actualites-autisme.xml" rel="self" type="application/rss+xml"/>',
    ];

    foreach ($items as $item) {
        $title = htmlspecialchars($item['title'], ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $link  = htmlspecialchars($item['link'], ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $desc  = htmlspecialchars(
            '[' . $item['label'] . '] ' . $item['title'] . ($item['source'] ? ' — ' . $item['source'] : ''),
            ENT_XML1 | ENT_QUOTES,
            'UTF-8'
        );
        $pub = htmlspecialchars($item['pubDate'] ?: gmdate('D, d M Y H:i:s') . ' GMT', ENT_XML1 | ENT_QUOTES, 'UTF-8');
        $cat = htmlspecialchars($item['label'], ENT_XML1 | ENT_QUOTES, 'UTF-8');

        $lines[] = '<item>';
        $lines[] = "<title>{$title}</title>";
        $lines[] = "<link>{$link}</link>";
        $lines[] = "<guid isPermaLink=\"true\">{$link}</guid>";
        $lines[] = "<pubDate>{$pub}</pubDate>";
        $lines[] = "<description>{$desc}</description>";
        $lines[] = "<category>{$cat}</category>";
        $lines[] = '</item>';
    }

    $lines[] = '</channel>';
    $lines[] = '</rss>';

    @mkdir(dirname($path), 0755, true);
    return file_put_contents($path, implode("\n", $lines), LOCK_EX) !== false;
}

function pas_rss_refresh_all(string $baseDir): array
{
    $items      = pas_rss_aggregate();
    $payload    = pas_rss_build_payload($items);
    $json       = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
    $cacheFile  = $baseDir . '/data/news-cache.json';
    $staticFile = $baseDir . '/data/autism-news.json';
    $xmlFile    = $baseDir . '/feeds/actualites-autisme.xml';

    @mkdir(dirname($cacheFile), 0755, true);
    @mkdir(dirname($xmlFile), 0755, true);

    $okJson  = $json !== false && file_put_contents($cacheFile, $json, LOCK_EX) !== false;
    $okStatic = $okJson && file_put_contents($staticFile, $json, LOCK_EX) !== false;
    $okXml   = pas_rss_write_xml($items, $xmlFile);

    return [
        'success' => $okJson && $okStatic && $okXml,
        'count'   => count($items),
        'updated' => $payload['updated'],
        'files'   => [
            'news-cache.json'         => $okJson,
            'autism-news.json'        => $okStatic,
            'actualites-autisme.xml'  => $okXml,
        ],
    ];
}

function pas_rss_cron_key(): ?string
{
    $configFile = __DIR__ . '/rss-config.php';
    if (is_file($configFile)) {
        $config = include $configFile;
        if (is_array($config) && !empty($config['cron_key'])) {
            return (string) $config['cron_key'];
        }
    }
    return null;
}
