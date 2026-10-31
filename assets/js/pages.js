// Form handlers for the commercial, contact and book-pickup pages.
// Messages are identical to the original React pages.
(function () {
  "use strict";

  function send(text) {
    window.open("https://wa.me/917702608040?text=" + encodeURIComponent(text), "_blank");
  }

  function val(form, name) {
    return form.elements[name] ? form.elements[name].value : "";
  }

  // ---------------------------------------------------------------- commercial quote
  var commercial = document.getElementById("commercial-form");
  if (commercial) {
    commercial.addEventListener("submit", function (e) {
      e.preventDefault();
      var company = val(commercial, "company");
      var name = val(commercial, "name");
      var phone = val(commercial, "phone");
      var industry = val(commercial, "industry");
      var message = val(commercial, "message");
      if (!company || !name || !phone) return;

      var text =
        "Hello Laundry Today! I would like to request a commercial laundry quote:\n" +
        "- *Company*: " + company + "\n" +
        "- *Contact Person*: " + name + "\n" +
        "- *Phone*: " + phone + "\n" +
        "- *Industry*: " + industry + "\n" +
        "- *Special Instructions*: " + (message || "None");
      send(text);
      commercial.submit(); // also email the lead via mail1.php
    });
  }

  // ---------------------------------------------------------------- contact pickup form
  var contact = document.getElementById("contact-form");
  if (contact) {
    var errorEl = contact.querySelector("[data-form-error]");
    var setError = function (msg) {
      errorEl.textContent = msg;
      errorEl.hidden = !msg;
    };

    contact.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = val(contact, "name");
      var phone = val(contact, "phone");
      var service = val(contact, "service");
      var address = val(contact, "address");
      var date = val(contact, "date");
      var time = val(contact, "time");
      var notes = val(contact, "notes");

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
      send(message);
      contact.submit(); // also email the lead via mail1.php
    });
  }

  // ---------------------------------------------------------------- book pickup + live summary
  var pickup = document.getElementById("pickup-form");
  if (pickup) {
    var fallbacks = {
      name: "Not entered",
      phone: "Not entered",
      date: "Date not selected",
      address: "Address details not specified",
    };

    var renderSummary = function () {
      document.querySelectorAll("[data-summary]").forEach(function (el) {
        var key = el.getAttribute("data-summary");
        var v = val(pickup, key);
        el.textContent = v || fallbacks[key] || "";
      });
      var hasDate = !!val(pickup, "date");
      document.querySelectorAll("[data-summary-when-date]").forEach(function (el) {
        el.hidden = !hasDate;
      });
    };

    pickup.addEventListener("input", renderSummary);
    pickup.addEventListener("change", renderSummary);
    renderSummary();

    pickup.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = val(pickup, "name");
      var phone = val(pickup, "phone");
      var email = val(pickup, "email");
      var address = val(pickup, "address");
      var service = val(pickup, "service");
      var date = val(pickup, "date");
      var time = val(pickup, "time");
      var notes = val(pickup, "notes");
      if (!name || !phone || !address || !date) return;

      var text =
        "Hello Laundry Today! I would like to schedule a doorstep pickup:\n" +
        "- *Customer Name*: " + name + "\n" +
        "- *Phone*: " + phone + "\n" +
        "- *Email*: " + (email || "N/A") + "\n" +
        "- *Address*: " + address + "\n" +
        "- *Service*: " + service + "\n" +
        "- *Pickup Date*: " + date + "\n" +
        "- *Timeslot*: " + time + "\n" +
        "- *Instructions*: " + (notes || "None");
      send(text);
      pickup.submit(); // also email the lead via mail1.php
    });
  }
})();
