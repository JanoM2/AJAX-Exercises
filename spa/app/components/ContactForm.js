export function ContactForm() {
  const $form = document.createElement("form"),
    $styles = document.getElementById("dynamic-styles");
  $form.classList.add("contact-form");

  $form.innerHTML = `
  <input name="name" class="name" type="text" placeholder="Escribe tu Nombre"
  pattern="^[A-Za-zÑñÁáÉéÍíÓóÚúÜü\\s]+$" title="Nombre solo acepta letras y espacios en blanco" required
  data-form>
  <input name="email" class="email" type="email" placeholder="Escribe tu email" title='Email incorrecto'
  pattern="^[a-z0-9]+(\\.[_a-z0-9]+)*@[a-z0-9-]+(\\.[a-z0-9-]+)*(\\.[a-z]{2,15})$" required data-form>
  <input name="subject" class="subject" type="text" placeholder="Asunto a Tratar" title="Campo sin rellenar"
  required data-form>
  <textarea name="comment" class="textarea" placeholder="Escribe tus comentarios" rows="5"
  title="Tu comentario no puede superar los 255 caracteres" data-pattern="^.{1,255}$" required
  data-form></textarea>
  
  <button class="contactBtn" type="submit">Enviar</button>
  
  <div class="lds-ring none">
            <div></div>
            <div></div>
            <div></div>
            <div></div>
        </div>
  
  <div class="contact-form-response none">
  <p>Los datos han sido enviados</p>
  </div>
  `;

  $styles.innerHTML = `
  .contact-form {
    margin-left: auto;
    margin-right: auto;
    width: 80%;
  }
  
  .contact-form > * {
    margin: 1rem auto;
    display: block;
    width: 80%;
    padding: 0.5rem;
    font-family: var(--letter-font);
  }
  
  .textarea {
    resize: none;
  }
  
  .contact-form-response {
    text-align: center;
    font-weight: bolder;
    font-size: 1.5rem;
  }
  
  .contact-form-response none {
    display: none;
  }
  
  .contact-form *::placeholder {
    color: black;
  }
  
  .contact-form [required]:valid {
    border: thin solid green;
  }
  
  .contact-form [required]:invalid {
    border: thin solid red;
  }
  
  .contact-form-error {
    margin-top: -1rem;
    font-size: 1rem;
    background-color: rgb(255, 74, 74);
    color: black;
    font-weight: bold;
    transition: all 800ms ease;
  }
  
  .contact-form-error.is-active {
    display: block;
    animation: show-message 1s 1 normal 0s ease-out both;
  }
  
  .none {
    display: none;
  }
  
  @keyframes show-message {
    0% {
      visibility: hidden;
      opacity: 0;
    }
  
    100% {
      visibility: visible;
      opacity: 1;
    }
  }
  
  .contactBtn {
    width: 40%;
    padding: 0.5rem;
    background-color: rgb(199, 199, 199);
    font-family: var(--letter-font);
    font-weight: bold;
  }
  
  .contactBtn:hover {
    cursor: pointer;
    background-color: yellow;
    transition: 0.8s;
  }
  
  .error {
    font-weight: bolder;
    text-align: center;
    margin-top: 4rem;
  }
  .lds-ring {
    display: inline-block;
    position: relative;
    width: 80px;
    height: 80px;
    left: 45%;
    right: 45%;
  }
  
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 64px;
    height: 64px;
    margin: 8px;
    border: 8px solid black;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: black transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
  
  .none {
    display: none;
  }
  `;

  function validationsForm() {
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

    $form.addEventListener("submit", (e) => {
      e.preventDefault();

      fetch("https://formsubmit.co/ajax/martinojano0@gmail.com", {
        method: "POST",
        body: new FormData($form),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          console.log(json);
          const $response = d.querySelector(".contact-form-response");
          const $loader = d.querySelector(".lds-ring");
          $loader.classList.remove("none");

          setTimeout(() => {
            $loader.classList.add("none");
            $response.classList.remove("none");
            $form.reset();

            setTimeout(() => {
              $response.classList.add("none");
            }, 3000);
          }, 3000);
        })
        .catch((err) => {
          console.error(err);
          $form.insertAdjacentHTML("afterend", `<p class="error">${err}</p>`);
        });
    });
  }

  setTimeout(() => validationsForm(), 100);

  return $form;
}
