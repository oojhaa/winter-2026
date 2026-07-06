// ---------------------------------------------------------------------------
// All comparison data lives here. Add a new listing by copying an existing
// object in LISTINGS and filling in the fields. Nothing else needs to change.
// ---------------------------------------------------------------------------

// Airport coordinates used for the flight-routes map and distance display.
const AIRPORTS = {
  SEA: { name: "Seattle (SEA)", lat: 47.4502, lng: -122.3088 },
  AUS: { name: "Austin (AUS)", lat: 30.1975, lng: -97.6664 },
  YYZ: { name: "Toronto (YYZ)", lat: 43.6777, lng: -79.6248 },
  HNL: { name: "Honolulu (HNL)", lat: 21.3187, lng: -157.9224 },
  SJU: { name: "San Juan (SJU)", lat: 18.4394, lng: -66.0018 },
  CUR: { name: "Curaçao (CUR)", lat: 12.1889, lng: -68.9598 },
};

// The trip origins we're comparing flights from. Add more by adding an
// airport to AIRPORTS above and an entry here.
const ORIGINS = [
  { city: "Seattle", airport: "SEA" },
  { city: "Austin", airport: "AUS" },
  { city: "Toronto", airport: "YYZ" },
];

// Overall window all listings' dates are expected to fall within — used to
// draw the little date timeline bar. Widen this if a listing falls outside it.
const TRIP_WINDOW = { start: "2026-12-24", end: "2027-01-03" };

const LISTINGS = [
  {
    id: "waianae-vrbo-3522010",
    name: "Marbella Lane - Stylish House + Impressive Views",
    source: "VRBO",
    sourceUrl: "https://www.vrbo.com/3522010",
    destination: "Hawaii",
    country: "United States",
    location: {
      address: "Near 84-949 Maiola St, Waianae, HI 96792 (approx — exact address not confirmed)",
      lat: 21.446, // approx, based on nearby Maiola St — TODO refine once exact address is confirmed
      lng: -158.1875,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-02",
    nights: 7,
    pricePerNightUsd: 1763, // derived from $12,341 total / 7 nights, all fees included
    totalPriceUsd: 12341,
    bedrooms: 4,
    bathrooms: 3.5,
    maxGuests: 9, // 8 adults + 1 child, from the search link
    images: [
      "https://media.vrbo.com/lodging/97000000/96260000/96250700/96250673/4479a3f0.jpg?impolicy=resizecrop&rw=1200&ra=fit",
    ],
    distanceToBeach: "Makaha Beach — 5 min drive",
    nearbyAttractions: [{ name: "Makaha Beach", distanceMi: null }],
    highlights: [],
    criticalNotes: [
      "Community pool only",
      "Only 4 bedrooms",
      { text: "Far from Waikiki (38 miles)", severity: "warn" },
      "Bunk bed",
    ],
  },
  {
    id: "waianae-airbnb-937325679334697210",
    name: "Entire home in Waianae — Near Beach, Pool/Spa, Gym",
    source: "Airbnb",
    sourceUrl: "https://www.airbnb.com/rooms/937325679334697210",
    destination: "Hawaii",
    country: "United States",
    location: {
      address: "Waianae, Oahu, Hawaii",
      lat: 21.4477, // approx Waianae coast — TODO: refine once we have the exact address
      lng: -158.1867,
    },
    checkIn: "2026-12-26",
    checkOut: "2027-01-03",
    nights: 8,
    pricePerNightUsd: 1516, // derived from $12,127 total / 8 nights
    totalPriceUsd: 12127,
    bedrooms: 4,
    bathrooms: 2.5,
    maxGuests: 10,
    images: [
      "https://a0.muscache.com/im/pictures/prohost-api/Hosting-937325679334697210/original/9c831aac-7c71-4796-b717-cecdd5158115.jpeg?im_w=1440",
      "https://placehold.co/600x400?text=Add+photo+2",
    ],
    distanceToBeach: "Makaha Beach — 2 mile drive",
    nearbyAttractions: [{ name: "Makaha Beach", distanceMi: 2 }],
    criticalNotes: [
      "Community pool only",
      "Only 4 bedrooms",
      { text: "Far from Waikiki (38 miles)", severity: "warn" },
    ],
  },
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
    highlights: ["Private pool"],
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
    highlights: ["Private infinity pool", "Has ping pong table"],
    criticalNotes: ["Extra fees for electricity and cleaning"],
  },
];
