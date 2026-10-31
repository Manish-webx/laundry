<?php
// Site footer, floating contact buttons and the booking popup. Set $base before including:
// '' for pages in the site root, '../' for pages in services/ and blog/.
$base = $base ?? '';
?>
<footer class="site-footer border-top bg-white pt-16 pb-28 pb-lg-16">
  <div class="container-7xl">
    <div class="row g-10 row-cols-1 row-cols-lg-4">
      <div>
        <div class="d-flex align-items-center gap-2">
          <img src="<?= $base ?>logo1.jpeg" alt="Laundry Today" loading="lazy" class="footer-logo rounded-full object-contain">
          <span class="fs-xl fw-extrabold text-primary-deep tracking-tight">Laundry Today</span>
        </div>
        <p class="mt-4 mw-xs fs-sm leading-relaxed text-muted-foreground">
          Technology-enabled laundry and dry cleaning with free pickup and delivery, seven days a
          week.
        </p>
        <div class="mt-5 d-flex flex-wrap gap-2">
          <a href="https://wa.me/917702608040" target="_blank" rel="noreferrer" aria-label="WhatsApp" class="social-btn social-whatsapp"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-message-circle icon-4-5" aria-hidden="true"><path d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"/></svg></a>
          <a href="tel:+917702608040" aria-label="Call Us" class="social-btn social-phone"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone icon-4-5" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg></a>
          <a href="https://www.facebook.com/share/1HuCdWeTwt/" target="_blank" rel="noreferrer" aria-label="Facebook" class="social-btn social-facebook"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-facebook icon-4-5" aria-hidden="true"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg></a>
          <a href="https://www.instagram.com/laundrytoday01?igsh=aWtlN3R2YjZxbDh1" target="_blank" rel="noreferrer" aria-label="Instagram" class="social-btn social-instagram"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-instagram icon-4-5" aria-hidden="true"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg></a>
        </div>
      </div>

      <div>
        <h3 class="footer-heading">Quick Links</h3>
        <ul class="mt-4 footer-list">
          <li><a href="<?= $base ?>index.php">Home</a></li>
          <li><a href="<?= $base ?>about.php">About Us</a></li>
          <li><a href="<?= $base ?>services.php">Services</a></li>
          <li><a href="<?= $base ?>pricing.php">Pricing</a></li>
          <li><a href="<?= $base ?>areas-we-serve.php">Areas We Serve</a></li>
          <li><a href="<?= $base ?>faq.php">FAQ</a></li>
          <li><a href="<?= $base ?>contact.php">Contact</a></li>
        </ul>

        <h3 class="mt-8 footer-heading">Service Areas</h3>
        <p class="mt-3 fs-xs text-muted-foreground leading-relaxed">
          Serving Kharghar, Vashi, Nerul, Belapur, Seawoods, Airoli, and all major areas across Navi Mumbai.
        </p>
        <a href="<?= $base ?>areas-we-serve.php" class="mt-2 d-inline-block fs-xs fw-bold text-primary footer-coverage-link">View Full Coverage List &rarr;</a>
      </div>

      <div>
        <h3 class="footer-heading">Services</h3>
        <ul class="mt-4 footer-list">
          <li><a href="<?= $base ?>services/wash-fold.php">Wash &amp; Fold</a></li>
          <li><a href="<?= $base ?>services/wash-iron.php">Wash &amp; Iron</a></li>
          <li><a href="<?= $base ?>services/dry-cleaning.php">Dry Cleaning</a></li>
          <li><a href="<?= $base ?>services/steam-ironing.php">Steam Ironing</a></li>
          <li><a href="<?= $base ?>services/shoe-cleaning.php">Shoe Cleaning</a></li>
          <li><a href="<?= $base ?>commercial.php">Commercial Laundry</a></li>
        </ul>
      </div>

      <div>
        <h3 class="footer-heading">Newsletter</h3>
        <p class="mt-4 fs-sm text-muted-foreground">Offers, care tips and service updates. No spam.</p>
        <form class="mt-4 d-flex gap-2" action="<?= $base ?>mail1.php" method="POST" data-newsletter>
          <input type="hidden" name="form_type" value="Newsletter">
          <input type="email" name="email" required aria-label="Email address" placeholder="you@email.com" class="newsletter-input min-w-0 flex-1">
          <button type="submit" class="accent-gradient flex-shrink-0 rounded-full px-5 py-3 fs-sm fw-bold text-white">Join</button>
        </form>
        <p class="mt-4 fs-sm text-muted-foreground">
          <a href="mailto:LAUNDRYTODAY01@gmail.com" class="hover-text-primary transition-colors">LAUNDRYTODAY01@gmail.com</a>
          <br>
          <a href="tel:+917702608040" class="hover-text-primary transition-colors">+91 7702608040</a>
        </p>
      </div>
    </div>

    <div class="mt-12 d-flex flex-column gap-2 border-top pt-6 fs-xs text-muted-foreground flex-sm-row align-items-sm-center justify-content-sm-between">
      <p>&copy; <?= date('Y') ?> Laundry Today. All rights reserved.</p>
      <p>Fresh clothes, delivered to your door.</p>
    </div>
  </div>
