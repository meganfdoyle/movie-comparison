


const createAutoComplete = ({root}) => {
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

    const input = root.querySelector('input');
    const dropdown = root.querySelector('.dropdown');
    const resultsWrapper = root.querySelector('.results');


    const onInput = async event => {
        //fetchData is async so we have to treat it as an async function
        const movies = await fetchData(event.target.value);

        //if there are no movies in the dropdown
        if (!movies.length) {
            //then remove the dropdown
            dropdown.classList.remove('is-active');
            return;
        }
        //clears previous results
        resultsWrapper.innerHTML = '';

        //makes the dropdown visible
        dropdown.classList.add('is-active');
        for (let movie of movies) {
            const option = document.createElement('a');

            const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

            option.classList.add('dropdown-item');
            option.innerHTML = `
                <img src="${movie.Poster}" />
                ${movie.Title}
            `;
            option.addEventListener('click', () => {
                dropdown.classList.remove('is-active');
                input.value = movie.Title;
                onMovieSelect(movie);
            });

            resultsWrapper.appendChild(option);
        };
    };

    input.addEventListener('input', debounce(onInput), 1000);

    document.addEventListener('click', event => {
        //if the user clicks anywhere other than the root (anything related to the input), then the dropdown is closed
        if (!root.contains(event.target)) {
            dropdown.classList.remove('is-active');
        };
    });
};