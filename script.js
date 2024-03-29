/* Boolflix */

$( document ).ready(function () {

  // CREO UN ARRAY CON LE LINGUE PRINCIPALI
  var lang = ["it", "en", "fr", "es", "de"];

  // CLICK SCOPRI DI PIU
  $(document).on("click", ".bottone", function () {
    $(this).next("div").addClass("action");
  });
  $(document).on("click", ".close", function () {
    $(".table.action").removeClass("action");
  });

  // FACCIAMO APPARIRE E SPARIRE LE INFO
  $(document).on("mouseenter", ".picture", function () {
    $(this).next("div").addClass("active");
  });
  $(document).on("mouseleave", ".desck", function () {
    $(this).removeClass("active");
  });

  // FUNZIONE PER AVVIARE LA CHIAMATA AJAX DEI FILM
  function movieSearch () {
    // Ripuliamo i nostri risultati dopo ogni ricerca
    $(".resultfilm").html("");
    // Assegno ad una variabile il valore dell'input
    var inputVal = $("#site-search").val();
    // Assegno ad una variabile le proprietà della risposta
    var outData = {
      api_key : "298ab0a1b1e3f83b64000dc095881f36",
      language : "it-IT",
      query : inputVal,
      include_adult: false
    }
    // Richiediamo via ajax all'API i film
    $.ajax({
      url : "https://api.themoviedb.org/3/search/movie",
      method : "GET",
      data : outData,
      success: function (data) {
        // Dichiaro una variabile con i risultati della chiamata
        var movies = data.results;
        // Creo il clone del film con Handlebars
        var source = $("#template-film").html();
        var template = Handlebars.compile(source);
        // Ciclo for per generare i dati dei film
        for (var i = 0; i < movies.length; i++) {
          // Gestiamo il caso in cui la copertina manchi
          var cop = "";
          if (movies[i].poster_path == null) {
            cop = "media/imagefilm-null.png";
          } else {
            cop = "http://image.tmdb.org/t/p/w342/" + movies[i].poster_path;
          }
          // Gestiamo il caso in cui la foto manchi
          var photo = "";
          if (movies[i].backdrop_path == null) {
            photo = "media/foto.png";
          } else {
            photo = "http://image.tmdb.org/t/p/w342/" + movies[i].backdrop_path;
          }
          // Dichiariamo in una variabile tutti i segnaposto
          var context = {
            copertina: cop,
            titolo: movies[i].title,
            originale: movies[i].original_title,
            lingua: flagLang (movies[i].original_language),
            voto: movies[i].vote_average,
            star: starVote(movies[i].vote_average),
            overview: movies[i].overview,
            date: movies[i].release_date,
            foto: photo
          };
          // Stampo l'input a schermo
          var html = template(context);
          $(".resultfilm").append(html);
        }
      },
      error: function (errore) {
        alert ("C'è stato un errore: " + errore);
      }
    });
  }

  // FUNZIONE PER AVVIARE LA CHIAMATA AJAX DELLE SERIE TV
  function tvSearch () {
    // Ripuliamo i nostri risultati dopo ogni ricerca
    $(".resultserie").html("");
    // Assegno ad una variabile il valore dell'input
    var inputVal = $("#site-search").val();
    // Assegno ad una variabile le proprietà della risposta
    var outData = {
      api_key : "298ab0a1b1e3f83b64000dc095881f36",
      language : "it-IT",
      query : inputVal
    }
    // Richiediamo via ajax all'API le serie tv
    $.ajax({
      url : "https://api.themoviedb.org/3/search/tv",
      method : "GET",
      data : outData,
      success: function (data) {
        // Dichiaro una variabile con i risultati della chiamata
        var tv = data.results;
        // Creo il clone del film con Handlebars
        var source = $("#template-serie").html();
        var template = Handlebars.compile(source);
        // Ciclo for per generare i dati delle serie tv
        for (var i = 0; i < tv.length; i++) {
          // Gestiamo il caso in cui la locandina manchi
          var loc = "";
          if (tv[i].poster_path == null) {
            loc = "media/imageserie-null.png";
          } else {
            loc = "http://image.tmdb.org/t/p/w342/" + tv[i].poster_path;
          }
          // Gestiamo il caso in cui la foto manchi
          var photo = "";
          if (tv[i].backdrop_path == null) {
            photo = "media/foto.png";
          } else {
            photo = "http://image.tmdb.org/t/p/w342/" + tv[i].backdrop_path;
          }
          // Dichiariamo in una variabile tutti i segnaposto
          var context = {
            locandina: loc,
            nome: tv[i].name,
            original: tv[i].original_name,
            language: flagLang (tv[i].original_language),
            vote: tv[i].vote_average,
            stars: starVote(tv[i].vote_average),
            trama: tv[i].overview,
            date: tv[i].first_air_date,
            foto: photo
          };
          // Stampo l'input a schermo
          var html = template(context);
          $(".resultserie").append(html);
        }
      },
      error: function (errore) {
        alert ("C'è stato un errore: " + errore);
      }
    });
  }

  // AVVIO DELLA RICERCA TRAMITE IL TASTO INVIO
  $("#site-search").keypress(function () {
      if (event.which == 13) {
        movieSearch ();
        tvSearch ();
        $("#site-search").val("");
      }
    }
  );

  // FUNZIONE PER GENERARE LE STELLE
  function starVote (voto) {
    var star = "";
    var stella = Math.floor(voto/2);
    for (var i = 1; i <= 5; i++) {
      if (stella >= i) {
        star += '<i class="fas fa-star"></i>';
      } else {
        star += '<i class="far fa-star"></i>';
      }
    }
    return star;
  }

  // FUNZIONE PER GENERARE LE BANDIERINE
  function flagLang (lingua) {
    var flag = "";
    if (lang.includes(lingua)) {
      flag = '<img src="media/' + lingua + '.png">';
    } else {
      flag = "<p>" + lingua + "</p>";
    }
    return flag;
  }  

});
