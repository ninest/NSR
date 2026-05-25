const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return path.replace(/\/+$/, "");
};

export const createSeoHead = ({ siteConfig, route, title, description, titleTemplate, app }) => {
  const canonicalUrl = `${trimTrailingSlash(siteConfig.url)}${normalizePath(route.path)}`;
  const resolvedTitle = titleTemplate === "%s" ? title : `${title} - ${siteConfig.name}`;
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
      hid: "twitter:card",
      name: "twitter:card",
      content: "summary",
    },
    {
      hid: "twitter:title",
      name: "twitter:title",
      content: resolvedTitle,
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
