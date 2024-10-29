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

const root = document.querySelector('.autocomplete');
root.innerHTML = `
    <label><b>Search For A Movie</b></label>
    <input class="input"/>
    <div class="dropdown">
        <div class="dropdown-menu">
            <div class="dropdown-content results">
            </div>
        </div>
    </div>
`;

const input = document.querySelector('input');
const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');


const onInput = async event => {
    //fetchData is async so we have to treat it as an async function
    const movies = await fetchData(event.target.value);

    //clears previous results
    resultsWrapper.innerHTML = '';

    //makes the dropdown visible
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const option = document.createElement('a');

        const imgSrc = movie.Poster === 'N/A' ? '' : item.Poster;

        option.classList.add('dropdown-item');
        option.innerHTML = `
            <img src="${movie.Poster}" />
            ${movie.Title}
        `;

        resultsWrapper.appendChild(option);
    };
};

input.addEventListener('input', debounce(onInput), 1000);