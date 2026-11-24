/**
 * ============================================================================
 * ALPHA ARCHITECTURE & DEVELOPERS — EDITABLE WEBSITE CONFIGURATION
 * ============================================================================
 * Beginners: You can update your company contact details, services, portfolio
 * projects, and process steps directly in this single file!
 * Simply replace any placeholder text inside quotation marks ("...") and save.
 */

export type ProjectCategory =
  | 'All'
  | 'Residential'
  | 'Commercial'
  | 'Renovation'
  | 'Development';

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  shortTag: string;
  summary: string;
  deliverables: string[];
}

export interface ProjectGalleryImage {
  src: string;
  alt: string;
  caption: string;
  sectionLabel: string;
  objectPosition?: string;
}

export interface ProjectItem {
  id: string;
  title: string;
  category: Exclude<ProjectCategory, 'All'>;
  badgeLabel?: string;
  locationLabel: string;
  scaleHeading?: string;
  scaleLabel: string;
  statusHeading?: string;
  yearOrPhase: string;
  imageOrientation?: 'landscape' | 'portrait';
  galleryHeading?: string;
  isPlaceholder: boolean;
  image: string;
  imageAlt: string;
  overview: string;
  scopeHighlights: string[];
  gallery?: ProjectGalleryImage[];
}

export interface ProcessStep {
  step: string;
  title: string;
  durationHint: string;
  description: string;
  deliverable: string;
}

export interface PillarItem {
  number: string;
  title: string;
  description: string;
}

export interface LeadershipMember {
  id: string;
  name: string;
  role: string;
  initials: string;
  /** Optional genuine portrait path (e.g. '/assets/team/portrait.jpg') if supplied later */
  photoUrl?: string;
}

export interface ContactPhoneItem {
  id: string;
  label: string;
  display: string;
  phoneHref: string;
  whatsappNumber: string;
  whatsappHref: string;
}

