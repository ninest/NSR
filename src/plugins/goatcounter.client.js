const GOATCOUNTER_ENDPOINT = "https://nsr.goatcounter.com/count";
const GOATCOUNTER_SCRIPT = "https://gc.zgo.at/count.js";

export default ({ app }) => {
  if (process.env.NODE_ENV !== "production" || !process.client) {
    return;
  }

  window.goatcounter = window.goatcounter || {};
  window.goatcounter.no_onload = true;
  window.goatcounter.endpoint = GOATCOUNTER_ENDPOINT;

  let hasLoaded = Boolean(window.goatcounter.count);
  let lastPath = null;

  const countPageview = (route) => {
    const path = route.fullPath || `${location.pathname}${location.search}${location.hash}`;

    if (!hasLoaded || !window.goatcounter.count || path === lastPath) {
      return;
    }

    lastPath = path;

    window.goatcounter.count({
      path,
      title: document.title,
    });
  };

  const countAfterRouteSettles = (route) => {
    window.setTimeout(() => countPageview(route), 500);
  };

  const script = document.createElement("script");
  script.async = true;
  script.src = GOATCOUNTER_SCRIPT;
  script.dataset.goatcounter = GOATCOUNTER_ENDPOINT;
  script.onload = () => {
    hasLoaded = true;
    countAfterRouteSettles(app.router.currentRoute);
  };

  document.head.appendChild(script);

  app.router.afterEach((to) => {
    countAfterRouteSettles(to);
  });
};