</footer>

<!-- Mobile floating action bar -->
<div class="floating-bar d-lg-none pb-safe">
  <div class="d-flex justify-content-end pe-1">
    <button type="button" class="fb-btn fb-btn-lg animate-bounce" style="animation-duration:3s" data-booking>
      <span>Book now</span>
    </button>
  </div>
  <div class="d-flex justify-content-start align-items-center gap-2 ps-1">
    <a href="tel:+917702608040" class="fb-btn animate-bounce" style="animation-duration:3s;animation-delay:.2s"><span>Call</span></a>
    <a href="https://wa.me/917702608040" class="fb-btn animate-bounce" style="animation-duration:3s;animation-delay:.4s"><span>WhatsApp</span></a>
    <a href="<?= $base ?>pricing.php" class="fb-btn animate-bounce" style="animation-duration:3s;animation-delay:.6s"><span class="whitespace-nowrap">Price list</span></a>
  </div>
</div>

<!-- Desktop "Book Now" button -->
<button type="button" class="booking-fab d-none d-lg-flex floaty" aria-label="Book Now" data-booking>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar icon-4-5 animate-pulse" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>  <span class="tracking-widest text-uppercase">Book Now</span>
</button>

<!-- Left quick contact -->
<div class="left-quick-contact">
  <a href="https://wa.me/917702608040" target="_blank" rel="noopener noreferrer" class="lift quick-btn quick-btn-whatsapp" title="Chat on WhatsApp" aria-label="Chat on WhatsApp">
    <img src="<?= $base ?>whatsapp.png" alt="WhatsApp">
  </a>
  <a href="tel:07702608040" class="lift quick-btn brand-gradient text-white" title="Call Support" aria-label="Call Support">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-phone icon-5-5" aria-hidden="true"><path d="M13.832 16.568a1 1 0 0 0 1.213-.303l.355-.465A2 2 0 0 1 17 15h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2A18 18 0 0 1 2 4a2 2 0 0 1 2-2h3a2 2 0 0 1 2 2v3a2 2 0 0 1-.8 1.6l-.468.351a1 1 0 0 0-.292 1.233 14 14 0 0 0 6.392 6.384"/></svg>  </a>
</div>

