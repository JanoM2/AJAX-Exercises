export function Menu() {
  const $menu = document.createElement("nav");
  $menu.classList.add("menu");
  $menu.innerHTML = `
    <a href="#/">Home</a>
    <span>-</span>
    <a href="#/search">Busqueda</a>
    <span>-</span>
    <a href="#/contacto">Contacto</a>
    `;
  return $menu;
}
