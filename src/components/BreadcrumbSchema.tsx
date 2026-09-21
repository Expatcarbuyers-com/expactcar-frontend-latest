// BreadcrumbSchema.tsx
// Reusable BreadcrumbList JSON-LD component for ExpatCarBuyers pages.
// "Home" is added automatically — pass only the page's own trail after Home.
//
// Usage example (on /sell-car-abu-dhabi):
//
//   <BreadcrumbSchema
//     items={[{ name: "Sell Car Abu Dhabi", url: "https://www.expatcarbuyers.com/sell-car-abu-dhabi" }]}
//   />
//
// For a nested page (e.g. a future blog post), pass the full trail after Home:
//
//   <BreadcrumbSchema
//     items={[
//       { name: "Blog", url: "https://www.expatcarbuyers.com/blog" },
//       { name: "How to Sell a Financed Car in Dubai", url: "https://www.expatcarbuyers.com/blog/sell-financed-car-dubai" },
//     ]}
//   />

export interface BreadcrumbItem {
  name: string;
  url: string;
}

interface BreadcrumbSchemaProps {
  items: BreadcrumbItem[]; // do NOT include "Home" — it's prepended automatically
}

const SITE_URL = "https://www.expatcarbuyers.com";

export default function BreadcrumbSchema({ items }: BreadcrumbSchemaProps) {
  const fullTrail: BreadcrumbItem[] = [{ name: "Home", url: SITE_URL }, ...items];

  const schema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullTrail.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
