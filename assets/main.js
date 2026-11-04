(function () {
  "use strict";

  var status = document.getElementById("copy-status");
  document.querySelectorAll("button.copy").forEach(function (button) {
    var label = button.textContent;
    var reset;
    button.addEventListener("click", function () {
      function done() {
        clearTimeout(reset);
        button.textContent = "Copied";
        status.textContent = button.id === "copy-email" ? "Email address copied." : "Install command copied.";
        reset = setTimeout(function () { button.textContent = label; }, 1800);
      }
      function fallback() {
        var range = document.createRange();
        range.selectNodeContents(button.previousElementSibling);
        var selection = window.getSelection();
        selection.removeAllRanges();
        selection.addRange(range);
        status.textContent = "Text selected. Use your device’s copy command to copy it.";
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(button.dataset.copy).then(done, fallback);
      } else {
        fallback();
      }
    });
  });

  var links = Array.from(document.querySelectorAll("nav[aria-label='Sections'] a"));
  var sections = links.map(function (link) { return document.querySelector(link.getAttribute("href")); });
  var ticking = false;
  function updateNavigation() {
    var active = -1;
    sections.forEach(function (section, index) {
      if (section.getBoundingClientRect().top <= 150) active = index;
    });
    links.forEach(function (link, index) {
      if (index === active) link.setAttribute("aria-current", "location");
      else link.removeAttribute("aria-current");
    });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      ticking = true;
      window.requestAnimationFrame(updateNavigation);
    }
  }, { passive: true });
  window.addEventListener("resize", updateNavigation);
  window.addEventListener("pageshow", updateNavigation);
  updateNavigation();
})();
