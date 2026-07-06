// Maps a listing's destination name to the nearest airport code in AIRPORTS.
const DEST_AIRPORT = {
  Hawaii: "HNL",
  "Puerto Rico": "SJU",
  "Curaçao": "CUR",
};

const DESTINATION_COLORS = {
  Hawaii: "#e07a3f",
  "Puerto Rico": "#3f8fe0",
  "Curaçao": "#3fbf8f",
};

const state = {
  destination: "All",
};

const fmtUSD = (n) =>
  n == null ? "—" : n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

const MS_PER_DAY = 24 * 60 * 60 * 1000;

function fmtShortDate(iso) {
  if (!iso) return null;
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

// Builds a Google Flights search URL for a specific listing's actual dates,
// rather than a dateless query (which defaults to near-term dates).
function flightUrl(originAirport, destAirport, l) {
  if (!originAirport || !destAirport) return null;
  const query =
    l.checkIn && l.checkOut
      ? `Flights from ${originAirport} to ${destAirport} on ${fmtShortDate(l.checkIn)} returning ${fmtShortDate(l.checkOut)}`
      : `Flights from ${originAirport} to ${destAirport}`;
  return `https://www.google.com/travel/flights?q=${encodeURIComponent(query)}`;
}

function datesCellHtml(l) {
  if (!l.checkIn || !l.checkOut) return "—";

  const short = `${fmtShortDate(l.checkIn)} – ${fmtShortDate(l.checkOut)}`;
  const nights = l.nights ? ` <span class="muted">(${l.nights} nights)</span>` : "";

  const windowStart = new Date(`${TRIP_WINDOW.start}T00:00:00`);
  const windowEnd = new Date(`${TRIP_WINDOW.end}T00:00:00`);
  const totalDays = (windowEnd - windowStart) / MS_PER_DAY;
  const checkIn = new Date(`${l.checkIn}T00:00:00`);
  const checkOut = new Date(`${l.checkOut}T00:00:00`);

  const leftPct = Math.max(0, ((checkIn - windowStart) / MS_PER_DAY / totalDays) * 100);
  const rightPct = Math.min(100, ((checkOut - windowStart) / MS_PER_DAY / totalDays) * 100);
  const widthPct = Math.max(2, rightPct - leftPct);

  return `
    <div class="date-text">${short}${nights}</div>
    <div class="date-bar" title="${short}">
      <div class="date-bar-fill" style="left:${leftPct}%;width:${widthPct}%"></div>
    </div>
    <div class="date-bar-labels muted">
      <span>${fmtShortDate(TRIP_WINDOW.start)}</span>
      <span>${fmtShortDate(TRIP_WINDOW.end)}</span>
    </div>`;
}

function visibleListings() {
  return LISTINGS.filter((l) => state.destination === "All" || l.destination === state.destination);
}

function destinationList() {
  return [...new Set(LISTINGS.map((l) => l.destination))];
}

// ---------------------------------------------------------------------- controls

function renderControls() {
  const destFilter = document.getElementById("destinationFilter");
  const dests = ["All", ...destinationList()];
  destFilter.innerHTML = dests
    .map((d) => `<button class="chip ${d === state.destination ? "active" : ""}" data-dest="${d}">${d}</button>`)
    .join("");
  destFilter.querySelectorAll("button").forEach((btn) => {
    btn.onclick = () => {
      state.destination = btn.dataset.dest;
      renderAll();
    };
  });
}

// ---------------------------------------------------------------------- table (properties as columns, criteria as rows)

function highlightsHtml(l) {
  if (!l.highlights || !l.highlights.length) return "—";
  return `<ul class="highlights">${l.highlights.map((n) => `<li>✓ ${n}</li>`).join("")}</ul>`;
}

function criticalNotesHtml(l) {
  if (!l.criticalNotes || !l.criticalNotes.length) return "—";
  return `<ul class="critical-notes">${l.criticalNotes
    .map((n) => {
      const text = typeof n === "string" ? n : n.text;
      const severity = typeof n === "string" ? "bad" : n.severity || "bad";
      return `<li class="value-${severity}">⚠ ${text}</li>`;
    })
    .join("")}</ul>`;
}

function flightsCellHtml(l) {
  const destAirport = DEST_AIRPORT[l.destination];
  return `<div class="flight-grid">${ORIGINS.map((o) => {
    const url = flightUrl(o.airport, destAirport, l);
    return `
      <span class="flight-origin">${o.city}</span>
      <a class="flight-link" target="_blank" rel="noopener" href="${url}">search →</a>`;
  }).join("")}</div>`;
}

function ratingCellHtml(value, cssClass) {
  if (value == null) return "—";
  return `<span class="${cssClass}">${value}</span>`;
}

function bedroomsClass(n) {
  return n >= 5 ? "value-good" : "value-bad";
}

function bathroomsClass(n) {
  if (n <= 2.5) return "value-bad";
  if (n < 4) return "value-warn";
  return "value-good";
}

function totalPriceHtml(n) {
  if (n == null) return "—";
  return n > 15000 ? `<span class="value-bad">${fmtUSD(n)}</span>` : fmtUSD(n);
}

const ROWS = [
  { label: "$ / night", render: (l) => fmtUSD(l.pricePerNightUsd) },
  { label: "Total", render: (l) => totalPriceHtml(l.totalPriceUsd) },
  { label: "Highlights", render: (l) => highlightsHtml(l) },
  { label: "Lowlights", render: (l) => criticalNotesHtml(l) },
  { label: "Dates", render: (l) => datesCellHtml(l) },
  { label: "Bedrooms", render: (l) => ratingCellHtml(l.bedrooms, bedroomsClass(l.bedrooms)) },
  { label: "Bathrooms", render: (l) => ratingCellHtml(l.bathrooms, bathroomsClass(l.bathrooms)) },
  { label: "Distance to beach", render: (l) => l.distanceToBeach ?? "—" },
  { label: "Location", render: (l) => `<div class="location-map" id="map-listing-${l.id}"></div>` },
  { label: "Flights", render: (l) => flightsCellHtml(l) },
];

function renderTable() {
  const thead = document.querySelector("#comparisonTable thead");
  const tbody = document.querySelector("#comparisonTable tbody");
  const listings = visibleListings();

  thead.innerHTML = `<tr>
    <th class="row-label-col"></th>
    ${listings
      .map((l) => {
        const color = DESTINATION_COLORS[l.destination] || "#888";
        return `<th class="property-col">
          <a href="${l.sourceUrl}" target="_blank" rel="noopener">
            <img class="thumb-lg" src="${l.images[0]}" alt="" loading="lazy" />
          </a>
          <a class="listing-name" href="${l.sourceUrl}" target="_blank" rel="noopener">${l.name}</a>
          <div><span class="badge inline" style="background:${color}">${l.destination}</span> <span class="muted">${l.source}</span></div>
        </th>`;
      })
      .join("")}
  </tr>`;

  tbody.innerHTML = ROWS.map(
    (row) => `<tr>
      <th class="row-label-col" scope="row">${row.label}</th>
      ${listings.map((l) => `<td>${row.render(l)}</td>`).join("")}
    </tr>`
  ).join("");

  initListingMaps(listings);
}

// ---------------------------------------------------------------------- maps (one per listing, embedded in its column)

let mapInstances = {};

function initListingMaps(listings) {
  Object.values(mapInstances).forEach((m) => m.remove());
  mapInstances = {};

  listings.forEach((l) => {
    const el = document.getElementById(`map-listing-${l.id}`);
    if (!el) return;
    const map = L.map(el, { scrollWheelZoom: false }).setView([l.location.lat, l.location.lng], 14);
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
    }).addTo(map);

    const color = DESTINATION_COLORS[l.destination] || "#888";
    L.circleMarker([l.location.lat, l.location.lng], {
      radius: 8,
      color,
      fillColor: color,
      fillOpacity: 0.9,
    })
      .addTo(map)
      .bindPopup(`<strong>${l.name}</strong><br>${l.location.address}<br>${fmtUSD(l.pricePerNightUsd)}/night`);

    mapInstances[l.id] = map;
  });
}

// ---------------------------------------------------------------------- init

function renderAll() {
  renderControls();
  renderTable();
}

document.addEventListener("DOMContentLoaded", renderAll);
