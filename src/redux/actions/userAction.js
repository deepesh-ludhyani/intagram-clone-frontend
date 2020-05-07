import axios from 'axios';
import { SET_USER, SET_ERRORS, CLEAR_ERRORS, LOADING_UI, SET_UNAUTHENTICATED } from '../types';


export const loginUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios.post('/login', userData)
    .then(({ data: { token } }) => {
      setAuthorizationHeader(token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');

    })
    .catch(({ response: { data: { error } } }) => {
      dispatch({
        type: SET_ERRORS,
        payload: error
      })
    });
}

export const signupUser = (userData, history) => (dispatch) => {
  dispatch({ type: LOADING_UI });

  axios.post('/signup', userData)
    .then(({ data: { token } }) => {
      setAuthorizationHeader(token);
      dispatch(getUserData());
      dispatch({ type: CLEAR_ERRORS });
      history.push('/');

    })
    .catch(({ response: { data: { error } } }) => {
      dispatch({
        type: SET_ERRORS,
        payload: error
      })
    });
}

export const logout = () => (dispatch) => {
  localStorage.removeItem('token');
  delete axios.defaults.headers.common['Authorization'];
  dispatch({ type: SET_UNAUTHENTICATED });
}

export const getUserData = () => (dispatch) => {
  axios.get('/user')
    .then(({ data }) => {
      dispatch({
        type: SET_USER,
        payload: data
      })
    })
    .catch(err => console.log(err))
}


const setAuthorizationHeader = token => {
  const bearerToken = `Bearer ${token}`;
  localStorage.setItem('token', bearerToken);
  axios.defaults.headers.common['Authorization'] = bearerToken;
}