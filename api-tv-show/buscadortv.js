const d = document,
  $main = d.querySelector("main"),
  $template = d.querySelector("template").content,
  $fragment = d.createDocumentFragment();

d.addEventListener("keypress", async (e) => {
  if (e.target.matches("#input")) {
    if (e.key === "Enter") {
      let query = d.querySelector("#input").value;

      try {
        let res = await fetch(`https://api.tvmaze.com/search/shows?q=${query}`),
          json = await res.json();
        console.log(json);

        if (!res.ok) throw { status: res.status, statusText: res.statusText };

        json.forEach((el) => {
          $template.querySelector("h3").textContent = el.show.name;
          $template.querySelector("div").innerHTML = el.show.summary;
          $template.querySelector("img").alt = el.show.name;
          $template.querySelector("img").src = el.show.image
            ? el.show.image.medium
            : "https://static.tvmaze.com/images/no-img/no-img-portrait-text.png";
          $template.querySelector("a").href = el.show.url ? el.show.url : "#";
          $template.querySelector("a").target = el.show.url ? "_blank" : "self";
          $template.querySelector("a").textContent = el.show.url
            ? "Ver Mas"
            : "";

          let $clone = d.importNode($template, true);
          $fragment.appendChild($clone);
        });

        $main.innerHTML = "";
        $main.appendChild($fragment);

        if (json.length === 0) {
          $main.innerHTML = `<h2>No existen resultados de shows para el criterio de busqueda <mark>${query}</mark></h2>`;
        }
      } catch (err) {
        console.error(err);
        $main.innerHTML = `Error: ${err} - ${err.status} - ${err.statusText}`;
      }
    }
  }
});
