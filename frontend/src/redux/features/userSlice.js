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
        login: false,
        role: "",
        users: [],
        typeUser: "",
        userInfo: [],
        openModal: false, 
        idAddRoutine: null, 
    },
    reducers: {
        setToken: (state, action) => {
            state.token = action.payload
            guardarTokenJWT(action.payload);
        },
        setLogin: (state, action) => {
            state.login = action.payload;
            if(!action.payload){
                eliminarTokenJWT();
            }
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setUsers: (state, action) => {
            state.users = action.payload;
        },
        setTypeUser: (state, action) => {
            state.typeUser = action.payload;
        },
        setOpenModal: (state, action) => {
            state.openModal = action.payload;
        },
        setUserInfo: (state, action) => {
            state.userInfo = action.payload;
        },
        setIdAddRoutine: (state, action) =>{
            state.idAddRoutine = action.payload
        }

    }
});

export const { setToken, setLogin, setRole, setUsers, setTypeUser, setOpenModal, setUserInfo, setIdAddRoutine} = userSlice.actions;


export default userSlice.reducer;
