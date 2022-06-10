document.addEventListener("DOMContentLoaded", (e) => {
  const includeHTML = (el, url) => {
    fetch(url)
      .then((res) => {
        return res.text();
      })
      .then((html) => {
        el.outerHTML = html;
      })
      .catch((err) => {
        console.error(err);
        el.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
      });
  };

  document.querySelectorAll("[data-include]").forEach((el) => {
    includeHTML(el, el.getAttribute("data-include"));
  });
});
