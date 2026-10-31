<?php
// Scripts loaded at the end of every page. Before including, set:
//   $base   '' for pages in the site root, '../' for pages in services/ and blog/
//   $pageJs this page's own scripts, relative to the site root, e.g. ['assets/js/pages.js']
$base = $base ?? '';
$pageJs = $pageJs ?? [];
?>
<script>window.LT = { whatsapp: "917702608040" };</script>
<script src="<?= $base ?>assets/js/vendor/bootstrap.bundle.min.js"></script>
<script src="<?= $base ?>assets/js/vendor/lenis.min.js"></script>
<script src="<?= $base ?>assets/js/main.js?v=<?= filemtime(__DIR__ . '/../assets/js/main.js') ?>"></script>
<?php foreach ($pageJs as $js): ?>
<script src="<?= $base . $js ?>"></script>
<?php endforeach; ?>
