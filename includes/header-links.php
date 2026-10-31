<?php
// Shared <head> links for every page. Set $base before including:
// '' for pages in the site root, '../' for pages in services/ and blog/.
$base = $base ?? '';
?>
<meta name="twitter:card" content="summary_large_image">
  <link rel="icon" type="image/jpeg" href="<?= $base ?>logo1.jpeg">
  <link rel="icon" type="image/x-icon" href="<?= $base ?>favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="<?= $base ?>logo1.jpeg">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap">
  <link rel="stylesheet" href="<?= $base ?>assets/css/app.css?v=<?= filemtime(__DIR__ . '/../assets/css/app.css') ?>">
