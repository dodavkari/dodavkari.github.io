// shared.js — Globální design systém, databáze dodávek, přepínač rolí (Řidič / Dispečer / Majitel) a živý kurz ČNB

// === KONFIGURACE POPTÁVEK A ODESÍLÁNÍ (ZDARMA PRO GITHUB PAGES) ===
// 1. WhatsApp číslo majitele webu (bez mezer, bez +):
window.WHATSAPP_PHONE = "420777000000";

// 2. NEJRYCHLEJŠÍ ZPŮSOB (ZDARMA, 10 SEKUND): Zadej svůj e-mail a poptávky ti budou chodit přímo do e-mailu přes FormSubmit.co:
// Stačí vložit např. "tvuj-email@seznam.cz" nebo "tvuj-email@gmail.com":
window.LEADS_EMAIL = "";

// 3. ALTERNATIVA PRO GOOGLE TABULKY: Pokud chceš data automaticky sypat do řádků v Google Sheets, vlož Web App URL z Google Apps Script:
window.LEADS_WEBHOOK = "";

// === GLOBÁLNÍ NASTAVENÍ POZADÍ A ROZMAZÁNÍ (Můžeš měnit zde v kódu nebo na stránce nastaveni.html) ===
window.BG_DEFAULT_CONFIG = {
  enabled: true,
  defaultImage: "https://www.flashbyredspher.com/wp-content/uploads/2026/06/4.jpg",
  topAlpha: 0.85,    // Horní ztmavení (0.00 až 0.98)
  bottomAlpha: 0.65, // Spodní ztmavení (0.00 až 0.98)
  blurPx: 6,         // Rozmazání fotky na pozadí v pixelech (0 až 25)
  // Volitelné odlišné fotky pro jednotlivé stránky (pokud je prázdné "", použije se defaultImage):
  pageImages: {
    "index.html": "",
    "dispecink.html": "",
    "rentgen.html": "",
    "tetris.html": "",
    "tachograf.html": "",
    "spedice-check.html": "",
    "zakazky.html": "",
    "trasy.html": "",
    "sledovani.html": "",
    "diety.html": "",
    "skener.html": "",
    "vyplaty.html": "",
    "nafta.html": "",
    "upominky.html": ""
  }
};

window.DEFAULT_VANS = [
  {
    id: "master-iii-10",
    name: "Renault Master III (2019–2024) • 10pal Plachta",
    year: "2019–2024",
    engine: "2.3 dCi 165k",
    type: "plachta-pony",
    pallets: 10,
    lengthCm: 485,
    widthCm: 220,
    wheelArchCm: null,
    payloadKg: 910,
    consumption: 11.8
  },
  {
    id: "master-iv-10",
    name: "Nový Renault Master IV (2024–2026) • 10pal",
    year: "2024–2026",
    engine: "2.0 Blue dCi 170k",
    type: "plachta-pony",
    pallets: 10,
    lengthCm: 485,
    widthCm: 220,
    wheelArchCm: null,
    payloadKg: 945,
    consumption: 10.5
  },
  {
    id: "master-iii-8-zadek",
    name: "Renault Master III • 8pal Zadní spaní",
    year: "2015–2023",
    engine: "2.3 dCi 145k",
    type: "plachta-backsleeper",
    pallets: 8,
    lengthCm: 420,
    widthCm: 220,
    wheelArchCm: null,
    payloadKg: 980,
    consumption: 11.1
  },
  {
    id: "ducato-23-plech",
    name: "Fiat Ducato / Boxer • L4H2 Plechovka",
    year: "2015–2021",
    engine: "2.3 MultiJet 150k",
    type: "plechovka",
    pallets: 5,
    lengthCm: 407,
    widthCm: 187,
    wheelArchCm: 142,
    payloadKg: 1310,
    consumption: 9.2
  },
  {
    id: "ducato-30-plachta",
    name: "Fiat Ducato / Jumper • 3.0 JTD 8pal Plachta",
    year: "2011–2016",
    engine: "3.0 JTD 180k",
    type: "plachta-pony",
    pallets: 8,
    lengthCm: 420,
    widthCm: 220,
    wheelArchCm: null,
    payloadKg: 940,
    consumption: 12.4
  },
  {
    id: "sprinter-celo",
    name: "Mercedes Sprinter 317 CDI • Skříň + Čelo",
    year: "2020–2026",
    engine: "2.0 CDI",
    type: "skrin-celo",
    pallets: 8,
    lengthCm: 430,
    widthCm: 215,
    wheelArchCm: null,
    payloadKg: 690,
    consumption: 11.9
  },
  {
    id: "iveco-daily-30",
    name: "Iveco Daily 35S18 • 3.0 HPI 10pal",
    year: "2018–2026",
    engine: "3.0 HPI 180k",
    type: "plachta-pony",
    pallets: 10,
    lengthCm: 490,
    widthCm: 222,
    wheelArchCm: null,
    payloadKg: 780,
    consumption: 12.6
  },
  {
    id: "pod-25t",
    name: "Dodávka do 2,49t (Bez tachografu)",
    year: "2021–2026",
    engine: "2.0 dCi (Pod 2,5t)",
    type: "plechovka",
    pallets: 4,
    lengthCm: 370,
    widthCm: 187,
    wheelArchCm: 142,
    payloadKg: 450,
    consumption: 8.9
  }
];

