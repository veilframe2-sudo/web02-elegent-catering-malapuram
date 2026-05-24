/* ============================================================
   Elegant Catering — interactions
   ============================================================ */

document.addEventListener("DOMContentLoaded", () => {
  initNav();
  initReveal();
  initSpecialtyTabs();
  initGallery();
  initLightbox();
  initInquiry();
  initYear();
});

/* ---------- Nav ---------- */
function initNav() {
  const nav = document.querySelector(".nav");
  const links = document.querySelectorAll(".nav__link[data-section]");
  const sections = [...links].map(l => document.getElementById(l.dataset.section)).filter(Boolean);

  const onScroll = () => {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);

    // active link
    const y = window.scrollY + 140;
    let active = sections[0]?.id;
    for (const s of sections) {
      if (s.offsetTop <= y) active = s.id;
    }
    links.forEach(l => l.classList.toggle("is-active", l.dataset.section === active));
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  // smooth scroll
  document.querySelectorAll("a[href^='#']").forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href").slice(1);
      const el = document.getElementById(id);
      if (el) {
        e.preventDefault();
        window.scrollTo({ top: el.offsetTop - 70, behavior: "smooth" });
      }
    });
  });
}

/* ---------- Scroll reveal ---------- */
function initReveal() {
  const items = document.querySelectorAll(".reveal");
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add("is-in");
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.14 });
  items.forEach(i => io.observe(i));
}

/* ---------- Specialty tabs ---------- */
const SPECIALTY_DATA = {
  biryani: {
    title: "Thalassery Malabar Biryani",
    lead: "Long-grain Khyma rice, slow-rendered ghee, hand-pounded garam masala — the spine of every Malappuram wedding spread we lay.",
    img: "images/chefs-buffet.png",
    menu: [
      { name: "Mutton Biryani", ml: "ആട്ടിറച്ചി ബിരിയാണി", tag: "Signature" },
      { name: "Chicken Biryani", ml: "കോഴി ബിരിയാണി", tag: "Halal certified" },
      { name: "Beef Dum Biryani", ml: "ഇറച്ചി ദം", tag: "On request" },
      { name: "Fish Biryani", ml: "മീൻ ബിരിയാണി", tag: "Coastal" },
      { name: "Prawn Biryani", ml: "ചെമ്മീൻ ബിരിയാണി", tag: "Coastal" },
    ],
  },
  sadya: {
    title: "Onam Sadya & Vegetarian Feast",
    lead: "Twenty-six dishes laid on a banana leaf, served in measured progression — the inherited grammar of Kerala vegetarian celebration.",
    img: "images/salad-platters.png",
    menu: [
      { name: "Avial", ml: "അവിയൽ", tag: "Coconut & yogurt" },
      { name: "Kaalan", ml: "കാളൻ", tag: "Slow simmered" },
      { name: "Olan", ml: "ഓലൻ", tag: "Ash-gourd" },
      { name: "Parippu Curry", ml: "പരിപ്പ് കറി", tag: "First course" },
      { name: "Payasam — Ada Pradhaman", ml: "അട പ്രഥമൻ", tag: "Dessert" },
    ],
  },
  hybrid: {
    title: "Hybrid Halal + Sadya Service",
    lead: "Mixed-faith weddings deserve a single, considered table. Two kitchens, two sets of utensils, one unified service flow.",
    img: "images/dessert-spread.png",
    menu: [
      { name: "Halal Mutton Stew + Appam", ml: "ആട്ടിറച്ചി — അപ്പം", tag: "Counter A" },
      { name: "Pure-Veg Sadya Spread", ml: "ശുദ്ധ സദ്യ", tag: "Counter B" },
      { name: "Pathiri + Chicken Curry", ml: "പത്തിരി — കോഴി", tag: "Counter A" },
      { name: "Neychoru Buffet", ml: "നെയ്‌ച്ചോറ്", tag: "Shared" },
      { name: "Live Dessert Carving", ml: "—", tag: "Counter C" },
    ],
  },
  haldi: {
    title: "Mehendi, Haldi & Reception",
    lead: "Smaller, intimate ceremonies need food that travels well to a poolside, a courtyard, a rented hall — and arrives looking unhurried.",
    img: "images/sweets-tiered.png",
    menu: [
      { name: "Live Pasta Counter", ml: "—", tag: "Continental" },
      { name: "Kerala Tea + Pazhampori", ml: "ചായ — പഴമ്പൊരി", tag: "Tea-time" },
      { name: "Charcoal Grill — Kebab Bar", ml: "—", tag: "Live" },
      { name: "Tiered Cake Display", ml: "—", tag: "Bespoke" },
      { name: "Mocktail Bar", ml: "—", tag: "Halal" },
    ],
  },
};

