import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import routineReducer from "./features/routineSlice"
import exerciseReducer from "./features/exerciseSlice"

export const store = configureStore ({
    reducer:{
        user: userReducer,
        routine: routineReducer,
        exercise: exerciseReducer
    },
});