import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { setToken } from '../redux/features/userSlice';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const getToken = useSelector((state)=> state.user.token);
    console.log(getToken)
    const [user, setUser] = useState({
        name: '',
        lastname: '',
        identification: '',
        password: '',
        role: 0
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
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(user)
        const postUser = async () => {
            try {
                const config= {
                    headers:{
                        'Authorization': `Bearer${getToken}`
                    }
                }
                const res = await clienteAxios.post('/admin/register/users', user, config);
                dispatch(setToken(res.data.token))
                Swal.fire({
                    position: "top-end",
                    icon: "success",
                    title: "Usuario ha sido guardado",
                    showConfirmButton: false,
                    timer: 2500
                });
            } catch (error) {
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
                    Registrar
                </Typography>
            </Box>
            <form onSubmit={handleSubmit}>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                        nombre
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="name"
                        name="name"
                        type='text'
                        placeholder="Escribe aquí tu nombre"
                        value={user.name}
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
                        apellido
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="lastname"
                        name="lastname"
                        type='text'
                        placeholder="Escribe aquí tu apellido"
                        value={user.lastname}
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
                        identificacion
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
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                        Tipo de perfil
                    </InputLabel>
                    <Select
                        id="role"
                        name="role"
                        value={user.role}
                        onChange={handleOnChange}
                        fullWidth
                        required
                    >
                        <MenuItem value={2}>Entrenador</MenuItem>
                        <MenuItem value={3}>Deportista</MenuItem>
                    </Select>
                </FormControl>
                <Button type="submit">register</Button>
            </form>
        </Box>

    )
}

export default Register