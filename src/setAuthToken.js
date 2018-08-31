// setAuthToken.js

import axios from 'axios';

// Julia: we're setting auth header for axios as a default header. If token exists, we set it in axios.
// Why did we lose it then!?! when working w/ Jacob to do the console log in our first debug session
// This is not a good way to do it. What should happen is when you make an axios call, each time you do, you 
// might reference the token inside of your state.

const setAuthToken = token => { 
    if(token) {
        axios.defaults.headers.common['Authorization'] = token;
    }
    else {
        delete axios.defaults.headers.common['Authorization'];
    }
}

export default setAuthToken;