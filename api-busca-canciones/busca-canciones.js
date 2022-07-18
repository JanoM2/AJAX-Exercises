const d = document;
const $form = d.querySelector("form"),
  $ldr = d.querySelector(".ldr"),
  $error = d.querySelector(".error"),
  $artista = d.querySelector(".tempArtista"),
  $song = d.querySelector(".tempSong");

$form.addEventListener("submit", async (e) => {
  e.preventDefault();

  let $tempArtist = "",
    $tempSong = "";

  $ldr.innerHTML = `
    <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
    `;

  try {
    let interprete = d.querySelector("#band").value,
      cancion = d.querySelector("#song").value;

    let res = await Promise.all([
        fetch(
          `https://www.theaudiodb.com/api/v1/json/2/search.php?s=${interprete}`
        ),
        fetch(`https://api.lyrics.ovh/v1/${interprete}/${cancion}`),
      ]),
      json = await Promise.all(res.map((responses) => responses.json()));

    // console.log(artistData, songData);
    console.log(json[0].artists, json[0]);

    if (json[0].artists === null) {
      $tempArtist = `<h2>No se encuentra al interprete <mark>${interprete}</mark></h2>`;
    } else {
      let artist = json[0].artists[0];
      $tempArtist = `
      <h2>Artista</h2>
        <img src="${artist.strArtistThumb}" alt="${artist.strArtist}">
          <h3>${artist.strArtist}</h3>
          <p>${artist.strStyle ? artist.strStyle : artist.strGenre}</p>
          <p>${artist.strCountry}</p>
          <p class="biography">${
            artist.intBornYear ? artist.intBornYear : artist.intFormedYear
          } - ${artist.intDiedYear ? artist.intDiedYear : "Presente"}</p>
      <a href="${
        artist.strWebsite ? artist.strWebsite : artist.strLastFMChart
      }" target="_blank">Sitio Web</a>
      <p class="lyrics">${
        artist.strBiographyES ? artist.strBiographyES : artist.strBiographyEN
      }</p>`;
    }

    if (json[1].error) {
      $tempSong = `<h2>No se encuentra la cancion <mark>${cancion}</mark></h2>`;
    } else {
      $tempSong = `
    <h2>${cancion.toUpperCase()}</h2>
      <blockquote class="cancion">${json[1].lyrics}
    </blockquote>`;
    }

    $ldr.innerHTML = "";
    $artista.innerHTML = $tempArtist;
    $song.innerHTML = $tempSong;
    $error.innerHTML = "";
  } catch (err) {
    console.error(err);
    $ldr.innerHTML = "";
    $error.innerHTML = `Error: ${err} - ${err.status} - ${err.statusText}`;
  }
});
