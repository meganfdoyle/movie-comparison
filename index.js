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
    
    console.log(response.data);
};

const input = document.querySelector('input');

/* 
Debouncing an input: waiting for some time to pass after the last event to actually do something
*/

const debounce = (callback) => {
    let timeoutID;
    return (...args) => {
        //the first time a user presses a key, this code is skipped
        if (timeoutID) {
            //the second time a user presses a key, timeoutID is already defined and we are 
            //stopping the timer
            clearTimeout(timeoutID);
        };

        //the first time a user presses a key, timeoutID  is set
//     //the second time a user presses a key, a new timeoutID is created and the process repeats
        timeoutID = setTimeout(() => {
            //apply calls the function as normal AND passes each element of args in as separate arguments to callback()
            callback.apply(null, args);
        }, 1000)
    };
};

const onInput = event => {
    //the first time a user presses a key, this code is skipped
    //the second time a user presses a key, timeoutID is already defined and we are stopping the timer
    if (timeoutID) {
        clearTimeout(timeoutID);
    };

    //the first time a user presses a key, timeoutID  is set
    //the second time a user presses a key, a new timeoutID is created and the process repeats
    //until there is a full second in between the user typing
    timeoutID = setTimeout(() => {
        fetchData(event.target.value);
    }, 1000)
};

input.addEventListener('input', onInput);