/* 
UTILITY FUNCTIONS
*/

/* 
Debouncing an input: waiting for some time to pass after the last event to actually do something
*/

const debounce = (callback, delay = 1000) => {
    let timeoutID;
    return (...args) => {
        //the first time a user presses a key, this code is skipped
        if (timeoutID) {
            //the second time a user presses a key, timeoutID is already defined and we are 
            //stopping the timer
            clearTimeout(timeoutID);
        };

        //the first time a user presses a key, timeoutID  is set
        //the second time a user presses a key, a new timeoutID is created and the process repeats
        //until there is a full second in between the user typing        
        timeoutID = setTimeout(() => {
            //apply calls the function as normal AND passes each element of args in as separate arguments to callback()
            callback.apply(null, args);
        }, delay)
    };
};