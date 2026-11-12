import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SeoHeadProps {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
}

/**
 * Renders <title>, <meta name="description">, <meta name="keywords">,
 * and <link rel="canonical"> for every local-SEO / blog page.
 * Use together with StructuredData for full on-page SEO.
 */
const SeoHead: React.FC<SeoHeadProps> = ({ title, description, keywords, canonicalPath }) => {
  const canonicalUrl = `https://therealhelp.com${canonicalPath}`;

  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      <link rel="canonical" href={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content="website" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
};

export default SeoHead;