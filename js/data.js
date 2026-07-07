// ---------------------------------------------------------------------------
// All comparison data lives here. Add a new listing by copying an existing
// object in LISTINGS and filling in the fields. Nothing else needs to change.
// ---------------------------------------------------------------------------

// Airport coordinates used for the flight-routes map and distance display.
const AIRPORTS = {
  SEA: { name: "Seattle (SEA)", lat: 47.4502, lng: -122.3088 },
  AUS: { name: "Austin (AUS)", lat: 30.1975, lng: -97.6664 },
  YYZ: { name: "Toronto (YYZ)", lat: 43.6777, lng: -79.6248 },
  SFO: { name: "San Francisco (SFO)", lat: 37.6213, lng: -122.379 },
  HNL: { name: "Honolulu (HNL)", lat: 21.3187, lng: -157.9224 },
  SJU: { name: "San Juan (SJU)", lat: 18.4394, lng: -66.0018 },
  CUR: { name: "Curaçao (CUR)", lat: 12.1889, lng: -68.9598 },
  SRQ: { name: "Sarasota (SRQ)", lat: 27.3954, lng: -82.5544 },
};

// The trip origins we're comparing flights from. Add more by adding an
// airport to AIRPORTS above and an entry here.
const ORIGINS = [
  { city: "Seattle", airport: "SEA" },
  { city: "Austin", airport: "AUS" },
  { city: "Toronto", airport: "YYZ" },
  { city: "San Francisco", airport: "SFO" },
];

// Overall window all listings' dates are expected to fall within — used to
// draw the little date timeline bar. Widen this if a listing falls outside it.
const TRIP_WINDOW = { start: "2026-12-24", end: "2027-01-03" };

// People/couples who can approve or reject a listing. By default everyone
// approves everything — add a person's id to a listing's `rejectedBy` array
// to record a rejection. Toggling a person's filter on hides any listing
// they've rejected.
const APPROVERS = [
  { id: "PMA", label: "P&M+A" },
  { id: "DG", label: "D&G" },
  { id: "DC", label: "D&C" },
  { id: "AO", label: "A&O" },
];

