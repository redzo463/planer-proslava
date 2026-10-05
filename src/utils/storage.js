// Storage Utility for Event Planner

const STORAGE_KEY = 'planer_proslava_db_v1';

export const DEFAULT_INITIAL_DATA = {
  activeEventId: 'evt-1',
  events: [
    {
      id: 'evt-1',
      title: 'Svadba Marko & Ana',
      type: 'svadba',
      date: '2026-10-24',
      location: 'Restoran Grand, Sarajevo',
      targetBudget: 12000,
      currency: '€',
      notes: 'Planirano oko 120 gostiju. Svečana večera počinje u 18:00h.'
    },
    {
      id: 'evt-2',
      title: '30. Rođendan Emina',
      type: 'rodjendan',
      date: '2026-11-15',
      location: 'Lounge Bar Sky, Mostar',
      targetBudget: 1500,
      currency: '€',
      notes: 'Tematska zabava sa koktelima i DJ-em.'
    }
  ],
  guests: [
    { id: 'g-1', eventId: 'evt-1', name: 'Ivan Horvat', group: 'Kumovi', status: 'potvrdjeno', plusOne: 1, phone: '+387 61 111 222', table: 'Mladenački stol', notes: 'Mladoženjin kum' },
    { id: 'g-2', eventId: 'evt-1', name: 'Marija Perić', group: 'Porodica', status: 'potvrdjeno', plusOne: 1, phone: '+387 61 222 333', table: 'Stol 1 (Porodica)', notes: 'Vegetarijanski meni' },
    { id: 'g-3', eventId: 'evt-1', name: 'Alen & Emina Babić', group: 'Prijatelji', status: 'na_cekanju', plusOne: 0, phone: '+387 62 333 444', table: 'Stol 2 (Prijatelji)', notes: 'Čeka potvrdu leta' },
    { id: 'g-4', eventId: 'evt-1', name: 'Denis Kovačević', group: 'Posao', status: 'odbijeno', plusOne: 0, phone: '+387 63 444 555', table: '', notes: 'Na službenom putu' },
    { id: 'g-5', eventId: 'evt-2', name: 'Selma Kapetanović', group: 'Prijatelji', status: 'potvrdjeno', plusOne: 0, phone: '+387 61 999 888', table: 'Šank 1', notes: 'Donosi tortu iznenađenja' }
  ],
  budget: [
    { id: 'b-1', eventId: 'evt-1', category: 'Sala & Hrana', title: 'Restoran Grand (Svečana sala)', plannedCost: 6500, actualCost: 6800, paidAmount: 2000, notes: 'Meniji po 50€ po osobi, sa pićem' },
    { id: 'b-2', eventId: 'evt-1', category: 'Muzika', title: 'Acoustic & Party Band', plannedCost: 1500, actualCost: 1600, paidAmount: 500, notes: 'Svirka 19:00 - 03:00h' },
    { id: 'b-3', eventId: 'evt-1', category: 'Fotograf & Video', title: 'Studio Memoris (2 fotografa + dron)', plannedCost: 1200, actualCost: 1200, paidAmount: 300, notes: 'Uključuje fotoknjigu i sve RAW snimke' },
    { id: 'b-4', eventId: 'evt-1', category: 'Dekoracija', title: 'Cvetni aranžmani & rasveta', plannedCost: 800, actualCost: 950, paidAmount: 950, notes: 'Plaćeno u celosti' },
    { id: 'b-5', eventId: 'evt-1', category: 'Torta & Slatkiši', title: 'Svadbena torta 4 sprata', plannedCost: 400, actualCost: 400, paidAmount: 100, notes: 'Ukus malina i čokolada' },
    { id: 'b-6', eventId: 'evt-2', category: 'Hrana & Piće', title: 'Finger food i koktel šank', plannedCost: 800, actualCost: 850, paidAmount: 300, notes: 'Za 25 ljudi' }
  ],
  tasks: [
    { id: 't-1', eventId: 'evt-1', category: 'Rane pripreme', title: 'Rezervisati svečanu salu/restoran', dueDate: '2026-03-01', priority: 'visok', completed: true },
    { id: 't-2', eventId: 'evt-1', category: 'Rane pripreme', title: 'Kupovina/Iznajmljivanje venčanice i odela', dueDate: '2026-06-15', priority: 'visok', completed: true },
    { id: 't-3', eventId: 'evt-1', category: 'Pre događaja', title: 'Štampanje i slanje pozivnica', dueDate: '2026-08-01', priority: 'srednji', completed: true },
    { id: 't-4', eventId: 'evt-1', category: 'Pre događaja', title: 'Finalizacija rasporeda sedenja', dueDate: '2026-10-10', priority: 'visok', completed: false },
    { id: 't-5', eventId: 'evt-1', category: 'Sedmica proslave', title: 'Potvrda konačnog broja gostiju sa restoranom', dueDate: '2026-10-18', priority: 'visok', completed: false },
    { id: 't-6', eventId: 'evt-1', category: 'Na dan proslave', title: 'Preuzimanje svadbenog buketa i bidermajera', dueDate: '2026-10-24', priority: 'visok', completed: false },
    { id: 't-7', eventId: 'evt-2', category: 'Pre događaja', title: 'Rezervacija DJ-a i lounge bara', dueDate: '2026-10-20', priority: 'visok', completed: true }
  ],
  vendors: [
    { id: 'v-1', eventId: 'evt-1', category: 'Restoran/Sala', name: 'Restoran Grand', contactName: 'Goran Simić', phone: '+387 33 123 456', email: 'info@restorangrand.ba', status: 'Plaćena kapara', priceEstimate: '6800 €', notes: 'Glavni menadžer sale.' },
    { id: 'v-2', eventId: 'evt-1', category: 'Muzika', name: 'Acoustic & Party Band', contactName: 'Marko Nikolić', phone: '+387 61 777 888', email: 'contact@partyband.com', status: 'Plaćena kapara', priceEstimate: '1600 €', notes: 'Pauze za vreme torte i govoa.' },
    { id: 'v-3', eventId: 'evt-1', category: 'Fotograf', name: 'Studio Memoris', contactName: 'Edin M.', phone: '+387 62 111 000', email: 'edin@memoris.ba', status: 'Rezerviran', priceEstimate: '1200 €', notes: 'Fotografisanje počinje u 13:00 u kući mladenca.' }
  ],
  timeline: [
    { id: 'tl-1', eventId: 'evt-1', time: '12:00', title: 'Okupljanje i doček gostiju', location: 'Mladina kuća', responsible: 'Kum & Kuma', completed: true, notes: 'Folklor i muzika u dvorištu' },
    { id: 'tl-2', eventId: 'evt-1', time: '14:30', title: 'Svečani obred venčanja', location: 'Crkva Sv. Ante / Opština', responsible: 'Mladenci', completed: true, notes: 'Fotografisanje ispred obreda' },
    { id: 'tl-3', eventId: 'evt-1', time: '17:30', title: 'Prijem gostiju i koktel u restoranu', location: 'Restoran Grand', responsible: 'Hostese', completed: false, notes: 'Gudački kvartet u pozadini' },
    { id: 'tl-4', eventId: 'evt-1', time: '18:30', title: 'Ulazak mladenaca & Prvi ples', location: 'Restoran Grand', responsible: 'Bend & Mladenci', completed: false, notes: 'Dim mašina i prskalice na sceni' },
    { id: 'tl-5', eventId: 'evt-1', time: '22:30', title: 'Iznošenje svadbene torte & Vatromet', location: 'Restoran Grand', responsible: 'Poslastičar', completed: false, notes: 'Gašenje svetla u sali' },
    { id: 'tl-6', eventId: 'evt-2', time: '20:30', title: 'Welcome drinks & Party start', location: 'Lounge Bar Sky', responsible: 'Slavljenik', completed: true, notes: 'Posebni kokteli kuće' }
  ],
  wishlist: [
    { id: 'w-1', eventId: 'evt-1', title: 'Svadbeni fond za Medeni Mesec (Maldivi)', category: 'Putovanje', price: 'Doprinos po želji', reservedBy: 'Porodica & Prijatelji', notes: 'Simbolične koverte ili uplate na račun' },
    { id: 'w-2', eventId: 'evt-1', title: 'DeLonghi Espresso Aparat za Kafu', category: 'Kućni aparati', price: '450 €', reservedBy: 'Kuma Marija', notes: 'Rezervisano od strane kume' },
    { id: 'w-3', eventId: 'evt-2', title: 'Apple Watch Series 9 (45mm, Midnight)', category: 'Tehnologija', price: '380 €', reservedBy: '', notes: 'Lista želja za rođendan' }
  ],
  playlist: [
    { id: 'p-1', eventId: 'evt-1', songTitle: 'Lutka', artist: 'S.A.R.S.', category: 'Prvi ples', notes: 'Glavna pesma za prvi ples mladenaca', priority: 'visok' },
    { id: 'p-2', eventId: 'evt-1', songTitle: 'Za Ljiljanu', artist: 'Toma Zdravković', category: 'Omiljene pesme', notes: 'Nakon iznošenja torte', priority: 'srednji' },
    { id: 'p-3', eventId: 'evt-1', songTitle: 'Macarena', artist: 'Los Del Rio', category: 'Zabranjeno svirati', notes: 'Izbegavati koreografske pesme', priority: 'nizak' },
    { id: 'p-4', eventId: 'evt-2', songTitle: 'Blinding Lights', artist: 'The Weeknd', category: 'Omiljene pesme', notes: 'Kada žurka dostigne kulminaciju', priority: 'visok' }
  ],
  tables: [
    { id: 'tab-1', eventId: 'evt-1', tableName: 'Mladenački stol', capacity: 6, notes: 'Mladenci, Kum, Kuma i partneri' },
    { id: 'tab-2', eventId: 'evt-1', tableName: 'Stol 1 (Porodica)', capacity: 10, notes: 'Uža porodica' },
    { id: 'tab-3', eventId: 'evt-1', tableName: 'Stol 2 (Prijatelji)', capacity: 10, notes: 'Ekipa sa fakulteta' },
    { id: 'tab-4', eventId: 'evt-1', tableName: 'Stol 3 (Posao)', capacity: 8, notes: 'Kolege iz firme' },
    { id: 'tab-5', eventId: 'evt-2', tableName: 'Šank 1', capacity: 15, notes: 'Centralni šank za ekipe' }
  ]
};

