export function generateWhatsAppLink(slug: string): string {
  const baseUrl = process.env.VERCEL_URL;

  if (!baseUrl) {
    throw new Error("VERCEL_URL environment variable is not defined.");
  }

  const propertyUrl = `${baseUrl}/property/${slug}`;

  const message = `${encodeURIComponent(propertyUrl)}%0ACan%20I%20get%20more%20information%20about%20that%20property?`;

  return `https://wa.me/${process.env.WHATSAPP_NUMBER}?text=${message}`;
}
