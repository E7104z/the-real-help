/**
 * JSON-LD structured data builders for The Real Help.
 *
 * Every value comes from BUSINESS (verified facts) or from page content.
 * Fields Jason has not yet confirmed are omitted, never invented.
 */
import { BUSINESS } from '@/lib/constants/business';

type JsonLd = Record<string, unknown>;

export function organizationSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${BUSINESS.url}/#organization`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.name,
    url: BUSINESS.url,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    logo: `${BUSINESS.url}${BUSINESS.logo}`,
    founder: { '@type': 'Person', name: BUSINESS.founder },
    contactPoint: [
      {
        '@type': 'ContactPoint',
        telephone: BUSINESS.phone,
        email: BUSINESS.email,
        contactType: 'sales',
      },
    ],
  };
}

export function webSiteSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${BUSINESS.url}/#website`,
    url: BUSINESS.url,
    name: BUSINESS.name,
    publisher: { '@id': `${BUSINESS.url}/#organization` },
  };
}

export function localBusinessSchema(): JsonLd {
  const address: JsonLd = {
    '@type': 'PostalAddress',
    addressLocality: BUSINESS.address.addressLocality,
    addressRegion: BUSINESS.address.addressRegion,
    addressCountry: BUSINESS.address.addressCountry,
  };
  if (BUSINESS.address.streetAddress) {
    address.streetAddress = BUSINESS.address.streetAddress;
  }
  if (BUSINESS.address.postalCode) {
    address.postalCode = BUSINESS.address.postalCode;
  }

  const schema: JsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    '@id': `${BUSINESS.url}/#business`,
    name: BUSINESS.legalName,
    alternateName: BUSINESS.name,
    url: BUSINESS.url,
    description: BUSINESS.description,
    email: BUSINESS.email,
    telephone: BUSINESS.phone,
    priceRange: BUSINESS.priceRange,
    image: `${BUSINESS.url}${BUSINESS.logo}`,
    address,
    areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'City', name })),
    serviceType: ['Custom Software', 'AI Tools', 'Workflow Automation'],
    parentOrganization: { '@id': `${BUSINESS.url}/#organization` },
  };

  if (BUSINESS.geo.latitude && BUSINESS.geo.longitude) {
    schema.geo = {
      '@type': 'GeoCoordinates',
      latitude: Number(BUSINESS.geo.latitude),
      longitude: Number(BUSINESS.geo.longitude),
    };
  }
  if (BUSINESS.openingHours.length) {
    schema.openingHoursSpecification = BUSINESS.openingHours;
  }
  if (BUSINESS.sameAs.length) {
    schema.sameAs = BUSINESS.sameAs;
  }

  return schema;
}

export function serviceOfferSchema(): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${BUSINESS.url}/#services`,
    serviceType: 'Custom software, AI tools and workflow automation',
    provider: { '@id': `${BUSINESS.url}/#business` },
    areaServed: BUSINESS.areaServed.map((name) => ({ '@type': 'City', name })),
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Fixed-price services',
      itemListElement: [
        {
          '@type': 'Offer',
          name: 'The Quick Fix',
          description:
            'One real chore solved with a working tool. Fixed price, live in days.',
          priceCurrency: 'USD',
          price: '500',
          url: `${BUSINESS.url}/#price`,
        },
        {
          '@type': 'Offer',
          name: 'The Quick Fix (monthly)',
          description: 'Hosting plus small fixes and tweaks after launch.',
          priceCurrency: 'USD',
          price: '30',
          url: `${BUSINESS.url}/#price`,
        },
        {
          '@type': 'Offer',
          name: 'Custom Build',
          description:
            'Multi-step automations and full apps, priced to the job after a free intro call.',
          url: `${BUSINESS.url}/#price`,
        },
      ],
    },
  };
}

export function faqSchema(faqs: { q: string; a: string }[]): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}

export function breadcrumbSchema(
  items: { name: string; path: string }[],
): JsonLd {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.path.startsWith('http')
        ? item.path
        : `${BUSINESS.url}${item.path}`,
    })),
  };
}
