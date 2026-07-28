<?php
/**
 * API JSON — actualités autisme (cache 1 h)
 */
require_once __DIR__ . '/rss-lib.php';

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: *');
header('Cache-Control: public, max-age=300');

$baseDir   = dirname(__DIR__);
$cacheFile = $baseDir . '/data/news-cache.json';
$cacheTtl  = 3600;
$force     = isset($_GET['refresh']) && $_GET['refresh'] === '1';

if ($force) {
    $key = pas_rss_cron_key();
    if ($key === null || !isset($_GET['key']) || !hash_equals($key, (string) $_GET['key'])) {
        http_response_code(403);
        echo json_encode(['error' => 'Forbidden']);
        exit;
    }
    $result = pas_rss_refresh_all($baseDir);
    echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

if (file_exists($cacheFile) && (time() - filemtime($cacheFile)) < $cacheTtl) {
    readfile($cacheFile);
    exit;
}

$result = pas_rss_refresh_all($baseDir);
if (!$result['success']) {
    http_response_code(500);
    echo json_encode(['error' => 'Refresh failed', 'items' => []]);
    exit;
}

readfile($cacheFile);
