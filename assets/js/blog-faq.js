// Blog listing + FAQ: category filter, search and (FAQ) single-open accordion.
(function () {
  "use strict";

  document.querySelectorAll("[data-bf-filter]").forEach(function (root) {
    var chips = root.querySelectorAll("[data-bf-cat]");
    var input = root.querySelector("[data-bf-search]");
    var list = root.querySelector("[data-bf-list]");
    var items = root.querySelectorAll("[data-bf-item]");
    var empty = root.querySelector("[data-bf-empty]");
    var clear = root.querySelector("[data-bf-clear]");
    var isFaq = root.hasAttribute("data-bf-faq");
    var activeCategory = "All";

    function closeAll() {
      root.querySelectorAll(".bf-faq.is-open").forEach(function (el) {
        el.classList.remove("is-open");
        el.querySelector(".bf-faq-toggle").setAttribute("aria-expanded", "false");
      });
    }

    function apply() {
      var q = input.value.toLowerCase();
      var count = 0;
      items.forEach(function (item) {
        var match =
          (activeCategory === "All" || item.getAttribute("data-category") === activeCategory) &&
          item.getAttribute("data-search").indexOf(q) !== -1;
        item.classList.toggle("d-none", !match);
        if (match) count++;
      });
      empty.classList.toggle("d-none", count > 0);
      // Blog: the grid itself is not rendered when nothing matches.
      if (!isFaq) list.classList.toggle("d-none", count === 0);
    }

    function setCategory(cat) {
      activeCategory = cat;
      chips.forEach(function (c) {
        c.classList.toggle("is-active", c.getAttribute("data-bf-cat") === cat);
      });
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        setCategory(chip.getAttribute("data-bf-cat"));
        if (isFaq) closeAll();
        apply();
      });
    });

    input.addEventListener("input", function () {
      if (isFaq) closeAll();
      apply();
    });

    clear.addEventListener("click", function () {
      input.value = "";
      setCategory("All");
      apply();
    });

    if (isFaq) {
      root.addEventListener("click", function (e) {
        var toggle = e.target.closest(".bf-faq-toggle");
        if (!toggle) return;
        var item = toggle.closest(".bf-faq");
        var willOpen = !item.classList.contains("is-open");
        closeAll();
        if (willOpen) {
          item.classList.add("is-open");
          toggle.setAttribute("aria-expanded", "true");
        }
      });
    }
  });
})();
