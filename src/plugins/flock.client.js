// Sends an outbound_click Flock event for links to other sites.
export default () => {
  const onClick = (event) => {
    const link = event.target.closest && event.target.closest("a[href]");
    if (!link || !window.flock) return;

    let url;
    try {
      url = new URL(link.href, location.href);
    } catch (e) {
      return;
    }
    if (!/^https?:$/.test(url.protocol) || url.host === location.host) return;

    window.flock.track("outbound_click", {
      url: url.href,
      domain: url.hostname.replace(/^www\./, ""),
      page: location.pathname,
      text: (link.textContent || "").trim().slice(0, 100),
    });
  };

  // click: left click, auxclick: middle click (new tab)
  document.addEventListener("click", onClick, true);
  document.addEventListener("auxclick", onClick, true);
};