window.APP = {
  eurRate: 25.28,
  eurRateDate: "ČNB",
  bankSpread: 0.70,
  currentFeatureTopic: "",

  WANT_PROMPTS: {
    "tachograf.html": {
      title: "Automatické stahování dat z digitálních tachografů na dálku",
      desc: "Chtěl bys, aby se data z karet řidičů a tachografů stahovala automaticky vzduchem bez nutnosti připojovat auto kabelem?"
    },
    "spedice-check.html": {
      title: "Automatický lustr nových spedic přímo v e-mailu a WhatsAppu",
      desc: "Chtěl bys dostávat okamžité varování před neplatiči a rizikovými zprostředkovateli hned při příchodu objednávky?"
    },
    "rentgen.html": {
      title: "Rentgen zakázek přímo integrovaný do Raalu a Timocomu",
      desc: "Chtěl bys jedním klikem vidět čistý zisk u každé nabídky přímo v rozhraní přepravní burzy?"
    },
    "tetris.html": {
      title: "3D plánovač nakládky s vážením náprav na míru tvé flotile",
      desc: "Chtěl bys přesný 3D plán nakládky s exportem plánu pro skladníka a kontrolou německých vah?"
    },
    "zakazky.html": {
      title: "Týdenní přísun ověřených přímých výrobců z tvého regionu",
      desc: "Chtěl bys každý týden 10 nových ověřených kontaktů na expedice fabrik, které platí do 14 dnů přímo tobě?"
    },
    "dispecink.html": {
      title: "Kompletní dispečerský systém pro celou flotilu na míru",
      desc: "Chtěl bys propojit nástěnku s GPS sledováním, SMS notifikacemi pro řidiče a fakturací na jeden klik?"
    },
    "trasy.html": {
      title: "Automatické párování volných aut s nabídkami z burz",
      desc: "Chtěl bys, aby dispečink sám vyhledal nejvýhodnější náklad pro končící dodávku bez zdlouhavého hledání?"
    },
    "sledovani.html": {
      title: "Zákaznický sledovací portál s vlastním logem tvé firmy",
      desc: "Chtěl bys klientům posílat sledovací odkaz s tvou doménou, logem a automatickým potvrzením doručení?"
    },
    "diety.html": {
      title: "Automatické generování cesťáků a diet pro účetní",
      desc: "Chtěl bys exportovat hotové cesťáky a diety přímo do Pohody nebo Money S3 jedním klikem?"
    },
    "skener.html": {
      title: "Okamžité vytěžení CMR z fotky řidiče a odeslání spedici",
      desc: "Chtěl bys, aby vyfocený CMR řidičem automaticky odešel spedici k proplacení ještě před návratem z jízdy?"
    },
    "objednavky.html": {
      title: "Automatické generování objednávek a smluv na míru",
      desc: "Chtěl bys vytvářet závazné přepravní smlouvy a potvrzení objednávek za 15 sekund?"
    },
    "vyplaty.html": {
      title: "Soukromý portál pro řidiče s živým výpočtem výplaty a bonusu za naftu",
      desc: "Chtěl bys, aby řidič v mobilu po každé jízdě viděl svou narůstající výplatu a odměnu za ušetřenou naftu?"
    },
    "nafta.html": {
      title: "Automatická SMS řidiči před hranicemi, kde a na jakou kartu natankovat",
      desc: "Chtěl bys, aby systém řidiči podle trasy sám poslal SMS s nejlevnější pumpou a kartou po cestě?"
    },
    "upominky.html": {
      title: "Automatické hlídání neplatičů napojené na firemní banku",
      desc: "Chtěl bys, aby systém sám hlídal splatnosti faktur v bance a posílal upomínky dlužníkům automaticky?"
    }
  },

  // 20 reálných firem a skladů pro okamžitý našeptávač v dispečinku
  DEFAULT_COMPANIES: [
    { name: "Škoda Auto a.s.", addr: "tř. Václava Klementa 869", city: "CZ 29301 Mladá Boleslav" },
    { name: "Continental Barum s.r.o.", addr: "Objízdná 1628", city: "CZ 76502 Otrokovice" },
    { name: "Continental Automotive Czech Republic s.r.o.", addr: "Hradecká 1092", city: "CZ 50601 Jičín" },
    { name: "ContiTech Transportbandsystem GmbH", addr: "Breslauer Str. 14", city: "DE 37154 Northeim" },
    { name: "Doosan Bobcat Manufacturing s.r.o.", addr: "Kodetky 1810", city: "CZ 26312 Dobříš" },
    { name: "Miba Sinter Slovakia s.r.o.", addr: "Nábrežie Oravy 2222", city: "SK 02601 Dolný Kubín" },
    { name: "Robert Bosch, spol. s r.o.", addr: "Roberta Bosche 2678", city: "CZ 37004 České Budějovice" },
    { name: "Brose CZ spol. s r.o.", addr: "Průmyslová 200", city: "CZ 74221 Kopřivnice" },
    { name: "Hella Autotechnik Nova, s.r.o.", addr: "Družstevní 338/16", city: "CZ 78985 Mohelnice" },
    { name: "Varroc Lighting Systems, s.r.o.", addr: "Suvorovova 195", city: "CZ 74242 Šenov u Nového Jičína" },
    { name: "Magna Exteriors (Bohemia) s.r.o.", addr: "Průmyslová zóna Jih", city: "CZ 46001 Liberec" },
    { name: "Foxconn CZ s.r.o.", addr: "U Zámečku 27", city: "CZ 53201 Pardubice" },
    { name: "TPCA / Toyota Motor Manufacturing CZ", addr: "Průmyslová zóna Ovčáry", city: "CZ 28002 Kolín" },
    { name: "Hyundai Motor Manufacturing Czech s.r.o.", addr: "Průmyslová zóna Nošovice", city: "CZ 73951 Nižní Lhoty" },
    { name: "IVECO Czech Republic, a.s.", addr: "Dobrovského 74", city: "CZ 56601 Vysoké Mýto" },
    { name: "DHL Supply Chain (CTPark Bor)", addr: "Nová Hospoda 18", city: "CZ 34802 Bor u Tachova" },
    { name: "DB Schenker (Logistické centrum Rudná)", addr: "Za Panskou zahradou 1018", city: "CZ 25219 Rudná u Prahy" },
    { name: "DSV Road a.s. (Terminál Modletice)", addr: "Modletice 135", city: "CZ 25101 Říčany" },
    { name: "Amazon.com (PRG2 Dobrovíz)", addr: "Komerční zóna 300", city: "CZ 25261 Dobrovíz" },
    { name: "Volkswagen AG (Werk Wolfsburg)", addr: "Berliner Ring 2", city: "DE 38440 Wolfsburg" }
  ],

  // Globální přepínač Tmavý / Světlý režim (ovládá se z dispecink.html a přenáší se na celý web)
  getThemeMode() {
    return localStorage.getItem("dodavkari_theme_mode") || "dark";
  },

  toggleThemeMode() {
    const next = this.getThemeMode() === "dark" ? "light" : "dark";
    localStorage.setItem("dodavkari_theme_mode", next);
    this.applyThemeMode();
    return next;
  },

  applyBackgroundLayer() {
    const cfg = this.getBgConfig();
    const isLight = this.getThemeMode() === "light";
    let layer = document.getElementById("global-bg-layer");
    if (!layer) {
      layer = document.createElement("div");
      layer.id = "global-bg-layer";
      document.body.prepend(layer);
    }
    if (!cfg.enabled) {
      layer.style.display = "none";
      return;
    }
    const pageName = (location.pathname.split("/").pop() || "index.html").split("?")[0];
    const imgUrl = (cfg.pageImages && cfg.pageImages[pageName]) || cfg.defaultImage;

    // V tmavém režimu tmavý přechod, ve světlém režimu čistý téměř bílý závoj
    const grad = isLight
      ? `linear-gradient(rgba(250, 250, 252, 0.94), rgba(242, 244, 247, 0.90))`
      : `linear-gradient(rgba(0, 0, 0, ${cfg.topAlpha}), rgba(0, 0, 0, ${cfg.bottomAlpha}))`;

    layer.style.cssText = `
      position: fixed;
      inset: -24px;
      z-index: -1;
      pointer-events: none;
      background-image: ${grad}, url('${imgUrl}');
      background-size: cover;
      background-position: center;
      background-repeat: no-repeat;
      filter: blur(${cfg.blurPx}px);
      transform: scale(1.04);
    `;
  },

  applyThemeMode() {
    const mode = this.getThemeMode();
    this.applyBackgroundLayer();
    let lightStyle = document.getElementById("light-mode-overrides");

    if (mode === "light") {
      if (!lightStyle) {
        lightStyle = document.createElement("style");
        lightStyle.id = "light-mode-overrides";
        lightStyle.textContent = `
          body { background-color: #F7F7F9 !important; color: #111827 !important; }
          header { background-color: rgba(255, 255, 255, 0.95) !important; border-bottom: 1px solid #E5E7EB !important; }
          .trukon-card {
            background: radial-gradient(120% 100% at 50% 0%, rgba(255, 85, 38, 0.08) 0%, #FFFFFF 62%) !important;
            border: 1px solid rgba(224, 53, 16, 0.25) !important;
            box-shadow: 0 12px 28px -8px rgba(17, 24, 39, 0.08) !important;
          }
          .trukon-card-subtle {
            background: #FFFFFF !important;
            border: 1px solid #E5E7EB !important;
            box-shadow: 0 4px 12px rgba(17, 24, 39, 0.04) !important;
          }
          /* Čitelné tmavé písmo na světlém podkladu */
          .text-white, .text-zinc-100, .text-zinc-200 { color: #111827 !important; }
          .text-zinc-300 { color: #374151 !important; }
          .text-zinc-400, .text-zinc-500 { color: #6B7280 !important; }
          /* Výrazné červeno-oranžové detaily ve světlém režimu */
          .text-orange-300, .text-orange-400, .text-amber-300, .text-amber-400 { color: #D93814 !important; }
          .text-emerald-300, .text-emerald-400 { color: #047857 !important; }
          .text-red-200, .text-red-300, .text-red-400 { color: #B91C1C !important; }
          /* Vnitřní boxy, vstupy a tabulky */
          .bg-\\[\\#141518\\], .bg-\\[\\#141518\\]\\/90, .bg-\\[\\#141518\\]\\/95,
          .bg-\\[\\#1C1D22\\], .bg-\\[\\#18191D\\], .bg-\\[\\#111214\\],
          .bg-\\[\\#0B1522\\], .bg-\\[\\#0B1B15\\], .bg-\\[\\#101E30\\], .bg-\\[\\#0F241C\\],
          .bg-zinc-900, .bg-black\\/40, .bg-white\\/5, .bg-white\\/10 {
            background-color: #F3F4F6 !important;
            border-color: #D1D5DB !important;
            color: #111827 !important;
          }
          .border-white\\/10, .border-white\\/15, .border-white\\/20 { border-color: #E5E7EB !important; }
          /* Zachování bílého textu na červeno-oranžových tlačítkách */
          .trukon-btn, .trukon-btn *, .trukon-pill-active, .trukon-pill-active *, .trukon-progress-bar, .trukon-progress-bar * {
            color: #FFFFFF !important;
          }
        `;
        document.head.appendChild(lightStyle);
      }
    } else if (lightStyle) {
      lightStyle.remove();
    }
  },

  mountWantFooter() {
    const page = (location.pathname.split("/").pop() || "index.html").split("?")[0];
    const info = this.WANT_PROMPTS[page];
    if (!info || document.getElementById("auto-want-box")) return;

    const main = document.querySelector("main");
    if (!main) return;

    const box = document.createElement("div");
    box.id = "auto-want-box";
    box.className = "mt-8 trukon-card-subtle rounded-3xl p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 no-print";
    box.innerHTML = `
      <div class="space-y-1 max-w-2xl">
        <div class="text-xs font-semibold text-orange-300 uppercase">Řešení na míru pro tvoji firmu</div>
        <div class="text-base font-bold text-white">${info.title}</div>
        <p class="text-sm text-zinc-300 leading-relaxed">${info.desc}</p>
      </div>
      <button onclick="window.APP.openWantModal('${info.title.replace(/'/g, "")}')"
              class="shrink-0 px-5 py-3 rounded-2xl text-sm font-semibold trukon-btn transition">
        Napište mi na WhatsApp
      </button>
    `;
    main.appendChild(box);
  },

  getBgConfig() {
    const saved = JSON.parse(localStorage.getItem("dodavkari_bg_config_v1") || "null");
    return saved ? { ...window.BG_DEFAULT_CONFIG, ...saved, pageImages: { ...window.BG_DEFAULT_CONFIG.pageImages, ...(saved.pageImages || {}) } } : window.BG_DEFAULT_CONFIG;
  },

  svg(name, cls = "w-5 h-5") {
    const paths = {
      van: `<path d="M3 16V8a2 2 0 012-2h9l4 4v6h-2m-13 0h2m11 0a2 2 0 11-4 0m4 0a2 2 0 10-4 0M5 16a2 2 0 104 0m-4 0a2 2 0 114 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      shield: `<path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3zm-2.5 9l2 2 4-4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      calc: `<path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      clock: `<circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      box: `<path d="M21 8l-9-5-9 5v8l9 5 9-5V8zM3.3 7.3L12 12l8.7-4.7M12 22V12" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      factory: `<path d="M3 21h18V9l-5 3V9l-5 3V5H3v16zm4-4h2m4 0h2m4 0h2" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      receipt: `<path d="M5 3v18l3-2 2 2 2-2 2 2 2-2 3 2V3H5zm4 5h6m-6 4h6m-6 4h4" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      pin: `<path d="M12 21s-7-5.5-7-11a7 7 0 1114 0c0 5.5-7 11-7 11z" stroke="currentColor" stroke-width="1.8"/><circle cx="12" cy="10" r="2.5" stroke="currentColor" stroke-width="1.8"/>`,
      scan: `<path d="M4 8V6a2 2 0 012-2h2M4 16v2a2 2 0 002 2h2m8-16h2a2 2 0 012 2v2m-4 12h2a2 2 0 002-2v-2M7 12h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      chart: `<path d="M4 19h16M7 15V9m5 6V5m5 10v-3" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      board: `<rect x="3" y="4" width="18" height="16" rx="2" stroke="currentColor" stroke-width="1.8"/><path d="M9 4v16M15 4v16" stroke="currentColor" stroke-width="1.8"/>`,
      map: `<path d="M9 18l-6 3V6l6-3m0 15l6 3m-6-3V3m6 18l6-3V3l-6 3m0 15V6" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`,
      user: `<circle cx="12" cy="8" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M4 20c1.5-4 14.5-4 16 0" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      sun: `<circle cx="12" cy="12" r="4" stroke="currentColor" stroke-width="1.8"/><path d="M12 2v2m0 16v2M4.93 4.93l1.41 1.41m11.32 11.32l1.41 1.41M2 12h2m16 0h2M4.93 19.07l1.41-1.41m11.32-11.32l1.41-1.41" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
      moon: `<path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>`
    };
    return `<svg class="${cls}" fill="none" viewBox="0 0 24 24">${paths[name] || paths.box}</svg>`;
  },

  injectThemeStyles() {
    if (document.getElementById("trukon-theme-styles")) return;
    const st = document.createElement("style");
    st.id = "trukon-theme-styles";
    st.textContent = `
      body {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        background-color: #0d0e11 !important;
        background-image: none !important; /* Pevné matné pozadí stránky bez přechodu */
        color: #F4F5F7 !important;
        -webkit-font-smoothing: antialiased;
      }
      .font-mono-num, .font-mono, pre {
        font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif !important;
        font-variant-numeric: tabular-nums;
      }
      /* Bohatý gradient a hloubka přímo na kartách a boxech */
      .trukon-card {
        background: radial-gradient(120% 100% at 50% 0%, rgba(235, 75, 35, 0.18) 0%, rgba(24, 24, 28, 0.98) 58%, #16171A 100%) !important;
        border: 1px solid rgba(255, 100, 55, 0.25) !important;
        box-shadow: 0 16px 36px -12px rgba(0, 0, 0, 0.75) !important;
      }
      .trukon-card-subtle {
        background: linear-gradient(180deg, #1B1C20 0%, #141518 100%) !important;
        border: 1px solid rgba(255, 255, 255, 0.09) !important;
      }
      .trukon-pill-active {
        background: linear-gradient(135deg, #FF5526 0%, #D93814 100%) !important;
        color: #FFFFFF !important;
        border-color: rgba(255, 120, 80, 0.5) !important;
        box-shadow: 0 4px 16px rgba(255, 77, 30, 0.35) !important;
      }
      .trukon-btn {
        background: linear-gradient(135deg, #FF5829 0%, #E03510 100%) !important;
        color: #FFFFFF !important;
        font-weight: 600 !important;
        box-shadow: 0 6px 20px rgba(255, 77, 30, 0.32) !important;
      }
      .trukon-btn:hover { filter: brightness(1.08); }
      /* Šrafovaná grafika pruhu marže v rentgen.html */
      .trukon-progress-bar {
        background: repeating-linear-gradient(
          -45deg,
          rgba(255, 85, 38, 0.28),
          rgba(255, 85, 38, 0.28) 6px,
          rgba(255, 85, 38, 0.10) 6px,
          rgba(255, 85, 38, 0.10) 12px
        ), linear-gradient(90deg, rgba(255,77,30,0.2) 0%, #FF5526 100%);
      }
      .text-xs { font-size: 0.84rem !important; line-height: 1.35rem !important; }
      .text-\\[11px\\], .text-\\[10px\\] { font-size: 0.78rem !important; line-height: 1.2rem !important; }
    `;
    document.head.appendChild(st);
  },

  initCnbRate() {
    const cached = JSON.parse(localStorage.getItem("dodavkari_cnb_rate") || "null");
    const today = new Date().toISOString().slice(0, 10);
    if (cached && cached.date === today && cached.rate > 20 && cached.rate < 32) {
      this.eurRate = cached.rate;
      this.eurRateDate = `${cached.cnbDate || today} (ČNB)`;
    } else {
      fetch("https://api.frankfurter.app/latest?from=EUR&to=CZK")
        .then(r => r.json())
        .then(d => {
          if (d?.rates?.CZK) {
            this.eurRate = Math.round(d.rates.CZK * 100) / 100;
            this.eurRateDate = `${d.date} (ČNB)`;
            localStorage.setItem("dodavkari_cnb_rate", JSON.stringify({ date: today, rate: this.eurRate, cnbDate: d.date }));
            const b = document.getElementById("hdr-eur-badge");
            if (b) b.textContent = `1 € = ${this.eurRate.toFixed(2).replace(".", ",")} Kč`;
            if (typeof window.onRateLoaded === "function") window.onRateLoaded(this.eurRate);
          }
        })
        .catch(() => {});
    }
  },

  trackEvent(action, label) {
    try {
      const log = JSON.parse(localStorage.getItem("dodavkari_analytics") || "{}");
      const key = `${action}:${label}`;
      log[key] = (log[key] || 0) + 1;
      localStorage.setItem("dodavkari_analytics", JSON.stringify(log));
    } catch (e) {}
  },

  getVans() {
    const custom = JSON.parse(localStorage.getItem("custom_vans_list") || "[]");
    return [...window.DEFAULT_VANS, ...custom];
  },

  getActiveVan() {
    const vans = this.getVans();
    const id = localStorage.getItem("van_id") || vans[0].id;
    return vans.find(v => v.id === id) || vans[0];
  },

  setActiveVan(id) {
    if (id === "__add_custom__") {
      this.openCustomVanModal();
      document.getElementById("global-van-select").value = this.getActiveVan().id;
      return;
    }
    localStorage.setItem("van_id", id);
    if (typeof window.onVanChanged === "function") {
      window.onVanChanged(this.getActiveVan());
    }
  },

  getRole() {
    return localStorage.getItem("app_role") || "dispecer";
  },

  setRole(role) {
    localStorage.setItem("app_role", role);
    document.querySelectorAll(".hdr-role-btn").forEach(b => {
      const active = b.getAttribute("data-role") === role;
      b.className = active
        ? "hdr-role-btn px-3.5 py-1.5 rounded-full text-sm font-semibold trukon-pill-active transition"
        : "hdr-role-btn px-3.5 py-1.5 rounded-full text-sm font-medium text-zinc-400 hover:text-white transition";
    });
    if (typeof window.onRoleChanged === "function") {
      window.onRoleChanged(role);
    }
  },

  openCustomVanModal() {
    const m = document.getElementById("custom-van-modal");
    m.classList.remove("hidden");
    m.classList.add("flex");
  },

  closeCustomVanModal() {
    const m = document.getElementById("custom-van-modal");
    m.classList.add("hidden");
    m.classList.remove("flex");
  },

  saveCustomVan(e) {
    e.preventDefault();
    const name = document.getElementById("cv-name").value.trim();
    const year = document.getElementById("cv-year").value.trim() || "2022";
    const engine = document.getElementById("cv-engine").value.trim() || "2.3 dCi";
    const type = document.getElementById("cv-type").value;
    const len = Number(document.getElementById("cv-len").value) || 420;
    const wid = Number(document.getElementById("cv-wid").value) || 220;
    const kg = Number(document.getElementById("cv-kg").value) || 950;
    const cons = Number(document.getElementById("cv-cons").value) || 11.0;

    const newVan = {
      id: "custom-" + Date.now(),
      name: `${name} (${year})`,
      year,
      engine,
      type,
      pallets: Math.floor((len * wid) / (120 * 80)),
      lengthCm: len,
      widthCm: wid,
      wheelArchCm: type === "plechovka" ? 142 : null,
      payloadKg: kg,
      consumption: cons
    };

    const custom = JSON.parse(localStorage.getItem("custom_vans_list") || "[]");
    custom.push(newVan);
    localStorage.setItem("custom_vans_list", JSON.stringify(custom));
    localStorage.setItem("van_id", newVan.id);

    this.closeCustomVanModal();
    location.reload();
  },

  onContactPrefChange(val) {
    const btn = document.getElementById("wa-submit-btn");
    if (!btn) return;
    if (val === "call") {
      btn.textContent = "Zavolejte mi";
    } else {
      btn.textContent = "Napište mi na WhatsApp";
    }
  },

  openWantModal(featureTitle) {
    this.currentFeatureTopic = featureTitle;
    this.trackEvent("want_click", featureTitle);
    document.getElementById("wa-feature-name").textContent = featureTitle;
    document.getElementById("wa-name").value = localStorage.getItem("lead_name") || "";
    document.getElementById("wa-phone").value = localStorage.getItem("lead_phone") || "";
    document.getElementById("wa-company").value = localStorage.getItem("lead_company") || "";

    const pref = document.getElementById("wa-pref");
    if (pref) {
      pref.value = "whatsapp";
      this.onContactPrefChange("whatsapp");
    }

    const formView = document.getElementById("wa-form-view");
    const successView = document.getElementById("wa-success-view");
    if (formView) formView.classList.remove("hidden");
    if (successView) successView.classList.add("hidden");

    const modal = document.getElementById("wa-modal");
    modal.classList.remove("hidden");
    modal.classList.add("flex");
  },

  closeWantModal() {
    const modal = document.getElementById("wa-modal");
    modal.classList.add("hidden");
    modal.classList.remove("flex");
  },

  submitWantModal(e) {
    e.preventDefault();
    const name = document.getElementById("wa-name").value.trim();
    const phone = document.getElementById("wa-phone").value.trim();
    const company = document.getElementById("wa-company").value.trim();
    const pref = document.getElementById("wa-pref")?.value || "whatsapp";
    const isCall = pref === "call";
    const van = this.getActiveVan();

    // 1. Uložit data
    localStorage.setItem("lead_name", name);
    localStorage.setItem("lead_phone", phone);
    localStorage.setItem("lead_company", company);

    const savedLeads = JSON.parse(localStorage.getItem("dodavkari_saved_leads") || "[]");
    savedLeads.push({
      date: new Date().toISOString(),
      topic: this.currentFeatureTopic,
      name,
      phone,
      company,
      van: van.name,
      contactPreference: isCall ? "Zavolejte mi" : "Napište mi na WhatsApp"
    });
    localStorage.setItem("dodavkari_saved_leads", JSON.stringify(savedLeads));

    this.trackEvent("want_submit", `${this.currentFeatureTopic} (${pref})`);

    // 2. Odeslání do e-mailu přes bezplatný FormSubmit.co (pokud je vyplněn LEADS_EMAIL)
    const hasEmail = Boolean(window.LEADS_EMAIL && window.LEADS_EMAIL.includes("@"));
    if (hasEmail) {
      try {
        fetch(`https://formsubmit.co/ajax/${encodeURIComponent(window.LEADS_EMAIL.trim())}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
          },
          body: JSON.stringify({
            "Téma poptávky": this.currentFeatureTopic,
            "Jméno": name,
            "Telefon": phone,
            "Firma / počet aut": company || "Neuvedeno",
            "Dodávka": van.name,
            "Způsob kontaktu": isCall ? "Telefonní hovor (Zavolejte mi)" : "WhatsApp zpráva",
            "_subject": `Nová poptávka z webu: ${name} (${phone}) - ${this.currentFeatureTopic}`,
            "_template": "table"
          })
        }).catch(err => console.log("FormSubmit error:", err));
      } catch (err) {}
    }

    // 3. Odeslání do Google Tabulky (pokud je vyplněn LEADS_WEBHOOK z Google Apps Script)
    const hasWebhook = Boolean(window.LEADS_WEBHOOK && window.LEADS_WEBHOOK.startsWith("http"));
    if (hasWebhook) {
      try {
        fetch(window.LEADS_WEBHOOK, {
          method: "POST",
          mode: "no-cors",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            date: new Date().toLocaleString("cs-CZ"),
            topic: this.currentFeatureTopic,
            name,
            phone,
            company: company || "Neuvedeno",
            van: van.name,
            contactPreference: isCall ? "Zavolejte mi" : "Napište mi na WhatsApp"
          })
        }).catch(err => console.log("Google Sheets webhook error:", err));
      } catch (err) {}
    }

    // 4. WhatsApp: Otevřeme, pokud návštěvník zvolil WhatsApp, nebo jako spolehlivou zálohu
    if (!isCall || (!hasEmail && !hasWebhook)) {
      const intro = isCall
        ? `Dobrý den, prosím o ZAVOLÁNÍ na telefon: ${phone}.\n`
        : `Dobrý den, píšu přes WhatsApp ohledně poptávky.\n`;

      const msg = `${intro}` +
                  `Téma: ${this.currentFeatureTopic}\n` +
                  `Jméno: ${name}\n` +
                  `Telefon: ${phone}\n` +
                  (company ? `Firma: ${company}\n` : ``) +
                  `Dodávka: ${van.name}\n` +
                  `Způsob kontaktu: ${isCall ? 'Telefonní hovor (Zavolejte mi)' : 'Zpráva na WhatsApp'}`;

      window.open(`https://wa.me/${window.WHATSAPP_PHONE}?text=${encodeURIComponent(msg)}`, "_blank");
    }

    // 5. Zobrazit "Děkuji za zájem." přímo ve formuláři
    const formView = document.getElementById("wa-form-view");
    const successView = document.getElementById("wa-success-view");
    if (formView && successView) {
      formView.classList.add("hidden");
      successView.classList.remove("hidden");
      setTimeout(() => {
        this.closeWantModal();
      }, 3500);
    } else {
      alert("Děkuji za zájem.");
      this.closeWantModal();
    }
  },

  mountHeader(isHome = false) {
    this.injectThemeStyles();
    this.applyThemeMode();
    this.applyBackgroundLayer();
    this.initCnbRate();
    if (!isHome) {
      setTimeout(() => this.mountWantFooter(), 50);
    }
    const van = this.getActiveVan();
    const vans = this.getVans();
    const role = this.getRole();

    const header = document.createElement("header");
    header.className = "sticky top-0 z-40 bg-[#141518]/95 backdrop-blur-md border-b border-white/10";
    header.innerHTML = `
      <div class="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-3">
        
        <!-- Logo a název -->
        <div class="flex items-center gap-3">
          ${!isHome ? `
            <a href="index.html" class="text-sm font-medium text-zinc-300 hover:text-white bg-white/5 hover:bg-white/10 px-3 py-1.5 rounded-full flex items-center gap-1.5 transition">
              <span>←</span> <span>Přehled</span>
            </a>
          ` : ``}
          <a href="index.html" class="flex items-center gap-2.5 font-bold text-white tracking-tight text-base sm:text-lg">
            <span class="w-8 h-8 rounded-xl trukon-btn flex items-center justify-center text-white">${this.svg('van', 'w-4 h-4')}</span>
            <span>Nástroje pro dodávkáře</span>
          </a>
        </div>

        <!-- Přepínač Kdo jsi: Řidič / Dispečer / Majitel -->
        <div class="inline-flex p-1 rounded-full bg-[#1C1D22] border border-white/10">
          <button onclick="window.APP.setRole('ridic')" data-role="ridic" class="hdr-role-btn px-3.5 py-1.5 rounded-full text-sm ${role === 'ridic' ? 'font-semibold trukon-pill-active' : 'font-medium text-zinc-400 hover:text-white'} transition">
            Řidič
          </button>
          <button onclick="window.APP.setRole('dispecer')" data-role="dispecer" class="hdr-role-btn px-3.5 py-1.5 rounded-full text-sm ${role === 'dispecer' ? 'font-semibold trukon-pill-active' : 'font-medium text-zinc-400 hover:text-white'} transition">
            Dispečer
          </button>
          <button onclick="window.APP.setRole('majitel')" data-role="majitel" class="hdr-role-btn px-3.5 py-1.5 rounded-full text-sm ${role === 'majitel' ? 'font-semibold trukon-pill-active' : 'font-medium text-zinc-400 hover:text-white'} transition">
            Majitel
          </button>
        </div>

        <!-- Pravá část hlavičky: Nástěnka + Kurz + Výběr auta -->
        <div class="hidden lg:flex items-center gap-2.5">
          <a href="dispecink.html" class="text-sm font-semibold text-white bg-white/10 hover:bg-white/15 border border-white/15 px-3.5 py-1.5 rounded-full flex items-center gap-1.5 transition">
            ${this.svg('board', 'w-4 h-4 text-orange-400')}
            <span>Nástěnka</span>
          </a>
          <span id="hdr-eur-badge" class="text-sm font-medium text-orange-300 bg-orange-500/10 border border-orange-500/25 px-3 py-1.5 rounded-full">
            1 € = ${this.eurRate.toFixed(2).replace(".", ",")} Kč
          </span>
          <select id="global-van-select" class="bg-[#1C1D22] hover:bg-zinc-800 text-zinc-100 text-sm font-medium rounded-full border border-white/10 px-3.5 py-1.5 max-w-[240px] truncate focus:outline-none cursor-pointer transition">
            ${vans.map(v => `
              <option value="${v.id}" ${v.id === van.id ? "selected" : ""}>
                ${v.name} (${v.payloadKg} kg)
              </option>
            `).join("")}
            <option value="__add_custom__">+ Přidat vlastní auto...</option>
          </select>
        </div>

      </div>
    `;
    document.body.prepend(header);

    const modals = document.createElement("div");
    modals.innerHTML = `
      <!-- Kontaktní Modál (Uložení poptávky) -->
      <div id="wa-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
        <div class="trukon-card rounded-3xl max-w-md w-full p-6 shadow-2xl relative">
          
          <button onclick="window.APP.closeWantModal()" class="absolute top-5 right-5 text-zinc-400 hover:text-white text-lg px-2">✕</button>

          <!-- Formulář -->
          <div id="wa-form-view" class="space-y-4">
            <div>
              <span class="text-sm font-semibold text-orange-300 bg-orange-500/15 border border-orange-500/30 px-3 py-1 rounded-full">Řešení na míru</span>
              <h3 class="text-xl font-bold text-white mt-3">Napište mi na WhatsApp</h3>
              <p class="text-sm text-zinc-300 mt-1">
                Téma: <strong id="wa-feature-name" class="text-white"></strong>
              </p>
            </div>
            
            <form onsubmit="window.APP.submitWantModal(event)" class="space-y-3">
              <input type="text" id="wa-name" required placeholder="Tvoje jméno *" class="w-full bg-[#141518] border border-white/15 rounded-xl px-4 py-3 text-base text-white focus:border-orange-500 focus:outline-none">
              <input type="tel" id="wa-phone" required placeholder="Telefon *" class="w-full bg-[#141518] border border-white/15 rounded-xl px-4 py-3 text-base text-white focus:border-orange-500 focus:outline-none">
              <input type="text" id="wa-company" placeholder="Firma / počet aut (nepovinné)" class="w-full bg-[#141518] border border-white/15 rounded-xl px-4 py-3 text-base text-white focus:border-orange-500 focus:outline-none">
              
              <div>
                <label class="block text-xs text-zinc-400 mb-1">Způsob kontaktu</label>
                <select id="wa-pref" onchange="window.APP.onContactPrefChange(this.value)" class="w-full bg-[#141518] border border-white/15 rounded-xl px-4 py-3 text-base text-white font-medium focus:border-orange-500 focus:outline-none cursor-pointer">
                  <option value="whatsapp" selected>Napište mi na WhatsApp</option>
                  <option value="call">Zavolejte mi</option>
                </select>
              </div>
              
              <button type="submit" id="wa-submit-btn" class="w-full trukon-btn text-base py-3.5 rounded-xl transition">
                Napište mi na WhatsApp
              </button>
              <div class="text-center text-xs text-zinc-400 pt-1">Ozvu se do 2 hodin od vyplnění</div>
            </form>
          </div>

          <!-- Potvrzení: Děkuji za zájem -->
          <div id="wa-success-view" class="hidden text-center py-6 space-y-3">
            <div class="w-12 h-12 mx-auto rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-2xl font-bold">✓</div>
            <h3 class="text-2xl font-bold text-white">Děkuji za zájem.</h3>
            <div class="text-xs text-zinc-400">Ozvu se do 2 hodin od vyplnění.</div>
            <button type="button" onclick="window.APP.closeWantModal()" class="mt-4 px-6 py-2 rounded-xl bg-white/10 hover:bg-white/15 text-white text-xs font-semibold transition">
              Zavřít
            </button>
          </div>

        </div>
      </div>

      <!-- Modál: Přidat vlastní auto -->
      <div id="custom-van-modal" class="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 hidden items-center justify-center p-4">
        <div class="trukon-card rounded-3xl max-w-md w-full p-6 shadow-2xl">
          <div class="flex items-center justify-between mb-4">
            <h3 class="text-xl font-bold text-white">Přidat vlastní dodávku</h3>
            <button onclick="window.APP.closeCustomVanModal()" class="text-zinc-400 hover:text-white px-2">✕</button>
          </div>
          <form onsubmit="window.APP.saveCustomVan(event)" class="space-y-3 text-sm">
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-zinc-300 mb-1">Značka a model *</label>
                <input type="text" id="cv-name" required placeholder="např. Peugeot Boxer" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
              <div>
                <label class="block text-zinc-300 mb-1">Rok výroby *</label>
                <input type="text" id="cv-year" required placeholder="např. 2022" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-zinc-300 mb-1">Motor</label>
                <input type="text" id="cv-engine" placeholder="2.2 HDi" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
              <div>
                <label class="block text-zinc-300 mb-1">Typ nástavby</label>
                <select id="cv-type" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
                  <option value="plachta-pony">Plachta (Spaní nahoře)</option>
                  <option value="plachta-backsleeper">Plachta (Zadní spaní)</option>
                  <option value="plechovka">Plechovka (S podběhy)</option>
                  <option value="skrin-celo">Skříň + Hydr. čelo</option>
                </select>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-zinc-300 mb-1">Ložná délka (cm)</label>
                <input type="number" id="cv-len" value="420" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
              <div>
                <label class="block text-zinc-300 mb-1">Ložná šířka (cm)</label>
                <input type="number" id="cv-wid" value="220" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
            </div>
            <div class="grid grid-cols-2 gap-3">
              <div>
                <label class="block text-zinc-300 mb-1">Nosnost (kg)</label>
                <input type="number" id="cv-kg" value="950" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
              <div>
                <label class="block text-zinc-300 mb-1">Spotřeba (l/100km)</label>
                <input type="number" step="0.1" id="cv-cons" value="11.0" class="w-full bg-[#141518] border border-white/15 rounded-xl px-3.5 py-2.5 text-white">
              </div>
            </div>
            <button type="submit" class="w-full trukon-btn py-3 rounded-xl mt-2">
              Uložit auto
            </button>
          </form>
        </div>
      </div>
    `;
    document.body.appendChild(modals);

    const sel = document.getElementById("global-van-select");
    if (sel) {
      sel.addEventListener("change", (e) => this.setActiveVan(e.target.value));
    }
  }
};
