/**
 * Vespera Events - Master Event Dataset (Nepal Focus - Phase 2)
 * Comprehensive, structured sample events across Nepal
 */

export const NEPAL_EVENTS = [
  {
    id: 'nepal-tech-summit',
    title: 'Nepal Technology & Innovation Summit',
    category: 'Technology',
    date: 'November 20, 2026',
    isoDate: '2026-11-20',
    time: '09:30 AM – 05:30 PM NPT',
    location: 'Kathmandu',
    venue: 'Rastriya Sabha Griha (City Hall), Kamaladi, Kathmandu',
    image: '/images/event-tech.svg',
    shortDescription:
      'A premier national summit uniting Nepal’s tech pioneers, startup innovators, and cloud engineers to accelerate artificial intelligence and digital public infrastructure.',
    detailedDescription:
      'The Nepal Technology & Innovation Summit stands as the country’s preeminent technological convention. Bringing together senior software architects, startup founders, policy visionaries, and researchers, the summit explores modern artificial intelligence, high-scale cloud distributed systems, and cross-border digital exports from Nepal. Attendees will engage in forward-looking keynote panels, technical breakout sessions, and dynamic live engineering demonstrations.',
    highlights: [
      'Keynote addresses from leading South Asian AI engineers & enterprise leaders',
      'Panel discussions on fintech inclusion, open banking, and Nepal’s IT export ecosystem',
      'Interactive developer sandbox with distributed cloud infrastructure showcases',
      'Networking lounge connecting aspiring engineers with high-growth tech ventures'
    ],
    organizer: {
      name: 'Nepal Tech Pioneers Consortium',
      role: 'Organizer & Host',
      email: 'summit@nepaltech.org.np',
      contact: '+977 1-4251122'
    },
    featured: true
  },
  {
    id: 'himalayan-trail-marathon',
    title: 'Himalayan Foothills Trail Marathon',
    category: 'Sports',
    date: 'November 28, 2026',
    isoDate: '2026-11-28',
    time: '06:00 AM – 02:00 PM NPT',
    location: 'Pokhara',
    venue: 'Pokhara Stadium & Sarangkot Circuit, Pokhara',
    image: '/images/event-sports.svg',
    shortDescription:
      'An exhilarating high-altitude trail race along the ridges of Sarangkot and the Phewa basin, bringing together mountain runners and outdoor enthusiasts.',
    detailedDescription:
      'The Himalayan Foothills Trail Marathon offers runners a world-class endurance challenge with panoramic vistas of the Annapurna mountain range. Featuring full 42km, half 21km, and community 10km courses, the route traverses pine forests, terraced hillside villages, and the ridgeline of Sarangkot before finishing by the shores of Lake Phewa. Complete medical checkpoints and hydration support are provided throughout.',
    highlights: [
      'Breathtaking sunrise start overlooking Machapuchare and Annapurna South',
      'Challenging technical terrain with 1,800m cumulative elevation gain',
      'Professional chip timing with live leaderboard tracking',
      'Post-race recovery gala, medal ceremony, and organic runner banquet'
    ],
    organizer: {
      name: 'Himalayan Trail Running Association',
      role: 'Event Host',
      email: 'events@himalayantrails.np',
      contact: '+977 61-523490'
    },
    featured: false
  },
  {
    id: 'bhaktapur-heritage-fair',
    title: 'Bhaktapur Heritage & Woodcraft Fair',
    category: 'Cultural',
    date: 'December 08, 2026',
    isoDate: '2026-12-08',
    time: '10:00 AM – 06:00 PM NPT',
    location: 'Bhaktapur',
    venue: 'Bhaktapur Durbar Square & Nyatapola Plaza, Bhaktapur',
    image: '/images/event-art.svg',
    shortDescription:
      'A traditional heritage celebration showcasing traditional pottery, Newari architectural craftsmanship, mask dances, and historic woodcraft exhibitions.',
    detailedDescription:
      'Held in the UNESCO World Heritage town of Bhaktapur, this festive cultural fair immerses visitors in the timeless artistic traditions of the Kathmandu Valley. Master woodworkers demonstrate ancient strut carving, potters spin clay in Pottery Square, and classical Newari Dhime ensembles perform beside the majestic five-story Nyatapola Temple. Traditional delicacies and handmade artisan souvenirs are showcased throughout the courtyard.',
    highlights: [
      'Live masterclass demonstrations in peacock window carving and terracotta pottery',
      'Traditional Newari masked cultural performances and classical Dhime drumming',
      'Guided historical architectural walking tours led by local heritage historians',
      'Artisan craft bazaar featuring certified fair-trade handmade textiles and pottery'
    ],
    organizer: {
      name: 'Bhaktapur Cultural Heritage Preservation Trust',
      role: 'Host Organization',
      email: 'heritage@bhaktapurtrust.np',
      contact: '+977 1-6612045'
    },
    featured: false
  },
  {
    id: 'pokhara-music-fest',
    title: 'Pokhara Music Festival',
    category: 'Music',
    date: 'December 18, 2026',
    isoDate: '2026-12-18',
    time: '05:00 PM – 10:30 PM NPT',
    location: 'Pokhara',
    venue: 'Lakeside Amphitheatre, Phewa Lake, Pokhara',
    image: '/images/event-music.svg',
    shortDescription:
      'An open-air musical festival set against the serene waters of Phewa Lake and the iconic Annapurna mountain range, celebrating contemporary Nepalese indie bands and Himalayan folk fusion.',
    detailedDescription:
      'The Pokhara Music Festival creates an unforgettable auditory and visual experience along the tranquil shores of Lake Phewa. Featuring two distinct stages—the Lakeside Amphitheatre and the Acoustic Pine Grove—the festival unites renowned indie collectives, classical sarangi virtuosos, and modern electronic producers. As dusk settles over the Fishtail peak, the venue comes alive with light art and spatial sound.',
    highlights: [
      'Two dynamic stages: Main Electric Stage and Lakeside Acoustic Pavilion',
      'Headline performances by top Nepalese indie rock and folk-fusion collectives',
      'Collaborative jam sessions pairing classical bansuri masters with modern synths',
      'Lakeside artisan night market and regional Himalayan street food stalls'
    ],
    organizer: {
      name: 'Annapurna Arts & Live Sound Foundation',
      role: 'Festival Producer',
      email: 'info@pokharamusicfest.np',
      contact: '+977 61-465800'
    },
    featured: true
  },
  {
    id: 'nepal-art-exhibition',
    title: 'Nepal Art & Culture Exhibition',
    category: 'Cultural',
    date: 'January 15, 2027',
    isoDate: '2027-01-15',
    time: '10:00 AM – 06:30 PM NPT',
    location: 'Lalitpur',
    venue: 'Patan Museum Courtyard, Patan Durbar Square, Lalitpur',
    image: '/images/event-art.svg',
    shortDescription:
      'A curated celebration of classical Newari craftsmanship, sacred Paubha paintings, traditional metal casting, and contemporary visual arts within the world heritage courtyard of Lalitpur.',
    detailedDescription:
      'The Nepal Art & Culture Exhibition gathers over 60 acclaimed artists from the Kathmandu Valley and across the Himalayas within the historic Keshav Narayan Chowk courtyard of Patan Museum. Spanning centuries of visual heritage, the exhibition juxtaposes sacred gold-leaf Paubha paintings with avant-garde contemporary bronze sculptures and spatial photography, illustrating the living continuity of Nepalese fine arts.',
    highlights: [
      'Curated gallery of sacred Paubha mandalas and lost-wax cast bronze statuary',
      'Sculptural master demonstrations by generation-trained Shakya artisan families',
      'Daily curator-guided tours dissecting traditional Newari iconometry and sacred geometry',
      'Evening panel dialogues discussing art preservation and international restitution'
    ],
    organizer: {
      name: 'Patan Fine Arts Council & Museum Society',
      role: 'Curatorial Board',
      email: 'curator@patanart.org.np',
      contact: '+977 1-5521400'
    },
    featured: true
  },
  {
    id: 'nepal-startup-conclave',
    title: 'Nepal Startup & Venture Capital Conclave',
    category: 'Business',
    date: 'January 22, 2027',
    isoDate: '2027-01-22',
    time: '09:00 AM – 05:00 PM NPT',
    location: 'Kathmandu',
    venue: 'Soaltee Hotel Convention Center, Tahachal, Kathmandu',
    image: '/images/event-business.svg',
    shortDescription:
      'Nepal’s flagship angel investment and enterprise conference connecting visionary founders, regional venture funds, and angel syndicates.',
    detailedDescription:
      'The Nepal Startup & Venture Capital Conclave bridges the funding divide for emerging enterprises in the Himalayan region. With participation from domestic commercial banks, South Asian private equity funds, and international institutional investors, the conclave fosters investment deal-making, regulatory reform discussions, and enterprise scaling frameworks for early-stage and growth-stage ventures.',
    highlights: [
      'Live venture pitch showcase featuring 12 vetted high-growth Nepalese startups',
      'Keynotes on cross-border venture capital structures and remittance reinvestment',
      'B2B matchmaking suites connecting founders directly with angel investors',
      'Masterclass on corporate governance, ESG compliance, and international scaling'
    ],
    organizer: {
      name: 'Nepal Angel Investors Network & Enterprise Forum',
      role: 'Convening Partner',
      email: 'conclave@nepalangels.np',
      contact: '+977 1-4270100'
    },
    featured: false
  },
  {
    id: 'digital-skills-workshop',
    title: 'Digital Skills & Web Development Workshop',
    category: 'Workshops',
    date: 'February 06, 2027',
    isoDate: '2027-02-06',
    time: '10:00 AM – 04:30 PM NPT',
    location: 'Kathmandu',
    venue: 'Nepal Innovation Center & Tech Hub, Thamel, Kathmandu',
    image: '/images/event-workshop.svg',
    shortDescription:
      'An intensive hands-on studio session empowering Nepali developers, university students, and designers with modern full-stack web engineering and production-grade workflows.',
    detailedDescription:
      'Designed to elevate local technical competence to global standards, this immersive workshop provides hands-on mentorship in modern TypeScript, reactive client architectures, performance optimization, and accessible UI development. Participants work directly in paired-programming environments under the guidance of senior staff engineers from global technology organizations.',
    highlights: [
      'Interactive coding sprints covering modern web architectures and APIs',
      'Real-world code reviews and production architecture debugging sessions',
      'Direct 1-on-1 career path guidance and global remote work mentorship',
      'Access to a lifelong alumni developer community and resource library'
    ],
    organizer: {
      name: 'Kathmandu Developer Collective',
      role: 'Training Director',
      email: 'workshops@ktmdevs.np',
      contact: '+977 1-4415588'
    },
    featured: true
  },
  {
    id: 'chitwan-wildlife-run',
    title: 'Chitwan Wildlife & Eco-Conservation Run',
    category: 'Sports',
    date: 'February 20, 2027',
    isoDate: '2027-02-20',
    time: '06:30 AM – 01:00 PM NPT',
    location: 'Chitwan',
    venue: 'Sauraha Riverbank Trail, Chitwan National Park, Chitwan',
    image: '/images/event-sports.svg',
    shortDescription:
      'A community marathon and conservation gala along the Rapti river basin supporting wildlife preservation, rhinos, and buffer-zone community forestry.',
    detailedDescription:
      'Set against the lush subtropical forests of Nepal’s first national park, the Chitwan Wildlife & Eco-Conservation Run combines athletics with environmental advocacy. Runners trace the tranquil banks of the Rapti River and buffer zone community forests, raising vital awareness and resources for the protection of one-horned rhinos, royal Bengal tigers, and community biodiversity initiatives.',
    highlights: [
      'Scenic forest and riverbank running route along the perimeter of Chitwan National Park',
      'All proceeds directly support community-led anti-poaching and buffer forest reserves',
      'Post-run indigenous Tharu cultural dance performances and local organic banquet',
      'Nature conservation pledge ceremony led by renowned wildlife biologists'
    ],
    organizer: {
      name: 'Chitwan Community Conservation & Youth Society',
      role: 'Organizing Committee',
      email: 'run@chitwancare.org.np',
      contact: '+977 56-580120'
    },
    featured: false
  },
  {
    id: 'himalayan-photo-workshop',
    title: 'Himalayan Photography & Visual Storytelling',
    category: 'Workshops',
    date: 'March 05, 2027',
    isoDate: '2027-03-05',
    time: '08:00 AM – 05:00 PM NPT',
    location: 'Pokhara',
    venue: 'Lakeside Cultural Pavilion, Baidam, Pokhara',
    image: '/images/event-workshop.svg',
    shortDescription:
      'A 3-day immersive masterclass led by National Geographic contributors on mountain landscape composition, cultural portraiture, and photojournalism.',
    detailedDescription:
      'This intensive photography expedition guides enthusiasts and professionals in the art of documentary visual storytelling. Field sessions capture alpine dawns over the Machapuchare peak, candid environmental portraits among Gurung village elders, and atmospheric evening light on Phewa Lake. In-depth classroom critique sessions hone raw development and editorial narrative sequencing.',
    highlights: [
      'Early morning field expeditions to Sarangkot and Peace Pagoda viewpoints',
      'Technical workshops on high-dynamic-range alpine exposure and color grading',
      'Ethical cultural documentary and environmental portraiture guidelines',
      'Final evening student exhibition gallery and printed project critique'
    ],
    organizer: {
      name: 'Nepal Visual Arts Guild & Photo Expeditions',
      role: 'Masterclass Director',
      email: 'photo@nepalvisuals.np',
      contact: '+977 61-532100'
    },
    featured: false
  },
  {
    id: 'kathmandu-jazz-fusion',
    title: 'Kathmandu Valley Jazz & Indie Fusion',
    category: 'Music',
    date: 'March 18, 2027',
    isoDate: '2027-03-18',
    time: '06:00 PM – 11:00 PM NPT',
    location: 'Lalitpur',
    venue: 'Moksh Live Amphitheatre, Jhamsikhel, Lalitpur',
    image: '/images/event-music.svg',
    shortDescription:
      'An eclectic weekend celebrating contemporary South Asian jazz, traditional bansuri flute improvisations, and indie rock collectives.',
    detailedDescription:
      'Taking over the vibrant open-air amphitheatre of Moksh in Jhamsikhel, Kathmandu Valley Jazz & Indie Fusion celebrates cross-genre boundary pushing. Celebrated Himalayan wind instrumentalists perform alongside cutting-edge modern jazz quartets and indie songwriters from Nepal and international guest artists, creating an intimate, acoustic-rich musical celebration.',
    highlights: [
      'Acoustic live amphitheatre setting with bespoke warm ambient lighting',
      'Unique collaborative sets marrying bansuri, sarangi, jazz upright bass, and horns',
      'Impromptu late-night jam sessions open to participating stage artists',
      'Artisanal dining and craft beverage pairings in Jhamsikhel’s cultural quarter'
    ],
    organizer: {
      name: 'Kathmandu Jazz & Live Arts Association',
      role: 'Curatorial Host',
      email: 'tickets@ktmjazz.org.np',
      contact: '+977 1-5524321'
    },
    featured: false
  }
];
