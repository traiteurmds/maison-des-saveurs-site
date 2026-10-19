import type { Metadata } from "next";

const SHARE_IMAGE = {
  url: "/logo-share.png",
  width: 1536,
  height: 1024,
  alt: "Maison Des Saveurs, traiteur marocain halal à Lyon",
};

/**
 * Next.js ne fusionne pas `openGraph` entre la mise en page et les pages :
 * chaque page reçoit donc son propre titre, sa description et son adresse au partage.
 */
export function withSocial(meta: Metadata): Metadata {
  const title = typeof meta.title === "string" ? `${meta.title} | Maison Des Saveurs` : undefined;
  const description = meta.description ?? undefined;
  const url = typeof meta.alternates?.canonical === "string" ? meta.alternates.canonical : undefined;
  return {
    ...meta,
    openGraph: {
      title,
      description,
      url,
      siteName: "Maison Des Saveurs",
      images: [SHARE_IMAGE],
      locale: "fr_FR",
      type: "website",
    },
    twitter: { card: "summary_large_image", title, description, images: [SHARE_IMAGE.url] },
  };
}
