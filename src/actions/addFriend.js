// addFriend.js

import axios from 'axios';
import { GET_ERRORS, SET_CURRENT_USER } from './types';

export const addFriend = (user, history) => dispatch => {
    axios.post('/api/users/addfriend', user)
            .then(res => console.log(/* not sure*/))
            .catch(err => {
                dispatch({
                    type: GET_ERRORS,
                    payload: err.response.data
                });
            });
}

