// OrganizationSchema.tsx
// Renders the ExpatCarBuyers Organization/AutomotiveBusiness JSON-LD schema.
// Usage: import and render once, in your root layout (app/layout.tsx) so it
// appears on every page — or in a specific page.tsx if you only want it on
// the homepage.

const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "AutomotiveBusiness",
  name: "ExpatCarBuyers",
  url: "https://www.expatcarbuyers.com",
  logo: "https://www.expatcarbuyers.com/front/images/logo.webp",
  image: "https://www.expatcarbuyers.com/front/images/office-sheikh-zayed-road.jpg",
  description:
    "Sell your car in Dubai and across the UAE with Expat Car Buyers, an RTA-approved car buying service offering free vehicle inspections, instant online valuations, bank finance settlement, and cash payment within 30 minutes.",
  priceRange: "AED",
  telephone: "+971561774555",
  email: "contact@expatcarbuyers.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Office No. G17, Al Asmawi Building, Sheikh Zayed Road",
    addressLocality: "Dubai",
    addressRegion: "Dubai",
    addressCountry: "AE",
  },
  areaServed: [
    { "@type": "City", name: "Dubai" },
    { "@type": "Country", name: "United Arab Emirates" },
  ],
  geo: {
    "@type": "GeoCoordinates",
    latitude: 25.1264236165796,
    longitude: 55.20491196459054,
  },
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "22:00",
    },
  ],
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "4.7",
    reviewCount: "2467",
  },
  sameAs: [
    "https://www.facebook.com/ExpatCarBuyers/",
    "https://www.instagram.com/expatcarbuyers/",
    "https://x.com/expatcarbuyers",
    "https://www.linkedin.com/company/expat-car-buyers",
    "https://www.google.com/maps?cid=6841247650345166012",
  ],
};

export default function OrganizationSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
    />
  );
}
