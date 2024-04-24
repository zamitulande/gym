import { createSlice } from '@reduxjs/toolkit';

export const routineSlice =createSlice({
    name: "routine",
    initialState:{
        routine:[]
    },
    reducers:{
        setRoutine: (state, action) =>{
            state.routine = action.payload;
        }
    }
});

export const  {setRoutine} = routineSlice.actions;

export default routineSlice.reducer;