function initSpecialtyTabs() {
  const tabs = document.querySelectorAll(".specialty__tab");
  const panel = document.querySelector(".specialty__panel");
  if (!panel) return;

  const render = (key) => {
    const d = SPECIALTY_DATA[key];
    if (!d) return;
    panel.innerHTML = `
      <div class="specialty__panel-img">
        <img src="${d.img}" alt="${d.title}" />
      </div>
      <div class="specialty__panel-content">
        <span class="eyebrow">Menu</span>
        <h3 class="display h3" style="margin-top:18px">${d.title}</h3>
        <p class="lead">${d.lead}</p>
        <ul class="specialty__menu">
          ${d.menu.map(m => `
            <li>
              <div>
                <span class="item-name">${m.name}</span>
                ${m.ml !== "—" ? `<span class="item-malayalam">${m.ml}</span>` : ""}
              </div>
              <span class="item-tag">${m.tag}</span>
            </li>
          `).join("")}
        </ul>
      </div>
    `;
  };

  tabs.forEach(t => {
    t.addEventListener("click", () => {
      tabs.forEach(x => x.classList.remove("is-active"));
      t.classList.add("is-active");
      render(t.dataset.key);
    });
  });

  render("biryani");
}

/* ---------- Gallery filters ---------- */
function initGallery() {
  const filters = document.querySelectorAll(".gallery__filter");
  const items = document.querySelectorAll(".gallery__item");
  filters.forEach(f => {
    f.addEventListener("click", () => {
      filters.forEach(x => x.classList.remove("is-active"));
      f.classList.add("is-active");
      const cat = f.dataset.cat;
      items.forEach(it => {
        const show = cat === "all" || it.dataset.cat === cat;
        it.style.display = show ? "" : "none";
      });
    });
  });
}

