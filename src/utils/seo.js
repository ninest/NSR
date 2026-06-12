const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
};

export const createSeoHead = ({ siteConfig, route, title, description, titleTemplate, app, article }) => {
  const siteUrl = trimTrailingSlash(siteConfig.url);
  const canonicalUrl = `${siteUrl}${normalizePath(route.path)}`;
  const resolvedTitle = titleTemplate === "%s" ? title : `${title} - ${siteConfig.name}`;
  const imageUrl = `${siteUrl}/og-image.png`;
  const meta = [
    ...(description
      ? [
          {
            hid: "description",
            name: "description",
            content: description,
          },
          {
            hid: "og:description",
            property: "og:description",
            content: description,
          },
          {
            hid: "twitter:description",
            name: "twitter:description",
            content: description,
          },
        ]
      : []),
    {
      hid: "og:title",
      property: "og:title",
      content: resolvedTitle,
    },
    {
      hid: "og:url",
      property: "og:url",
      content: canonicalUrl,
    },
    {
      hid: "og:type",
      property: "og:type",
      content: article ? "article" : "website",
    },
    {
      hid: "og:site_name",
      property: "og:site_name",
      content: siteConfig.name,
    },
    {
      hid: "og:image",
      property: "og:image",
      content: imageUrl,
    },
    {
      hid: "og:image:width",
      property: "og:image:width",
      content: "1200",
    },
    {
      hid: "og:image:height",
      property: "og:image:height",
      content: "630",
    },
    {
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: resolvedTitle,
    },
    {
      hid: "twitter:image",
      name: "twitter:image",
      content: imageUrl,
    },
  ];

  // Mark calculator/tool pages as a free WebApplication for relevance on "calculator" queries.
  const structuredData = [];
  if (app) {
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "WebApplication",
      name: app.name || title,
      ...(description ? { description } : {}),
      url: canonicalUrl,
      applicationCategory: app.category || "UtilitiesApplication",
      operatingSystem: "Any",
      browserRequirements: "Requires JavaScript",
      isAccessibleForFree: true,
      inLanguage: "en",
      offers: { "@type": "Offer", price: "0", priceCurrency: "SGD" },
      publisher: {
        "@type": "Organization",
        name: siteConfig.name,
        url: trimTrailingSlash(siteConfig.url),
      },
    });
  }

  // Article schema with publish/modified dates gives search engines a freshness
  // signal without needing the year baked into the title.
  if (article && article.datePublished) {
    const org = {
      "@type": "Organization",
      name: siteConfig.name,
      url: trimTrailingSlash(siteConfig.url),
    };
    structuredData.push({
      "@context": "https://schema.org",
      "@type": "Article",
      headline: title,
      ...(description ? { description } : {}),
      datePublished: article.datePublished,
      dateModified: article.dateModified || article.datePublished,
      mainEntityOfPage: { "@type": "WebPage", "@id": canonicalUrl },
      url: canonicalUrl,
      inLanguage: "en",
      author: org,
      publisher: org,
    });
  }

  return {
    title,
    ...(titleTemplate ? { titleTemplate } : {}),
    meta,
    link: [
      {
        hid: "canonical",
        rel: "canonical",
        href: canonicalUrl,
      },
    ],
    ...(structuredData.length
      ? {
          script: structuredData.map((data) => ({
            hid: `ld-${data["@type"]}`,
            type: "application/ld+json",
            json: data,
          })),
        }
      : {}),
  };
};
