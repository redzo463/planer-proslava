// Theme and Event Configuration Utility

export const EVENT_THEMES = {
  svadba: {
    id: 'svadba',
    label: 'Svadba / Venčanje',
    icon: '💍',
    tagline: 'Svečano planiranje najvažnijeg dana',
    badgeBg: 'bg-rose-100 text-rose-800 border-rose-200',
    bannerGradient: 'from-slate-900 via-rose-950 to-amber-950',
    accentColor: 'rose',
    accentClass: 'bg-rose-500 hover:bg-rose-600 text-white',
    accentText: 'text-rose-600',
    accentBorder: 'border-rose-200',
    accentBgLight: 'bg-rose-50 text-rose-700',
    ringColor: 'focus:ring-rose-500',
    activeTabClass: 'bg-rose-500 text-white shadow-rose-200',
    modules: ['timeline', 'seating', 'playlist', 'wishlist', 'budget', 'guests', 'tasks', 'vendors'],
    defaultTimeline: [
      { time: '12:00', title: 'Dolazak i okupljanje kod mladenca', location: 'Porodična kuća', responsible: 'Kum i Kuma' },
      { time: '14:30', title: 'Građansko / Crkveno venčanje', location: 'Crkva / Opština', responsible: 'Mladenci' },
      { time: '16:00', title: 'Fotografisanje i prijem gostiju', location: 'Park / Restoran Grand', responsible: 'Fotograf' },
      { time: '18:00', title: 'Ulazak u svečanu salu & Prvi ples', location: 'Restoran Grand', responsible: 'Bend & Mladenci' },
      { time: '19:30', title: 'Svečana večera - Prvi sled', location: 'Restoran Grand', responsible: 'Restoran osoblje' },
      { time: '22:30', title: 'Iznošenje svadbene torte & Vatromet', location: 'Restoran Grand', responsible: 'Bend & Poslastičar' },
      { time: '02:00', title: 'Kraj zvaničnog programa', location: 'Restoran Grand', responsible: 'Organizator' }
    ],
    defaultWishlist: [
      { title: 'Svadbeni fond za Medeni Mesec', category: 'Putovanje', price: 'Doprinos po želji', notes: 'Naše najveće uživanje biće putovanje na Maldive' },
      { title: 'Aparat za kafu DeLonghi', category: 'Kućni aparati', price: 'oko 400 €', notes: 'Kombinovani espresso aparat' }
    ],
    defaultPlaylist: [
      { songTitle: 'Lutka', artist: 'S.A.R.S.', category: 'Prvi ples', notes: 'Pesma za ulazak i prvi ples mladenaca' },
      { songTitle: 'Za Ljiljanu', artist: 'Toma Zdravković', category: 'Omiljene pesme', notes: 'Pred kraj večeri' },
      { songTitle: 'Macarena', artist: 'Los Del Rio', category: 'Zabranjeno svirati', notes: 'Bez koreografskih pesama' }
    ]
  },

  rodjendan: {
    id: 'rodjendan',
    label: 'Rođendan',
    icon: '🎂',
    tagline: 'Zabava, kokteli i nezaboravni trenuci',
    badgeBg: 'bg-purple-100 text-purple-800 border-purple-200',
    bannerGradient: 'from-slate-900 via-purple-950 to-indigo-950',
    accentColor: 'purple',
    accentClass: 'bg-purple-600 hover:bg-purple-700 text-white',
    accentText: 'text-purple-600',
    accentBorder: 'border-purple-200',
    accentBgLight: 'bg-purple-50 text-purple-700',
    ringColor: 'focus:ring-purple-500',
    activeTabClass: 'bg-purple-600 text-white shadow-purple-200',
    modules: ['timeline', 'playlist', 'wishlist', 'guests', 'budget', 'tasks', 'vendors'],
    defaultTimeline: [
      { time: '20:00', title: 'Okupljanje i doček gostiju uz koktel dobrodošlice', location: 'Lounge Bar Sky', responsible: 'Slavljenik' },
      { time: '21:30', title: 'DJ Nastavci & Glavni party set', location: 'Lounge Bar Sky', responsible: 'DJ' },
      { time: '23:30', title: 'Iznošenje rođendanske torte i pevanje pesmice', location: 'Lounge Bar Sky', responsible: 'Prijatelji' },
      { time: '02:00', title: 'Završetak žurke', location: 'Lounge Bar Sky', responsible: 'Slavljenik' }
    ],
    defaultWishlist: [
      { title: 'Pametni sat Apple Watch / Samsung Watch', category: 'Tehnologija', price: 'oko 300 €', notes: 'Crna boja' },
      { title: 'Vaučer za Vikend SPA', category: 'Iskustvo', price: '150 €', notes: 'Relaksacija nakon rođendana' }
    ],
    defaultPlaylist: [
      { songTitle: 'Blinding Lights', artist: 'The Weeknd', category: 'Omiljene pesme', notes: 'Kada žurka dostigne vrhunac' },
      { songTitle: 'Happy Birthday', artist: 'Stevie Wonder', category: 'Posebni trenuci', notes: 'Dok se gasi svećice na torti' }
    ]
  },

  jubilej: {
    id: 'jubilej',
    label: 'Jubilej / Godišnjica',
    icon: '🥂',
    tagline: 'Proslava uspeha, jubileja i uspomena',
    badgeBg: 'bg-amber-100 text-amber-900 border-amber-200',
    bannerGradient: 'from-slate-900 via-amber-950 to-slate-950',
    accentColor: 'amber',
    accentClass: 'bg-amber-600 hover:bg-amber-700 text-white',
    accentText: 'text-amber-600',
    accentBorder: 'border-amber-200',
    accentBgLight: 'bg-amber-50 text-amber-800',
    ringColor: 'focus:ring-amber-500',
    activeTabClass: 'bg-amber-600 text-white shadow-amber-200',
    modules: ['timeline', 'seating', 'playlist', 'guests', 'budget', 'tasks', 'vendors'],
    defaultTimeline: [
      { time: '17:00', title: 'Prijem zvanica i zdravica', location: 'Svečana sala', responsible: 'Domaćini' },
      { time: '18:00', title: 'Prikazivanje filma / retrospektive uspomena', location: 'Svečana sala', responsible: 'Organizator' },
      { time: '19:00', title: 'Svečana večera i muzika uživo', location: 'Svečana sala', responsible: 'Restoran & Orkestar' }
    ],
    defaultWishlist: [],
    defaultPlaylist: []
  },

  poslovno: {
    id: 'poslovno',
    label: 'Poslovni Događaj / Korporativno',
    icon: '💼',
    tagline: 'Profesionalna organizacija konferencija i proslava',
    badgeBg: 'bg-blue-100 text-blue-800 border-blue-200',
    bannerGradient: 'from-slate-950 via-slate-900 to-blue-950',
    accentColor: 'blue',
    accentClass: 'bg-blue-600 hover:bg-blue-700 text-white',
    accentText: 'text-blue-600',
    accentBorder: 'border-blue-200',
    accentBgLight: 'bg-blue-50 text-blue-700',
    ringColor: 'focus:ring-blue-500',
    activeTabClass: 'bg-blue-600 text-white shadow-blue-200',
    modules: ['timeline', 'guests', 'budget', 'tasks', 'vendors'],
    defaultTimeline: [
      { time: '09:00', title: 'Registracija učesnika & Jutarnja kafa', location: 'Hol hotela', responsible: 'Hostese' },
      { time: '10:00', title: 'Uvodno predavanje & Prezentacija', location: 'Konferencijska sala A', responsible: 'Direktor' },
      { time: '13:00', title: 'Pauza za ručak i umrežavanje (Networking)', location: 'Restoran hotela', responsible: 'Catering' },
      { time: '18:00', title: 'Gala večera i dodela nagrada', location: 'Gala dvorana', responsible: 'Moderator' }
    ],
    defaultWishlist: [],
    defaultPlaylist: []
  },

  krstenje: {
    id: 'krstenje',
    label: 'Krštenje / Babine',
    icon: '🍼',
    tagline: 'Topla porodična proslava za najmlađe',
    badgeBg: 'bg-sky-100 text-sky-800 border-sky-200',
    bannerGradient: 'from-slate-900 via-sky-950 to-indigo-950',
    accentColor: 'sky',
    accentClass: 'bg-sky-500 hover:bg-sky-600 text-white',
    accentText: 'text-sky-600',
    accentBorder: 'border-sky-200',
    accentBgLight: 'bg-sky-50 text-sky-800',
    ringColor: 'focus:ring-sky-500',
    activeTabClass: 'bg-sky-500 text-white shadow-sky-200',
    modules: ['timeline', 'seating', 'wishlist', 'guests', 'budget', 'tasks', 'vendors'],
    defaultTimeline: [
      { time: '11:00', title: 'Obred krštenja u crkvi', location: 'Hram / Crkva', responsible: 'Kumovi i Roditelji' },
      { time: '13:00', title: 'Porodični ručak i proslava', location: 'Restoran', responsible: 'Roditelji' }
    ],
    defaultWishlist: [
      { title: 'Dečija kolica 3 u 1', category: 'Oprema', price: 'oko 500 €', notes: 'Neutralna boja' },
      { title: 'Zlatni dukat ili narukvica', category: 'Uspomena', price: '150 €', notes: 'Dar od kumova' }
    ],
    defaultPlaylist: []
  },

  ostalo: {
    id: 'ostalo',
    label: 'Ostala Proslava',
    icon: '🎉',
    tagline: 'Prilagođeno planiranje svakog događaja',
    badgeBg: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    bannerGradient: 'from-slate-900 via-emerald-950 to-slate-900',
    accentColor: 'emerald',
    accentClass: 'bg-emerald-600 hover:bg-emerald-700 text-white',
    accentText: 'text-emerald-600',
    accentBorder: 'border-emerald-200',
    accentBgLight: 'bg-emerald-50 text-emerald-700',
    ringColor: 'focus:ring-emerald-500',
    activeTabClass: 'bg-emerald-600 text-white shadow-emerald-200',
    modules: ['timeline', 'guests', 'budget', 'tasks', 'vendors'],
    defaultTimeline: [],
    defaultWishlist: [],
    defaultPlaylist: []
  }
};

export function getEventTheme(eventType) {
  return EVENT_THEMES[eventType] || EVENT_THEMES.svadba;
}
