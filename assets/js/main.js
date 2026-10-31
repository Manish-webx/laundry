/* Laundry Today — shared site behaviour (no framework, uses Bootstrap 5 JS). */
(function () {
  "use strict";

  var LT = (window.LT = window.LT || {});

  // ---------------------------------------------------------------- smooth scroll (Lenis)
  if (window.Lenis && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    var lenis = new window.Lenis({ duration: 1.1, smoothWheel: true });
    var raf = function (time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };
    requestAnimationFrame(raf);
    LT.lenis = lenis;
  }

  // ---------------------------------------------------------------- header shadow on scroll
  var header = document.getElementById("site-header");
  if (header) {
    var onScroll = function () {
      header.classList.toggle("is-scrolled", window.scrollY > 16);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // ---------------------------------------------------------------- scroll reveal + counters
  var revealObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              entry.target.classList.add("is-visible");
              revealObserver.unobserve(entry.target);
            });
          },
          { rootMargin: "0px 0px -80px 0px" },
        )
      : null;

  LT.observeReveal = function (root) {
    (root || document).querySelectorAll(".reveal:not(.is-visible), .reveal-scale:not(.is-visible)").forEach(function (el) {
      if (revealObserver) revealObserver.observe(el);
      else el.classList.add("is-visible");
    });
  };
  LT.observeReveal();

  var counterObserver =
    "IntersectionObserver" in window
      ? new IntersectionObserver(
          function (entries) {
            entries.forEach(function (entry) {
              if (!entry.isIntersecting) return;
              counterObserver.unobserve(entry.target);
              runCounter(entry.target);
            });
          },
          { rootMargin: "0px 0px -60px 0px" },
        )
      : null;

  function runCounter(el) {
    var to = parseInt(el.getAttribute("data-counter"), 10) || 0;
    var suffix = el.getAttribute("data-suffix") || "";
    var frame = 0;
    var total = 60;
    var id = setInterval(function () {
      frame += 1;
      var progress = 1 - Math.pow(1 - frame / total, 3);
      el.textContent = Math.round(to * progress).toLocaleString() + suffix;
      if (frame >= total) clearInterval(id);
    }, 16);
  }

  document.querySelectorAll("[data-counter]").forEach(function (el) {
    if (counterObserver) counterObserver.observe(el);
    else runCounter(el);
  });

  // ---------------------------------------------------------------- FAQ accordions
  // Markup: <div data-faq-group> <div class="faq-item"> <button class="faq-toggle"> … <div class="faq-panel">
  document.addEventListener("click", function (e) {
    var toggle = e.target.closest(".faq-toggle");
    if (!toggle) return;
    var item = toggle.closest(".faq-item");
    var group = item.closest("[data-faq-group]");
    var willOpen = !item.classList.contains("is-open");
    if (group) {
      group.querySelectorAll(".faq-item.is-open").forEach(function (other) {
        other.classList.remove("is-open");
        var b = other.querySelector(".faq-toggle");
        if (b) b.setAttribute("aria-expanded", "false");
      });
    }
    item.classList.toggle("is-open", willOpen);
    toggle.setAttribute("aria-expanded", willOpen ? "true" : "false");
  });

  // ---------------------------------------------------------------- WhatsApp helper
  LT.sendWhatsApp = function (message) {
    window.open("https://wa.me/" + LT.whatsapp + "?text=" + encodeURIComponent(message), "_blank");
  };

  // Date inputs that show a placeholder until focused (like the original forms).
  document.addEventListener("focusin", function (e) {
    if (e.target.matches("[data-date-input]")) e.target.type = "date";
  });
  document.addEventListener("focusout", function (e) {
    if (e.target.matches("[data-date-input]") && !e.target.value) e.target.type = "text";
  });

  // ---------------------------------------------------------------- booking popup
  var modalEl = document.getElementById("bookingModal");
  var modal = modalEl && window.bootstrap ? window.bootstrap.Modal.getOrCreateInstance(modalEl) : null;
  var bookingForm = modalEl && modalEl.querySelector("[data-booking-form]");
  var bookingCart = [];

  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /** Open the booking popup, optionally pre-selecting a service or carrying a cart from the pricing menu. */
  LT.openBooking = function (serviceName, cartItems) {
    if (!modal || !bookingForm) return;
    bookingCart = cartItems || [];
    bookingForm.reset();
    var dateInput = bookingForm.querySelector("[data-date-input]");
    if (dateInput) dateInput.type = "text";
    setBookingError("");

    var select = bookingForm.elements.service;
    var match = "Select a Service";
    if (serviceName) {
      var lower = serviceName.toLowerCase();
      Array.prototype.forEach.call(select.options, function (opt) {
        var v = opt.value.toLowerCase();
        if (match === "Select a Service" && opt.index > 0 && (v === lower || lower.indexOf(v) !== -1)) match = opt.value;
      });
    }
    select.value = match;

    modalEl.querySelector("#bookingTitle").textContent = bookingCart.length ? "Book Selected Order" : "Book a Pickup";
    var cartBox = modalEl.querySelector("[data-booking-cart]");
    var list = modalEl.querySelector("[data-booking-cart-list]");
    cartBox.classList.toggle("d-none", !bookingCart.length);
    list.innerHTML = bookingCart
      .map(function (item) {
        return (
          '<div class="d-flex justify-content-between align-items-center fs-xs">' +
          '<span class="fw-semibold text-primary-deep text-truncate pe-4">' + escapeHtml(item.name) +
          ' <span class="text-accent fw-extrabold ms-1">x' + item.quantity + "</span></span>" +
          '<span class="fw-extrabold text-foreground flex-shrink-0">' + escapeHtml(item.price) + "</span></div>"
        );
      })
      .join("");
    modal.show();
  };
  window.openBooking = LT.openBooking;

  function setBookingError(msg) {
    var el = modalEl && modalEl.querySelector("[data-booking-error]");
    if (!el) return;
    el.textContent = msg;
    el.classList.toggle("d-none", !msg);
  }

  document.addEventListener("click", function (e) {
    var trigger = e.target.closest("[data-booking]");
    if (!trigger) return;
    e.preventDefault();
    e.stopPropagation();
    LT.openBooking(trigger.getAttribute("data-booking-service") || "");
  });

  if (bookingForm) {
    bookingForm.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = bookingForm.elements;
      var name = f.name.value.trim();
      var phone = f.phone.value.trim();
      var service = f.service.value;
      var date = f.date.value;
      var time = f.time.value;
      var address = f.address.value.trim();
      var notes = f.notes.value.trim();

      if (!name) return setBookingError("Please enter your name");
      if (!phone) return setBookingError("Please enter your phone number");
      if (!service || service === "Select a Service") return setBookingError("Please select a service");
      if (!date) return setBookingError("Please choose a pickup date");
      if (!time || time === "Select a Time Slot") return setBookingError("Please select a time slot");
      if (!address) return setBookingError("Please enter your address with landmark");
      setBookingError("");

      var message = "Hi Laundry Today, I would like to book a pickup!\n\n";
      if (bookingCart.length) {
        message += "📦 ORDERED ITEMS:\n";
        var totalEst = 0;
        var hasVariable = false;
        bookingCart.forEach(function (item) {
          message += "- " + item.name + ": " + item.quantity + " x " + item.price;
          var parsed = parseInt(item.price.replace(/[^0-9]/g, ""), 10);
          if (!isNaN(parsed)) {
            if (item.price.indexOf("/kg") !== -1 || item.price.indexOf("sq.ft") !== -1) {
              hasVariable = true;
              message += " (variable)\n";
            } else {
              var line = parsed * item.quantity;
              totalEst += line;
              message += " = ₹" + line + "\n";
            }
          } else {
            message += "\n";
          }
        });
        message += "\nEstimated Total: ₹" + totalEst + (hasVariable ? " (+ Variable rates)" : "") + "\n\n";
      }
      message += "👤 Name: " + name + "\n";
      message += "📞 Number: " + phone + "\n";
      message += "🧺 Service: " + service + "\n";
      message += "🏠 Address: " + address + "\n";
      message += "📅 Date: " + date + "\n";
      message += "⏰ Time: " + time + "\n";
      message += "📝 Items: " + (notes || "None") + "\n";

      // Pass the pricing-menu cart (if any) to mail1.php as plain text.
      if (f.order_items) {
        f.order_items.value = bookingCart
          .map(function (item) { return item.name + " x" + item.quantity + " (" + item.price + ")"; })
          .join(", ");
      }

      LT.sendWhatsApp(message);
      modal.hide();
      bookingForm.submit(); // also email the lead via mail1.php
    });
  }

  // Pause Lenis while a Bootstrap modal/offcanvas is open so the dialog scrolls normally.
  ["show.bs.modal", "show.bs.offcanvas"].forEach(function (evt) {
    document.addEventListener(evt, function () {
      if (LT.lenis) LT.lenis.stop();
    });
  });
  ["hidden.bs.modal", "hidden.bs.offcanvas"].forEach(function (evt) {
    document.addEventListener(evt, function () {
      if (LT.lenis) LT.lenis.start();
    });
  });

  // Footer newsletter posts straight to mail1.php (action is set in includes/footer.php).
})();
