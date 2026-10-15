/* =====================================================================
   MENU — the one list of every page on the site.

   Used by the homepage menu AND by the menu that drops down when you
   hover over AMANDINE MANGON on every other page.

   Each line:  [ "Label", "link.html", indent ]
   indent: 0 = section, 1 = sub page, 2 = project
   Every line ends with a comma, except the very last one.
   ===================================================================== */

var MENU = [
  ["Collage",                  "postcards.html",                     0],
  ["Postcards",                "postcards.html",                     1],
  ["Friends",                  "friends.html",                       1],
  ["Girl",                     "girl.html",                          1],
  ["Photography",              "photography.html",                   0],
  ["Photo",                    "photography.html",                   1],
  ["Video",                    "video.html",                         1],
  ["Digital",                  "digital.html",                       0],
  ["Graphic Design",           "graphic-design.html",                1],
  ["Laura",                    "graphic-design.html#laura",          2],
  ["Blue Father",              "graphic-design.html#blue-father",    2],
  ["Iconoclast",               "graphic-design.html#iconoclast",     2],
  ["Zaha Hadid",               "graphic-design.html#zaha-hadid",     2],
  ["Evidemment",               "graphic-design.html#evidemment",     2],
  ["Good Mourning",            "graphic-design.html#good-mourning",  2],
  ["3D",                       "digital.html#3d",                    1],
  ["Room",                     "digital.html#3d",                    2],
  ["Record Player",            "digital.html#3d",                    2],
  ["Code",                     "code.html",                          1],
  ["Custom Collage",           "code.html#custom-collage",           2],
  ["Exquisite Corpse",         "code.html#exquisite-corpse",         2],
  ["The Five Stages of Grief", "code.html#five-stages-of-grief",     2],
  ["Sound",                    "sound.html",                         1],
  ["Projects",                 "projects.html#heritage",             0],
  ["Heritage",                 "projects.html#heritage",             1],
  ["ineverseeyou",             "projects.html#ineverseeyou",         1],
  ["Juma",                     "projects.html#juma",                 1]
];

/* =====================================================================
   Hover menu for every page except the homepage:
   hover over AMANDINE MANGON (top right) and the menu drops down under it,
   lined up on the right — a mirror of the homepage menu on the left.
   Clicking the name still goes home.
   (Nothing below here needs changing.)
   ===================================================================== */

(function () {
  function build() {
    if (document.body.classList.contains("home")) return;   // homepage has its own menu
    var name = document.querySelector(".site-name");
    if (!name) return;

    var css = document.createElement("style");
    css.textContent =
      ".hover-menu {" +
      "  position: fixed; z-index: 60; margin: 0; list-style: none;" +
      "  text-align: right; background: #fff;" +
      "  padding: 0.35em 0 0.6em 1em;" +
      "  max-height: calc(100vh - 2 * var(--pad-y, 30px) - 2em); overflow-y: auto; scrollbar-width: none;" +
      "  opacity: 0; visibility: hidden;" +
      "  transition: opacity 0.3s ease, visibility 0s linear 0.3s;" +
      "}" +
      ".hover-menu::-webkit-scrollbar { display: none; }" +
      ".hover-menu.open { opacity: 1; visibility: visible; transition: opacity 0.3s ease, visibility 0s; }" +
      ".hover-menu li { padding-right: calc(var(--depth, 0) * 1.35em); white-space: nowrap; }" +
      ".hover-menu a { color: inherit; text-decoration: none; }" +
      ".hover-menu a:hover, .hover-menu a.here {" +
      "  text-decoration: underline; text-decoration-thickness: 0.09em; text-underline-offset: 0.18em;" +
      "}" +
      "@media (hover: none) { .hover-menu { display: none; } }";
    document.head.appendChild(css);

    var menu = document.createElement("ul");
    menu.className = "hover-menu";
    menu.setAttribute("aria-label", "Menu");
    var links = MENU.map(function (m) {
      var li = document.createElement("li");
      li.style.setProperty("--depth", m[2]);
      var a = document.createElement("a");
      a.href = m[1];
      a.textContent = m[0];
      a.addEventListener("click", function () { close(true); });
      li.appendChild(a);
      menu.appendChild(li);
      return a;
    });
    document.body.appendChild(menu);

    // underline the page you're on
    function markHere() {
      var exact = null, sameFile = null;
      links.forEach(function (a, i) {
        a.classList.remove("here");
        if (a.pathname !== location.pathname) return;
        if (!sameFile) sameFile = a;
        // same page: pick the most specific one (Postcards rather than Collage)
        if (a.hash === location.hash && (!exact || MENU[i][2] > exact.depth)) { exact = a; exact.depth = MENU[i][2]; }
      });
      var here = exact || sameFile;
      if (here) here.classList.add("here");
    }
    markHere();
    window.addEventListener("hashchange", markHere);

    // place it right under the name, lined up on its right edge
    function place() {
      var r = name.getBoundingClientRect();
      menu.style.top = r.bottom + "px";
      menu.style.right = (document.documentElement.clientWidth - r.right) + "px";
    }

    var timer = null;
    function open() {
      clearTimeout(timer);
      place();
      menu.classList.add("open");
    }
    function close(now) {
      clearTimeout(timer);
      if (now === true) { menu.classList.remove("open"); return; }
      timer = setTimeout(function () { menu.classList.remove("open"); }, 180);
    }

    [name, menu].forEach(function (el) {
      el.addEventListener("mouseenter", open);
      el.addEventListener("mouseleave", close);
    });
    // keyboard: tabbing onto the name opens it too
    name.addEventListener("focus", open);
    menu.addEventListener("focusin", open);
    menu.addEventListener("focusout", close);
    name.addEventListener("blur", close);
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") close(true); });
    window.addEventListener("resize", function () { if (menu.classList.contains("open")) place(); });
  }

  /* Phones: a white band behind the top bar, so the page scrolling
     underneath never runs into the title or the name. */
  function band() {
    if (document.body.classList.contains("home")) return;
    var parts = [document.querySelector(".section-nav"), document.querySelector(".site-name")].filter(Boolean);
    if (!parts.length) return;
    var el = document.createElement("div");
    el.className = "top-band";
    el.style.cssText = "position:fixed;top:0;left:0;right:0;background:#fff;z-index:9;pointer-events:none;display:none;";
    document.body.appendChild(el);
    function size() {
      if (!window.matchMedia("(max-width: 760px)").matches) { el.style.display = "none"; return; }
      var bottom = 0;
      parts.forEach(function (p) { bottom = Math.max(bottom, p.getBoundingClientRect().bottom); });
      el.style.height = Math.ceil(bottom + 10) + "px";
      el.style.display = "block";
    }
    size();
    window.addEventListener("resize", size);
    if (document.fonts) document.fonts.ready.then(size);
  }

  function start() { build(); band(); }
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
  else start();
})();
