$(document).ready(function() {
    let debounceTimeout = null
    $('#searchInput').on('input', function() {
        clearTimeout(debounceTimeout)
        debounceTimeout = setTimeout(() => getMovie(this.value.trim()), 1500)
    })

    $('#showMore').on('click', function(e) {
        e.preventDefault()
        onShowMoreClicked()
    })
})

function getMovie(title) {
    showSpinningWheel()
    if (!title) {
        return
    }

    if (!$('#searchInput').val().trim()) {
        $('#waiting').addClass('hidden');
      }

    fetchMovieFromApi(title)
}

function showSpinningWheel() {
    $('#waiting').removeClass('hidden')
    $('.movie').addClass('hidden')

    if ( !$('#searchInput').val().trim() ) {
        $('#waiting').addClass('hidden');
      }
}

function fetchMovieFromApi(title) {
    let ajaxRequest = new XMLHttpRequest();
    ajaxRequest.open("GET", `https://www.omdbapi.com/?t=${title}&apikey=e1ee6038`, true)
    ajaxRequest.onreadystatechange = function() {
        if(ajaxRequest.readyState == 4) {
            if(ajaxRequest.status === 200) {
                handleResults(JSON.parse(ajaxRequest.responseText))
            }
        }
       
    }
    ajaxRequest.send()
}

function handleResults(result) {
    if (result.Response === 'True') {
        console.log(JSON.stringify(result, null, 2));
        $('#waiting').addClass('hidden')
        revealMovie(result)
    } else if (result.Response === 'False') {
        $('#waiting').addClass('hidden')
        $('.not-found').clone().removeClass('hidden').appendTo($('.center'))
    }
}

function revealMovie(movie) {
    $('waiting').addClass('hidden')
    $('#image').attr('src', movie.Poster);
    $('#title').text(movie.Title)
    $('#year').text(movie.Year)
    $('#runtime').text(movie.Runtime)
    $('#genre').text(movie.Genre)
    $('#imdbId').attr('href', ('https://www.imdb.com/title/' + movie.imdbID))
    $('#imdbRating').text(movie.imdbRating)
    $('#plot').text(movie.Plot)
    $('#director').append(movie.Director)
    $('#actors').append(movie.Actors)
    $('#production').append(movie.Production)
    $('#boxOffice').append(movie.BoxOffice)
    $('#language').append(movie.Language)
    $('#rated').append(movie.Rated)
    $('.movie').removeClass('hidden')
}

function onShowMoreClicked (){
    $('#plot').toggleClass('collapsible expanded')
    $("#info").toggleClass("hidden");
}