<!-- Booking popup -->
<div class="modal fade booking-modal" id="bookingModal" tabindex="-1" aria-labelledby="bookingTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered">
    <div class="modal-content booking-card">
      <button type="button" class="booking-close" data-bs-dismiss="modal" aria-label="Close modal"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-x icon-4-5" aria-hidden="true"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg></button>

      <div class="text-center text-sm-start">
        <span class="accent-gradient d-inline-flex box-12 align-items-center justify-content-center rounded-2xl text-white shadow-soft mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar icon-6" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg>        </span>
        <h3 id="bookingTitle" class="fs-2xl fw-extrabold text-primary-deep leading-tight">Book a Pickup</h3>
        <p class="mt-1-5 fs-xs text-muted-foreground">
          Please provide your details below. We'll redirect you to WhatsApp to confirm your scheduling.
        </p>
      </div>

      <div class="booking-cart mt-4 d-none" data-booking-cart>
        <div class="fs-9px fw-bold text-muted-foreground text-uppercase tracking-wider mb-2">Order Review</div>
        <div class="d-flex flex-column gap-2" data-booking-cart-list></div>
      </div>

      <form class="mt-6 d-flex flex-column gap-4" action="<?= $base ?>mail1.php" method="POST" data-booking-form novalidate>
        <input type="hidden" name="form_type" value="Booking Popup">
        <input type="hidden" name="order_items" value="">
        <input class="lt-field" name="name" placeholder="Your Name" aria-label="Your Name" required>
        <input class="lt-field" name="phone" type="tel" placeholder="Your Number" aria-label="Your Number" required>

        <div class="position-relative d-flex align-items-center">
          <select class="lt-field" name="service" aria-label="Select a Service">
            <option value="Select a Service">Select a Service</option>
            <option value="Wash &amp; Fold">Wash &amp; Fold</option>
            <option value="Wash &amp; Iron">Wash &amp; Iron</option>
            <option value="Dry Cleaning">Dry Cleaning</option>
            <option value="Steam Ironing">Steam Ironing</option>
            <option value="Shoe Cleaning">Shoe Cleaning</option>
            <option value="Curtain Cleaning">Curtain Cleaning</option>
            <option value="Carpet Cleaning">Carpet Cleaning</option>
            <option value="Blanket Cleaning">Blanket Cleaning</option>
            <option value="Sofa Cleaning">Sofa Cleaning</option>
            <option value="Commercial Laundry">Commercial Laundry</option>
            <option value="Express Laundry">Express Laundry</option>
          </select>
          <span class="select-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down icon-4-5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
        </div>

        <div class="position-relative d-flex align-items-center">
          <span class="field-icon"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-calendar icon-4-5" aria-hidden="true"><path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/></svg></span>
          <input class="lt-field lt-field-icon cursor-pointer" name="date" type="text" placeholder="Choose Pickup Date" aria-label="Choose Pickup Date" data-date-input>
        </div>

        <div class="position-relative d-flex align-items-center">
          <select class="lt-field" name="time" aria-label="Select a Time Slot">
            <option value="Select a Time Slot">Select a Time Slot</option>
            <option value="09:00 AM - 11:00 AM">09:00 AM - 11:00 AM</option>
            <option value="11:00 AM - 01:00 PM">11:00 AM - 01:00 PM</option>
            <option value="01:00 PM - 03:00 PM">01:00 PM - 03:00 PM</option>
            <option value="03:00 PM - 05:00 PM">03:00 PM - 05:00 PM</option>
            <option value="05:00 PM - 07:00 PM">05:00 PM - 07:00 PM</option>
            <option value="07:00 PM - 09:00 PM">07:00 PM - 09:00 PM</option>
          </select>
          <span class="select-chevron"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-chevron-down icon-4-5" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg></span>
        </div>

        <textarea class="lt-field" name="address" rows="2" placeholder="Address with Landmark" aria-label="Address with Landmark" required></textarea>
        <textarea class="lt-field" name="notes" rows="3" placeholder="Please share what all items you have for a laundry...?" aria-label="Share laundry items"></textarea>

        <p class="fs-xs fw-bold text-danger d-none" data-booking-error></p>

        <button type="submit" class="booking-submit">Book Laundry Now!</button>
      </form>
    </div>
  </div>
</div>
