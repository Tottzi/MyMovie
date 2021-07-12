import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

  const name = localStorage.getItem('userName')

export const fetchMyMoviesRedux = createAsyncThunk(
  'mymovies/fetchMyMoviesRedux',
  async (userId, thunkAPI) => {
    const response = await axios.get(`${fetchURL}/api/user/mymovies/${userId}`)
    return response.data
  }
)


const initialState = {
  status: 'idle',
  entities: []
}

const myMoviesSlice = createSlice({
  name: 'myMovies',
  initialState,
  reducers: {
    setStatus: (state, action) => {
      state.process = 'done'
    },
    deleteMyMovie: ( state, action) => {
      state.entities = state.entities.filter(movie => movie.imdbID !== action.payload)
      axios.delete(`${fetchURL}/api/user/mymovies`, {data:{
        "name": name,
        "imdbID": action.payload
      }})
    }
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMyMoviesRedux.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = 'done'
      if (action.payload.length > 0 ) state.entities = [...action.payload]
      console.log(action.payload)
  })
  }
})

export const { deleteMyMovie } = myMoviesSlice.actions;
export default myMoviesSlice.reducer;