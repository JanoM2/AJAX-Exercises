const d = document;
const $main = d.querySelector("main");

const getHTML = async () => {
  fetch("assets/home.html")
    .then((res) => {
      return res.text();
    })
    .then((html) => {
      $main.innerHTML = html;
    })
    .catch((err) => {
      console.error(err);
      $main.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    });
};
// location.reload();

d.addEventListener("DOMContentLoaded", getHTML);

d.addEventListener("click", (e) => {
  if (e.target.matches(".menu a")) {
    e.preventDefault();
    fetch(`${e.target.href}`)
      .then((res) => {
        return res.text();
      })
      .then((html) => {
        $main.innerHTML = html;
      })
      .catch((err) => {
        console.error(err);
        $main.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
      });
  }
});
