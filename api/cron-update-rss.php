<?php
/**
 * Cron OVH — rafraîchissement automatique du flux RSS
 *
 * Planifier sur OVH (toutes les 6 h) :
 *   curl -s "https://www.plateforme-autisme-senegal.org/api/cron-update-rss.php?key=VOTRE_CLE"
 *
 * Ou tâche planifiée Windows : scripts/register-news-scheduler.ps1
 */
require_once __DIR__ . '/rss-lib.php';

header('Content-Type: application/json; charset=utf-8');

$key = pas_rss_cron_key();
if ($key === null) {
    http_response_code(503);
    echo json_encode(['error' => 'rss-config.php manquant — copiez rss-config.example.php']);
    exit;
}

if (!isset($_GET['key']) || !hash_equals($key, (string) $_GET['key'])) {
    http_response_code(403);
    echo json_encode(['error' => 'Clé cron invalide']);
    exit;
}

$result = pas_rss_refresh_all(dirname(__DIR__));
http_response_code($result['success'] ? 200 : 500);
echo json_encode($result, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
