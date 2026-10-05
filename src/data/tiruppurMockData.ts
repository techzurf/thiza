export interface TiruppurSpecialItem {
  id: string;
  name: string;
  count: number;
  image: string;
  tagline: string;
}

export interface TiruppurBusiness {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  distance: string;
  isOpen: boolean;
  image: string;
  verified: boolean;
  phone: string;
  tagline: string;
}

export interface VisualCategoryItem {
  id: string;
  name: string;
  image: string;
  count?: string;
}

export const TIRUPPUR_LOCATIONS = [
  'Tiruppur',
  'Avinashi Road',
  'PN Road',
  'Palladam Road',
  'Kangeyam Road',
  'Dharapuram Road',
  'Mangalam Road',
] as const;

export const SEARCH_SUGGESTIONS = [
  'Garment manufacturers',
  'Textile shops',
  'Restaurants',
  'Hospitals',
  'Tailors',
  'AC repair',
  'Hotels',
  'Real estate',
  'Car service',
  'Schools',
];

export const TIRUPPUR_SPECIAL_ITEMS: TiruppurSpecialItem[] = [
  {
    id: 'garment-manufacturers',
    name: 'Garment Manufacturers',
    tagline: 'OEM & High Volume Production',
    count: 320,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'textile-mills',
    name: 'Textile Mills',
    tagline: 'Spinning, Weaving & Fabric',
    count: 185,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'knitwear',
    name: 'Knitwear',
    tagline: 'T-Shirts, Polo & Casuals',
    count: 410,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'textile-suppliers',
    name: 'Textile Suppliers',
    tagline: 'Yarn, Cotton & Blends',
    count: 240,
    image: 'https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'dyeing-printing',
    name: 'Dyeing & Printing',
    tagline: 'Rotary, Screen & Digital Print',
    count: 160,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'embroidery',
    name: 'Embroidery',
    tagline: 'Multi-Head Precision Work',
    count: 130,
    image: 'https://images.unsplash.com/photo-1604014237800-1c9102c219da?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'labels-packaging',
    name: 'Labels & Packaging',
    tagline: 'Woven Tags, Barcodes & Cartons',
    count: 95,
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'textile-machinery',
    name: 'Textile Machinery',
    tagline: 'Circular Knitting & Sewing',
    count: 110,
    image: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'garment-exporters',
    name: 'Garment Exporters',
    tagline: 'EU, US & Global Shipments',
    count: 275,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
  },
  {
    id: 'fashion-apparel',
    name: 'Fashion & Apparel',
    tagline: 'Design Studios & Domestic Brands',
    count: 190,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
  },
];

export const TIRUPPUR_POPULAR_BUSINESSES: TiruppurBusiness[] = [
  {
    id: 'tp-1',
    name: 'Tiruppur Knitwear Hub',
    category: 'Knitwear & Garments',
    rating: 4.8,
    reviews: 142,
    location: 'Avinashi Road',
    distance: '1.2 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 94432 10842',
    tagline: 'Premium Bio-Washed Combed Cotton T-Shirts & Polos',
  },
  {
    id: 'tp-2',
    name: 'Sri Lakshmi Textiles',
    category: 'Textiles & Fabrics',
    rating: 4.7,
    reviews: 98,
    location: 'PN Road',
    distance: '0.8 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 98422 34512',
    tagline: 'Wholesale Pure Cotton, Single Jersey & Rib Fabric',
  },
  {
    id: 'tp-3',
    name: 'Cotton City Garments',
    category: 'Garment Manufacturer',
    rating: 4.9,
    reviews: 210,
    location: 'Palladam Road',
    distance: '2.4 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 97890 56781',
    tagline: 'High-Speed Automated Cut & Sew Facility for Retail Chains',
  },
  {
    id: 'tp-4',
    name: 'Royal Knitwear',
    category: 'Apparel & Exports',
    rating: 4.6,
    reviews: 85,
    location: 'Kangeyam Road',
    distance: '3.1 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 98430 78120',
    tagline: 'Custom Sportswear, Activewear & Moisture-Wicking Polos',
  },
  {
    id: 'tp-5',
    name: 'Greenfield Exports',
    category: 'Garment Exporter',
    rating: 4.8,
    reviews: 126,
    location: 'Dharapuram Road',
    distance: '4.5 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 99441 90234',
    tagline: 'GOTS Certified 100% Organic Kids & Infant Apparel',
  },
  {
    id: 'tp-6',
    name: 'Tiruppur Fashion Mart',
    category: 'Retail & Wholesale',
    rating: 4.5,
    reviews: 160,
    location: 'Mangalam Road',
    distance: '1.5 km',
    isOpen: true,
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=600&q=80',
    verified: true,
    phone: '+91 94860 12398',
    tagline: 'Direct-From-Factory Branded Family Wear & Daily Casuals',
  },
];

