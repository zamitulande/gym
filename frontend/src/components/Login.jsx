import { Box, Button, FormControl, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { setLogin, setToken } from '../redux/features/userSlice';

const Login = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const [user, setUser] = useState({
        identification: '',
        password: ''
    })

  

    const handleBack = () => {
        navigate("/");
    };
    
    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setUser(prevUser => ({
            ...prevUser,
            [name]: value
        }));
    }

    const handleSubmit = (e)=>{
        e.preventDefault();
        const postUser = async () =>{            
            try{
                const res = await clienteAxios.post('/auth/authenticate', user);
                console.log(res)
                if(res.data.token && res.data.role == "COACH"){
                    console.log("el ingresado es coach")
                }
                if(res.data.token){
                    dispatch(setLogin(true))
                    dispatch(setToken(res.data.token))
                }
                
            }catch(error){
               console.log(error)            
            }
        }
        postUser();
    }
    return (
        <Box sx={{ maxWidth: { xs: 330 } }}>
            <Button onClick={handleBack}>Regresar</Button>
            <Box sx={{
                width: "100%",
                mt: 6,
                textAlign: "center",
            }}>
                <Typography variant="h4" gutterBottom >
                    Login
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Usuario
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="identification"
                        name="identification"
                        type='text'
                        placeholder="Escribe aquí tu identification"
                        value={user.identification}
                        onChange={handleOnChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Contraseña
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="password"
                        name='password'
                        type='password'
                        placeholder="Escribe aquí tu contraseña"
                        value={user.password}
                        onChange={handleOnChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>
                <button type="submit" >login</button>
            </form>
        </Box>

    )
}

export default Login