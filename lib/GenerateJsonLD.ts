import { SinResProperty } from "@/types/property";

export function GenerateJsonLD({
  property,
}: {
  property: SinResProperty | null;
}) {
  if (!property) return null;

  // Map all amenities to an array of their names
  const amenities = property.amenities.map((amenity) => amenity.name); // Include all amenities, regardless of isToggle

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    url: `${process.env.PUBLIC_URL}/property/${property.slug}`,
    name: property.PropertyName,
    image: property.images,
    offers: {
      "@type": "Offer",
      priceCurrency: "PKR",
      price: property.price,
      availability: "https://schema.org/InStock",
      url: `${process.env.PUBLIC_URL}/property/${property.slug}`,
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: property.address.city,
      addressRegion: property.address.area,
      streetAddress: property.street,
      addressCountry: "PK",
    },
    category: property.propertyType,
    size: `${property.size.value} ${property.size.unit}`,
    numberOfRooms: property.bedrooms,
    numberOfBathroomsTotal: property.bathrooms,
    condition: property.condition,
    video: property.FacebookVideoLink,
    amenities: amenities.length ? amenities : undefined, // Include amenities if available

    isPartOf: {
      "@type": "Place",
      name: property.address.city,
      address: {
        "@type": "PostalAddress",
        addressLocality: property.address.city,
        addressRegion: property.address.area,
        addressCountry: "PK",
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${process.env.PUBLIC_URL}/property/${property.slug}`,
    },
  };

  return JSON.stringify(jsonLd, null, 2);
}
