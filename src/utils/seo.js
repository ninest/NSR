const trimTrailingSlash = (value) => value.replace(/\/+$/, "");

const normalizePath = (path) => {
  if (!path || path === "/") {
    return "/";
  }

  return `${path.replace(/\/+$/, "")}/`;
};

export const createSeoHead = ({ siteConfig, route, title, description, titleTemplate }) => {
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
      hid: "twitter:title",
      name: "twitter:title",
      content: resolvedTitle,
    },
  ];

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
  };
};
