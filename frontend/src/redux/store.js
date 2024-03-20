import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./features/userSlice"
import routineReducer from "./features/routineSlice"

export const store = configureStore ({
    reducer:{
        user: userReducer,
        routine: routineReducer
    },
});