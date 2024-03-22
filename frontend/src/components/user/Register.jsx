import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/Axios';
import Swal from 'sweetalert2';
import { setUsers } from '../../redux/features/userSlice';

const Register = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const getToken = useSelector((state) => state.user.token);
    const getUsers = useSelector((state) => state.user.users)
    const getTypeUser = useSelector((state) => state.user.typeUser)

    const [userCoach, setUserCoach] = useState({
        name: '',
        lastname: '',
        identification: '',
        password: '',
        role: 0
    })

    const [userSportsMan, setUserSportsMan] = useState({
        name: '',
        lastname: '',
        identification: '',
        profession: '',
        level: '',
        age: '',
        weight: '',
        size: '',
        start: '',
        end: '',
        medical_history: ''
    })

    const handleBack = () => {
        navigate("/dashboard");
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        if(getTypeUser === "coach"){
            setUserCoach(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }else{
            setUserSportsMan(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }
        
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard")
        const postUser = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`
                    }
                }
                if(getTypeUser === "coach"){
                    const res = await clienteAxios.post('/admin/register/user-coach', userCoach, config);
                    console.log(res)
                    dispatch(setUsers([...getUsers, res.data.data]))
                }else{
                    const res = await clienteAxios.post('/admin/register/user-sportsman', userSportsMan, config);
                    console.log(res)
                    //dispatch(setUsers([...getUsers, res.data.data]))
                }
               
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
                {getTypeUser === "coach" && (
                    <>
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
                                value={userCoach.name}
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
                                value={userCoach.lastname}
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
                                value={userCoach.identification}
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
                                value={userCoach.password}
                                onChange={handleOnChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </>
                )}
                {getTypeUser === "sportsman" && (
                    <>
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
                                placeholder="Escribe aquí el nombre"
                                value={userSportsMan.name}
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
                                placeholder="Escribe aquí el apellido"
                                value={userSportsMan.lastname}
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
                                placeholder="Escribe aquí la identification"
                                value={userSportsMan.identification}
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
                                profesion
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="profession"
                                name="profession"
                                type='text'
                                placeholder="Escribe aquí la profesion"
                                value={userSportsMan.profession}
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
                                Nivel
                            </InputLabel>
                            <Select
                                id="level"
                                name="level"
                                value={userSportsMan.level}
                                onChange={handleOnChange}
                                fullWidth
                                required
                            >
                                <MenuItem value="Principiante">Principiante</MenuItem>
                                <MenuItem value="Intermedio">Intermedio</MenuItem>
                                <MenuItem value="Avanzado">Avanzado</MenuItem>
                            </Select>
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <InputLabel shrink htmlFor="bootstrap-input">
                                Edad
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="age"
                                name='age'
                                type='text'
                                placeholder="Escribe aquí la edad"
                                value={userSportsMan.age}
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
                                Peso
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="weight"
                                name='weight'
                                type='text'
                                placeholder="Escribe aquí el peso"
                                value={userSportsMan.weight}
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
                                Talla
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="size"
                                name='size'
                                type='text'
                                placeholder="Escribe aquí la talla"
                                value={userSportsMan.size}
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
                              Historia Medica
                            </InputLabel>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="medical_history"
                                name='medical_history'
                                type='text'
                                value={userSportsMan.medical_history}
                                onChange={handleOnChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                    </>
                )}

                <Button type="submit">register</Button>
            </form>
        </Box>
    )
}

export default Register