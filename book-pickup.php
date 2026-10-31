<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Book a Doorstep Pickup | Laundry Today</title>
  <meta name="description" content="Schedule a free doorstep laundry pickup online. Choose your service, select a convenient date/time slot, and track your order.">
  <meta name="author" content="Laundry Today">
  <link rel="canonical" href="https://www.laundrytoday.in/book-pickup">
  <meta property="og:type" content="website">
  <meta property="og:title" content="Book a Doorstep Pickup | Laundry Today">
  <meta property="og:description" content="Schedule a free doorstep laundry pickup online. Choose your service, select a convenient date/time slot, and track your order.">
  <meta property="og:url" content="https://www.laundrytoday.in/book-pickup">
  <?php $base = ''; include __DIR__ . '/includes/header-links.php'; ?>
</head>
<body>
<div class="min-vh-100 bg-white d-flex flex-column justify-content-between">

<?php $activeNav = ''; include __DIR__ . '/includes/header.php'; ?>

<main class="flex-grow-1">
<div class="pt-24 pt-sm-28 page-shell overflow-hidden">
  <section class="page-hero page-gradient position-relative py-20 text-white">
  <div class="position-absolute inset-0 page-hero-overlay"></div>
  <div class="position-relative mw-5xl mx-auto px-4 px-sm-6 text-center z-10">
    <div class="reveal">
      <span class="hero-badge d-inline-flex align-items-center rounded-full bg-white bg-opacity-15 px-4 py-1-5 fw-extrabold tracking-02 text-uppercase backdrop-blur-md">Scheduling</span>
    </div>
    <h1 class="mt-5 fs-4xl fs-sm-5xl fs-lg-6xl fw-black tracking-tight leading-tight">Book Doorstep Pickup</h1>
    <p class="mt-6 fs-lg text-white text-opacity-80 mw-2xl mx-auto leading-relaxed">Choose your service type and convenient timeslot below. Our rider will arrive with digital weight scales and separate laundry collection bags.</p>
  </div>