const LISTINGS = [
  {
    id: "willemstad-airbnb-1532585715752240438",
    name: "Villa Scoop – Your Seaview Artsy Escape",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/1532585715752240438",
    destination: "Curaçao",
    country: "Curaçao",
    location: {
      address: "3 Paseo Pacifico, Willemstad, Curaçao",
      lat: 12.0908, // approx — near Mambo Beach, TODO refine exact geocode
      lng: -68.8686,
    },
    checkIn: "2026-12-24",
    checkOut: "2027-01-03",
    nights: 10,
    pricePerNightUsd: 927.5, // derived from $9,275 total / 10 nights
    totalPriceUsd: 9275,
    bedrooms: 5,
    bathrooms: 3.5,
    maxGuests: 10,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1532585715752240438/original/9466c046-1f0f-45fd-98a0-a51624379b12.jpeg?im_w=2560",
    ],
    distanceToBeach: "15 min walk to Mambo Beach",
    nearbyAttractions: [{ name: "Mambo Beach", distanceMi: null }],
    highlights: ["Private pool", "Walk to beach"],
    criticalNotes: [{ text: "Minimum 10 night stay required", severity: "warn" }],
  },
  {
    id: "jan-thiel-airbnb-1117971656602867561",
    name: "Villa with sea view & infinity pool",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/1117971656602867561",
    destination: "Curaçao",
    country: "Curaçao",
    location: {
      address: "Vista Royal, T6 Kaya Báltiko, Jan Thiel, Curaçao",
      lat: 12.0747762, // approx — using nearby "I <3 Curaçao" sign landmark, TODO refine to exact building
      lng: -68.8704988,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-03",
    nights: 8,
    pricePerNightUsd: 2151.75, // derived from $17,214 total / 8 nights
    totalPriceUsd: 17214,
    bedrooms: 9,
    bathrooms: 9,
    maxGuests: 16,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-U3RheVN1cHBseUxpc3Rpbmc6MTExNzk3MTY1NjYwMjg2NzU2MQ%3D%3D/original/2f4ef0b6-b856-4a13-a5b6-16d621d99d26.jpeg?im_w=2560",
    ],
    distanceToBeach: "5 min walk (hilly) or drive",
    nearbyAttractions: [],
    highlights: ["Private infinity pool", "Ping pong table", "Walk to beach"],
    criticalNotes: ["Extra electricity/cleaning fees"],
  },
  {
    id: "dorado-airbnb-1531988066011508040",
    name: "Luxury Dorado Villa | Private Pool + BBQ | Sleeps 9",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/1531988066011508040",
    destination: "Puerto Rico",
    country: "United States",
    location: {
      address: "Near Vívelo Private Tours, Dorado, PR",
      lat: 18.4680504, // from Google Maps pin
      lng: -66.2710546,
    },
    checkIn: "2026-12-28",
    checkOut: "2027-01-03",
    nights: 6,
    pricePerNightUsd: 2243, // derived from $13,458 total / 6 nights
    totalPriceUsd: 13458,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 9,
    images: [
      "https://a0.muscache.com/im/pictures/hosting/Hosting-1531988066011508040/original/461bf4c6-4cc2-496d-9547-77c398888964.jpeg?im_w=2560",
    ],
    distanceToBeach: "7 min drive to safe beach",
    nearbyAttractions: [{ name: "Vívelo Private Tours", distanceMi: null }],
    highlights: ["Private pool"],
    criticalNotes: [
      { text: "Only 6 nights", severity: "warn" },
      { text: "Most north beaches unsafe", severity: "warn" },
    ],
  },
  {
    id: "sarasota-airbnb-1502438565629923746",
    name: "170 - High Tide",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/1502438565629923746",
    destination: "Florida",
    country: "United States",
    flightDestination: ["SRQ", "TPA"], // Sarasota and Tampa — separate links since Google Flights doesn't support "or" between airports in free-text search
    location: {
      address: "Near Galvin Park, Sarasota, FL",
      lat: 27.3021414,
      lng: -82.5565096,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 1470.43, // derived from $10,293 total / 7 nights
    totalPriceUsd: 10293,
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    images: [
      "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1502438565629923746/original/76d23faa-2cd6-4575-ba20-87a53567be57.jpeg?im_w=2560",
    ],
    distanceToBeach: "500 yards (~5 min walk) to shell beach",
    nearbyAttractions: [{ name: "Shell beach", distanceMi: 0.28 }],
    highlights: ["Private heated pool", "Walk to beach"],
    criticalNotes: ["Water can be a bit cold to swim"],
  },
  {
    id: "marathon-airbnb-1052406844773217221",
    name: "Mermaid's Paradise ~ Pool ~ Dock ~ Games ~ Views!",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/1052406844773217221",
    destination: "Florida",
    country: "United States",
    flightDestination: "EYW", // Key West airport code — more reliable for Google Flights parsing than the place name
    location: {
      address: "Near Signs By Renee, Marathon, FL",
      lat: 24.729265,
      lng: -81.013047,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 1634.57, // derived from $11,442 total / 7 nights
    totalPriceUsd: 11442,
    bedrooms: 4,
    bathrooms: 4.5,
    maxGuests: 10,
    images: [
      "https://a0.muscache.com/im/pictures/prohost-api/Hosting-1052406844773217221/original/218416be-9dcf-4599-a02d-9d4e2e88322a.jpeg?im_w=2560",
    ],
    distanceToBeach: "10 min drive",
    nearbyAttractions: [],
    highlights: ["Private pool", "Ping pong table"],
    criticalNotes: ["Only 4 bedrooms"],
  },
  {
    id: "marathon-vrbo-3790656",
    name: "Luna Light ~ Waterfront ~ Pool ~ Dock ~ Views!",
    source: "VRBO",
    sourceUrl: "https://www.vrbo.com/3790656",
    destination: "Florida",
    country: "United States",
    flightDestination: "EYW", // Key West airport code — more reliable for Google Flights parsing than the place name
    location: {
      address: "Near Signs By Renee, Marathon, FL",
      lat: 24.729265,
      lng: -81.013047,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-03",
    nights: 8,
    pricePerNightUsd: 1570.13, // derived from $12,561 total / 8 nights, all fees included
    totalPriceUsd: 12561,
    bedrooms: 4,
    bathrooms: 4.5,
    maxGuests: 9, // 8 adults + 1 child, from the search link
    images: [
      "https://media.vrbo.com/lodging/102000000/101380000/101372200/101372121/1b1479ff.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    ],
    distanceToBeach: "2 min drive",
    nearbyAttractions: [],
    highlights: ["Private pool (heating extra)"],
    criticalNotes: ["Only 4 bedrooms"],
  },
  {
    id: "marathon-vrbo-4342722",
    name: "Starfish Isle",
    source: "VRBO",
    sourceUrl: "https://www.vrbo.com/4342722",
    destination: "Florida",
    country: "United States",
    flightDestination: ["MIA", "EYW"], // Miami or Key West — both work for the Keys
    location: {
      address: "4 blocks from Sombrero Beach, Marathon, FL (approx — exact address not confirmed)",
      lat: 24.696, // approx, ~4 blocks inland from Sombrero Beach — TODO refine once exact address is confirmed
      lng: -81.088,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 1892.29, // derived from $13,246 total / 7 nights
    totalPriceUsd: 13246,
    bedrooms: 5,
    bathrooms: 5,
    maxGuests: 12,
    images: [
      "https://media.vrbo.com/lodging/112000000/111670000/111666900/111666865/29db3ce0.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    ],
    distanceToBeach: "4 blocks to Sombrero Beach",
    nearbyAttractions: [{ name: "Sombrero Beach", distanceMi: null }],
    highlights: ["Private pool", "Paddleboards, kayak & bikes", "Walk to beach"],
    criticalNotes: [],
  },
  {
    id: "marathon-vrbo-3195625",
    name: "Waterfront Oasis",
    source: "VRBO",
    sourceUrl: "https://www.vrbo.com/3195625",
    destination: "Florida",
    country: "United States",
    flightDestination: ["MIA", "EYW"], // Miami or Key West — both work for the Keys
    location: {
      address: "Marathon, FL (approx — exact address not confirmed)",
      lat: 24.713, // approx Marathon center, walkable to Subway/cafes — TODO refine once exact address is confirmed
      lng: -81.097,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 1733.43, // derived from $12,134 total / 7 nights
    totalPriceUsd: 12134,
    bedrooms: 4, // plus a loft with pull-out couch
    bathrooms: 4.5,
    images: [
      "https://media.vrbo.com/lodging/91000000/90540000/90536300/90536281/ae52fe9e.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    ],
    distanceToBeach: "8 min drive to Sombrero Beach",
    nearbyAttractions: [{ name: "Sombrero Beach", distanceMi: null }],
    highlights: [
      "Private heated pool",
      "Outdoor kitchen",
      "Ping pong table",
      "Pool table",
      "Loft with pull-out couch",
      "Walk to Subway, short distance to cafes",
    ],
    criticalNotes: [
      "Not walking distance to beach",
      "Yard mostly taken by furniture and pool",
      { text: "Rents Sat–Sat only", severity: "warn" },
      "$250 for pool heat for the week",
    ],
  },
  {
    id: "key-colony-vrbo-4102555",
    name: "Emerald Oasis",
    source: "VRBO",
    sourceUrl: "https://www.vrbo.com/4102555",
    destination: "Florida",
    country: "United States",
    flightDestination: ["MIA", "EYW"], // Miami or Key West — both work for the Keys
    location: {
      address: "Key Colony Beach, FL (approx — exact address not confirmed)",
      lat: 24.720974, // approx, from the VRBO search area for Key Colony Beach — TODO refine once exact address is confirmed
      lng: -81.018684,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 2038.43, // derived from $14,269 total / 7 nights
    totalPriceUsd: 14269,
    bedrooms: 4,
    bathrooms: 4.5,
    images: [
      "https://media.vrbo.com/lodging/107000000/107000000/106991300/106991231/69032f68.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    ],
    distanceToBeach: "4 min drive to Coco Beach",
    nearbyAttractions: [{ name: "Coco Beach", distanceMi: null }],
    highlights: ["Private pool", "2 kayaks", "Putting green", "2 bikes"],
    criticalNotes: [
      "Only 4 bedrooms",
      "Pool heat extra (need to inquire)",
      { text: "Rents Sat–Sat only", severity: "warn" },
    ],
  },
];
