import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import movieApi from "../../general/apis/movieApi"
import {APIKey} from "../../general/apis/MovieApiKey"

export const fetchAsyncMovies = createAsyncThunk(
    'movies/fetchAsyncMovies', 
async ()=>{
    const movieName = "Friends"
    const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${movieName}&type=movie`
        ); 

           
         return response.data; 
        }
); 


export const fetchAsyncShows = createAsyncThunk(
    'movies/fetchAsyncShows', 
async ()=>{
    const seriesName = "Twilight"
    const response = await movieApi.get(
        `?apiKey=${APIKey}&s=${seriesName}&type=series`
        ); 

           
         return response.data; 
        }
); 

export const fetchAsyncMovieOrShowDetail = createAsyncThunk(
    'movies/fetchAsyncMovieOrShowDetail', 
async (id)=>{
 
    const response = await movieApi.get(
        `?apiKey=${APIKey}&i=${id}&Plot=full`
        ); 

           
         return response.data; 
        }
); 


const initialState = {
    movies: {},
    shows: {},
    selectedMovieOrShow: {}, 
}

const movieSlice = createSlice({
name: "movies", 
initialState, 
reducers: {
    removeSelectedMovieOrShow: (state) =>{
        state.selectedMovieOrShow = {}; 
    }
},
extraReducers: {
    [fetchAsyncMovies.pending]: () =>{
       console.log("Pending");  
    
}, 
[fetchAsyncMovies.fulfilled]: (state, {payload}) =>{
    console.log("Fetch successful");  
    return {...state, movies: payload}
 }, 
 [fetchAsyncMovies.rejected]: () =>{
    console.log("Rejected");
 },
 [fetchAsyncShows.fulfilled]: (state, {payload}) =>{
    console.log("Fetch successful");  
    return {...state, shows: payload}
 }, 
 [fetchAsyncMovieOrShowDetail.fulfilled]: (state, {payload}) =>{
    console.log("Fetch successful");  
    return {...state, selectedMovieOrShow: payload}
 }, 
}, 
}); 

export const {  removeSelectedMovieOrShow } = movieSlice.actions; 
export const getAllMovies = (state) => state.movies.movies
export const getAllShows = (state) => state.movies.shows
export const getSelectedMovieOrShow = (state) => state.movies.selectedMovieOrShow
export default movieSlice.reducer  