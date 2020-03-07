import { axiosWithAuth } from '../api/authios';

export const SET_USER = 'SET_USER';

export const setUserId = userId => dispatch => {
    dispatch({ type: SET_USER, payload: userId });
  };