export const SITE_CONFIG = {
  brand: {
    name: 'ALPHA ARCHITECTURE & DEVELOPERS',
    shortName: 'ALPHA ARCHITECTURE',
    /** Uploaded official company logo saved in /public/assets/aistudio/ */
    officialLogoPath: '/assets/aistudio/Alpha_Logo_bdec9de0.jpg',
    officialLogoAlt:
      'Official logo of Alpha Architecture and Developers featuring the blue geometric triangular A symbol',
    establishedNote: 'Architecture · Construction · Development',
  },

  hero: {
    kicker: 'Architecture · Construction · Development',
    headline: 'Building with Purpose. Creating for the Future.',
    supportingText:
      'Thoughtful design, dependable construction and development solutions built around your vision.',
    primaryCta: 'Explore Our Projects',
    secondaryCta: 'Request a Consultation',
    image: '/src/assets/images/hero_modern_architecture_1795514479856.jpg',
    imageAlt:
      'Modern cantilevered limestone and structural glass architectural building with landscaped courtyard designed for Alpha Architecture and Developers showcase',
    trustStrip: [
      {label: 'Core Focus', value: 'Residential & Commercial'},
      {label: 'Delivery Model', value: 'Design-to-Build Clarity'},
      {label: 'Quality Standard', value: 'Code-Compliant & Audited'},
      {label: 'Client Commitment', value: 'Transparent Milestones'},
    ],
  },

  about: {
    eyebrow: 'About the Company',
    headline: 'Architectural precision grounded in reliable construction.',
    paragraphs: [
      'ALPHA ARCHITECTURE & DEVELOPERS brings architectural design, engineering coordination, construction execution, and property development together under one accountable roof.',
      'We believe lasting buildings begin with clear listening—understanding your site, budget, climate, and long-term goals before a single line is drawn or foundation poured.',
      'Whether shaping a private residence, a commercial workplace, a sensitive renovation, or a multi-unit development, our team pairs timeless form with disciplined project delivery.',
    ],
    studioImage: '/src/assets/images/about_studio_blueprint_1795514481155.jpg',
    studioImageAlt:
      'Architectural scale model, structural blueprints, and natural stone material samples arranged on a studio table',
    commitments: [
      {
        title: 'Unified Accountability',
        detail:
          'One coordinated team bridging architectural drawings, structural specifications, and on-site execution.',
      },
      {
        title: 'Material Longevity',
        detail:
          'Carefully vetted structural systems and enduring finishes selected for climate resilience and low lifecycle cost.',
      },
      {
        title: 'Clear Documentation',
        detail:
          'Structured cost schedules, milestone sign-offs, and honest progress updates from concept through handover.',
      },
    ],
    /**
     * ========================================================================
     * EDITABLE COMPANY LEADERSHIP
     * Update names, roles, or add an optional genuine `photoUrl` when provided.
     * ========================================================================
     */
    leadershipEyebrow: 'Company Leadership',
    leadershipHeadline: 'Leadership committed to architectural integrity and reliable delivery.',
    leadership: [
      {
        id: 'muhammad-asif',
        name: 'Muhammad Asif',
        role: 'Managing Director (MD)',
        initials: 'MA',
      },
      {
        id: 'qurat-ul-ain-jadoon',
        name: 'Qurat-Ul-Ain Jadoon',
        role: 'Chief Executive Officer (CEO)',
        initials: 'QJ',
      },
    ] satisfies LeadershipMember[],
  },

  /**
   * ==========================================================================
   * EDITABLE SERVICES LIST
   * Add, remove, or edit any service object below. Changes update automatically
   * in both the Services section and the Contact Consultation dropdown.
   * ==========================================================================
   */
  services: [
    {
      id: 'architectural-design',
      number: '01',
      title: 'Architectural Design',
      shortTag: 'Concept & Planning',
      summary:
        'Bespoke spatial planning, 3D visualization, permit-ready construction drawings, and interior coordination tailored to your plot and lifestyle.',
      deliverables: [
        'Site analysis & feasibility studies',
        'Concept plans & 3D architectural massing',
        'Detailed working & municipal approval drawings',
      ],
    },
    {
      id: 'residential-construction',
      number: '02',
      title: 'Residential Construction',
      shortTag: 'Custom Homes & Villas',
      summary:
        'End-to-end turnkey home building combining solid structural engineering, skilled craftsmanship, and thoughtful finishing details.',
      deliverables: [
        'Grey structure & MEP installations',
        'Custom joinery, stone & facade execution',
        'Strict stage-by-stage structural inspections',
      ],
    },
    {
      id: 'commercial-construction',
      number: '03',
      title: 'Commercial Construction',
      shortTag: 'Offices & Retail Spaces',
      summary:
        'Functional, code-compliant commercial spaces, office buildings, and retail hubs engineered for durability, circulation, and brand presence.',
      deliverables: [
        'Multi-story structural & facade systems',
        'Fire safety, HVAC & acoustic compliance',
        'Milestone-tracked commercial delivery',
      ],
    },
    {
      id: 'renovation',
      number: '04',
      title: 'Renovation & Remodeling',
      shortTag: 'Structural Upgrades',
      summary:
        'Thoughtful transformations of existing residences and commercial properties—upgrading layout flow, structural integrity, and modern efficiency.',
      deliverables: [
        'Structural assessment & load modifications',
        'Facade modernization & spatial reconfiguration',
        'Interior refurbishment with minimal disruption',
      ],
    },
    {
      id: 'project-management',
      number: '05',
      title: 'Project Management',
      shortTag: 'Cost & Schedule Control',
      summary:
        'Dedicated owner representation, contractor coordination, BOQ budgeting, and site supervision to keep quality high and timelines predictable.',
      deliverables: [
        'Bill of Quantities (BOQ) & tender evaluation',
        'Weekly site audits & quality verification',
        'Schedule tracking & vendor coordination',
      ],
    },
    {
      id: 'property-development',
      number: '06',
      title: 'Property Development',
      shortTag: 'Land & Multi-Unit',
      summary:
        'Strategic land utilization, multi-unit residential enclaves, and mixed-use development planning designed for lasting community and investment value.',
      deliverables: [
        'Master planning & yield optimization',
        'Infrastructure & landscape integration',
        'Phased build execution & handover readiness',
      ],
    },
  ] satisfies ServiceItem[],

  /**
   * ==========================================================================
   * EDITABLE GENUINE PROJECTS PORTFOLIO
   * Note: Only authentic, company-supplied projects are listed here.
   * Update any editable title, location, plot size, or status directly below.
   * ==========================================================================
   */
  projectsNotice:
    'Showcasing genuine Alpha Architecture & Developers projects—featuring Platinum Arcade (Commercial & Residential Mixed-Use in Sector N), The 4-Kanal Signature Residence (Under Construction), and 11-Marla Residence (Completed in Sector C1) in Bahria Enclave, Islamabad, alongside confirmed residential exterior photography.',

  projects: [
    {
      id: 'platinum-arcade-bahria-enclave',
      title: 'Platinum Arcade',
      category: 'Commercial',
      badgeLabel: 'Commercial · Residential · Mixed-Use',
      locationLabel: 'Sector N, Bahria Enclave, Islamabad',
      scaleHeading: 'Facilities',
      scaleLabel: 'Offices & Apartments',
      statusHeading: 'Project Type',
      yearOrPhase: 'Commercial & Residential Mixed-Use',
      imageOrientation: 'portrait',
      galleryHeading: 'Furnished Apartment Interiors Gallery',
      isPlaceholder: false,
      image: '/assets/aistudio/1795520100650_4947a756.jpg',
      imageAlt:
        'Genuine exterior photograph of Platinum Arcade in Sector N, Bahria Enclave, Islamabad, showing the multi-level commercial and residential facade with Platinum Arcade signage, patterned cladding, glazed frontage, and raised entrance steps',
      overview:
        'Platinum Arcade is a mixed-use commercial and residential development in Sector N, Bahria Enclave, Islamabad. The project features office and apartment spaces, bringing together commercial and residential facilities within one development.',
      scopeHighlights: [
        'Located in Sector N, Bahria Enclave, Islamabad',
        'Mixed-use commercial & residential development',
        'Features office spaces alongside furnished apartment interiors',
      ],
      gallery: [
        {
          src: '/assets/aistudio/1795520100650_4947a756.jpg',
          alt: 'Front exterior photograph of Platinum Arcade in Sector N, Bahria Enclave, Islamabad with Platinum Arcade signage, glazed upper levels, and raised pedestrian entry steps',
          caption:
            'Exterior elevation of Platinum Arcade in Sector N, Bahria Enclave, Islamabad, displaying the Platinum Arcade signage, glazed frontage, and street-level entrance.',
          sectionLabel: 'Exterior Facade',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/1795520089304_ad0b12c5.jpg',
          alt: 'Furnished residential apartment living area inside Platinum Arcade featuring a curved beige sofa, burgundy accent armchairs, recessed ceiling lighting, and compact refrigerator',
          caption:
            'Furnished apartment living room inside Platinum Arcade featuring a curved neutral sofa, burgundy accent seating, and marble-look tile flooring.',
          sectionLabel: 'Apartment Living Room',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/1795520092747_f5734725.jpg',
          alt: 'Furnished apartment lounge and kitchenette area inside Platinum Arcade showing a mounted television panel, round nesting tables, accent chair, and counter cabinetry',
          caption:
            'Residential apartment lounge and kitchenette zone equipped with a wall-mounted media unit, round coffee tables, and fitted counter cabinetry.',
          sectionLabel: 'Lounge & Kitchenette',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/1795520085761_ae88a386.jpg',
          alt: 'Furnished apartment bedroom inside Platinum Arcade with grey upholstered wingback bed, bedside lamp, full-height beige curtains, and wall-mounted air conditioner',
          caption:
            'Furnished apartment bedroom finished with a grey upholstered headboard, bedside nightstand lamp, full-height drapery, and air conditioning.',
          sectionLabel: 'Apartment Bedroom I',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/1795520096503_e010266f.jpg',
          alt: 'Furnished apartment bedroom inside Platinum Arcade showing a dark stitched headboard, patterned curtains, bedside lamp, ceiling fan, and air-conditioning unit',
          caption:
            'Furnished apartment bedroom featuring a dark upholstered bed frame, patterned full-height curtains, bedside lighting, and tiled floor.',
          sectionLabel: 'Apartment Bedroom II',
          objectPosition: 'center center',
        },
      ],
    },
    {
      id: 'the-4-kanal-signature-residence',
      title: 'The 4-Kanal Signature Residence',
      category: 'Residential',
      locationLabel: 'Bahria Enclave, Islamabad',
      scaleLabel: '4 Kanal Residence',
      yearOrPhase: 'Under Construction',
      imageOrientation: 'landscape',
      galleryHeading: 'Interior, Staircase, Courtyard & Landscaping Progress',
      isPlaceholder: false,
      image: '/assets/aistudio/ch_house_591711c6.jpg',
      imageAlt:
        'Authentic construction-phase exterior photograph of The 4-Kanal Signature Residence by Alpha Architecture and Developers in Bahria Enclave, Islamabad, showing the two-story grey plastered concrete structure, red pitched roof tiles, arched corner turret openings, boundary wall, and active site fencing under an overcast sky',
      overview:
        'An exceptional 4-kanal residential development by Alpha Architecture & Developers in Bahria Enclave, Islamabad. Confirmed by the company as the largest house in the enclave, this signature residence is currently under construction.',
      scopeHighlights: [
        '4-kanal residential plot in Bahria Enclave, Islamabad',
        'Confirmed as the largest house in Bahria Enclave',
        'Active construction: grey structure, pitched roofing & boundary wall',
      ],
      gallery: [
        {
          src: '/assets/aistudio/ch_house_591711c6.jpg',
          alt: 'Exterior street view of The 4-Kanal Signature Residence under construction showing the grey plastered structure, arched corner openings, and red pitched roof tiles',
          caption:
            'Primary exterior elevation under construction with red pitched roof tiles, arched corner openings, and perimeter boundary wall.',
          sectionLabel: 'Exterior Elevation',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/ch_house_int6_fa38fba1.jpg',
          alt: 'Upper-level interior space under construction with curved ceiling opening and tall window openings looking out toward the red roof tiles',
          caption:
            'Upper-level interior space featuring a curved ceiling opening and tall vertical window openings overlooking the roof terraces.',
          sectionLabel: 'Interior & Windows',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/ch_house_int5_c733375a.jpg',
          alt: 'Multi-level interior stair hall showing the curved concrete staircase rising above and descending into the lower-level stairwell opening',
          caption:
            'Multi-level concrete stair hall with curved floating treads connecting the lower, main, and upper levels.',
          sectionLabel: 'Concrete Staircase',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/ch_house_int3_be8065e5.jpg',
          alt: 'Close-up interior photograph of the curved cantilevered concrete staircase ascending toward the upper landing during structural work',
          caption:
            'Close view of the sweeping curved concrete staircase and rough-plastered interior openings during construction.',
          sectionLabel: 'Staircase Detail',
          objectPosition: 'center 45%',
        },
        {
          src: '/assets/aistudio/ch_house_int2_9a265b46.jpg',
          alt: 'Patterned outdoor tiled courtyard walkway with recessed palm planter beds, metal garden arch, and boundary wall with stone water feature',
          caption:
            'Patterned tiled courtyard walkway with recessed palm beds and garden arch opening onto the lawn.',
          sectionLabel: 'Courtyard & Walkways',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/ch_house_int1_ea08a738.jpg',
          alt: 'Exterior covered veranda elevation and patterned tiled walkway bordering the landscaped lawn and boundary wall',
          caption:
            'Covered veranda elevation and tiled garden walkway running alongside the landscaped lawn.',
          sectionLabel: 'Veranda & Walkway',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/ch_house_int4_1f182b78.jpg',
          alt: 'Elevated view across the lawn toward the tiered stone wall feature on the boundary wall and surrounding Bahria Enclave road',
          caption:
            'Elevated view over the lawn toward the tiered stone feature on the boundary wall and Bahria Enclave avenue.',
          sectionLabel: 'Lawn & Landscaping',
          objectPosition: 'center 55%',
        },
      ],
    },
    {
      id: '11-marla-residence-bahria-enclave',
      title: '11-Marla Residence',
      category: 'Residential',
      locationLabel: 'Sector C1, Bahria Enclave, Islamabad',
      scaleLabel: '11 Marla',
      yearOrPhase: 'Completed',
      imageOrientation: 'landscape',
      galleryHeading: 'Courtyard, Staircase, Living Spaces & Bedrooms Gallery',
      isPlaceholder: false,
      image: '/assets/projects/residence_11_marla_ext1.jpg',
      imageAlt:
        'Completed exterior elevation of the 11-Marla Residence in Sector C1, Bahria Enclave, Islamabad, featuring warm cream plaster finishes, red roof tiles, glass-block balcony arch, and perimeter gate',
      overview:
        'A newly built residential project by Alpha Architecture & Developers in Sector C1, Bahria Enclave, Islamabad. The project showcases finished exterior detailing, furnished interior spaces and thoughtfully arranged living areas.',
      scopeHighlights: [
        '11-marla residential plot in Sector C1, Bahria Enclave, Islamabad',
        'Completed exterior facade, tiled courtyard & landscaped planters',
        'Finished staircase, kitchen, dining, lounges & furnished bedrooms',
      ],
      gallery: [
        {
          src: '/assets/projects/residence_11_marla_ext1.jpg',
          alt: 'Front exterior view of the completed 11-Marla Residence in Sector C1, Bahria Enclave, Islamabad with terracotta roof tiles and arched upper windows',
          caption:
            'Completed front elevation featuring warm cream exterior finishes, terracotta roof tiles, glass-block balcony arch, and main driveway gate.',
          sectionLabel: 'Exterior Facade',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_ext2_1b793ecb.jpg',
          alt: 'Tiled side courtyard and arched exterior window lined with potted greenery along the boundary wall',
          caption:
            'Tiled side courtyard and arched window elevation landscaped with potted palms and perimeter greenery.',
          sectionLabel: 'Courtyard & Landscaping',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int10_8a92a34a.jpg',
          alt: 'Interior staircase hall with floating white concrete treads, timber-and-glass railing, chandelier, and recessed stone wall niches',
          caption:
            'Interior staircase with floating treads, under-step illumination, timber-and-glass balustrade, and recessed stone wall niches.',
          sectionLabel: 'Feature Staircase',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int_1_97a34009.jpg',
          alt: 'Formal drawing room viewed through timber glass doors showing neutral sofa seating, layered coffee table, and cove ceiling lighting',
          caption:
            'Formal sitting room framed by timber glass doors with recessed cove lighting and arranged seating.',
          sectionLabel: 'Drawing Room',
          objectPosition: 'center center',
        },
        {
          src: '/assets/projects/residence_11_marla_int6_cropped.jpg',
          alt: 'Interior foyer with tall dark wood doors, decorative stone mantel, framed mirror, and polished tile flooring',
          caption:
            'Interior living foyer showcasing paneled timber doors, stone-clad mantel surround, and polished tile flooring.',
          sectionLabel: 'Living Foyer',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int_4_81ced99b.jpg',
          alt: 'Furnished family lounge with dark timber media unit, decorative stone partition niches, and tiled floor',
          caption:
            'Family TV lounge featuring a built-in timber media wall and stone-clad architectural partition niches.',
          sectionLabel: 'Family Lounge',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int3_06e97342.jpg',
          alt: 'Open-plan dining area and kitchen transition with curved floor tile inlay, recessed ceiling lighting, and broad sunlit window',
          caption:
            'Open-plan dining area and kitchen transition with curved floor tile detailing and abundant natural daylight.',
          sectionLabel: 'Dining & Kitchen View',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int_2_8fd1628b.jpg',
          alt: 'Fitted kitchen with two-tone dark and white cabinetry, built-in oven column, range hood, and patterned floor tiles',
          caption:
            'Completed kitchen fitted with contrasting dark and white cabinetry, built-in appliance tower, and range hood.',
          sectionLabel: 'Kitchen',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int8_a0bc4773.jpg',
          alt: 'Primary bedroom furnished with carved emerald-and-gold headboard, matching bench, full-height green curtains, and tiled floor',
          caption:
            'Primary bedroom suite finished with full-height drapery, carved upholstered bed frame, and polished floor tiles.',
          sectionLabel: 'Primary Bedroom',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int7_62fdc78d.jpg',
          alt: 'Twin bedroom with matching light-wood single beds, maroon curtains, and clean white wall finishes',
          caption:
            'Twin bedroom arranged with matching light-wood bed frames, full-height drapery, and bright interior finishes.',
          sectionLabel: 'Twin Bedroom',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/my_house_int9_a4966cbe.jpg',
          alt: 'Furnished guest bedroom featuring dark timber bed frame, deep red curtains, patterned rug, and compact study desk',
          caption:
            'Furnished guest bedroom featuring deep red drapery, timber bed frame, and integrated study corner.',
          sectionLabel: 'Guest Bedroom',
          objectPosition: 'center center',
        },
      ],
    },
    /*
     * PROVISIONAL RESIDENTIAL EXTERIOR GROUP A (Editable)
     * - Covers uploaded files `house 1ext.jpg` / `house 4ext.jpg` (verified
     *   byte-for-byte duplicate, so only one instance is shown) and
     *   `house 4 and 5 ext.jpg` (wider street view showing the same residence
     *   on the right alongside a neighboring elevation on the left).
     * - Edit `title`, `locationLabel`, `scaleLabel`, and `yearOrPhase` once
     *   final project attribution, address/sector, plot size, and status are confirmed.
     */
    {
      id: 'residential-exterior-house-1-4-group',
      title: 'Residential Exterior — House 1 / 4 Group',
      category: 'Residential',
      locationLabel: 'Location To Be Confirmed',
      scaleLabel: 'Plot Size To Be Confirmed',
      yearOrPhase: 'Status To Be Confirmed',
      isPlaceholder: false,
      image: '/assets/aistudio/house_4ext_6eef60b2.jpg',
      imageAlt:
        'Genuine exterior photograph of a cream two-story residence with terracotta roof tiles, glass-block balcony arch, curved upper windows, and brown louvered driveway gate',
      overview:
        'A residential exterior study grouped provisionally from company-supplied photographs (house 1 / 4 & 5 set). The wider street view includes an adjacent neighboring elevation on the left; exact unit attribution, location, plot size, and completion status remain editable pending confirmation.',
      scopeHighlights: [
        'Provisional label: House 1 / 4 & 5 exterior group (location & plot size to be confirmed)',
        'Exterior photography only; adjacent streetfront elevation visible in wide view',
        'Cream plaster elevation, terracotta roof tiles, glass-block balcony & louvered gate',
      ],
      gallery: [
        {
          src: '/assets/aistudio/house_4ext_6eef60b2.jpg',
          alt: 'Front exterior photograph of the cream two-story residence featuring terracotta roof tiles, glass-block balcony arch, curved upper windows, and brown louvered gate',
          caption:
            'Direct front exterior photograph (house 4ext / identical to house 1ext; deduplicated so only one copy is displayed).',
          sectionLabel: 'Front Exterior',
          objectPosition: 'center center',
        },
        {
          src: '/assets/aistudio/house_4_and_5_ext_6e9b7b66.jpg',
          alt: 'Wider street exterior photograph showing the same cream residence on the right and an adjacent neighboring elevation on the left behind street trees',
          caption:
            'Wider street angle (house 4 & 5 group) showing the primary residence on the right alongside an adjoining neighboring elevation on the left; individual unit scope pending confirmation.',
          sectionLabel: 'Wider Street View',
          objectPosition: 'center center',
        },
      ],
    },
    /*
     * PROVISIONAL RESIDENTIAL EXTERIOR GROUP B (Editable)
     * - Uses uploaded file `house 2 and 3ext.jpg`, which shows two neighboring
     *   streetfront elevations side-by-side (one marked "3" on the left and an
     *   adjacent elevation marked "4" on the right).
     * - Edit `title`, `locationLabel`, `scaleLabel`, and `yearOrPhase` once
     *   confirmed unit ownership, plot size, location, and status are provided.
     */
    {
      id: 'residential-exterior-house-2-3-group',
      title: 'Residential Exterior — House 2 & 3 Group',
      category: 'Residential',
      locationLabel: 'Location To Be Confirmed',
      scaleLabel: 'Plot Size To Be Confirmed',
      yearOrPhase: 'Status To Be Confirmed',
      isPlaceholder: false,
      image: '/assets/aistudio/house_2_and_3ext_40292b75.jpg',
      imageAlt:
        'Genuine street exterior photograph showing two adjoining cream and terracotta-roofed residences, including the carport elevation numbered 3 on the left behind palm trees and the adjacent elevation on the right',
      overview:
        'A residential exterior showcase grouped provisionally under the supplied House 2 & 3 label. The photograph captures two adjacent streetfront elevations side by side; only company-confirmed residences apply, and exact unit attribution, location, plot size, and completion status await confirmation.',
      scopeHighlights: [
        'Provisional label: House 2 & 3 exterior group (unit attribution & plot size to be confirmed)',
        'Wide street photograph capturing two adjoining elevations side by side',
        'Cream stucco facade, terracotta roof tiles, arched openings & timber-slat gates',
      ],
      gallery: [
        {
          src: '/assets/aistudio/house_2_and_3ext_40292b75.jpg',
          alt: 'Street-level exterior photograph of adjoining residences showing the elevation labeled 3 on the left and the adjacent elevation on the right with glass balcony railing',
          caption:
            'Street elevation (house 2 & 3 group) showing two neighboring residences side by side; specific Alpha Architecture & Developers unit confirmation, location, and plot size pending.',
          sectionLabel: 'Street Elevation',
          objectPosition: 'center center',
        },
      ],
    },
  ] satisfies ProjectItem[],

  whyChooseUs: {
    eyebrow: 'Why Choose Us',
    headline: 'Disciplined execution behind every architectural line.',
    subtext:
      'Great architecture only succeeds when the build matches the intent on paper. We structure every engagement around clarity, structural rigor, and dependable stewardship.',
    pillars: [
      {
        number: '01',
        title: 'Integrated Design & Build Thinking',
        description:
          'Architects and site engineers collaborate from day one, preventing costly redesigns and ensuring drawings translate smoothly to the field.',
      },
      {
        number: '02',
        title: 'Transparent Budgeting & Milestones',
        description:
          'Itemized bills of quantities, clearly defined payment stages, and regular progress documentation keep every financial decision grounded.',
      },
      {
        number: '03',
        title: 'Verified Structural & Material Quality',
        description:
          'Strict adherence to structural reinforcement standards, curing schedules, waterproofing protocols, and vetted supplier specifications.',
      },
      {
        number: '04',
        title: 'Dedicated Single-Point Communication',
        description:
          'One clear project lead coordinates consultants, approvals, and site trades so you always know who is accountable.',
      },
    ] satisfies PillarItem[],
  },

  process: {
    eyebrow: 'Our Construction Process',
    headline: 'A clear, five-stage path from first conversation to keys in hand.',
    subtext:
      'Every project follows structured checkpoints so scope, compliance, cost, and craftsmanship remain visible at every step.',
    steps: [
      {
        step: '01',
        title: 'Consultation & Site Feasibility',
        durationHint: 'Stage 01',
        description:
          'We review your site dimensions, zoning context, functional brief, and target budget to establish a realistic architectural and build roadmap.',
        deliverable: 'Project brief & preliminary feasibility outline',
      },
      {
        step: '02',
        title: 'Architectural Concept & Design',
        durationHint: 'Stage 02',
        description:
          'Iterative floor plans, spatial studies, 3D massing visuals, and material palettes refined with you until every circulation and proportion feels right.',
        deliverable: 'Approved concept layouts & 3D design package',
      },
      {
        step: '03',
        title: 'Engineering, Approvals & Costing',
        durationHint: 'Stage 03',
        description:
          'Complete structural, electrical, and plumbing drawings prepared alongside municipal submission sets and a transparent Bill of Quantities.',
        deliverable: 'Permit drawings, structural specs & itemized BOQ',
      },
      {
        step: '04',
        title: 'Construction & Quality Supervision',
        durationHint: 'Stage 04',
        description:
          'Disciplined site execution covering excavation, structural framing, MEP rough-ins, waterproofing, and architectural finishes with scheduled inspections.',
        deliverable: 'Milestone quality audits & photo progress reports',
      },
      {
        step: '05',
        title: 'Testing, Handover & Support',
        durationHint: 'Stage 05',
        description:
          'Comprehensive final snagging walk-through, system commissioning, as-built documentation delivery, and post-handover warranty guidance.',
        deliverable: 'Final inspection sign-off & as-built dossier',
      },
    ] satisfies ProcessStep[],
  },

  /**
   * ==========================================================================
   * EDITABLE CONTACT DETAILS & SOCIAL LINKS
   * Central source of truth used by ContactSection, Footer, and Navbar.
   * ==========================================================================
   */
  contact: {
    eyebrow: 'Request a Consultation',
    headline: "Let's Discuss Your Project",
    subtext:
      'Planning a new home, commercial development or renovation? Tell us about your project, and our team will help you explore the next steps.',
    email: 'alphaarchitectures1@gmail.com',
    emailHref: 'mailto:alphaarchitectures1@gmail.com',
    emailLabel: 'Email Us',
    phones: [
      {
        id: 'primary-contact',
        label: 'Primary Contact',
        display: '+92 333 664-9414',
        phoneHref: 'tel:+923336649414',
        whatsappNumber: '923336649414',
        whatsappHref: 'https://wa.me/923336649414',
      },
      {
        id: 'alternate-contact',
        label: 'Alternate Contact',
        display: '+92 339 400-7540',
        phoneHref: 'tel:+923394007540',
        whatsappNumber: '923394007540',
        whatsappHref: 'https://wa.me/923394007540',
      },
    ] satisfies ContactPhoneItem[],
    phoneDisplay: '+92 333 664-9414',
    phoneHref: 'tel:+923336649414',
    whatsappNumber: '923336649414',
    whatsappDisplay: '+92 333 664-9414',
    consultationHeading: 'Consultations by Appointment',
    consultationMode: 'Phone & Appointment-Based',
    consultationNote:
      'We currently arrange consultations by phone or appointment. Please contact us before visiting, as our former office address is no longer a walk-in office.',
    officeHours: 'Monday – Saturday · 9:00 AM – 6:00 PM',
    facebookUrl: 'https://www.facebook.com/architecture.alpha',
    facebookLabel: 'Facebook · Alpha Architecture',
    instagramUrl: 'https://www.instagram.com/alpha_architectures/',
    instagramLabel: 'Instagram · @alpha_architectures',
    isPlaceholderContact: false,
    /**
     * No paid backend or unconfigured email endpoint is used; enquiries prepare
     * an explicit mailto link, WhatsApp message, and clipboard summary.
     */
    freeFormEndpoint: '',
  },
} as const;
