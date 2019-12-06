import React, { useReducer } from "react";
import axios from "axios";
import GithubContext from "./GithubContext";
import GithubReducer from "./GithubReducer";
import {
  GET_LOADING,
  SEARCH_USERS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS
} from "../types";

let githubClientId, githubSecretId;
if (process.env.NODE_ENV !== "production") {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubSecretId = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
} else {
  githubClientId = process.env.REACT_APP_GITHUB_CLIENT_ID;
  githubSecretId = process.env.REACT_APP_GITHUB_CLIENT_SECRET;
}
const GithubState = props => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false
  };
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //search users
  const searchUsers = async text => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/search/users?q=${text}&client_id=${githubClientId}&client_secret=${githubSecretId}`
    );
    dispatch({
      type: SEARCH_USERS,
      payload: res.data.items
    });
  };
  //get user
  const getUser = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}?client_id=${githubClientId}&client_secret=${githubSecretId}`
    );
    dispatch({
      type: GET_USER,
      payload: res.data
    });
  };

  //get repos
  const getUserRepo = async username => {
    setLoading();
    const res = await axios.get(
      `https://api.github.com/users/${username}/repos?per_page=5&sort=created:asc&client_id=${githubClientId}&client_secret=${githubSecretId}`
    );
    dispatch({
      type: GET_REPOS,
      payload: res.data
    });
  };

  //clear users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  //set loading
  const setLoading = () =>
    dispatch({
      type: GET_LOADING
    });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loading: state.loading,
        alert: state.alert,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepo
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
