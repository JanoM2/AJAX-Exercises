export default async function ajax(props) {
  let { url, cbSuccess } = props;

  await fetch(url)
    .then((res) => (res.ok ? res.json() : Promise.reject))
    .then((json) => cbSuccess(json))
    .catch((err) => {
      console.error(err);

      document.getElementById(
        "main"
      ).innerHTML = `<div class="error"><p><b>${err.status}:${err}</b></p></div>`;
      document.querySelector(".loader").style.display = "none";
    });
}
