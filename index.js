const fetchData = async (searchTerm) => {
    //respresents all information related to this request
    const response = await axios.get('http://www.omdbapi.com/', {
        //axios formats the URL with the specified params
        //Network > Fetch/XHR > Request URL
        params: {
            apikey: 'c60d4cfb',
            //i specifies the individual movie and shows a lot more info about it
            //i: 
            //s is used to search for a movie title
            s: searchTerm
        }
    });
    
    //if no movie matches the search
    if (response.data.Error) {
        return [];
    };
    
    //capital s in Search because that is how the API was written
    return response.data.Search;
};

createAutoComplete({
    root: document.querySelector('.autocomplete')
});

createAutoComplete({
    root: document.querySelector('.autocomplete-two')
});

createAutoComplete({
    root: document.querySelector('.autocomplete-three')
});

onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c60d4cfb',
            i: movie.imdbID
        }
    });
    document.querySelector('#summary').innerHTML = movieTemplate(response.data);
    console.log(response.data);
};

const movieTemplate = (movieDetail) => {
    return `
        <article class="media">
            <figure class="media-left">
                <p class="image">
                    <img src="${movieDetail.Poster}"/>
                </p>
            </figure>
            <div class="media-content">
                <div class="content">
                    <h1>${movieDetail.Title}</h1>
                    <h4>${movieDetail.Genre}</h4>
                    <p>${movieDetail.Plot}</p>
                </div>
            </div>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Awards}</p>
            <p class="subtitle">Awards</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.BoxOffice}</p>
            <p class="subtitle">Box Office</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.Metascore}</p>
            <p class="subtitle">Metascore</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbRating}</p>
            <p class="subtitle">IMDB Rating</p>
        </article>
        <article class="notification is-primary">
            <p class="title">${movieDetail.imdbVotes}</p>
            <p class="subtitle">IMDB Votes</p>
        </article>
    `;
};