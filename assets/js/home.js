/* Laundry Today — home page behaviour: hero slider, services cover-flow, timeline line, contact form. */
(function () {
  "use strict";

  // ---------------------------------------------------------------- hero slider
  var hero = document.querySelector("[data-hero]");
  if (hero) {
    var slidesEl = hero.querySelector("[data-hero-slides]");
    var slides = slidesEl ? JSON.parse(slidesEl.textContent) : [];
    var imgs = hero.querySelectorAll("[data-hero-img]");
    var dots = hero.querySelectorAll("[data-hero-dot]");
    var text = hero.querySelector("[data-hero-text]");
    var badge = hero.querySelector("[data-hero-badge]");
    var title = hero.querySelector("[data-hero-title]");
    var subhead = hero.querySelector("[data-hero-subhead]");
    var card = hero.querySelector("[data-hero-card]");
    var media = hero.querySelector("[data-hero-media]");
    var active = 0;
    var textTimer = null;
    var imgTimers = [];

    var renderText = function (i) {
      var s = slides[i];
      badge.textContent = s.badge;
      title.innerHTML = "";
      s.headline.forEach(function (line) {
        var span = document.createElement("span");
        span.className = "d-block";
        span.textContent = line;
        title.appendChild(span);
      });
      subhead.textContent = s.subhead;
    };

    var goTo = function (next) {
      if (next === active || !slides[next]) return;
      var prev = active;
      active = next;

      // Image: old one fades out (1.2s), then the new one zooms in (AnimatePresence mode="wait").
      var oldImg = imgs[prev];
      oldImg.classList.remove("is-active", "is-first");
      oldImg.classList.add("is-leaving");
      clearTimeout(imgTimers[prev]);
      imgTimers[prev] = setTimeout(function () {
        oldImg.classList.remove("is-leaving");
      }, 1200);
      clearTimeout(imgTimers[next]);
      imgs[next].classList.remove("is-leaving");
      imgs[next].classList.add("is-active");

      // Text: fade/slide out (0.5s), swap, fade/slide in (0.5s).
      clearTimeout(textTimer);
      text.classList.add("is-leaving");
      textTimer = setTimeout(function () {
        renderText(active);
        text.classList.remove("is-leaving");
        text.classList.add("is-entering");
        void text.offsetWidth;
        text.classList.remove("is-entering");
      }, 500);

      dots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === active);
      });
    };

    dots.forEach(function (d) {
      d.addEventListener("click", function () {
        goTo(parseInt(d.getAttribute("data-hero-dot"), 10));
      });
    });

    setInterval(function () {
      goTo((active + 1) % slides.length);
    }, 5000);

    // Parallax: image moves 0% -> 14% while the card scrolls out of the top of the viewport.
    var ticking = false;
    var updateParallax = function () {
      ticking = false;
      var rect = card.getBoundingClientRect();
      var p = rect.height ? Math.min(1, Math.max(0, -rect.top / rect.height)) : 0;
      media.style.setProperty("--hero-y", (p * 14).toFixed(3) + "%");
    };
    window.addEventListener(
      "scroll",
      function () {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(updateParallax);
        }
      },
      { passive: true },
    );
    window.addEventListener("resize", updateParallax);
    updateParallax();
  }

  // ---------------------------------------------------------------- services cover-flow carousel
  var carousel = document.querySelector("[data-hsvc-carousel]");
  if (carousel) {
    var cards = carousel.querySelectorAll("[data-hsvc-slide]");
    var svcDots = carousel.querySelectorAll("[data-hsvc-dot]");
    var total = cards.length;
    var activeIndex = 0;
    var autoplay = null;
    var touchStart = null;
    var touchEnd = null;

    var getDiff = function (index, act) {
      var d = index - act;
      if (d > total / 2) d -= total;
      if (d < -total / 2) d += total;
      return d;
    };

    // Same maths as getCardStyle() in the original Services.tsx.
    var getCardStyle = function (index, width) {
      var isMobile = width < 640;
      var isTablet = width >= 640 && width < 1024;
      var diff = getDiff(index, activeIndex);
      var absDiff = Math.abs(diff);
      var x = 0;
      var rotateY = 0;
      var scale = 1;
      var opacity = 1;
      var zIndex = 10 - absDiff;

      if (isMobile) {
        scale = diff === 0 ? 1 : 0.82;
        rotateY = diff === 0 ? 0 : diff > 0 ? -22 : 22;
        x = diff === 0 ? 0 : diff > 0 ? 210 : -210;
        opacity = diff === 0 ? 1 : 0.45;
        if (absDiff > 1) {
          opacity = 0;
          scale = 0.5;
        }
      } else if (isTablet) {
        scale = diff === 0 ? 1 : 0.85 - (absDiff - 1) * 0.08;
        rotateY = diff === 0 ? 0 : diff > 0 ? -28 : 28;
        x = diff === 0 ? 0 : diff > 0 ? 170 + (diff - 1) * 110 : -170 - (absDiff - 1) * 110;
        opacity = diff === 0 ? 1 : Math.max(0.3, 0.75 - (absDiff - 1) * 0.2);
        if (absDiff > 2) opacity = 0;
      } else {
        scale = diff === 0 ? 1 : 0.88 - (absDiff - 1) * 0.07;
        rotateY = diff === 0 ? 0 : diff > 0 ? -36 : 36;
        x = diff === 0 ? 0 : diff > 0 ? 230 + (diff - 1) * 135 : -230 - (absDiff - 1) * 135;
        opacity = diff === 0 ? 1 : Math.max(0.2, 0.8 - (absDiff - 1) * 0.2);
        if (absDiff > 3) opacity = 0;
      }
      return { x: x, rotateY: rotateY, scale: scale, opacity: opacity, zIndex: zIndex, isMobile: isMobile };
    };

    var render = function () {
      var width = window.innerWidth;
      cards.forEach(function (card, i) {
        var s = getCardStyle(i, width);
        card.style.width = s.isMobile ? "260px" : "290px";
        card.style.zIndex = s.zIndex;
        card.style.opacity = s.opacity;
        card.style.transform = "translateX(" + s.x + "px) scale(" + s.scale + ") rotateY(" + s.rotateY + "deg)";
        card.classList.toggle("is-active", i === activeIndex);
      });
      svcDots.forEach(function (d, i) {
        d.classList.toggle("is-active", i === activeIndex);
      });
    };

    var setActive = function (i) {
      activeIndex = ((i % total) + total) % total;
      render();
    };
    var next = function () {
      setActive(activeIndex + 1);
    };
    var prev = function () {
      setActive(activeIndex - 1);
    };

    var startAutoplay = function () {
      clearInterval(autoplay);
      autoplay = setInterval(next, 4000);
    };

    carousel.querySelectorAll("[data-hsvc-prev]").forEach(function (b) {
      b.addEventListener("click", prev);
    });
    carousel.querySelectorAll("[data-hsvc-next]").forEach(function (b) {
      b.addEventListener("click", next);
    });
    svcDots.forEach(function (d) {
      d.addEventListener("click", function () {
        setActive(parseInt(d.getAttribute("data-hsvc-dot"), 10));
      });
    });
    cards.forEach(function (card, i) {
      card.addEventListener("click", function (e) {
        if (e.target.closest("[data-booking]")) return; // "Book Now" opens the popup only
        setActive(i);
      });
    });

    // Pause autoplay while hovered.
    carousel.addEventListener("mouseenter", function () {
      clearInterval(autoplay);
    });
    carousel.addEventListener("mouseleave", startAutoplay);

    // Swipe gestures.
    carousel.addEventListener(
      "touchstart",
      function (e) {
        if (e.targetTouches && e.targetTouches[0]) touchStart = e.targetTouches[0].clientX;
      },
      { passive: true },
    );
    carousel.addEventListener(
      "touchmove",
      function (e) {
        if (e.targetTouches && e.targetTouches[0]) touchEnd = e.targetTouches[0].clientX;
      },
      { passive: true },
    );
    carousel.addEventListener("touchend", function () {
      if (!touchStart || !touchEnd) return;
      var distance = touchStart - touchEnd;
      if (distance > 50) next();
      else if (distance < -50) prev();
      touchStart = null;
      touchEnd = null;
    });

    window.addEventListener("resize", render);
    // First paint without the spring so cards don't fly in from the centre.
    carousel.classList.add("no-anim");
    render();
    void carousel.offsetWidth;
    carousel.classList.remove("no-anim");
    startAutoplay();
  }

  // ---------------------------------------------------------------- "How it works" progress line
  var line = document.querySelector("[data-how-line]");
  if (line) {
    if ("IntersectionObserver" in window) {
      var lineObserver = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            line.classList.add("is-visible");
            lineObserver.disconnect();
          });
        },
        { rootMargin: "-120px 0px -120px 0px" },
      );
      lineObserver.observe(line);
    } else {
      line.classList.add("is-visible");
    }
  }

  // ---------------------------------------------------------------- contact form -> WhatsApp
  var form = document.querySelector("[data-contact-form]");
  if (form) {
    var errorEl = form.querySelector("[data-contact-error]");
    var setError = function (msg) {
      errorEl.textContent = msg;
      errorEl.classList.toggle("d-none", !msg);
    };

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var f = form.elements;
      var name = f.name.value;
      var phone = f.phone.value;
      var service = f.service.value;
      var address = f.address.value;
      var date = f.date.value;
      var time = f.time.value;
      var notes = f.notes.value;

      if (!name.trim()) return setError("Please enter your name");
      if (!phone.trim()) return setError("Please enter your phone number");
      if (!service || service === "Select a Service") return setError("Please select a service");
      if (!date) return setError("Please choose a pickup date");
      if (!time || time === "Select a Time Slot") return setError("Please select a time slot");
      if (!address.trim()) return setError("Please enter your address with landmark");

      setError("");
      var message =
        "Hi Laundry Today, I would like to request a pickup!\n\n" +
        "👤 Name: " + name.trim() + "\n" +
        "📞 Number: " + phone.trim() + "\n" +
        "🧺 Service: " + service + "\n" +
        "🏠 Address: " + address.trim() + "\n" +
        "📅 Date: " + date + "\n" +
        "⏰ Time: " + time + "\n" +
        "📝 Items: " + (notes.trim() || "None");
      window.LT.sendWhatsApp(message);
      form.submit(); // also email the lead via mail1.php
    });
  }
})();
