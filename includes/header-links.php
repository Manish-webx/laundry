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

  <meta name="google-site-verification" content="4nHIV-A54XPi3DaYABW2PRHcJ_TmaNGvgq4ir1VE1PY" />

  <!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-JVK5H6YVDN"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-JVK5H6YVDN');
</script>
