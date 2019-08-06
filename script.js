/* Boolflix */

$( document ).ready(function () {
  
  // FUNZIONE PER AVVIARE LA CHIAMATA AJAX
  function movieSearch () {
    // Ripuliamo i nostri risultati dopo ogni ricerca
    $(".container").html("");
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
        var source = $("#template").html();
        var template = Handlebars.compile(source);
        // Ciclo for per generare i dati dei film
        for (var i = 0; i < movies.length; i++) {
          var context = {
          titolo: movies[i].title,
          originale: movies[i].original_title,
          lingua: movies[i].original_language,
          voto: movies[i].vote_average
          };
          // Stampo l'input a schermo
          var html = template(context);
          $(".container").append(html);
        }
      },
      error: function (errore) {
        alert ("C'è stato un errore: " + errore);
      }
    });
  }

  // AVVIO DELLA RICERCA TRAMITE IL CLICK
  $("button").click(function () {
    movieSearch ();
    $("#site-search").val("");
    }
  );

  // AVVIO DELLA RICERCA TRAMITE IL TASTO INVIO
  $("#site-search").keypress(function () {
      if (event.which == 13) {
        movieSearch ();
        $("#site-search").val("");
      }
    }
  );

});
