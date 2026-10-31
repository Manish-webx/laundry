<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Thank You | Laundry Today</title>
  <meta name="description" content="Thank you for contacting Laundry Today. Our team will get back to you shortly.">
  <meta name="author" content="Laundry Today">
  <meta name="robots" content="noindex, nofollow">
  <?php $base = '/'; include __DIR__ . '/includes/header-links.php'; ?>
</head>
<body>
<div class="min-vh-100 bg-white d-flex flex-column justify-content-between">

<?php $activeNav = ''; include __DIR__ . '/includes/header.php'; ?>

<main class="flex-grow-1">
<div class="d-flex min-vh-100 align-items-center justify-content-center bg-white px-4">
  <div class="mw-md text-center">
    <h1 class="fs-5xl fw-bold text-foreground">Thank You!</h1>
    <h2 class="mt-4 fs-xl fw-semibold text-foreground">Your request has been received</h2>
    <p class="mt-2 fs-sm text-muted-foreground">Our team will contact you shortly to confirm your pickup. For anything urgent, call or WhatsApp us at <a href="tel:+917702608040" class="text-primary">+91 7702608040</a>.</p>
    <div class="mt-6">
      <a href="/" class="d-inline-flex align-items-center justify-content-center rounded-md bg-primary px-4 py-2 fs-sm fw-medium text-white transition-colors">Back to home</a>
    </div>
  </div>
</div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

</div>

<?php $pageJs = []; include __DIR__ . '/includes/footer-links.php'; ?>
</body>
</html>
