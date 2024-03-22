import { createSlice } from '@reduxjs/toolkit';

export const exerciseSlice =createSlice({
    name: "exercise",
    initialState:{
        exercises: []
    },
    reducers:{
        setExercises: (state, action) => {
            state.exercises = action.payload
        }
    }
});

export const  {setExercises} = exerciseSlice.actions;

export default exerciseSlice.reducer;