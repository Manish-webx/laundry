/* Laundry Today — pricing menu, cart & laundry-bag estimator (port of Pricing.tsx). Safe to load on any page. */
(function () {
  "use strict";

  // ---------------------------------------------------------------- helpers (ported 1:1)
  function has(n, list) {
    for (var i = 0; i < list.length; i++) if (n.indexOf(list[i]) !== -1) return true;
    return false;
  }

  // Emojis for digital laundry bag visualization
  function getGarmentEmoji(name) {
    var n = name.toLowerCase();
    if (has(n, ["shoe", "sneaker", "sandals", "boot", "flops"])) return "👟";
    if (has(n, ["blanket", "quilt", "bedsheet", "towel", "pillow", "cushion", "carpet", "curtain", "doormat"])) return "🛏️";
    if (has(n, ["pant", "jeans", "trouser", "shorts", "skirt"])) return "👖";
    if (has(n, ["jacket", "coat", "blazer", "suit", "sherwani", "overcoat"])) return "🧥";
    if (has(n, ["shirt", "t-shirt", "top", "blouse", "kurti", "night suit", "gown", "saree", "lehenga"])) return "👕";
    return "🧺"; // general laundry
  }

  // Weight estimates in kilograms for load calculation
  function estimateWeight(name) {
    var n = name.toLowerCase();
    if (has(n, ["double blanket", "double bed", "quilt (double)"])) return 2.0;
    if (has(n, ["single blanket", "single bed", "quilt (single)", "carpet", "rug"])) return 1.2;
    if (has(n, ["bedsheet", "bathrobe", "towel (large)", "bath towel"])) return 0.6;
    if (has(n, ["pillow", "cushion", "trolley"])) return 0.5;
    if (has(n, ["shoe", "sneaker", "boot"])) return 0.8;
    if (has(n, ["sherwani", "heavy gown", "lehenga"])) return 1.0;
    if (has(n, ["blazer", "coat", "suit", "jacket", "overcoat"])) return 0.6;
    if (has(n, ["pant", "jeans", "trouser", "saree", "dhoti", "jumpsuit"])) return 0.4;
    if (has(n, ["sweatshirt", "sweater", "hoodie", "kurta"])) return 0.35;
    if (has(n, ["shirt", "t-shirt", "top", "blouse", "kurti", "night suit"])) return 0.2;
    if (has(n, ["shorts", "skirt", "scarf", "dupatta", "petticoat"])) return 0.15;
    if (has(n, ["tie", "muffler", "cap", "gloves", "wallet"])) return 0.08;
    return 0.25; // default average
  }

  function isDryCleanItem(name) {
    var n = name.toLowerCase();
    return has(n, ["dry cleaning", "dry clean", "sherwani", "blazer", "coat", "gown", "saree", "lehenga", "wool", "silk", "leather"]);
  }

  function esc(s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  var SVG_OPEN =
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" class="lucide ';
  function plusIcon(cls) {
    return SVG_OPEN + "lucide-plus " + cls + '"><path d="M5 12h14"/><path d="M12 5v14"/></svg>';
  }
  function minusIcon(cls) {
    return SVG_OPEN + "lucide-minus " + cls + '"><path d="M5 12h14"/></svg>';
  }

  // ---------------------------------------------------------------- one calculator instance
  function init(root) {
    var dataEl = root.querySelector("[data-pricing-data]");
    if (!dataEl) return;
    var pricingData = JSON.parse(dataEl.textContent);

    var state = {
      activeCategory: root.getAttribute("data-default-category") || "weight",
      activeSubCategory: root.getAttribute("data-active-sub") || "Towels & Bedding",
      searchQuery: "",
      cart: {}, // name -> { price, quantity } (insertion order kept)
      cartOrder: [],
    };

    var q = function (sel) {
      return root.querySelector(sel);
    };
    var search = q("[data-pricing-search]");
    var clearSearch = q("[data-pricing-clear]");
    var tabsWrap = q("[data-pricing-tabs-wrap]");
    var grid = q("[data-pricing-grid]");
    var empty = q("[data-pricing-empty]");
    var glow = q("[data-pricing-glow]");
    var cartbar = q("[data-pricing-cartbar]");
    var particles = q("[data-pricing-particles]");
    var drawerEl = q("[data-pricing-drawer]");
    var backdrop = q("[data-pricing-backdrop]");
    var list = q("[data-pricing-list]");
    var bag = q("[data-pricing-bag]");
    var drawer = drawerEl && window.bootstrap ? window.bootstrap.Offcanvas.getOrCreateInstance(drawerEl) : null;
    var drawerOpen = false;
    state.searchQuery = search ? search.value : "";

    // ------------------------------------------------ derived data
    function currentCategory() {
      for (var i = 0; i < pricingData.length; i++) if (pricingData[i].id === state.activeCategory) return pricingData[i];
      return pricingData[0];
    }

    function displayItems() {
      var query = state.searchQuery.toLowerCase().trim();
      if (!query) {
        var cat = currentCategory();
        var items = cat.items || [];
        if (cat.subCategories) {
          var sub = cat.subCategories[0];
          cat.subCategories.forEach(function (s) {
            if (s.name === state.activeSubCategory) sub = s;
          });
          items = sub.items;
        }
        return items;
      }
      var results = [];
      pricingData.forEach(function (cat) {
        if (cat.items) {
          cat.items.forEach(function (item) {
            if (item.name.toLowerCase().indexOf(query) !== -1)
              results.push({ name: item.name, price: item.price, categoryPath: cat.name });
          });
        } else if (cat.subCategories) {
          cat.subCategories.forEach(function (sub) {
            sub.items.forEach(function (item) {
              if (item.name.toLowerCase().indexOf(query) !== -1)
                results.push({ name: item.name, price: item.price, categoryPath: cat.name + " › " + sub.name });
            });
          });
        }
      });
      return results;
    }

    function cartEntries() {
      return state.cartOrder.map(function (name) {
        return [name, state.cart[name]];
      });
    }

    function totals() {
      var count = 0, weight = 0, price = 0, dry = 0;
      cartEntries().forEach(function (e) {
        var name = e[0], item = e[1];
        count += item.quantity;
        weight += item.quantity * estimateWeight(name);
        var m = item.price.match(/\d+/);
        price += item.quantity * (m ? parseInt(m[0], 10) : 99);
        if (isDryCleanItem(name)) dry += item.quantity;
      });
      return { count: count, weight: weight, price: price, dry: dry };
    }

    // ------------------------------------------------ cart ops
    function addToCart(name, price, e) {
      if (!state.cart[name]) state.cartOrder.push(name);
      state.cart[name] = { price: price, quantity: 1 };
      triggerFlyParticle(name, e);
      onCartChange();
    }

    function updateQuantity(name, delta, e) {
      var cur = state.cart[name];
      if (cur) {
        var qty = cur.quantity + delta;
        if (qty <= 0) {
          delete state.cart[name];
          state.cartOrder.splice(state.cartOrder.indexOf(name), 1);
        } else {
          cur.quantity = qty;
        }
      }
      if (delta > 0) triggerFlyParticle(name, e);
      onCartChange();
    }

    function clearCart() {
      state.cart = {};
      state.cartOrder = [];
      onCartChange();
    }

    // ------------------------------------------------ fly-to-cart particles
    function triggerFlyParticle(name, e) {
      if (!e || !particles) return;
      var p = document.createElement("div");
      p.className = "pricing-particle";
      p.textContent = getGarmentEmoji(name);
      particles.appendChild(p);
      var from = "translate(" + e.clientX + "px," + e.clientY + "px) scale(1.8)";
      var to = "translate(" + window.innerWidth / 2 + "px," + (window.innerHeight - 80) + "px) scale(0.6)";
      if (p.animate) {
        p.animate(
          [
            { transform: from, opacity: 1 },
            { transform: to, opacity: 0.1 },
          ],
          { duration: 800, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "forwards" },
        );
      }
      setTimeout(function () {
        p.remove();
      }, 850);
    }

    // ------------------------------------------------ rendering
    function controlsHtml(name, small) {
      var qty = state.cart[name] ? state.cart[name].quantity : 0;
      if (!small && qty === 0) {
        return (
          '<button type="button" class="pricing-add d-flex align-items-center justify-content-center box-8 rounded-full bg-secondary text-primary-deep transition-all cursor-pointer shadow-soft border border-primary border-opacity-10" title="Add ' +
          esc(name) + ' to order" data-pricing-add>' + plusIcon("icon-4-5") + "</button>"
        );
      }
      var icon = small ? "pricing-icon-2-5" : "icon-3";
      return (
        '<div class="pricing-qty' + (small ? " is-small" : "") + '">' +
        '<button type="button" class="cursor-pointer" data-pricing-dec>' + minusIcon(icon) + "</button>" +
        '<span class="fs-xs fw-extrabold text-primary-deep">' + qty + "</span>" +
        '<button type="button" class="cursor-pointer" data-pricing-inc>' + plusIcon(icon) + "</button>" +
        "</div>"
      );
    }

    function cardHtml(item, showPath) {
      var selected = state.cart[item.name] ? " is-selected" : "";
      return (
        '<div class="pricing-card glass-card d-flex align-items-center justify-content-between rounded-3xl transition-all is-entering' + selected +
        '" data-name="' + esc(item.name) + '" data-price="' + esc(item.price) + '">' +
        '<div class="d-flex flex-column min-w-0 pe-2">' +
        '<span class="fs-sm fw-extrabold text-primary-deep text-truncate">' + esc(item.name) + "</span>" +
        (showPath && item.categoryPath
          ? '<span class="pricing-path mt-1 d-inline-flex align-items-center fw-extrabold tracking-widest text-muted-foreground bg-secondary px-2 py-0-5 rounded-full text-uppercase">' +
            esc(item.categoryPath) + "</span>"
          : "") +
        "</div>" +
        '<div class="flex-shrink-0 d-flex align-items-center gap-2-5">' +
        '<span class="pricing-price accent-gradient rounded-full py-1-5 fs-xs fw-extrabold text-white shadow-soft">' + esc(item.price) + "</span>" +
        '<span class="d-contents" data-pricing-controls>' + controlsHtml(item.name, false) + "</span>" +
        "</div></div>"
      );
    }

    function renderGrid() {
      var searching = !!state.searchQuery.trim();
      var items = displayItems();
      grid.innerHTML = items
        .map(function (item) {
          return cardHtml(item, searching);
        })
        .join("");
      var wasHidden = empty.classList.contains("d-none");
      empty.classList.toggle("d-none", items.length > 0);
      if (items.length === 0 && wasHidden) {
        empty.classList.remove("is-entering");
        void empty.offsetWidth;
        empty.classList.add("is-entering");
      }
    }

    function renderTabs() {
      var searching = !!state.searchQuery.trim();
      var cat = currentCategory();
      if (tabsWrap) tabsWrap.classList.toggle("d-none", searching);
      root.querySelectorAll("[data-pricing-tab]").forEach(function (b) {
        b.classList.toggle("is-active", b.getAttribute("data-pricing-tab") === state.activeCategory);
      });
      root.querySelectorAll("[data-pricing-subtabs-wrap]").forEach(function (wrap) {
        var show = !searching && wrap.getAttribute("data-pricing-subtabs-wrap") === cat.id;
        var wasHidden = wrap.classList.contains("d-none");
        wrap.classList.toggle("d-none", !show);
        var active = wrap.querySelector('[data-pricing-sub="' + cssEsc(state.activeSubCategory) + '"]') || wrap.querySelector("[data-pricing-sub]");
        wrap.querySelectorAll("[data-pricing-sub]").forEach(function (b) {
          b.classList.toggle("is-active", b === active);
        });
        if (show) moveLine(wrap, active, !wasHidden);
      });
      if (glow) glow.className = "pricing-glow pricing-glow-" + state.activeCategory;
      if (clearSearch) clearSearch.classList.toggle("d-none", !state.searchQuery);
    }

    function cssEsc(s) {
      return window.CSS && CSS.escape ? CSS.escape(s) : s.replace(/"/g, '\\"');
    }

    // Animated underline under the active household sub-tab (layoutId in the original).
    function moveLine(wrap, btn, animate) {
      var line = wrap.querySelector("[data-pricing-sub-line]");
      if (!line || !btn) return;
      line.classList.toggle("is-animated", !!animate);
      line.style.top = btn.offsetTop + btn.offsetHeight - 2 + "px";
      line.style.width = btn.offsetWidth + "px";
      line.style.transform = "translateX(" + btn.offsetLeft + "px)";
    }

    function updateCards() {
      grid.querySelectorAll(".pricing-card").forEach(function (card) {
        var name = card.getAttribute("data-name");
        card.classList.toggle("is-selected", !!state.cart[name]);
        var slot = card.querySelector("[data-pricing-controls]");
        if (slot) slot.innerHTML = controlsHtml(name, false);
      });
    }

    function renderCartbar(t) {
      if (!cartbar) return;
      var visible = t.count > 0;
      cartbar.classList.toggle("is-visible", visible);
      cartbar.setAttribute("aria-hidden", visible ? "false" : "true");
      if (visible) {
        q("[data-pricing-count]").textContent = t.count + " " + (t.count === 1 ? "item" : "items") + " selected";
        q("[data-pricing-weight-short]").textContent = "Est. Weight: ~" + t.weight.toFixed(1) + " kg";
      }
    }

    function renderDrawer(t) {
      if (!drawerEl) return;
      list.innerHTML = cartEntries()
        .map(function (e) {
          var name = e[0], item = e[1];
          return (
            '<div class="glass-card pricing-row d-flex align-items-center justify-content-between" data-name="' + esc(name) + '">' +
            '<div class="d-flex align-items-center gap-3">' +
            '<span class="fs-xl select-none">' + getGarmentEmoji(name) + "</span>" +
            "<div>" +
            '<div class="fs-sm fw-bold text-primary-deep">' + esc(name) + "</div>" +
            '<div class="fs-10px text-muted-foreground mt-0-5">Est. weight: ' + estimateWeight(name) + " kg/ea</div>" +
            "</div></div>" +
            '<div class="d-flex align-items-center gap-3">' +
            '<span class="fs-sm fw-extrabold text-primary-deep pe-1">' + esc(item.price) + "</span>" +
            controlsHtml(name, true) +
            "</div></div>"
          );
        })
        .join("");

      root.querySelectorAll("[data-pricing-weight]").forEach(function (el) {
        el.textContent = t.weight.toFixed(2) + " kg";
      });
      root.querySelectorAll("[data-pricing-total]").forEach(function (el) {
        el.textContent = "₹" + t.price;
      });
      q("[data-pricing-loads]").textContent =
        t.weight <= 6 ? "🧺 Fits in 1 Machine Load" : "🧺 Requires ~" + Math.ceil(t.weight / 6) + " Machine Loads";
      var dryBox = q("[data-pricing-dry]");
      dryBox.classList.toggle("d-none", t.dry === 0);
      q("[data-pricing-dry-text]").textContent = "✨ " + t.dry + " dry-clean " + (t.dry === 1 ? "item" : "items") + " separated";
      if (drawerOpen) renderBag(false);
    }

    // Emoji "bag simulator": keyed by emoji+index like the original, so only new/changed slots drop in.
    function renderBag(fresh) {
      var emojis = [];
      cartEntries().forEach(function (e) {
        var em = getGarmentEmoji(e[0]);
        for (var i = 0; i < e[1].quantity; i++) emojis.push(em);
      });
      if (fresh) bag.innerHTML = "";
      var nodes = bag.children;
      emojis.forEach(function (emoji, index) {
        var key = emoji + "-" + index;
        var node = nodes[index];
        if (node && node.getAttribute("data-key") === key) return;
        var el = document.createElement("div");
        el.className = "pricing-bag-emoji";
        el.setAttribute("data-key", key);
        el.textContent = emoji;
        el.style.setProperty("--bx", ((index * 17) % 60) - 30 + "px");
        el.style.setProperty("--br", ((index * 35) % 90) - 45 + "deg");
        el.style.setProperty("--bd", Math.min(index * 0.04, 0.6) + "s");
        el.style.zIndex = index + 1;
        if (node) bag.replaceChild(el, node);
        else bag.appendChild(el);
      });
      while (bag.children.length > emojis.length) bag.removeChild(bag.lastChild);
    }

    function onCartChange() {
      var t = totals();
      updateCards();
      renderCartbar(t);
      renderDrawer(t);
    }

    // ------------------------------------------------ events
    if (search) {
      search.addEventListener("input", function () {
        state.searchQuery = search.value;
        renderTabs();
        renderGrid();
      });
    }
    if (clearSearch) {
      clearSearch.addEventListener("click", function () {
        search.value = "";
        state.searchQuery = "";
        renderTabs();
        renderGrid();
      });
    }

    root.addEventListener("click", function (e) {
      var t = e.target;
      var tab = t.closest("[data-pricing-tab]");
      if (tab) {
        state.activeCategory = tab.getAttribute("data-pricing-tab");
        var cat = currentCategory();
        if (cat.subCategories && cat.subCategories.length > 0) state.activeSubCategory = cat.subCategories[0].name;
        renderTabs();
        renderGrid();
        return;
      }
      var sub = t.closest("[data-pricing-sub]");
      if (sub) {
        state.activeSubCategory = sub.getAttribute("data-pricing-sub");
        renderTabs();
        renderGrid();
        return;
      }
      var holder = t.closest("[data-name]");
      var name = holder && holder.getAttribute("data-name");
      if (t.closest("[data-pricing-add]") && name) return addToCart(name, holder.getAttribute("data-price"), e);
      if (t.closest("[data-pricing-inc]") && name) return updateQuantity(name, 1, e);
      if (t.closest("[data-pricing-dec]") && name) return updateQuantity(name, -1, e);
      if (t.closest("[data-pricing-clear-cart]")) return clearCart();
      if (t.closest("[data-pricing-review]") && drawer) return drawer.show();
      if (t.closest("[data-pricing-backdrop]") && drawer) return drawer.hide();
      if (t.closest("[data-pricing-book]")) {
        var items = cartEntries().map(function (en) {
          return { name: en[0], price: en[1].price, quantity: en[1].quantity };
        });
        if (drawer && drawerOpen) {
          drawerEl.addEventListener(
            "hidden.bs.offcanvas",
            function () {
              if (window.LT && LT.openBooking) LT.openBooking(undefined, items);
            },
            { once: true },
          );
          drawer.hide();
        } else if (window.LT && LT.openBooking) {
          LT.openBooking(undefined, items);
        }
      }
    });

    if (drawerEl) {
      drawerEl.addEventListener("show.bs.offcanvas", function () {
        drawerOpen = true;
        backdrop.classList.add("is-visible");
        renderBag(true);
      });
      drawerEl.addEventListener("hide.bs.offcanvas", function () {
        drawerOpen = false;
        backdrop.classList.remove("is-visible");
      });
    }

    window.addEventListener("resize", function () {
      root.querySelectorAll("[data-pricing-subtabs-wrap]:not(.d-none)").forEach(function (wrap) {
        moveLine(wrap, wrap.querySelector("[data-pricing-sub].is-active"), false);
      });
    });

    // Initial paint: sync server-rendered markup with state.
    renderTabs();
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { window.dispatchEvent(new Event("resize")); });
    onCartChange();
  }

  document.querySelectorAll("[data-pricing]").forEach(init);
})();
