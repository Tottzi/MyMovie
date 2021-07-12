import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from 'axios';

const fetchURL = process.env.MODE === 'DEV'
  ? 'http://localhost:5000'
  : 'https://hackday-mymovies-backend.herokuapp.com'

export const fetchMoviesByIdRedux = createAsyncThunk(
  'movie/fetchMoviesByIdRedux',
  async (imdbID, thunkAPI) => {
    const response = await axios.get(`${fetchURL}/api/movie/${imdbID}`)
    return response.data
  }
)


const initialState = {
  status: 'idle',
  entities: {}
}

const moviesSlice = createSlice({
  name: 'movie',
  initialState,
  reducers: {
    clearEntities: (state, action) => {
      state.status = 'idle'
      state.entities = {}
    },
    deleteMyMovie: ( state, action) => {
      state.entities = state.entities.filter(movie => movie.imdbID !== action.payload)
    },
    addComment : (state, action) => {
      const localMovie = {...state.entities}
      const com = action.payload
      if(state.entities.localData){
        if(state.entities.localData.comments){
        localMovie.localData.comments.push(com)}
        else {
          localMovie.localData.comments = [] 
          localMovie.localData.comments.push(com)
        }
      } else {
        localMovie.localData = {}
        localMovie.localData.imdbID = com.imdbID
        localMovie.localData.comments = []
        localMovie.localData.comments.push(com)
      }
      axios.post(`${fetchURL}/api/movie/comment`, {
        imdbID: state.entities.imdbID,
        comments: [com]
      })
    }

  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchMoviesByIdRedux.fulfilled, (state, action) => {
      // Add user to the state array
      state.status = 'done'
      state.entities = {...action.payload}
  })
  }
})

export const { deleteMyMovie, clearEntities, addComment } = moviesSlice.actions;
export default moviesSlice.reducer;