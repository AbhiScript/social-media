import React, { createContext, useReducer, useContext, useEffect } from "react";

const initialState = {
  showPost: "home",
  showModal: false,
  formData: {
    image: null,
    title: "",
    caption: "",
  },
  userPosts: [],
  userData: null,
};

const SET_SHOW_POST = "SET_SHOW_POST";
const SET_SHOW_MODAL = "SET_SHOW_MODAL";
const SET_FORM_DATA = "SET_FORM_DATA";
const SET_USER_POSTS = "SET_USER_POSTS";
const SET_USER_DATA = "SET_USER_DATA";

const reducer = (state, action) => {
  switch (action.type) {
    case SET_SHOW_POST:
      return { ...state, showPost: action.payload };
    case SET_SHOW_MODAL:
      return { ...state, showModal: action.payload };
    case SET_FORM_DATA:
      return { ...state, formData: { ...state.formData, ...action.payload } };
    case SET_USER_POSTS:
      return { ...state, userPosts: action.payload };
    case SET_USER_DATA:
      return { ...state, userData: action.payload };
    default:
      return state;
  }
};

export const PostContext = createContext();

export const usePostContext = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <PostContext.Provider value={{ state, dispatch }}>
      {children}
    </PostContext.Provider>
  );
};
