import api from "../helpers/wp_api.js";
import ajax from "../helpers/ajax.js";
import { PostCard } from "./PostCard.js";
import { Post } from "../components/Post.JS";
import { SearchCard } from "./SearchCard.js";
import { ContactForm } from "./ContactForm.js";

export async function Router() {
  let { hash } = location;
  console.log(hash);

  const $main = document.getElementById("main");
  $main.innerHTML = null;

  if (!hash || hash === "#/") {
    await ajax({
      url: api.POSTS,
      cbSuccess: (posts) => {
        console.log(posts);

        let html = "";

        posts.forEach((post) => (html += PostCard(post)));
        document.querySelector(".loader").style.display = "none";
        $main.innerHTML = html;
      },
    });
  } else if (hash.includes("#/search")) {
    let query = localStorage.getItem("wpSearch");

    if (!query) {
      $main.innerHTML = `<h2 style="text-align:center">Es necesario buscar algo</h2>`;

      document.querySelector(".loader").style.display = "none";
      return false;
    }

    await ajax({
      url: `${api.SEARCH}${query}`,
      cbSuccess: (search) => {
        console.log(search);

        let html = "";

        if (search.length === 0) {
          html = `<p class="error">No existen resultados de Busqueda para el termino <mark>${query}</mark></p>`;
        } else {
          search.forEach((post) => (html += SearchCard(post)));
          document.querySelector(".loader").style.display = "none";
        }
        $main.innerHTML = html;
      },
    });
  } else if (hash === "#/contacto") {
    $main.appendChild(ContactForm());
  } else {
    $main.innerHTML = `<h2>Aca cargara el contenido del Post previamente Seleccionado</h2>`;
    console.log(`${api.POSTS}/${localStorage.getItem("wpPostId")}`);

    await ajax({
      url: `${api.POST}/${localStorage.getItem("wpPostId")}`,
      cbSuccess: (post) => {
        $main.innerHTML = Post(post);
      },
    });
  }
  document.querySelector(".loader").style.display = "none";
}
