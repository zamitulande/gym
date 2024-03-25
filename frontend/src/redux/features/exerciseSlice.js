import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice =createSlice({
    name: "exercise",
    initialState:{
        exercises: [],
        openModal: false, 
    },
    reducers:{
        setExercises: (state, action) => {
            state.exercises = action.payload
            console.log(action.payload)
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        }
    }
});

export const  {setExercises, setOpenModal} = exerciseSlice.actions;

export default exerciseSlice.reducer;