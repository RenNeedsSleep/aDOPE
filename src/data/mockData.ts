import { Artwork, Artist, CoreTeamMember, TimelineLog } from '../types';

export const LOGO_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuAW0pNxZMQe6i_wc32ptVOFF_BMqDiFRRn_CWrZhn_EdFSOVEGUgT46I-Vh-ECufF1dgq5qiXvdA4tOk9DPKqt7U8K5zIaQBxbzSgjnfui56ejkeYuVs2exEDi2VbuoKBWG1xNvMw4mrAp1PYBWXYAE9ban460reW7l-CfNoru4vwYW7iSnSy_-Xtli1BPIhDqOjlf-DNxm3W3-GoSXud7CIBZOWQVmm0ITueIM4nItWgMvrD4M3Md7Rm9cSCuEaV8y3Dc';

export const HERO_BADGE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuCUI6Ip2t6vPcyrIFnj6LkzVApZ2B0Ssuz5T2TP1zGhyNddjguehm_psjqS07L-xdCQjgsPZUEn7HFuU7DTxVz0WdsLmbsMO42Ud9FAdbvxMY-HG4cPgh61Q1NaNFBYNATSZjYfTQq1VxGHT7dzQcM9uxd8e6ZEnmnETAi9sTdkfN1FlyEGH91Nbzla-xge_ZMoCN44NSy_ylpyM_uWIDTofgrr1o8R40tT8lOy2kCIbtSnf5mO1CIDFe1-x0S309HgPXI';

export const HERO_TEXTURE_URL = 'https://lh3.googleusercontent.com/aida-public/AB6AXuDqt1tOPQoNjIbDr58Wa5R6wK3fL-BN9KIpawbKFeyKJAT9tdS1frV0UX3N0GJZBeBR65iMBP0NM66xwaQEi2gg6JHo2yBoo7z8KN-iY4UChWQWVN27QDcygJL9n8mXUpYwWduQyVDQrDhTsuxcV4UDLIhsURFVpVs_xISpP55qa36uLb_q0pp_YCnYbYGOyxSLlIZA5LdAL-fHBlosBy7dGqPCTe_3wRf5jBrR5l3dpIdv26Vl-4Uvdw';

export const SOCIAL_LINKS = {
  instagram: 'https://www.instagram.com/adopeclub_mgit/',
  linkedin: 'https://www.linkedin.com/company/adope-mgit/',
  behance: 'https://www.behance.net/adopeclubmgit',
  youtube: 'https://www.youtube.com/@adopeclubmgit3',
};

export const ARTWORKS_DATA: Artwork[] = [
  {
    id: 'art-nirvana-2026',
    title: 'NIRVANA 2026',
    category: 'Event Identity',
    imageUrl: '/nirvana-phoenix.png',
    description: 'A dimensional phoenix emblem created for NIRVANA 2026, MGIT’s annual fest.',
    year: '2026',
    artistName: 'NIRVANA',
    specs: ['Event Identity', 'Phoenix Emblem', '3D Artwork'],
    tags: ['NIRVANA', '2026', 'MGIT'],
    featured: true
  },
  {
    id: 'art-2',
    title: 'Magazine Design',
    category: 'Editorial',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/bbaf7c167501801.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    description: 'Editorial design project published in the aDOPE Club Behance portfolio.',
    year: '2023',
    artistName: 'aDOPE Club',
    specs: ['Editorial Design', 'Layout', 'Art Direction'],
    tags: ['Editorial', 'Magazine', 'Typography'],
    featured: true
  },
  {
    id: 'art-3',
    title: 'UI/UX Design',
    category: 'UI/UX',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/c5a61d167501611.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    description: 'Interface design work from the club’s public portfolio of creative projects.',
    year: '2023',
    artistName: 'aDOPE Club',
    specs: ['UI/UX', 'Interface Systems', 'Visual Design'],
    tags: ['UI/UX', 'Digital Art', 'Design'],
    featured: true
  },
  {
    id: 'art-4',
    title: 'Event Posters',
    category: 'Posters',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/9d18f5167500789.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    description: 'Poster work representing aDOPE’s role as an event-focused design team at MGIT.',
    year: '2023',
    artistName: 'aDOPE Club',
    specs: ['Poster Design', 'Campaign Graphics', 'Art Direction'],
    tags: ['Posters', 'Events', 'Graphic Design'],
    featured: true
  },
  {
    id: 'art-5',
    title: 'Logo Design',
    category: 'Logo Design',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/ee1ac3167501207.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    description: 'Logo design work from aDOPE Club’s identity and branding archive.',
    year: '2023',
    artistName: 'aDOPE Club',
    specs: ['Logo Design', 'Identity', 'Brand Systems'],
    tags: ['Logo', 'Branding', 'Identity'],
    featured: false
  },
  {
    id: 'art-6',
    title: 'Posters',
    category: 'Posters',
    imageUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/77f98b167500645.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    description: 'A poster collection documenting aDOPE’s graphic design practice.',
    year: '2023',
    artistName: 'aDOPE Club',
    specs: ['Graphic Design', 'Composition', 'Print'],
    tags: ['Posters', 'Print', 'Visual Communication'],
    featured: false
  }
];