export function loadStoredData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      saveStoredData(DEFAULT_INITIAL_DATA);
      return DEFAULT_INITIAL_DATA;
    }
    const parsed = JSON.parse(raw);
    return { 
      ...DEFAULT_INITIAL_DATA, 
      ...parsed,
      timeline: parsed.timeline || DEFAULT_INITIAL_DATA.timeline,
      wishlist: parsed.wishlist || DEFAULT_INITIAL_DATA.wishlist,
      playlist: parsed.playlist || DEFAULT_INITIAL_DATA.playlist,
      tables: parsed.tables || DEFAULT_INITIAL_DATA.tables
    };
  } catch (err) {
    console.error('Failed to load storage data:', err);
    return DEFAULT_INITIAL_DATA;
  }
}

export function saveStoredData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch (err) {
    console.error('Failed to save data to storage:', err);
  }
}

export function exportDataAsJSON(data) {
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const downloadAnchor = document.createElement('a');
  downloadAnchor.setAttribute("href", dataStr);
  downloadAnchor.setAttribute("download", `planer_proslava_bekap_${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(downloadAnchor);
  downloadAnchor.click();
  downloadAnchor.remove();
}

export function getDefaultTasksForEventType(eventType) {
  if (eventType === 'svadba') {
    return [
      { category: 'Rane pripreme', title: 'Odrediti okvirni budžet i broj gostiju', priority: 'visok' },
      { category: 'Rane pripreme', title: 'Rezervacija restorana / sale za svadbu', priority: 'visok' },
      { category: 'Rane pripreme', title: 'Angažovanje muzike (bend/DJ)', priority: 'visok' },
      { category: 'Rane pripreme', title: 'Angažovanje fotografa i snimatelja', priority: 'srednji' },
      { category: 'Pre događaja', title: 'Izbor venčanice / odela', priority: 'visok' },
      { category: 'Pre događaja', title: 'Naručivanje pozivnica i dekoracije', priority: 'srednji' },
      { category: 'Pre događaja', title: 'Degustacija i naručivanje svadbene torte', priority: 'srednji' },
      { category: 'Sedmica proslave', title: 'Konačna potvrda broja gostiju i rasporeda stolova', priority: 'visok' },
      { category: 'Na dan proslave', title: 'Preuzimanje bidermajera i cvetnih aranžmana', priority: 'visok' }
    ];
  } else if (eventType === 'rodjendan') {
    return [
      { category: 'Rane pripreme', title: 'Izbor lokacije (klub, restoran, kuća ili priroda)', priority: 'visok' },
      { category: 'Pre događaja', title: 'Slanje pozivnica (WhatsApp, Instagram, fizičke)', priority: 'visok' },
      { category: 'Pre događaja', title: 'Naručivanje slavljeničke torte', priority: 'srednji' },
      { category: 'Pre događaja', title: 'Organizacija muzike i plejliste', priority: 'srednji' },
      { category: 'Sedmica proslave', title: 'Kupovina pića, grickalica i rekvizita za slikanje', priority: 'visok' },
      { category: 'Na dan proslave', title: 'Dekorisanje prostora i priprema torte', priority: 'visok' }
    ];
  } else {
    return [
      { category: 'Rane pripreme', title: 'Definisati datum, mesto i budžet', priority: 'visok' },
      { category: 'Pre događaja', title: 'Slanje pozivnica gostima', priority: 'visok' },
      { category: 'Pre događaja', title: 'Naručivanje hrane i pića (Catering)', priority: 'srednji' },
      { category: 'Na dan proslave', title: 'Priprema prostora i doček gostiju', priority: 'visok' }
    ];
  }
}
