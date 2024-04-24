import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice =createSlice({
    name: "exercise",
    initialState:{
        exercises: [],
        openModal: false, 
        urls: []
    },
    reducers:{
        setExercises: (state, action) => {
            state.exercises = action.payload
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        },
        setUrls: (state, action)=>{
            state.urls = action.payload;
        }
    }
});

export const  {setExercises, setOpenModal, setUrls} = exerciseSlice.actions;

export default exerciseSlice.reducer;