// Portfolio interactions — vanilla JS, no dependencies.
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  // ----- Mobile navigation -----
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  var toggleLabel = toggle.querySelector(".sr-only");

  function setMenu(open) {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggleLabel.textContent = open ? "Close menu" : "Open menu";
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  menu.addEventListener("click", function (e) {
    if (e.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });

  // ----- Active nav link while scrolling -----
  var navLinks = Array.prototype.slice.call(menu.querySelectorAll("a"));
  var sections = navLinks
    .map(function (link) { return document.querySelector(link.getAttribute("href")); })
    .filter(Boolean);

  if ("IntersectionObserver" in window) {
    var navObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute("href") === "#" + entry.target.id;
          link.classList.toggle("active", active);
          if (active) link.setAttribute("aria-current", "true");
          else link.removeAttribute("aria-current");
        });
      });
    }, { rootMargin: "-45% 0px -50% 0px" });
    sections.forEach(function (s) { navObserver.observe(s); });

    // ----- Subtle reveal on scroll -----
    var revealObserver = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    document.querySelectorAll(".reveal").forEach(function (el) { revealObserver.observe(el); });
  } else {
    document.querySelectorAll(".reveal").forEach(function (el) { el.classList.add("is-visible"); });
  }

  // ----- Copy email button -----
  var copyBtn = document.querySelector(".copy-btn");
  var copyStatus = document.querySelector(".copy-status");
  if (copyBtn) {
    copyBtn.addEventListener("click", function () {
      var email = copyBtn.getAttribute("data-email");
      var done = function (ok) {
        copyStatus.textContent = ok ? "Copied!" : "Couldn't copy. Select the address instead.";
        copyStatus.classList.toggle("is-error", !ok);
        setTimeout(function () { copyStatus.textContent = ""; }, 2500);
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(email).then(function () { done(true); }, function () { done(false); });
      } else {
        var field = document.createElement("textarea");
        field.value = email;
        field.setAttribute("readonly", "");
        field.style.position = "absolute"; field.style.left = "-9999px";
        document.body.appendChild(field);
        field.select();
        var ok = false;
        try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
        document.body.removeChild(field);
        done(ok);
      }
    });
  }

  // ----- Footer year -----
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  // ----- Resume availability check (only when served over http/https) -----
  // If the PDF has not been added yet, hide the buttons instead of showing a broken link.
  var resumeLinks = document.querySelectorAll(".js-resume-link");
  if (resumeLinks.length && location.protocol.indexOf("http") === 0 && window.fetch) {
    fetch(resumeLinks[0].getAttribute("href"), { method: "HEAD" })
      .then(function (res) { if (!res.ok) markResumeMissing(); })
      .catch(function () { /* offline or blocked: leave links as they are */ });
  }

  function markResumeMissing() {
    resumeLinks.forEach(function (link) { link.hidden = true; });
  }
})();
