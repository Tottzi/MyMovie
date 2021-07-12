import { configureStore} from "@reduxjs/toolkit";
import { myMoviesSlice, moviesSlice } from '../slices/';

export const store = configureStore({
  reducer: { 
    myMoviesSlice : myMoviesSlice,
    moviesSlice: moviesSlice
  }
})