export const TIRUPPUR_SERVICES: VisualCategoryItem[] = [
  {
    id: 'ac-repair',
    name: 'AC Repair',
    count: '35+ Pros',
    image: 'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'electricians',
    name: 'Electricians',
    count: '50+ Pros',
    image: 'https://images.unsplash.com/photo-1621905252507-b35492cc74b4?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'plumbers',
    name: 'Plumbers',
    count: '42+ Pros',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pest-control',
    name: 'Pest Control',
    count: '18+ Agencies',
    image: 'https://images.unsplash.com/photo-1584467735871-8e85353a8413?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'cleaning-services',
    name: 'Cleaning Services',
    count: '28+ Teams',
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'packers-movers',
    name: 'Packers & Movers',
    count: '22+ Fleets',
    image: 'https://images.unsplash.com/photo-1600518464441-9154a4dea21b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'car-service',
    name: 'Car Service',
    count: '38+ Garages',
    image: 'https://images.unsplash.com/photo-1486006920555-c77dce18193b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'bike-service',
    name: 'Bike Service',
    count: '45+ Centers',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mobile-repair',
    name: 'Mobile Repair',
    count: '60+ Techs',
    image: 'https://images.unsplash.com/photo-1597740985671-2a8a3b805327?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'computer-repair',
    name: 'Computer Repair',
    count: '32+ Experts',
    image: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?auto=format&fit=crop&w=400&q=80',
  },
];

export const TIRUPPUR_FOOD: VisualCategoryItem[] = [
  {
    id: 'restaurants',
    name: 'Restaurants',
    count: '95+ Outlets',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'biryani',
    name: 'Biryani',
    count: '48+ Spots',
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'fast-food',
    name: 'Fast Food',
    count: '65+ Joints',
    image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'cafes',
    name: 'Cafes',
    count: '24+ Cafes',
    image: 'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'bakeries',
    name: 'Bakeries',
    count: '36+ Bakeries',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'juice-beverages',
    name: 'Juice & Beverages',
    count: '40+ Stalls',
    image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'vegetarian',
    name: 'Vegetarian',
    count: '55+ Hotels',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?auto=format&fit=crop&w=500&q=80',
  },
  {
    id: 'desserts',
    name: 'Desserts',
    count: '30+ Parlours',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=500&q=80',
  },
];

export const TIRUPPUR_SHOPPING: VisualCategoryItem[] = [
  {
    id: 'textiles',
    name: 'Textiles',
    count: '180+ Stores',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'fashion',
    name: 'Fashion',
    count: '140+ Showrooms',
    image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'sarees',
    name: 'Sarees',
    count: '75+ Boutiques',
    image: 'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'kids-wear',
    name: 'Kids Wear',
    count: '90+ Outlets',
    image: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'footwear',
    name: 'Footwear',
    count: '65+ Shops',
    image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'jewellery',
    name: 'Jewellery',
    count: '35+ Jewellers',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'electronics',
    name: 'Electronics',
    count: '55+ Retailers',
    image: 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'mobile-shops',
    name: 'Mobile Shops',
    count: '85+ Stores',
    image: 'https://images.unsplash.com/photo-1511707171634-5f897ff0259d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'furniture',
    name: 'Furniture',
    count: '40+ Marts',
    image: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'supermarkets',
    name: 'Supermarkets',
    count: '50+ Marts',
    image: 'https://images.unsplash.com/photo-1578916171728-46686eac8d58?auto=format&fit=crop&w=400&q=80',
  },
];

