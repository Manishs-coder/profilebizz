import { useEffect, useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const SITE_URL = 'https://profilebizz.com';
const FALLBACK_IMAGE = `${SITE_URL}/og-cover.jpg`;

type PublicSeo = {
  seoTitle?: string | null;
  seoDescription?: string | null;
  keywords?: string | null;
  canonicalUrl?: string | null;
  ogImage?: string | null;
  ogTitle?: string | null;
  twitterCard?: string | null;
  schemaType?: string | null;
  robots?: string | null;
  createdAt?: string | null;
  updatedAt?: string | null;
};

type ProfileSeoProps = {
  slug: string;
  title: string;
  description: string;
  canonicalUrl: string;
  image?: string | null;
  entityName: string;
  entityType?: 'Person' | 'Organization' | 'Thing';
  designation?: string | null;
  locale?: 'en' | 'hi';
  alternateUrl?: string | null;
};

function absoluteUrl(value?: string | null) {
  if (!value) return FALLBACK_IMAGE;
  if (/^https?:\/\//i.test(value)) return value;
  return `${SITE_URL}${value.startsWith('/') ? '' : '/'}${value}`;
}

function concise(value: string, length = 160) {
  const text = value.replace(/\s+/g, ' ').trim();
  return text.length <= length ? text : `${text.slice(0, length - 1).trim()}…`;
}

export function ProfileSeo({
  slug,
  title,
  description,
  canonicalUrl,
  image,
  entityName,
  entityType = 'Person',
  designation,
  locale = 'en',
  alternateUrl,
}: ProfileSeoProps) {
  const [savedSeo, setSavedSeo] = useState<PublicSeo | null>(null);

  useEffect(() => {
    const controller = new AbortController();
    fetch(`/api/public/founders/${encodeURIComponent(slug)}/seo`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : null))
      .then((value) => setSavedSeo(value))
      .catch(() => {});
    return () => controller.abort();
  }, [slug]);

  const resolved = useMemo(() => {
    const pageTitle = savedSeo?.seoTitle?.trim() || title;
    const pageDescription = concise(savedSeo?.seoDescription?.trim() || description);
    const pageUrl = savedSeo?.canonicalUrl?.trim() || canonicalUrl;
    const pageImage = absoluteUrl(savedSeo?.ogImage || image);
    const pageEntityType =
      savedSeo?.schemaType === 'Organization' || savedSeo?.schemaType === 'Person'
        ? savedSeo.schemaType
        : entityType;
    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Article',
          headline: savedSeo?.ogTitle?.trim() || pageTitle,
          description: pageDescription,
          image: pageImage,
          url: pageUrl,
          datePublished: savedSeo?.createdAt || undefined,
          dateModified: savedSeo?.updatedAt || undefined,
          author: { '@type': 'Organization', name: 'ProfileBizz Editorial', url: SITE_URL },
          publisher: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#organization`,
            name: 'ProfileBizz',
            url: SITE_URL,
            logo: { '@type': 'ImageObject', url: `${SITE_URL}/favicon.svg` },
          },
          mainEntityOfPage: { '@type': 'WebPage', '@id': pageUrl },
          about: { '@id': `${pageUrl}#entity` },
        },
        {
          '@type': pageEntityType,
          '@id': `${pageUrl}#entity`,
          name: entityName,
          url: pageUrl,
          image: pageImage,
          ...(pageEntityType === 'Person' && designation ? { jobTitle: designation } : {}),
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
            { '@type': 'ListItem', position: 2, name: entityName, item: pageUrl },
          ],
        },
      ],
    };
    return {
      title: pageTitle,
      description: pageDescription,
      canonicalUrl: pageUrl,
      image: pageImage,
      ogTitle: savedSeo?.ogTitle?.trim() || pageTitle,
      twitterCard: savedSeo?.twitterCard || 'summary_large_image',
      robots: savedSeo?.robots || 'index, follow',
      keywords: savedSeo?.keywords?.trim() || '',
      graph: JSON.stringify(graph),
    };
  }, [alternateUrl, canonicalUrl, description, designation, entityName, entityType, image, savedSeo, title]);

  return (
    <Helmet>
      <html lang={locale === 'hi' ? 'hi' : 'en'} />
      <title>{resolved.title}</title>
      <meta name="description" content={resolved.description} />
      {resolved.keywords && <meta name="keywords" content={resolved.keywords} />}
      <meta name="robots" content={resolved.robots} />
      <link rel="canonical" href={resolved.canonicalUrl} />
      {alternateUrl && (
        <>
          <link rel="alternate" hrefLang={locale === 'hi' ? 'en' : 'hi'} href={alternateUrl} />
          <link rel="alternate" hrefLang="x-default" href={locale === 'hi' ? alternateUrl : resolved.canonicalUrl} />
        </>
      )}
      <meta property="og:type" content="article" />
      <meta property="og:url" content={resolved.canonicalUrl} />
      <meta property="og:site_name" content="ProfileBizz" />
      <meta property="og:title" content={resolved.ogTitle} />
      <meta property="og:description" content={resolved.description} />
      <meta property="og:image" content={resolved.image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content={locale === 'hi' ? 'hi_IN' : 'en_IN'} />
      <meta name="twitter:card" content={resolved.twitterCard} />
      <meta name="twitter:site" content="@profilebizz" />
      <meta name="twitter:title" content={resolved.ogTitle} />
      <meta name="twitter:description" content={resolved.description} />
      <meta name="twitter:image" content={resolved.image} />
      {savedSeo?.createdAt && <meta property="article:published_time" content={savedSeo.createdAt} />}
      {savedSeo?.updatedAt && <meta property="article:modified_time" content={savedSeo.updatedAt} />}
      <script type="application/ld+json">{resolved.graph}</script>
    </Helmet>
  );
}