/* ---------- Lightbox ---------- */
function initLightbox() {
  const items = [...document.querySelectorAll(".gallery__item")];
  const lb = document.querySelector(".lightbox");
  const img = lb.querySelector(".lightbox__img");
  const cap = lb.querySelector(".lightbox__caption");
  const counter = lb.querySelector(".lightbox__counter");
  let idx = 0;

  const open = (i) => {
    idx = i;
    const it = items[idx];
    img.src = it.querySelector("img").src;
    cap.textContent = it.querySelector(".tag")?.textContent || "";
    counter.textContent = `${String(idx + 1).padStart(2, "0")} / ${String(items.length).padStart(2, "0")}`;
    lb.classList.add("is-open");
    document.body.style.overflow = "hidden";
  };
  const close = () => {
    lb.classList.remove("is-open");
    document.body.style.overflow = "";
  };
  const step = (d) => {
    let next = idx;
    do {
      next = (next + d + items.length) % items.length;
    } while (items[next].style.display === "none");
    open(next);
  };

  items.forEach((it, i) => it.addEventListener("click", () => open(i)));
  lb.querySelector(".lightbox__close").addEventListener("click", close);
  lb.querySelector(".lightbox__nav.prev").addEventListener("click", () => step(-1));
  lb.querySelector(".lightbox__nav.next").addEventListener("click", () => step(1));
  lb.addEventListener("click", e => { if (e.target === lb) close(); });
  document.addEventListener("keydown", e => {
    if (!lb.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") step(-1);
    if (e.key === "ArrowRight") step(1);
  });
}

/* ---------- Inquiry multi-step form ---------- */
function initInquiry() {
  const form = document.getElementById("inquiry-form");
  if (!form) return;
  const steps = [...form.querySelectorAll(".inquiry__step")];
  const markers = [...document.querySelectorAll(".inquiry__step-marker")];
  const back = form.querySelector("[data-action=back]");
  const next = form.querySelector("[data-action=next]");
  const submit = form.querySelector("[data-action=submit]");
  const success = form.querySelector(".inquiry__success");
  let active = 0;

  const state = {
    eventType: "Muslim Wedding",
    pax: 600,
    cuisine: "biryani",
    addons: ["Service team"],
    date: "",
    venue: "",
    name: "",
    phone: "",
    email: "",
    notes: "",
  };

  const go = (i) => {
    if (i < 0 || i >= steps.length) return;
    if (i > active) {
      // validate current
      if (!validate(active)) return;
    }
    active = i;
    steps.forEach((s, n) => s.classList.toggle("is-active", n === active));
    markers.forEach((m, n) => {
      m.classList.toggle("is-active", n === active);
      m.classList.toggle("is-done", n < active);
    });
    back.style.visibility = active === 0 ? "hidden" : "visible";
    next.style.display = active === steps.length - 1 ? "none" : "";
    submit.style.display = active === steps.length - 1 ? "" : "none";
    if (active === steps.length - 1) renderSummary();
  };

  const validate = (i) => {
    let ok = true;
    steps[i].querySelectorAll("[data-required]").forEach(el => {
      const field = el.closest(".field");
      const empty = !el.value || (el.type === "email" && !/^\S+@\S+\.\S+$/.test(el.value));
      field?.classList.toggle("error", empty);
      if (empty) ok = false;
    });
    return ok;
  };

  // event type chips
  form.querySelectorAll("[data-event]").forEach(c => {
    c.addEventListener("click", () => {
      form.querySelectorAll("[data-event]").forEach(x => x.classList.remove("is-selected"));
      c.classList.add("is-selected");
      state.eventType = c.dataset.event;
    });
  });
  // cuisine
  form.querySelectorAll("[data-cuisine]").forEach(c => {
    c.addEventListener("click", () => {
      form.querySelectorAll("[data-cuisine]").forEach(x => x.classList.remove("is-selected"));
      c.classList.add("is-selected");
      state.cuisine = c.dataset.cuisine;
    });
  });
  // addons
  form.querySelectorAll("[data-addon]").forEach(c => {
    c.addEventListener("click", () => {
      c.classList.toggle("is-selected");
      state.addons = [...form.querySelectorAll("[data-addon].is-selected")].map(x => x.dataset.addon);
    });
  });

  // pax slider
  const slider = form.querySelector("input[name=pax]");
  const paxOut = form.querySelector("[data-pax-out]");
  slider.addEventListener("input", () => {
    state.pax = +slider.value;
    paxOut.textContent = Math.round(slider.value);
  });

  // text fields
  form.querySelectorAll("input[name], textarea[name]").forEach(el => {
    el.addEventListener("input", () => {
      state[el.name] = el.value;
      el.closest(".field")?.classList.remove("error");
    });
  });

  back.addEventListener("click", () => go(active - 1));
  next.addEventListener("click", () => go(active + 1));
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    if (!validate(active)) return;
    form.querySelector(".inquiry__nav").style.display = "none";
    steps.forEach(s => s.classList.remove("is-active"));
    document.querySelector(".inquiry__steps")?.classList.add("is-done");
    success.classList.add("is-active");
  });

  function renderSummary() {
    const labels = {
      biryani: "Malabar Biryani",
      sadya: "Sadya / Vegetarian",
      hybrid: "Hybrid Halal + Sadya",
      haldi: "Mehendi / Reception",
    };
    const sum = form.querySelector(".inquiry__summary");
    sum.innerHTML = `
      <div class="row"><span class="lbl">Event</span><span class="v">${state.eventType}</span></div>
      <div class="row"><span class="lbl">Guests</span><span class="v">${state.pax} pax</span></div>
      <div class="row"><span class="lbl">Cuisine</span><span class="v">${labels[state.cuisine] || state.cuisine}</span></div>
      <div class="row"><span class="lbl">Date</span><span class="v">${state.date || "—"}</span></div>
      <div class="row"><span class="lbl">Venue</span><span class="v">${state.venue || "—"}</span></div>
      <div class="row"><span class="lbl">Add-ons</span><span class="v">${state.addons.join(", ") || "None"}</span></div>
      <div class="row" style="grid-column: 1 / -1"><span class="lbl">Contact</span><span class="v">${state.name || "—"} — ${state.phone || ""} ${state.email ? "· " + state.email : ""}</span></div>
    `;
  }

  go(0);
}

/* ---------- Year ---------- */
function initYear() {
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
}
