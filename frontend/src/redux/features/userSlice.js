import { createSlice } from '@reduxjs/toolkit';

const guardarTokenJWT = (token) => {
    localStorage.setItem('jwtToken', token);
};

const obtenerTokenJWT = () => {
    return localStorage.getItem('jwtToken');
};

const eliminarTokenJWT = () => {
    localStorage.removeItem('jwtToken');
};

export const userSlice = createSlice({
    name: "user",
    initialState: {
        token: obtenerTokenJWT() || "",
        login: false
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            guardarTokenJWT(action.payload);
        },
        setLogin: (state, action) => {
            state.login = action.payload
        }
    }
});

export const { setToken, setLogin } = userSlice.actions;


export default userSlice.reducer;
