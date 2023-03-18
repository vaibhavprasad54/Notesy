// import {combineReducers, applyMiddleware } from 'redux';  //They work pretty much as the name suggests
import { configureStore } from '@reduxjs/toolkit'
import { combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import { userLoginReducer, userRegisterReducer, userUpdateReducer } from './reducers/userReducers';
import { noteDeleteReducer, notesCreateReducer, notesListReducer, notesUpdateReducer } from './reducers/notesReducers';

const reducers = combineReducers({
    //This will contain our reducers
   userLogin: userLoginReducer,
   userRegister: userRegisterReducer,
   notesList: notesListReducer,
   notesCreate: notesCreateReducer,
   notesUpdate: notesUpdateReducer,
   notesDelete: noteDeleteReducer,
   userUpdate: userUpdateReducer
});

const userInfoFromStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : null;

//Initial state of the application
const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
};

//Adding middleware
const middleware = [thunk];

//Initialising Store
const store = configureStore({
    reducer: reducers,
    initialStateList: initialState,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
         immutableCheck: false,
         serializableCheck: false,
    })
});

//Exporting the store
export default store;