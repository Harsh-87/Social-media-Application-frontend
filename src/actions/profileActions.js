import axios from "axios";
import {
  GET_PROFILE,
  GET_ALL_PROFILES,
  PROFILE_LOADING,
  PROFILES_LOADING,
  CLEAR_CURRENT_PROFILE,
  SET_CURRENT_USER,
  GET_ERRORS
} from "./types";

//Get All Profiles
export const getAllProfiles = () => dispatch => {
  dispatch(setProfilesLoading());
  axios
    .get("/users")
    .then(res =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_ALL_PROFILES,
        payload: {}
      })
    );
}

//Get Profile By Handle
export const getProfileByHandle = (handle) => dispatch => {
  dispatch(setProfileLoading());
  console.log(handle);
  axios
    .get(`/profile/${handle}`)
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: null
       })
    );
};

// Set profile Loading
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};

// Set profiles Loading
export const setProfilesLoading = () => {
  return {
    type: PROFILES_LOADING
  };
};

// Clear Profile
export const clearCurrentProfile = () => {
  return {
    type: CLEAR_CURRENT_PROFILE
  };
};