</section>

  <!-- Booking form & live summary -->
  <section class="py-20 py-sm-28 bg-white">
    <div class="container-7xl">
      <div class="row gx-12 gy-12 align-items-start">

        <!-- Form -->
        <div class="col-12 col-lg-7">
          <div class="reveal" style="--reveal-x:-30px">
            <div class="glass-card rounded-32 bg-secondary p-8 border-primary-5 shadow-soft">
              <h3 class="fs-2xl fw-black text-primary-deep">Order Details</h3>
              <p class="mt-2 fs-sm text-muted-foreground">Please fill in your coordinates and schedule preference.</p>

              <form id="pickup-form" class="mt-8 d-flex flex-column gap-6">
                <div class="d-flex flex-column gap-1-5">
                  <label for="name" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-user icon-4 text-primary" aria-hidden="true"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg> Customer Name *</label>
                  <input id="name" name="name" type="text" required class="pg-field" placeholder="e.g. Aravind Swamy">
                </div>

                <div class="row g-6 row-cols-1 row-cols-sm-2">
                  <div class="col d-flex flex-column gap-1-5">
                    <label for="phone" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone icon-4 text-primary" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg> Phone / WhatsApp *</label>
                    <input id="phone" name="phone" type="tel" required class="pg-field" placeholder="e.g. 9876543210">
                  </div>
                  <div class="col d-flex flex-column gap-1-5">
                    <label for="email" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-mail icon-4 text-primary" aria-hidden="true"><path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7"/><rect x="2" y="4" width="20" height="16" rx="2"/></svg> Email Address</label>
                    <input id="email" name="email" type="email" class="pg-field" placeholder="e.g. aravind@outlook.com">
                  </div>
                </div>

                <div class="d-flex flex-column gap-1-5">
                  <label for="address" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin icon-4 text-primary" aria-hidden="true"><path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"/><circle cx="12" cy="10" r="3"/></svg> Pickup &amp; Delivery Address *</label>
                  <textarea id="address" name="address" required rows="3" class="pg-field" placeholder="Flat no, Building name, Sector, Landmark, Navi Mumbai..."></textarea>
                </div>

                <div class="d-flex flex-column gap-1-5">
                  <label for="service" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard-list icon-4 text-primary" aria-hidden="true"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/><path d="M12 11h4"/><path d="M12 16h4"/><path d="M8 11h.01"/><path d="M8 16h.01"/></svg> Service Required</label>
                  <select id="service" name="service" class="pg-field">
                                          <option>Wash &amp; Fold</option>
                                          <option>Wash &amp; Iron</option>
                                          <option>Dry Cleaning</option>
                                          <option>Steam Ironing</option>
                                          <option>Shoe Cleaning</option>
                                          <option>Curtain Cleaning</option>
                                          <option>Carpet Cleaning</option>
                                          <option>Blanket Cleaning</option>
                                          <option>Sofa Cleaning</option>
                                          <option>Commercial Laundry</option>
                                          <option>Express Laundry</option>
                                      </select>
                </div>

                <div class="row g-6 row-cols-1 row-cols-sm-2">
                  <div class="col d-flex flex-column gap-1-5">
                    <label for="date" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar icon-4 text-primary" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg> Select Pickup Date *</label>
                    <input id="date" name="date" type="date" required class="pg-field">
                  </div>
                  <div class="col d-flex flex-column gap-1-5">
                    <label for="time" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clock icon-4 text-primary" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> Select Timeslot</label>
                    <select id="time" name="time" class="pg-field">
                                              <option>09:00 AM - 11:00 AM</option>
                                              <option>11:00 AM - 01:00 PM</option>
                                              <option>01:00 PM - 03:00 PM</option>
                                              <option>03:00 PM - 05:00 PM</option>
                                              <option>05:00 PM - 07:00 PM</option>
                                              <option>07:00 PM - 09:00 PM</option>
                                          </select>
                  </div>
                </div>

                <div class="d-flex flex-column gap-1-5">
                  <label for="notes" class="pg-label d-flex align-items-center gap-1-5"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-file-text icon-4 text-primary" aria-hidden="true"><path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z"/><path d="M14 2v5a1 1 0 0 0 1 1h5"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/></svg> Special Handling Instructions</label>
                  <textarea id="notes" name="notes" rows="3" class="pg-field" placeholder="e.g. Separate red shirt, hang shirts, dry clean curtain hooks..."></textarea>
                </div>

                <div class="pt-4">
                  <button type="submit" class="pg-submit accent-gradient d-flex align-items-center justify-content-center gap-2">
                    <span>Confirm and Dispatch Rider</span>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check-circle-2 icon-4-5" aria-hidden="true"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        <!-- Live summary -->
        <div class="col-12 col-lg-5 sticky-lg-96">
          <div class="reveal" style="--reveal-delay:0.15s;--reveal-x:30px">
            <div class="glass-card summary-card">
              <div class="summary-circle"></div>

              <h3 class="fs-xl fw-black tracking-tight border-bottom border-white-10 pb-4">Booking Summary</h3>

              <div class="mt-6 d-flex flex-column gap-5">
                <div>
                  <div class="fs-10px fw-black text-uppercase tracking-widest text-white text-opacity-50">Client Name</div>
                  <div class="fs-sm fw-bold mt-1 text-white text-opacity-90" data-summary="name">Not entered</div>
                </div>
                <div>
                  <div class="fs-10px fw-black text-uppercase tracking-widest text-white text-opacity-50">WhatsApp Number</div>
                  <div class="fs-sm fw-bold mt-1 text-white text-opacity-90" data-summary="phone">Not entered</div>
                </div>
                <div>
                  <div class="fs-10px fw-black text-uppercase tracking-widest text-white text-opacity-50">Service Selected</div>
                  <div class="fs-sm fw-bold mt-1 text-accent" data-summary="service">Wash &amp; Fold</div>
                </div>
                <div>
                  <div class="fs-10px fw-black text-uppercase tracking-widest text-white text-opacity-50">Scheduled Date &amp; Time</div>
                  <div class="fs-sm fw-bold mt-1 text-white text-opacity-90 d-flex align-items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar icon-4 flex-shrink-0 text-white text-opacity-70" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>                    <span data-summary="date">Date not selected</span>
                    <span class="text-white text-opacity-40" data-summary-when-date hidden>|</span>
                    <span data-summary="time" data-summary-when-date hidden>09:00 AM - 11:00 AM</span>
                  </div>
                </div>
                <div>
                  <div class="fs-10px fw-black text-uppercase tracking-widest text-white text-opacity-50">Delivery Address</div>
                  <div class="fs-xs leading-relaxed mt-1 text-white text-opacity-70 line-clamp-3" data-summary="address">Address details not specified</div>
                </div>
              </div>

              <div class="mt-8 pt-6 border-top border-white-10 fs-10px leading-relaxed text-white text-opacity-40 fw-semibold">
                <span class="text-accent">Please Note: </span>
                Estimated weights and final laundry items are verified at our main processing center. No transport charge is added for bills exceeding ₹399.
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</div>
</main>

<?php include __DIR__ . '/includes/footer.php'; ?>

</div>

<?php $pageJs = ['assets/js/pages.js']; include __DIR__ . '/includes/footer-links.php'; ?>
</body>
</html>
