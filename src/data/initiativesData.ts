export interface Initiative {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  category: 'Education' | 'Women Empowerment' | 'Animal Welfare' | 'Community' | 'Environment' | 'Skill Development';
  color: string;
  impactNumber: string;
  impactLabel: string;
  image: string;
  shortDescription: string;
  fullDescription: string;
  objectives: string[];
  keyAchievements: string[];
  sdgGoals: string[];
  targetFund: number;
  raisedFund: number;
}

export const initiatives: Initiative[] = [
  {
    id: 'bachpanshala',
    slug: 'bachpanshala',
    title: 'Project Bachpanshala',
    tagline: 'Nurturing Young Minds, Building Bright Futures',
    category: 'Education',
    color: '#1a5336',
    impactNumber: '15,000+',
    impactLabel: 'Children Educated',
    image: '/images/slide-2.jpg',
    shortDescription:
      'Ensuring quality foundational education, books, and school kits for underprivileged children across informal learning centers.',
    fullDescription:
      'Project Bachpanshala is dedicated to breaking the cycle of poverty by providing holistic and joyful foundational education to underprivileged children who are out of school or enrolled in under-resourced public institutions. Through volunteer-led community learning centers, weekend remedial coaching, and distribution of essential study kits, Bachpanshala ensures that no child is deprived of the right to learn and dream.',
    objectives: [
      'Establish community-driven weekend learning hubs in low-income settlements.',
      'Distribute stationery kits, school bags, notebooks, and learning aids.',
      'Facilitate mainstream school admissions under the Right to Education (RTE) Act.',
      'Conduct creative arts, digital literacy, and basic English workshops.'
    ],
    keyAchievements: [
      'Over 15,000 children provided with foundational literacy and numeracy support.',
      '4,200+ comprehensive educational kits distributed across 14 states.',
      '85+ volunteer-led informal weekend coaching centers active.'
    ],
    sdgGoals: ['SDG 4: Quality Education', 'SDG 10: Reduced Inequalities'],
    targetFund: 500000,
    raisedFund: 395000,
  },
  {
    id: 'udaan',
    slug: 'udaan',
    title: 'Project Udaan',
    tagline: 'Soaring Towards a Brighter Future',
    category: 'Women Empowerment',
    color: '#7f5700',
    impactNumber: '900+',
    impactLabel: 'Women Empowered',
    image: '/images/iaf-gallery-2.jpg',
    shortDescription:
      'Fostering women empowerment through vocational skill training, financial literacy, and micro-entrepreneurship incubation.',
    fullDescription:
      'Project Udaan focuses on socio-economic empowerment of women from marginalized communities. By conducting specialized vocational training programs (tailoring, handicrafts, digital literacy, basic bookkeeping) and linking them to local markets and self-help groups, Udaan helps women attain financial independence and assert their leadership within their families and society.',
    objectives: [
      'Provide vocational training in sewing, handicrafts, and digital business tools.',
      'Conduct financial literacy camps covering banking, savings, and government schemes.',
      'Support home-based micro-enterprises with starter toolkits and market links.',
      'Promote menstrual hygiene awareness and distribute eco-friendly sanitary products.'
    ],
    keyAchievements: [
      '900+ women trained in vocational crafts and financial skills.',
      '420+ women started self-sustaining micro-businesses.',
      '12,000+ sanitary pads and hygiene kits distributed in rural areas.'
    ],
    sdgGoals: ['SDG 5: Gender Equality', 'SDG 8: Decent Work & Economic Growth'],
    targetFund: 450000,
    raisedFund: 340000,
  },
  {
    id: 'jeev',
    slug: 'jeev',
    title: 'Project Jeev',
    tagline: 'Empowering Lives, Spreading Compassion',
    category: 'Animal Welfare',
    color: '#003b22',
    impactNumber: '50+',
    impactLabel: 'Strays Fed Daily & Rescued',
    image: '/images/slide-1.jpg',
    shortDescription:
      'Feeding stray animals, organizing emergency rescues, installing summer water bowls, and championing cruelty-free communities.',
    fullDescription:
      'Project Jeev operates with the core belief that all living beings deserve kindness, dignity, and care. Our dedicated volunteers conduct daily stray feeding drives, install earthen water bowls for birds and strays in harsh summers, coordinate emergency medical rescue for injured animals, and conduct anti-rabies vaccination camps in partnership with local veterinarians.',
    objectives: [
      'Daily feeding drives for community dogs, cows, and stray animals in urban pockets.',
      'Install 5,000+ clay water bowls across public spots during summer months.',
      'Rapid response rescue network for injured, sick, or abandoned animals.',
      'Public awareness campaigns promoting animal adoption and cruelty-free living.'
    ],
    keyAchievements: [
      '50+ stray animals fed daily with nutritious warm meals.',
      '6,800+ summer water bowls placed in residential and public areas.',
      '1,450+ emergency rescues and veterinary treatments successfully facilitated.'
    ],
    sdgGoals: ['SDG 15: Life on Land', 'SDG 11: Sustainable Cities & Communities'],
    targetFund: 400000,
    raisedFund: 310000,
  },
  {
    id: 'seva',
    slug: 'seva',
    title: 'Project Seva',
    tagline: 'Serving Humanity with Compassion',
    category: 'Community',
    color: '#d99b26',
    impactNumber: '50,000+',
    impactLabel: 'Meals & Clothes Distributed',
    image: '/images/iaf-gallery-5.jpg',
    shortDescription:
      'Combating hunger and providing warm clothes, emergency relief rations, and essential supplies to destitute communities.',
    fullDescription:
      'Project Seva is the direct humanitarian outreach wing of InAmigos Foundation. Whenever crisis strikes or vulnerable families face extreme weather, Seva volunteers mobilize hot meal distributions, dry ration kits, and winter blanket drives to ensure that no person sleeps hungry or exposed to the elements.',
    objectives: [
      'Organize nutritious cooked meal distribution drives in slum settlements and hospitals.',
      'Distribute winter blankets and woollens during severe cold waves.',
      'Provide immediate emergency relief kits during natural calamities and flash floods.',
      'Partner with food businesses to minimize food wastage and redirect meals.'
    ],
    keyAchievements: [
      '50,000+ hygienic, freshly cooked meals distributed.',
      '14,000+ blankets and warm clothing items handed out in winter campaigns.',
      'Supported 3,500+ daily-wage families with emergency dry ration hampers.'
    ],
    sdgGoals: ['SDG 2: Zero Hunger', 'SDG 1: No Poverty'],
    targetFund: 600000,
    raisedFund: 480000,
  },
  {
    id: 'prakriti',
    slug: 'prakriti',
    title: 'Project Prakriti',
    tagline: 'Plant for a Better Tomorrow',
    category: 'Environment',
    color: '#2e7d4f',
    impactNumber: '20,000+',
    impactLabel: 'Saplings Planted & Nurtured',
    image: '/images/slide-5.jpg',
    shortDescription:
      'Afforestation drives, urban mini-forests, anti-plastic cleanliness drives, and ecological conservation education.',
    fullDescription:
      'Project Prakriti focuses on climate resilience, ecological restoration, and environmental sustainability. From large-scale native tree plantation drives to riverbank and community cleanups, Prakriti engages students and young citizens in hands-on conservation stewardship to safeguard our planet for future generations.',
    objectives: [
      'Plant and nurture native trees in schools, public parks, and deforested belts.',
      'Conduct community cleanliness drives (Plogging) to collect and recycle plastic.',
      'Organize eco-clubs in schools to teach composting, water conservation, and zero-waste.',
      'Distribute free saplings and seed balls during monsoon conservation festivals.'
    ],
    keyAchievements: [
      '20,000+ native trees planted with survival tracking.',
      '18+ tonnes of plastic waste collected and handed over to certified recyclers.',
      '90+ green awareness workshops conducted in schools and universities.'
    ],
    sdgGoals: ['SDG 13: Climate Action', 'SDG 15: Life on Land'],
    targetFund: 350000,
    raisedFund: 275000,
  },
  {
    id: 'vikas',
    slug: 'vikas',
    title: 'Project Vikas (Amigos LEVELUP)',
    tagline: 'Enhancing Employability & Youth Leadership',
    category: 'Skill Development',
    color: '#24362e',
    impactNumber: '30,000+',
    impactLabel: 'Youth Interns Guided',
    image: '/images/iaf-gallery-8.jpg',
    shortDescription:
      'Equipping youth with in-demand 21st-century skills, digital literacy, resume building, and structured social internships.',
    fullDescription:
      'Project Vikas addresses the youth unemployment and underemployment challenge in semi-urban and rural India. By offering hands-on bootcamps in digital tools, communication skills, resume curation, interview preparation, and freelance readiness, Vikas transforms ambitious youngsters into industry-ready contributors.',
    objectives: [
      'Conduct free employability masterclasses in digital marketing, coding, and design.',
      'Organize career counselling sessions and mock interview panels with industry mentors.',
      'Facilitate internship opportunities within NGOs, startups, and local businesses.',
      'Offer leadership training for grassroots youth community organizers.'
    ],
    keyAchievements: [
      '30,000+ student interns trained nationwide across digital operations, research, and outreach.',
      '1,200+ students placed in meaningful internships and entry-level positions.',
      'Mentorship network spanning 150+ working professionals and corporate volunteers.'
    ],
    sdgGoals: ['SDG 8: Decent Work & Economic Growth', 'SDG 4: Quality Education'],
    targetFund: 300000,
    raisedFund: 245000,
  },
];
