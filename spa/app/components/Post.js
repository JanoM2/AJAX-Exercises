export function Post(props) {
  let { content, date, title } = props,
    dateFormart = new Date(date).toLocaleString();

  return `
    <section class="post-page">
    <aside>
    <h2>${title.rendered}</h2>
    <time datetime="${date}">${dateFormart}</time>
    </aside>
    <hr>
    <article>${content.rendered}</article>
    </section>
    `;
}