export const TIRUPPUR_HEALTHCARE: VisualCategoryItem[] = [
  {
    id: 'hospitals',
    name: 'Hospitals',
    count: '28+ Facilities',
    image: 'https://images.unsplash.com/photo-1587351021759-3e566b6af7cc?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'clinics',
    name: 'Clinics',
    count: '85+ Clinics',
    image: 'https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'dental-clinics',
    name: 'Dental Clinics',
    count: '34+ Dentists',
    image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'pharmacies',
    name: 'Pharmacies',
    count: '110+ Chemist',
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'diagnostics',
    name: 'Diagnostics',
    count: '25+ Labs',
    image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'physiotherapy',
    name: 'Physiotherapy',
    count: '19+ Centers',
    image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'eye-care',
    name: 'Eye Care',
    count: '16+ Hospitals',
    image: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'doctors',
    name: 'Doctors',
    count: '150+ Specialists',
    image: 'https://images.unsplash.com/photo-1537368910025-700350fe46c7?auto=format&fit=crop&w=400&q=80',
  },
];

export const TIRUPPUR_EDUCATION: VisualCategoryItem[] = [
  {
    id: 'schools',
    name: 'Schools',
    count: '70+ CBSE / State',
    image: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'colleges',
    name: 'Colleges',
    count: '22+ Campuses',
    image: 'https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'coaching-centres',
    name: 'Coaching Centres',
    count: '40+ NEET / JEE',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'tuition-centres',
    name: 'Tuition Centres',
    count: '65+ Centers',
    image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'training-institutes',
    name: 'Training Institutes',
    count: '35+ Fashion / Garment',
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'computer-institutes',
    name: 'Computer Institutes',
    count: '45+ IT Centers',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'skill-development',
    name: 'Skill Development',
    count: '18+ Centers',
    image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80',
  },
];

export const TIRUPPUR_REAL_ESTATE: VisualCategoryItem[] = [
  {
    id: 'plots',
    name: 'Plots',
    count: '120+ Layouts',
    image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'apartments',
    name: 'Apartments',
    count: '65+ Projects',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'villas',
    name: 'Villas',
    count: '42+ Gated',
    image: 'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'commercial-properties',
    name: 'Commercial Properties',
    count: '55+ Complexes',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'rental-properties',
    name: 'Rental Properties',
    count: '150+ Homes',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'industrial-properties',
    name: 'Industrial Properties',
    count: '80+ Sheds / Units',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
  },
];

export const TIRUPPUR_BUSINESS_SERVICES: VisualCategoryItem[] = [
  {
    id: 'ca-accounting',
    name: 'CA & Accounting',
    count: '45+ Firms',
    image: 'https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'digital-marketing',
    name: 'Digital Marketing',
    count: '30+ Agencies',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'legal-services',
    name: 'Legal Services',
    count: '38+ Advocates',
    image: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'printing',
    name: 'Printing',
    count: '50+ Presses',
    image: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'photography',
    name: 'Photography',
    count: '25+ Studios',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'advertising',
    name: 'Advertising',
    count: '28+ Agencies',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'it-services',
    name: 'IT Services',
    count: '35+ Providers',
    image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'logistics',
    name: 'Logistics',
    count: '60+ Fleets',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'courier',
    name: 'Courier',
    count: '40+ Hubs',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: 'consultants',
    name: 'Consultants',
    count: '26+ Experts',
    image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=400&q=80',
  },
];
