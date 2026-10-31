<?php
// Site header (announcement bar, logo, desktop + mobile navigation). Before including, set:
//   $base      '' for pages in the site root, '../' for pages in services/ and blog/
//   $activeNav the highlighted menu item, e.g. 'about.php' ('' for none)
$base = $base ?? '';
$activeNav = $activeNav ?? '';

$navLinks = [
    'index.php' => 'Home',
    'about.php' => 'About',
    'services.php' => 'Services',
    'pricing.php' => 'Pricing',
    'areas-we-serve.php' => 'Areas We Serve',
    'commercial.php' => 'Commercial',
    'blog.php' => 'Blog',
    'faq.php' => 'FAQ',
    'contact.php' => 'Contact',
];

$serviceLinks = [
    'services/wash-fold.php' => 'Wash &amp; Fold',
    'services/wash-iron.php' => 'Wash &amp; Iron',
    'services/dry-cleaning.php' => 'Dry Cleaning',
    'services/steam-ironing.php' => 'Steam Ironing',
    'services/shoe-cleaning.php' => 'Shoe Cleaning',
    'services/curtain-cleaning.php' => 'Curtain Cleaning',
    'services/carpet-cleaning.php' => 'Carpet Cleaning',
    'services/blanket-cleaning.php' => 'Blanket Cleaning',
    'services/sofa-cleaning.php' => 'Sofa Cleaning',
    'services/commercial-laundry.php' => 'Commercial Laundry',
    'services/express-laundry.php' => 'Express Laundry',
];

$activeClass = fn(string $href): string => $href === $activeNav ? ' is-active' : '';
?>
<header id="site-header" class="site-header">
  <div class="announce-bar">
    <span class="announce-title">Looking for the best laundry in Navi Mumbai?</span>
    <strong class="announce-welcome">WELCOME TO LAUNDRY TODAY</strong>
  </div>

  <div class="container-7xl d-flex align-items-center gap-4 py-3">
    <a href="<?= $base ?>index.php" class="d-flex min-w-0 flex-shrink-0 align-items-center gap-2">
      <img src="<?= $base ?>logo1.jpeg" alt="Laundry Today" class="site-logo rounded-full object-contain">
      <span class="site-brand">Laundry Today</span>
    </a>

    <nav class="ms-auto d-none d-lg-flex align-items-center desktop-nav" aria-label="Main">
<?php foreach ($navLinks as $href => $label): ?>
<?php if ($href === 'services.php'): ?>
      <div class="nav-dropdown position-relative py-2">
        <a href="<?= $base ?>services.php" class="nav-pill d-inline-flex align-items-center gap-1-5<?= $activeClass($href) ?>">
          <span>Services</span>
          <span class="nav-caret"></span>
        </a>
        <div class="nav-dropdown-menu">
<?php foreach ($serviceLinks as $svcHref => $svcLabel): ?>
          <a href="<?= $base . $svcHref ?>"><?= $svcLabel ?></a>
<?php endforeach; ?>
        </div>
      </div>
<?php else: ?>
      <a href="<?= $base . $href ?>" class="nav-pill<?= $activeClass($href) ?>"><?= $label ?></a>
<?php endif; ?>
<?php endforeach; ?>
    </nav>

    <button type="button" class="accent-gradient ms-auto ms-lg-2 d-none d-lg-inline-flex flex-shrink-0 rounded-full px-5 py-2-5 fs-xs fw-bold text-white shadow-soft transition-transform hover-up" data-booking>
      Book Pickup
    </button>

    <button type="button" class="menu-toggle ms-auto d-lg-none collapsed" data-bs-toggle="collapse" data-bs-target="#mobileMenu" aria-controls="mobileMenu" aria-expanded="false" aria-label="Toggle menu">
      <span class="icon-open"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-menu icon-5" aria-hidden="true"><path d="M4 5h16"/><path d="M4 12h16"/><path d="M4 19h16"/></svg></span>
      <span class="icon-close"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x icon-5" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></span>
    </button>
  </div>

  <div id="mobileMenu" class="collapse d-lg-none mobile-menu">
    <nav class="d-flex flex-column gap-1 px-4 py-4" aria-label="Mobile">
<?php foreach ($navLinks as $href => $label): ?>
      <a href="<?= $base . $href ?>" class="mobile-link<?= $activeClass($href) ?>"><?= $label ?></a>
<?php endforeach; ?>
      <div class="mt-2 ps-4 pb-4">
        <button type="button" class="mobile-book-btn" data-bs-toggle="collapse" data-bs-target="#mobileMenu" data-booking>Book now</button>
      </div>
    </nav>
  </div>
</header>
