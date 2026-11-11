// data.js - Reálná databáze dodávek, sazeb a nástrojů (100% lokální běh bez serveru)

window.DODAVKARI_DATA = {
  // Výchozí kurzy a konstanty (přepisují se živým API ČNB/ECB, pokud je uživatel online)
  defaults: {
    eurCzkMid: 25.25,
    bankSpreadCzk: 0.75, // Běžná marže banky na Deviza-Nákup oproti středu
    dieselPriceCz: 36.50,
    dieselPriceDe: 1.68, // EUR
    lastUpdated: "Aktuální sazby (2026)"
  },

  // Reálné profily dodávek na českých a slovenských silnicích
  vanProfiles: [
    {
      id: "master-10p-pony",
      name: "Renault Master 2.3 dCi — 10pal Plachta (Spaní nahoře Pony)",
      shortName: "Master 10pal (Pony)",
      category: "plachta-10",
      pallets: 10,
      lengthCm: 485,
      widthCm: 220,
      heightCm: 230,
      maxHeightCm: 250, // Zvedací střecha
      wheelArchWidthCm: null, // Valník má rovnou podlahu bez podběhů
      gvwKg: 3500,
      emptyWeightPaperKg: 2420,
      realReadyWeightKg: 2590, // S plnou 105l nádrží, řidičem 90kg, kurty a výbavou
      realPayloadKg: 910,
      avgConsumptionL: 11.8,
      loadedPenaltyL: 1.6, // + litrů na 100 km při plném naložení / větru
      tankLiters: 105,
      trapWarning: "Pozor: S plnou 105l nádrží, řidičem a výbavou zbývá reálně jen ~910 kg do 3 500 kg. Při zvednuté střeše na 250 cm přesáhneš ve Francii výšku 3,0 m (spadneš do drahého mýta Třídy 3!)."
    },
    {
      id: "master-8p-backsleeper",
      name: "Renault Master / Movano — 8pal Plachta (Zadní spaní za sedačkami)",
      shortName: "Master 8pal (Zadek)",
      category: "plachta-8",
      pallets: 8,
      lengthCm: 420,
      widthCm: 220,
      heightCm: 225,
      maxHeightCm: 240,
      wheelArchWidthCm: null,
      gvwKg: 3500,
      emptyWeightPaperKg: 2360,
      realReadyWeightKg: 2520,
      realPayloadKg: 980,
      avgConsumptionL: 11.2,
      loadedPenaltyL: 1.4,
      tankLiters: 105,
      trapWarning: "Zadní spací kabina (BackSleeper/Spojkar) posouvá těžiště nákladu víc dozadu. Těžké palety musí jít vždy dopředu ke kabině, jinak přetížíš zadní nápravu na německých vahách."
    },
    {
      id: "ducato-l4h2-plech",
      name: "Fiat Ducato / Boxer / Jumper L4H2 — Plechovka (5 EUR palet)",
      shortName: "Ducato L4H2 Plech",
      category: "plechovka",
      pallets: 5,
      lengthCm: 407,
      widthCm: 187,
      heightCm: 193,
      maxHeightCm: 193,
      wheelArchWidthCm: 142, // KRITICKÉ: Mezi podběhy jen 142 cm!
      gvwKg: 3500,
      emptyWeightPaperKg: 2050,
      realReadyWeightKg: 2190,
      realPayloadKg: 1310,
      avgConsumptionL: 9.4,
      loadedPenaltyL: 1.1,
      tankLiters: 90,
      trapWarning: "Šířka mezi podběhy je jen 142 cm! Dvě EUR palety (120×80) vedle sebe mezi podběhy NEPROJDOU (potřebují 160 cm). Výborná reálná nosnost (1 310 kg) a ve Francii vždy Třída 2."
    },
    {
      id: "sprinter-skrin-celo",
      name: "Mercedes Sprinter 317 CDI — 8pal Skříň + Hydraulické čelo",
      shortName: "Sprinter Skříň + Čelo",
      category: "skrin-celo",
      pallets: 8,
      lengthCm: 430,
      widthCm: 215,
      heightCm: 220,
      maxHeightCm: 220,
      wheelArchWidthCm: null,
      gvwKg: 3500,
      emptyWeightPaperKg: 2640,
      realReadyWeightKg: 2810, // Zadokolka + skříň + čelo 280 kg
      realPayloadKg: 690,
      avgConsumptionL: 12.1,
      loadedPenaltyL: 1.3,
      tankLiters: 93,
      trapWarning: "EXTRÉMNÍ PAST NA VÁHU: Zadní náhon + pevná skříň + hydraulické čelo (cca 280 kg) znamenají, že legálně uvezeš jen 690 kg! Jakákoliv běžná 1tunová zásilka znamená v Německu přeložení o >10 %."
    },
    {
      id: "iveco-daily-35c",
      name: "Iveco Daily 35S18 / 35C — 10pal Plachta (Rámové auto / Měchy)",
      shortName: "Iveco Daily 10pal",
      category: "plachta-10",
      pallets: 10,
      lengthCm: 490,
      widthCm: 222,
      heightCm: 235,
      maxHeightCm: 255,
      wheelArchWidthCm: null,
      gvwKg: 3500,
      emptyWeightPaperKg: 2550,
      realReadyWeightKg: 2720,
      realPayloadKg: 780,
      avgConsumptionL: 12.6,
      loadedPenaltyL: 1.8,
      tankLiters: 100,
      trapWarning: "Rámový podvozek na měchách si ani se 2 tunami nákladu 'neklekne', proto jde BALM/BAG v Německu po českých Iveco Daily jako slepice po flusu. Legální doložnost je jen 780 kg!"
    },
    {
      id: "ponizena-2490",
      name: "Speciál do 2,49t (Ponížená celková hmotnost — BEZ TACHOGRAFU)",
      shortName: "Speciál < 2.5t (Bez tacho)",
      category: "plechovka",
      pallets: 4,
      lengthCm: 370,
      widthCm: 187,
      heightCm: 193,
      maxHeightCm: 193,
      wheelArchWidthCm: 142,
      gvwKg: 2490,
      emptyWeightPaperKg: 1920,
      realReadyWeightKg: 2040,
      realPayloadKg: 450,
      avgConsumptionL: 8.9,
      loadedPenaltyL: 0.9,
      tankLiters: 80,
      trapWarning: "Legální obcházení povinného Smart Tachografu 2 (od 07/2026 pro mezinárodku nad 2,5t). Nemusíš držet 561čku/AETR, ale uvezeš papírově jen 450 kg expresního lehkého zboží!"
    }
  ],

  // 12 Nástrojů (Krabice na hlavní stránce)
  tools: [
    {
      id: "rentgen-poptavky",
      role: "dispecer",
      roleLabel: "DISPEČER",
      badge: "5 VTEŘIN",
      badgeColor: "amber",
      title: "Rentgen kšeftu z Raalu / Timocomu",
      subtitle: "Vyplatí se to vůbec vzít? Okamžitý přepočet čisté sazby Kč/km.",
      painQuote: "„Spedice nabízí 1 200 € za 1 100 km do Německa, 1 200 kg. V hlavě vidíš 30 000 Kč, ale po stržení kurzu banky, nafty a přeložení jsi v mínusu.“",
      image: "https://images.unsplash.com/photo-1519003722824-194d4455a60c?auto=format&fit=crop&w=900&q=80",
      svgType: "radar",
      livePreviewMetric: "Ztráta na kurzu banky (1 200 €):",
      livePreviewValue: "-900 Kč na 1 faktuře",
      freeFeatures: [
        "Živý kurz ČNB střed vs. reálný Deviza-Nákup tvé banky",
        "Okamžitá kontrola váhy podle vybrané dodávky (plná nádrž + řidič)",
        "Detekce pasti s vlekem (>3,5t mýto DE) a výšky plachty ve Francii"
      ],
      lockedFeature: {
        id: "lock-gps-nafta",
        label: "Automaticky načíst polohu auta a zůstatek nafty v nádrži z Webdispečinku / GPS Dozoru",
        note: "Ve veřejné verzi si kilometry přístavu zadáváš ručně. Ve firemní verzi systém sám ví, kde zrovna stojí tvoje nejbližší volné auto a kolik má v nádrži."
      }
    },
    {
      id: "paletovy-tetris",
      role: "dispecer",
      roleLabel: "DISPEČER",
      badge: "VIZUÁLNÍ LOŽNÁ PLOCHA",
      badgeColor: "emerald",
      title: "Paletový Tetris & Hlídač podběhů (Dokládky)",
      subtitle: "Vejde se tam ještě ta dokládka z Plzně a v jakém pořadí to naložit?",
      painQuote: "„Vezmeš 3 dokládky po cestě, ale u čela ti zůstane paleta, kterou máš skládat jako první, nebo ti v plechovce nevyjdou palety mezi podběhy.“",
      image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80",
      svgType: "grid",
      livePreviewMetric: "Podběhy u plechovky (Ducato/Boxer):",
      livePreviewValue: "Průjezd jen 142 cm",
      freeFeatures: [
        "Přesný půdorys podle tvé dodávky (10pal, 8pal, plechovka s podběhy)",
        "Skupiny vykládek A ➔ B ➔ C (hlídá, ať řidič nemusí na ulici vykládat půl auta)",
        "Živý součet vah palet + rozložení těžiště na zadní nápravu"
      ],
      lockedFeature: {
        id: "lock-whatsapp-planek",
        label: "Jedním klikem poslat řidiči do mobilu interaktivní plánek nakládky s adresami",
        note: "Tady si plánek stáhneš jako obrázek/PDF. Na míru to umíme napojit tak, že to řidiči rovnou pípne v jeho appce s navigací."
      }
    },
    {
      id: "tachograf-561",
      role: "dispecer",
      roleLabel: "DISPEČER / ŘIDIČ",
      badge: "NOVINKA 2026 (>2,5t)",
      badgeColor: "red",
      title: "Kalkulačka Tachografu 2,5–3,5t & Stihne to 1 řidič?",
      subtitle: "Reálný čas dojezdu expresu pod 561čkou vs. auto ponížené pod 2,5t.",
      painQuote: "„Od července 2026 platí v mezinárodce nad 2,5t tachograf a 561čka. Kdo dál počítá 1 300 km do Španělska na jeden zátah v jednom řidiči, zaplatí tisíce EUR.“",
      image: "https://images.unsplash.com/photo-1506521781263-d8422e82f27a?auto=format&fit=crop&w=900&q=80",
      svgType: "clock",
      livePreviewMetric: "Trasa 1 150 km v 1 řidiči pod 561:",
      livePreviewValue: "+10h 30m povinných pauz",
      freeFeatures: [
        "Přesný výpočet 4,5h jízdy / 45m pauzy a 9h/10h denního výkonu pro dodávky",
        "Porovnání: Jízda v 1 řidiči vs. Dvojka (2 řidiči) vs. Dodávka ponížená na 2 490 kg",
        "Okamžitý verdikt: Stihneš fixní vykládku (Time-Slot) bez pokuty?"
      ],
      lockedFeature: {
        id: "lock-tachograf-live",
        label: "Číst zbývající jízdu řidiče živě z karty v tachografu (G2V2)",
        note: "Pro živé vyčítání zbývajících hodin jízdy všech řidičů na jedné obrazovce je potřeba napojení na telematiku."
      }
    },
    {
      id: "cmr-skener",
      role: "ridic",
      roleLabel: "ŘIDIČ",
      badge: "DO KABINY (BEZ APPKY)",
      badgeColor: "sky",
      title: "Noční „De-Shadow“ Skener CMR z volantu",
      subtitle: "Vyfoť zmačkanou stazku v noci v kabině — vyleze čisté bílé PDF s ostrým razítkem.",
      painQuote: "„Spedice neproplatí fakturu, dokud nemá čitelné CMR. Řidič v noci vyfotí papír na koleni se stínem od ruky a proplacení se zdrží o 3 týdny.“",
      image: "https://images.unsplash.com/photo-1616432043562-3671ea2e5242?auto=format&fit=crop&w=900&q=80",
      svgType: "scanner",
      livePreviewMetric: "Odstranění stínů v prohlížeči:",
      livePreviewValue: "100% lokálně v mobilu",
      freeFeatures: [
        "Automatické vybělení šedého papíru a odstranění stínů z kabiny",
        "Zvýraznění bledého razítka a podpisu ze skladu",
        "Okamžité stažení čistého PDF nebo odeslání přes WhatsApp"
      ],
      lockedFeature: {
        id: "lock-auto-fakturace-cmr",
        label: "Po vyfocení CMR automaticky spárovat s přepravou a odeslat fakturu z iDokladu / Fakturoidu",
        note: "Představ si, že řidič na rampě vyfotí CMR a za 10 vteřin má spedice v mailu hotovou fakturu i s přílohou. Šetří 10–14 dní čekání na peníze."
      }
    },
    {
      id: "pokuty-vaha-balm",
      role: "ridic",
      roleLabel: "ŘIDIČ / MAJITEL",
      badge: "NĚMECKO / RAKOUSKO",
      badgeColor: "red",
      title: "Kalkulačka pokut za přeložení (BALM / BAG & Rakousko)",
      subtitle: "Kolik zaplatí řidič, kolik firma a při kolika kilech ti na místě odstaví auto.",
      painQuote: "„Naložíš 6 palet, na papíře je 1 100 kg, ale auto sedí na dorazech. Před Rozvadovem nevíš, jestli je to za 30 € nebo za odstavení auta.“",
      image: "https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?auto=format&fit=crop&w=900&q=80",
      svgType: "scale",
      livePreviewMetric: "Přeložení o 16 % v Německu:",
      livePreviewValue: "Řidič 140 € + Firma 285 €",
      freeFeatures: [
        "Přesné tabulky pokut BALM (Německo), Rakousko a ČR podle % přeložení",
        "Rozlišení pokuty pro řidiče vs. pokuty pro provozovatele (Halter)",
        "Kdy hrozí zákaz další jízdy a nucené přeložení na parkovišti"
      ],
      lockedFeature: {
        id: "lock-blokace-prelozeni",
        label: "Automatická červená stopka pro dispečera při zadávání zakázky nad reálnou nosnost SPZ",
        note: "Ve firemním dispečinku systém nedovolí přiřadit 1 200 kg náklad na auto, které má v TP reálnou doložnost 850 kg."
      }
    },
    {
      id: "diety-a-hranice",
      role: "ridic",
      roleLabel: "ŘIDIČ / MAJITEL",
      badge: "KONEC IGELITEK S ÚČTENKAMI",
      badgeColor: "emerald",
      title: "Zápisník přejezdů hranic, účtenek a EU diet (2026)",
      subtitle: "Naklikej časy přejezdů hranic a stáhni si hotové vyúčtování jízdného a stravného.",
      painQuote: "„Na konci měsíce řidič vysype na stůl mastnou igelitku s účtenkami z Francie a 4 hodiny se dohadujete, v kolik hodin přejel Rozvadov.“",
      image: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=900&q=80",
      svgType: "receipt",
      livePreviewMetric: "Plná dieta Německo / Francie:",
      livePreviewValue: "45 € / 47 € (Sazby 2026)",
      freeFeatures: [
        "Přesný výpočet krácených (1/3, 2/3) i plných zahraničních diet podle vyhlášky MPSV",
        "Evidence hotovostních výdajů (mýto FR, parkovné, AdBlue) v EUR/CZK",
        "Generování čistého PDF archu pro účetní i řidiče"
      ],
      lockedFeature: {
        id: "lock-gps-hranice",
        label: "Automaticky spočítat diety přímo z GPS knihy jízd bez jediného kliknutí řidiče",
        note: "Když propojíme vaše GPS v autech s výpočtem diet, na konci měsíce máte výplatní podklady pro účetní za 1 klik."
      }
    },
    {
      id: "vyplaty-ridicu-marze",
      role: "majitel",
      roleLabel: "MAJITEL",
      badge: "FINANČNÍ SIMULÁTOR",
      badgeColor: "amber",
      title: "Simulátor výplat řidičů (Kč/km vs. % z fakturace vs. Fix + Diety)",
      subtitle: "Kde ti utíká marže a který model odměňování v ČR motivuje řidiče nekrást naftu.",
      painQuote: "„Platíš řidiči z kilometru, takže si zajíždí. Platíš z obratu, takže odmítá levnější zpátečky. Spočítej si, co ti reálně zbude na autě.“",
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=900&q=80",
      svgType: "chart",
      livePreviewMetric: "Rozdíl v čisté marži majitele:",
      livePreviewValue: "až 14 500 Kč / měsíc / auto",
      freeFeatures: [
        "Přímé srovnání 3 nejčastějších výplatních modelů na českých dodávkách",
        "Výpočet bonusu/srážky za spotřebu nafty oproti normě auta",
        "100% anonymní — žádná jména, jen posuvníky v tvém prohlížeči"
      ],
      lockedFeature: {
        id: "lock-portal-ridice",
        label: "Soukromý portál pro vaše řidiče (živý přehled: kolik už si tenhle měsíc vydělal + bonus za naftu)",
        note: "Když řidič na mobilu po každé točce vidí, že mu úsporná jízda hodila +1 800 Kč do výplaty, přestane šlapat autu na krk."
      }
    },
    {
      id: "upominky-a-skonto",
      role: "majitel",
      roleLabel: "MAJITEL",
      badge: "KLADIVO NA NEPLATIČE",
      badgeColor: "red",
      title: "Generátor předžalobní upomínky (DE/EN/CZ) + Kalkulačka Skonta",
      subtitle: "Faktura po splatnosti? Vygeneruj ostrou upomínku s hrozbou nahlášení na Timocom inkaso.",
      painQuote: "„Splatnost 60 dní vypršela před měsícem, spedice nezvedá telefony a ty nemáš právníka, který by jim napsal úřední dopis v němčině.“",
      image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=900&q=80",
      svgType: "gavel",
      livePreviewMetric: "Zákonný paušál za prodlení v EU:",
      livePreviewValue: "+40 € + úrok z prodlení",
      freeFeatures: [
        "Okamžité PDF v němčině (Mahnung), angličtině i češtině s § odkazem na EU směrnici",
        "Kalkulačka Skonta: Vyplatí se vzít peníze hned za 3% skonto, nebo čekat 60 dní?",
        "Vzor hlášení dlužníka do inkasního systému Timocom / Raal"
      ],
      lockedFeature: {
        id: "lock-banka-upominky",
        label: "Napojit na firemní banku (ČSOB/KB/RB) a posílat upomínky automaticky 1. den po splatnosti",
        note: "Systém sám hlídá spárované platby a dlužníkům automaticky posílá stupňované upomínky bez tvé práce."
      }
    },
    {
      id: "tankovaci-karty",
      role: "majitel",
      roleLabel: "MAJITEL",
      badge: "ÚSPORA NA NAFTĚ",
      badgeColor: "emerald",
      title: "Optimalizátor tankovacích karet (DKV vs. UTA vs. Eurowag vs. ONO)",
      subtitle: "Kterou kartu má řidič vytáhnout v Německu, Francii nebo na Rozvadově?",
      painQuote: "„Každý řidič má v peněžence 3 tankovací karty, ale tankuje na první dálniční pumpě v Německu za totemovou cenu + poplatek za síť.“",
      image: "https://images.unsplash.com/photo-1527018601619-a508a2be00cd?auto=format&fit=crop&w=900&q=80",
      svgType: "fuel",
      livePreviewMetric: "Rozdíl na 100l nádrži (Dálnice DE vs. Sleva):",
      livePreviewValue: "až 680 Kč na 1 tankování",
      freeFeatures: [
        "Srovnání ceníkových (List price) vs. totemových cen s poplatky karet",
        "Výpočet, jestli se vyplatí dotankovat plnou před čárou (Rozvadov / Petrovice / Břeclav)",
        "Roční úspora podle počtu aut ve flotile"
      ],
      lockedFeature: {
        id: "lock-sms-tankovani",
        label: "Automatická SMS řidiči před hranicemi: „Natankuj tady na tuto kartu, ušetříš 550 Kč“",
        note: "Podle trasy auta systém řidiči sám pošle bod na mapě a řekne, kterou konkrétní kartu má použít."
      }
    },
    {
      id: "ai-ctecky-objednavek",
      role: "dispecer",
      roleLabel: "DISPEČER / MAJITEL",
      badge: "KONEC PŘEPISOVÁNÍ",
      badgeColor: "sky",
      title: "Vytěžovákový Překladač: Z PDF objednávky rovnou do faktury",
      subtitle: "Vyzkoušej, jak se z nepřehledné objednávky od spedice vytáhne IČO, trasa, cena a splatnost.",
      painQuote: "„Večer po vykládce sedíš u počítače a přepisuješ z PDF objednávky IČO, adresy a čísla referencí do iDokladu. Jediný překlep = vrácená faktura a dalších 60 dní čekání.“",
      image: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&w=900&q=80",
      svgType: "cpu",
      livePreviewMetric: "Čas přepisu 1 přepravy:",
      livePreviewValue: "Z 8 minut na 3 vteřiny",
      freeFeatures: [
        "Interaktivní zkouška na reálných vzorech objednávek (DHL, Schenker, Timocom)",
        "Automatická kontrola IČO/DIČ v ARESu a VIESu proti podvodníkům",
        "Připravení přesného textu položky faktury (Nakládka/Vykládka/SPZ/Číslo objednávky)"
      ],
      lockedFeature: {
        id: "lock-email-parser",
        label: "Vlastní firemní e-mail: Přepošleš objednávku a sama se založí přeprava i koncept v iDokladu",
        note: "Stačí přeposlat PDF od spedice na tvůj firemní mail a celý dispečink i fakturace se předvyplní samy."
      }
    },
    {
      id: "hlidac-kabotaze",
      role: "dispecer",
      roleLabel: "DISPEČER / ŘIDIČ",
      badge: "OCHRANA PŘED POKUTOU 2 500 €",
      badgeColor: "amber",
      title: "Hlídač Kabotáže (Pravidlo 3 přeprav za 7 dní + 4 dny Cooling-Off)",
      subtitle: "Jezdíš vnitro po Německu nebo Francii? Spočítej si přesnou hodinu, do kdy musíš ven.",
      painQuote: "„Uděláš v Německu dvě vnitra po vykládce, pak přejedeš do Beneluxu a zpátky. Policie si vytáhne CMRka a napaří ti 2 500 € za porušení 4denní pauzy.“",
      image: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=900&q=80",
      svgType: "shield",
      livePreviewMetric: "Povinná pauza mimo zemi (Cooling-Off):",
      livePreviewValue: "Přesně 96 hodin (4 dny)",
      freeFeatures: [
        "Zadáte datum a čas vykládky mezinárodní přepravy a systém hlídá 7denní okno",
        "Kontrola pravidla 1 kabotáže do 3 dnů při vjezdu prázdného auta",
        "Odpočet 4denní (96h) karantény mimo daný stát EU"
      ],
      lockedFeature: {
        id: "lock-kabotaz-flotila",
        label: "Automatický semafor kabotáže pro všech 5–50 aut ve flotile podle GPS",
        note: "Dispečer na mapě rovnou vidí, které auto v Německu ještě může vzít vnitro a které už musí ven."
      }
    },
    {
      id: "esg-certifikat-co2",
      role: "majitel",
      roleLabel: "MAJITEL",
      badge: "PRO SPEDICE (DHL / AMAZON)",
      badgeColor: "emerald",
      title: "1-Click Generátor ESG & CO₂ Výkazu pro subdodavatele",
      subtitle: "Velká spedice po tobě chce výkaz emisí CO₂, jinak tě vyřadí? Stáhni si ho v PDF za 10 vteřin.",
      painQuote: "„Z Amazonu nebo DHL přijde e-mail, že jako dopravce musíš doložit uhlíkovou stopu podle normy EN 16258 / ISO 14083, jinak končíš. Účetní netuší, co to je.“",
      image: "https://images.unsplash.com/photo-1473448912268-2022ce9509d8?auto=format&fit=crop&w=900&q=80",
      svgType: "leaf",
      livePreviewMetric: "Koeficient nafty (Well-to-Wheel ISO 14083):",
      livePreviewValue: "3,17 kg CO₂e / 1 litr nafty",
      freeFeatures: [
        "Zadáte jen ujeté km a projetou naftu za měsíc + vaše IČO",
        "Přepočet přesně podle evropské dopravní normy ISO 14083 (Well-to-Wheel)",
        "Okamžitý tisk úředního certifikátu v češtině a angličtině pro spedici"
      ],
      lockedFeature: {
        id: "lock-esg-zakaznici",
        label: "Automaticky rozpočítat CO₂ na jednotlivé zákazníky a přikládat ke každé faktuře",
        note: "Velké spedice milují, když mají CO₂ stopu uvedenou rovnou na každé faktuře za přepravu."
      }
    }
  ]
};