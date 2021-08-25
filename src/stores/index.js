import { configureStore} from "@reduxjs/toolkit";
import { myMoviesSlice, moviesSlice, usersSlice } from '../slices/';

export const store = configureStore({
  reducer: { 
    myMoviesSlice : myMoviesSlice,
    moviesSlice: moviesSlice,
    usersSlice: usersSlice
  }
})