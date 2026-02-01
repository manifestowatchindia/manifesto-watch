import React from 'react';
import { Helmet } from 'react-helmet-async';

interface HomepageSEOProps {
  electionContext?: string;
}

// Structured data for WebSite schema
const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "ManifestoWatch",
  "alternateName": "Manifesto Watch India",
  "url": "https://manifestowatch.in",
  "description": "Track political promises and hold governments accountable. India's #1 platform for monitoring election manifestos.",
  "inLanguage": ["en", "hi", "ta", "ml", "te", "bn"],
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://manifestowatch.in/search?q={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
};

// Structured data for Organization schema
const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "ManifestoWatch",
  "url": "https://manifestowatch.in",
  "logo": "https://manifestowatch.in/logo.png",
  "description": "A non-partisan platform dedicated to tracking political promises and promoting government accountability in India.",
  "foundingDate": "2024",
  "foundingLocation": {
    "@type": "Place",
    "name": "India"
  },
  "areaServed": {
    "@type": "Country",
    "name": "India"
  },
  "sameAs": [
    "https://twitter.com/manifestowatch",
    "https://www.instagram.com/manifestowatch",
    "https://www.youtube.com/@manifestowatch",
    "https://www.linkedin.com/company/manifestowatch"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "contactType": "customer support",
    "email": "contact@manifestowatch.in",
    "availableLanguage": ["English", "Hindi"]
  }
};

// Structured data for BreadcrumbList (homepage)
const breadcrumbStructuredData = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://manifestowatch.in"
    }
  ]
};

const HomepageSEO: React.FC<HomepageSEOProps> = ({ 
  electionContext = "Kerala, Tamil Nadu, West Bengal Elections 2026" 
}) => {
  const siteUrl = "https://manifestowatch.in";
  
  const pageTitle = `ManifestoWatch - Track Political Promises | ${electionContext}`;
  const pageDescription = "India's #1 platform for tracking election manifestos and political promises. Compare parties, verify claims, and hold governments accountable. Non-partisan, data-driven democracy.";
  const keywords = [
    "manifesto watch",
    "election manifesto",
    "political promises",
    "Kerala election 2026",
    "Tamil Nadu election 2026",
    "West Bengal election 2026",
    "BJP manifesto",
    "Congress manifesto",
    "DMK manifesto",
    "TMC manifesto",
    "CPI(M) manifesto",
    "political accountability",
    "promise tracker",
    "election tracker india",
    "government accountability"
  ].join(", ");

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <html lang="en" />
      <title>{pageTitle}</title>
      <meta name="title" content={pageTitle} />
      <meta name="description" content={pageDescription} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="ManifestoWatch Team" />
      <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href={siteUrl} />

      {/* Language & Locale */}
      <meta httpEquiv="content-language" content="en-IN" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:locale:alternate" content="hi_IN" />
      <meta property="og:locale:alternate" content="ta_IN" />
      <meta property="og:locale:alternate" content="ml_IN" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={siteUrl} />
      <meta property="og:title" content="ManifestoWatch - Track Political Promises" />
      <meta property="og:description" content={pageDescription} />
      <meta property="og:image" content={`${siteUrl}/og-image.png`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content="ManifestoWatch - Track Political Promises in India" />
      <meta property="og:site_name" content="ManifestoWatch" />

      {/* Twitter Card */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={siteUrl} />
      <meta name="twitter:title" content="ManifestoWatch - Track Political Promises" />
      <meta name="twitter:description" content={pageDescription} />
      <meta name="twitter:image" content={`${siteUrl}/twitter-image.png`} />
      <meta name="twitter:image:alt" content="ManifestoWatch - Track Political Promises in India" />
      <meta name="twitter:site" content="@manifestowatch" />
      <meta name="twitter:creator" content="@manifestowatch" />

      {/* App Icons & PWA */}
      <link rel="icon" href="/favicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
      <link rel="manifest" href="/manifest.json" />
      <meta name="theme-color" content="#1a365d" />
      <meta name="msapplication-TileColor" content="#1a365d" />

      {/* Mobile & Viewport */}
      <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="default" />
      <meta name="apple-mobile-web-app-title" content="ManifestoWatch" />

      {/* Security & Performance */}
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="referrer" content="strict-origin-when-cross-origin" />

      {/* Verification Tags (placeholders) */}
      {/* <meta name="google-site-verification" content="YOUR_VERIFICATION_CODE" /> */}
      {/* <meta name="facebook-domain-verification" content="YOUR_VERIFICATION_CODE" /> */}

      {/* Structured Data - WebSite */}
      <script type="application/ld+json">
        {JSON.stringify(websiteStructuredData)}
      </script>

      {/* Structured Data - Organization */}
      <script type="application/ld+json">
        {JSON.stringify(organizationStructuredData)}
      </script>

      {/* Structured Data - BreadcrumbList */}
      <script type="application/ld+json">
        {JSON.stringify(breadcrumbStructuredData)}
      </script>
    </Helmet>
  );
};

export default HomepageSEO;
