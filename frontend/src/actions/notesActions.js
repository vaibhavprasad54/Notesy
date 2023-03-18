import {
  NOTES_CREATE_REQUEST,
    NOTES_CREATE_FAIL,
    NOTES_CREATE_SUCCESS,
    // NOTES_DELETE_FAIL,
    // NOTES_DELETE_REQUEST,
    // NOTES_DELETE_SUCCESS,
    NOTES_LIST_FAIL,
    NOTES_LIST_REQUEST,
    NOTES_LIST_SUCCESS,
    NOTES_UPDATE_REQUEST,
    NOTES_UPDATE_SUCCESS,
    NOTES_UPDATE_FAIL,
    NOTES_DELETE_FAIL,
    NOTES_DELETE_SUCCESS,
    NOTES_DELETE_REQUEST,
    // NOTES_UPDATE_FAIL,
    // NOTES_UPDATE_REQUEST,
    // NOTES_UPDATE_SUCCESS,
  } from "../constants/notesConstants";
  import axios from "axios";
  
  export const listNotes = () => async (dispatch, getState) => {            // Made possible using Redux thunk
    try {
      dispatch({
        type: NOTES_LIST_REQUEST,
      });
  
      const {
        userLogin: { userInfo },                                        //Fetching userInfo
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,                    //Fetching token
        },
      };
  
      const { data } = await axios.get(`/api/notes`, config);           //Making API Call
      
      dispatch({                                                        //This action will be dispatched if the request is successful.
        type: NOTES_LIST_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_LIST_FAIL,
        payload: message,
      });
    }
  };
  
  export const createNoteAction = (title, content, category) => async (
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: NOTES_CREATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.post(                  // API Call to create note. 
        `/api/notes/create`,
        { title, content, category },                     // Sending Title, content and category to backend
        config                                            // Passing the config object
      );
  
      dispatch({
        type: NOTES_CREATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_CREATE_FAIL,
        payload: message,
      });
    }
  };
  
 export const deleteNoteAction = (id) => async (dispatch, getState) => {
    try {
      dispatch({
        type: NOTES_DELETE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
   
      const { data } = await axios.delete(`/api/notes/${id}`, config);
  
      dispatch({
        type: NOTES_DELETE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_DELETE_FAIL,
        payload: message,
      });
    }
  };
  
  export const updateNoteAction = (id, title, content, category) => async (       // id is important to find the note in the database
    dispatch,
    getState
  ) => {
    try {
      dispatch({
        type: NOTES_UPDATE_REQUEST,
      });
  
      const {
        userLogin: { userInfo },
      } = getState();
  
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo.token}`,
        },
      };
  
      const { data } = await axios.put(               // PUT API Call to Update note
        `/api/notes/${id}`,
        { title, content, category },
        config
      );
  
      dispatch({                                    // If the above call is successful, then
        type: NOTES_UPDATE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({
        type: NOTES_UPDATE_FAIL,
        payload: message,
      });
    }
  };