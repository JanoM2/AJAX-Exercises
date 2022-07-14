const d = document,
  $main = d.querySelector("main"),
  $links = d.querySelector(".links");

let pokeAPI = "https://pokeapi.co/api/v2/pokemon/";

async function loadPokemons(url) {
  try {
    // Loader
    $main.innerHTML = `
  <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
`;

    let res = await fetch(url),
      json = await res.json();
    let $template = ``,
      $prev,
      $next;
    console.log(json);

    // Validacion para saber si la promesa devuelve un error
    if (!res.ok) throw { status: res.status, statusText: res.statusText };

    for (let i = 0; i < json.results.length; i++) {
      try {
        let res = await fetch(json.results[i].url),
          pokemon = await res.json();
         
        $template += `
        <figure>
            <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}">
            <figcaption>${pokemon.name}</figcaption>
            </figure>
        `;
      } catch (err) {
        console.error(err);
        $template.innerHTML = `
    <figure>
        <figcaption>Error: ${err} - ${err.status} - ${err.statusText}</figcaption>
    </figure>`;
      }
    }
    $main.innerHTML = $template;

    $prev = json.previous ? `<a href="${json.previous}">⏪</a>` : "";
    $next = json.next ? `<a href="${json.next}">⏩</a>` : "";
    $links.innerHTML = `${$prev}  ${$next}`;
  } catch (err) {
    console.error(err);
    $main.innerHTML = `Error: ${err} - ${err.status} - ${err.statusText}`;
  }
}

d.addEventListener("DOMContentLoaded", loadPokemons(pokeAPI));

d.addEventListener("click", (e) => {
  if (e.target.matches(".links a")) {
    e.preventDefault();
    loadPokemons(e.target.getAttribute("href"));
  }
});
