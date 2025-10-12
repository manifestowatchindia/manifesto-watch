import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogType?: string;
  twitterCard?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  canonicalUrl?: string;
}

const SEO: React.FC<SEOProps> = ({
  title = 'Manifesto Watch - Track Political Manifestos & Promises in India',
  description = 'Track and monitor political party manifestos, election promises, and their implementation across Indian states. Promoting transparency and accountability in Indian democracy.',
  keywords = 'manifesto watch, political manifestos india, election promises, political accountability, indian democracy, track promises, political transparency, election manifestos india',
  ogTitle,
  ogDescription,
  ogImage = 'https://www.manifestowatch.in/og-image.jpg',
  ogType = 'website',
  twitterCard = 'summary_large_image',
  twitterTitle,
  twitterDescription,
  twitterImage = 'https://www.manifestowatch.in/twitter-card.jpg',
  canonicalUrl,
}) => {
  const siteUrl = 'https://www.manifestowatch.in';
  const currentUrl = canonicalUrl || siteUrl;

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={currentUrl} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={currentUrl} />
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Manifesto Watch" />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={currentUrl} />
      <meta property="twitter:title" content={twitterTitle || title} />
      <meta property="twitter:description" content={twitterDescription || description} />
      <meta property="twitter:image" content={twitterImage} />
    </Helmet>
  );
};

export default SEO;
