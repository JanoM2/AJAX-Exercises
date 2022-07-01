const contactForm = () => {
  const d = document;
  const $form = d.querySelector(".contact-form");
  let $input = d.querySelectorAll(".contact-form [data-form]");

  $input.forEach((input) => {
    const $span = d.createElement("span");
    $span.id = input.className;
    $span.textContent = input.title;
    $span.classList.add("contact-form-error", "none");
    input.insertAdjacentElement("afterend", $span);
  });

  d.addEventListener("keyup", (e) => {
    if (e.target.matches(".contact-form [required]")) {
      let $input = e.target;
      let pattern = $input.pattern || $input.dataset.pattern;

      if (pattern && $input.value !== "") {
        let regex = new RegExp(pattern);
        return !regex.exec($input.value)
          ? d.getElementById($input.classList).classList.add("is-active")
          : d.getElementById($input.classList).classList.remove("is-active");
      }

      if (!pattern) {
        return $input.value === ""
          ? d.getElementById($input.classList).classList.add("is-active")
          : d.getElementById($input.classList).classList.remove("is-active");
      }
    }
  });

  d.addEventListener("submit", (e) => {
    e.preventDefault();

    const $response = d.querySelector(".contact-form-response");
    const $loader = d.querySelector(".lds-ring");
    $loader.classList.remove("none");

    fetch("send_mail.php", {
      method: "POST",
      body: new FormData(e.target),
      mode: "cors",
    })
      .then((res) => {
        console.log(res);
        res.ok ? res.json() : Promise.reject(res);
        // return res.json();
      })
      .then((json) => {
        console.log(json);

        setTimeout(() => {
          $loader.classList.add("none");
          $response.classList.remove("none");
          $response.innerHTML = `<p>${json}</p>`;
          $form.reset();
        }, 3000);
      })
      .catch((err) => {
        console.error(err, err.status);
        $form.insertAdjacentHTML(
          "afterend",
          `<p class="error">err:${err} - err-status:${err.status} - err-statusText:${err.statusText}</p>`
        );
      })
      .finally(() => {
        setTimeout(() => {
          $loader.classList.add("none");
          $response.classList.add("none");
        }, 3000);
      });
  });
};

document.addEventListener("DOMContentLoaded", contactForm());
