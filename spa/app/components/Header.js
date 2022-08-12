import { Menu } from "../components/Menu.js";
import { Title } from "../components/Title.js";
import { SearchForm } from "../components/SearchForm.js";

export function Header() {
  const $header = document.createElement("header");
  $header.classList.add("header");
  $header.appendChild(Title());
  $header.appendChild(Menu());
  $header.appendChild(SearchForm());

  return $header;
}
