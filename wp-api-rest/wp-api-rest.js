/*
Links de WordPress de Ejemplo:

https://lucylara.com/
https://malvestida.com/
https://css-tricks.com/        
*/

const d = document,
  $ldr = d.querySelector(".loader"),
  $site = d.querySelector("#site"),
  $posts = d.querySelector("#posts"),
  $template = d.querySelector("#post-template").content,
  $fragment = d.createDocumentFragment(),
  DOMAIN = "https://malvestida.com/",
  SITE = `${DOMAIN}/wp-json`,
  API_WP = `${SITE}/wp/v2`,
  POSTS = `${API_WP}/posts?_embed`;

function getSiteData() {
  fetch(SITE)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      $site.innerHTML = `
                    <h3>Sitio Web</h3>
                    <h2>
                        <a href="${json.url}" target="_blank">${json.name}</a>
                        </h2>
                        <p>${json.description}</p>
                        <p>${json.timezone_string}</p>
                    `;
    })
    .catch((err) => console.error(err));
}

let page = 1;

function getPosts() {
  $ldr.style.display = "block";

  fetch(`${POSTS}&page=${page}`)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      json.forEach((el) => {
        let categories = "",
          tags = "";

        el._embedded["wp:term"][0].forEach(
          (el) => (categories += `<li>${el.name}</li>`)
        );
        el._embedded["wp:term"][1].forEach(
          (el) => (tags += `<li>${el.name}</li>`)
        );

        $template.querySelector(".post-image").src = el._embedded[
          "wp:featuredmedia"
        ][0].source_url
          ? el._embedded["wp:featuredmedia"][0].source_url
          : "";
        $template.querySelector(".post-image").alt = el.title.rendered;
        $template.querySelector(".post-title").innerHTML = el.title.rendered;
        $template.querySelector(".post-author").innerHTML = `
                        <img src="${el._embedded.author[0].avatar_urls[96]}" alt="${el._embedded.author[0].name}">
                        <figcaption>${el._embedded.author[0].name}</figcaption>
                        `;
        $template.querySelector(".post-date").innerHTML = new Date(
          el.date
        ).toLocaleString();
        $template.querySelector(".post-link").href = el.link;
        $template.querySelector(".post-excerpt").innerHTML =
          el.excerpt.rendered.replace("[&hellip;]", "...");
        $template.querySelector(
          ".post-categories"
        ).innerHTML = `<p>Categorias:</p>
                        <ul>${categories}</ul>`;
        $template.querySelector(".post-tags").innerHTML = `<p>Etiquetas:</p>
                        <ul>${tags}</ul>`;
        $template.querySelector(".post-content > article").innerHTML =
          el.content.rendered;

        let $clone = d.importNode($template, true);
        $fragment.appendChild($clone);
      });
      $posts.appendChild($fragment);
      $ldr.style.display = "none";
    })
    .catch((err) => {
      console.error(err);
      $ldr.style.display = "none";
    });
}

d.addEventListener("DOMContentLoaded", (e) => {
  getSiteData();
  getPosts();
});

window.addEventListener("scroll", (e) => {
  const { scrollTop, clientHeight, scrollHeight } = d.documentElement;
  // console.log(scrollTop, clientHeight, scrollHeight)

  if (scrollTop + clientHeight >= scrollHeight) {
    page++;
    getPosts();
  }
});
