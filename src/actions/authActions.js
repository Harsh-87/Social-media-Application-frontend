import { GET_ERRORS, SET_CURRENT_USER } from './types';
import axios from 'axios';

//Register User
export const registerUser = (userdata, history) => dispatch => {
    axios.post('users/signup', userdata)
        .then(res => history.push('/login'))
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Login User
export const loginUser = (userdata) => dispatch => {

    axios.post('users/login', userdata)
        .then(res => {
            dispatch(setCurrentUser(res.data.user))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err
        }))
}

//Set Logged in User 
export const setCurrentUser = (user) => {
    return {
        type: SET_CURRENT_USER,
        payload: user
    }
}

//Log User Out 
export const logoutUser = () => dispatch => {
    dispatch(setCurrentUser({}));
}