export const TIMELINE_DATA: TimelineLog[] = [
  // 01 — WHO WE ARE / WHERE WE STARTED (2020 to 2021)
  {
    id: 'log-1',
    version: '01 — WHO WE ARE / WHERE WE STARTED',
    title: 'Club Officially Starts',
    category: '2020 TO 2021',
    date: 'FEB 2020',
    description: 'aDOPE begins as a student design club at MGIT in February 2020, started by seniors Sreenivas and Bhargav with fewer than ten designers and a shared design philosophy.',
    fullDetails: [
      'Founded in February 2020 by seniors Sreenivas and Bhargav.',
      'Started with fewer than ten dedicated designers.',
      'Rooted in peer learning, shared briefs, and visual culture.'
    ],
    imageUrl: LOGO_URL
  },
  {
    id: 'log-2',
    version: '01 — WHO WE ARE / WHERE WE STARTED',
    title: 'Nirvana 2020 Poster Release',
    category: '2020 TO 2021',
    date: '6 MAR 2020',
    description: 'The club launches its debut festival promotional campaign with the official Nirvana 2020 poster post, establishing a new visual identity benchmark on campus.',
    fullDetails: [
      'First major public creative release for MGIT.',
      'Defined a bold typographic and poster craft standard.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  },

  // 02 — WHAT WE DO / OUR IMPACT (2022 to 2023)
  {
    id: 'log-3',
    version: '02 — WHAT WE DO / OUR IMPACT',
    title: 'Design Seminar by Senior Abhishek',
    category: '2022 TO 2023',
    date: '1 APR 2022',
    description: 'Teaching design, not just making posters. Senior Abhishek leads an open seminar guiding members through creative workflows, composition, and visual thinking.',
    fullDetails: [
      'Shifted the club ethos toward active mentorship and training.',
      'Demystified tools, layout theory, and creative problem-solving.'
    ],
    imageUrl: LOGO_URL
  },
  {
    id: 'log-4',
    version: '02 — WHAT WE DO / OUR IMPACT',
    title: 'Nirvana 2022 Identity Rollout',
    category: '2022 TO 2023',
    date: '29 JUN 2022',
    description: 'Complete visual identity, stage branding, and print collateral designed for Nirvana 2022 as campus reopens for cultural festivals.',
    fullDetails: [
      'Full-scale festival branding across social, print, and stage graphics.',
      'United designers under a cohesive campus-wide visual system.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  },
  {
    id: 'log-5',
    version: '02 — WHAT WE DO / OUR IMPACT',
    title: 'Resolution 2.0 UX/UI Workshop',
    category: '2022 TO 2023',
    date: '6 APR 2023',
    description: 'Practical user interface and digital experience workshop led by industry designer Mr. Adesh, training members on wireframing, component design, and Figma.',
    fullDetails: [
      'Expanded club practice from static graphics to digital interfaces.',
      'Engaged over 80+ engineering and design students.'
    ],
    imageUrl: LOGO_URL
  },
  {
    id: 'log-6',
    version: '02 — WHAT WE DO / OUR IMPACT',
    title: 'Nirvana 2023 Campaign',
    category: '2022 TO 2023',
    date: '27 APR 2023',
    description: 'High-contrast, dynamic branding system roll-out featuring motion assets, official festival merchandise, and stage art for Nirvana 2023.',
    fullDetails: [
      'Multi-channel release spanning posters, banners, and digital teasers.',
      'Elevated student fest branding with custom vector art.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  },
  {
    id: 'log-7',
    version: '02 — WHAT WE DO / OUR IMPACT',
    title: 'Design Dynasty UI/UX & Graphic Workshop',
    category: '2022 TO 2023',
    date: '22 DEC 2023',
    description: 'Intensive dual-track workshop diving into graphic design essentials and interactive product design with enthusiastic hands-on challenges.',
    fullDetails: [
      'Two-track hands-on curriculum with real-time peer critique.',
      'Onboarded the next cohort of student creatives.'
    ],
    imageUrl: LOGO_URL
  },

  // 03 — WHAT WE CREATE / OUR RANGE (2024 to 2026)
  {
    id: 'log-8',
    version: '03 — WHAT WE CREATE / OUR RANGE',
    title: 'Nirvana 2024 Logo & Identity',
    category: '2024 TO 2026',
    date: '15 MAR 2024',
    description: 'A signature look for Nirvana. The club crafts a geometric, modernized festival emblem marking an annual evolution of fest branding.',
    fullDetails: [
      'Established annual custom emblem craftsmanship as a club hallmark.',
      'Seamless multi-platform adaptation for campus culture.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  },
  {
    id: 'log-9',
    version: '03 — WHAT WE CREATE / OUR RANGE',
    title: 'Nirvana 2025 Logo Refresh',
    category: '2024 TO 2026',
    date: '23 MAR 2025',
    description: 'Futuristic emblem design blending clean letterforms with kinetic motion identities for the flagship Nirvana 2025 edition.',
    fullDetails: [
      'Experimental typographic layout and multi-layer graphics.',
      'Extensive social countdown teasers and reels.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  },
  {
    id: 'log-10',
    version: '03 — WHAT WE CREATE / OUR RANGE',
    title: 'Video Editing Workshop (Collab with DOP)',
    category: '2024 TO 2026',
    date: '14 OCT 2025',
    description: 'Collaborative workshop with the Department of Photography, bridging cinematography, timeline pacing, and color grading across Premiere and DaVinci Resolve.',
    fullDetails: [
      'Cross-club synergy training students in motion and editing.',
      'Produced cinematic reels, festival trailers, and aftermovies.'
    ],
    imageUrl: LOGO_URL
  },
  {
    id: 'log-11',
    version: '03 — WHAT WE CREATE / OUR RANGE',
    title: 'Nirvana 2026: 3D Phoenix Mark',
    category: '2024 TO 2026',
    date: '23 FEB 2026',
    description: 'The signature 3D Nirvana mark and interactive digital core uniting visual communication, 3D graphics, and engineering into one continuous studio.',
    fullDetails: [
      'Interactive 3D WebGL centerpiece for Nirvana 2026.',
      'The definitive emblem holding the entire aDOPE system together.'
    ],
    imageUrl: '/nirvana-phoenix.png'
  }
];

export const ARTISTS_DATA: Artist[] = [
  {
    id: 'practice-branding',
    name: 'Brand & Identity',
    role: 'Practice Area',
    avatarUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/ee1ac3167501207.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    bio: 'Logos, visual identities, and brand systems for clubs, events, and campus culture.',
    specialty: ['Branding', 'Logo Design', 'Art Direction']
  },
  {
    id: 'practice-editorial',
    name: 'Editorial & Print',
    role: 'Practice Area',
    avatarUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/bbaf7c167501801.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    bio: 'Magazine layouts, posters, and print-led compositions built for clear visual communication.',
    specialty: ['Editorial', 'Posters', 'Typography']
  },
  {
    id: 'practice-digital',
    name: 'Digital Art & UI/UX',
    role: 'Practice Area',
    avatarUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/c5a61d167501611.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    bio: 'Digital interfaces and visual experiments that extend the club’s graphic design practice onto screens.',
    specialty: ['UI/UX', 'Digital Art', 'Visual Design']
  },
  {
    id: 'practice-campaigns',
    name: 'Events & Campaigns',
    role: 'Practice Area',
    avatarUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/9d18f5167500789.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    bio: 'Campaign graphics and event visuals that connect the club’s design work to MGIT’s campus life.',
    specialty: ['Events', 'Campaigns', 'Graphic Design']
  },
  {
    id: 'practice-logos',
    name: 'Logos',
    role: 'Practice Area',
    avatarUrl: 'https://mir-s3-cdn-cf.behance.net/projects/max_808_webp/ee1ac3167501207.Y3JvcCwxMzgwLDEwODAsMjcwLDA.png',
    bio: 'Distinctive marks and logo systems that give campus identities a clear, lasting visual signature.',
    specialty: ['Logos', 'Branding', 'Identity']
  }
];

export const CORE_TEAM_DATA: CoreTeamMember[] = [
  {
    id: 'core-head',
    name: 'Krish Srk',
    role: 'Head',
    imageUrl: '/krish-srk-frame.jpeg',
    bio: 'Leading aDOPE\'s visual direction and creative work.'
  },
  {
    id: 'core-co-head',
    name: 'Sohail Ali',
    role: 'Co-Head',
    imageUrl: '/sohail.jpeg',
    bio: 'Supporting aDOPE\'s creative direction and coordinating the club\'s design initiatives.'
  },
  {
    id: 'core-secretary',
    name: 'T Siddhartha Karthik',
    role: 'Secretary',
    imageUrl: '/secretary-siddhartha.jpeg',
    bio: 'Keeping aDOPE’s plans, records, and team communication organized so creative projects move forward smoothly.'
  },
  {
    id: 'core-president',
    name: 'Akshit Bulusu',
    role: 'President',
    imageUrl: '/akshit-bulusu.jpeg',
    bio: 'Leading aDOPE’s creative community and guiding the club’s vision and initiatives.'
  },
  {
    id: 'core-member-02',
    name: 'Shyam Sunder Pabboju',
    role: 'Faculty Coordinator',
    imageUrl: '/shyam-sunder-pabboju.png',
    bio: 'Guiding aDOPE’s student team with faculty insight and support for its creative initiatives.'
  },
  {
    id: 'core-member-03',
    name: 'Sree Divya',
    role: 'Faculty Coordinator',
    imageUrl: '/sree-divya.png',
    bio: 'Supporting aDOPE’s student team through faculty mentorship across its creative work.'
  },
  {
    id: 'core-faculty-pending',
    name: '',
    role: 'Faculty Coordinator',
    bio: ''
  }
];

export const CLUB_STATS = [
  { label: 'Portfolio Projects', value: '7' },
  { label: 'Core Practice', value: 'DESIGN' }
];
