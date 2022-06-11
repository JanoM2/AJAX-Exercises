const d = document;
const $main = d.querySelector("main");
const $files = d.getElementById("files");

const uploader = (file) => {
  fetch("assets/uploader.html", {
    method: "POST",
    headers: {
      "Content-Type": "multipart/form-data",
    },
  })
    .then(() => {
      //   let xhr = new XMLHttpRequest();
      //   let formData = new FormData();
      //   formData.append("file", file);
      //   xhr.send(formData);
    })
    .catch((err) => {
      console.error(err);
      $main.insertAdjacentHTML("afterend", `<p><b>${err}</b></p>`);
    });
};

d.addEventListener("change", (e) => {
  if (e.target === $files) {
    let files = Array.from(e.target.files);
    files.forEach((el) => {
      uploader(el);
    });
  }
});
