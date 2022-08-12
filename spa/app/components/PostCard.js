export function PostCard(props) {
  let { _embedded, date, title, slug, id } = props,
    dateFormart = new Date(date).toLocaleString(),
    urlPoster = _embedded["wp:featuredmedia"][0].source_url
      ? _embedded["wp:featuredmedia"][0].source_url
      : "/spa/app/assets/not_found.png";

  document.addEventListener("click", (e) => {
    if (!e.target.matches(".post-card a")) return false;
    localStorage.setItem("wpPostId", e.target.dataset.id);
  });

  return `
    <article class="post-card">
    <img src="${urlPoster}" alt="${title.rendered}">
    <h2>${title.rendered}</h2>
    <p><time datetime="${date}">${dateFormart}</time>
    <a href="#/${slug}"
    data-id="${id}">Ver Publicacion</a>
    </p>
    </article>
    `;
}
