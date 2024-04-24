import { Box, Button, FormControl, Input, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
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

    const [formData, setFormData] = useState({
        userId: '',
        name: '',
        lastname: '',
        identification: '',
        level: '',
        age: '',
        weight: '',
        size: '',
        start: '',
        end: '',
        medical_history: '',
        profession: '',
        document: null,
        hombros: '',
        cadera: '',
        pantorrilla: '',
        pecho: '',
        pierna_a: '',
        pierna_m: '',
        pierna_b: '',
        brazo: '',
        cintura: '',
        antebrazo: '',
        masa_corporal: ''
    });

    const [image, setImage] = useState({})

    const handleBack = () => {
        navigate("/dashboard");
    };
    const handleUserSportsManChange = (e) => {
        const { name, value } = e.target;
        if (getTypeUser === "coach") {
            setUserCoach(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        } else {
            setFormData(prevUser => ({
                ...prevUser,
                [name]: value
            }));
        }

    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        navigate("/dashboard")
        const postUser = async () => {
            const formDataSend = new FormData();
            formDataSend.append('userId', formData.userId);
            formDataSend.append('name', formData.name);
            formDataSend.append('lastname', formData.lastname);
            formDataSend.append('identification', formData.identification);
            formDataSend.append('level', formData.level);
            formDataSend.append('age', formData.age);
            formDataSend.append('weight', formData.weight);
            formDataSend.append('size', formData.size);
            formDataSend.append('start', formData.start);
            formDataSend.append('end', formData.end);
            formDataSend.append('medical_history', formData.medical_history);
            formDataSend.append('profession', formData.profession);
            formDataSend.append('document', image[0]);
            formDataSend.append('hombros', formData.hombros);
            formDataSend.append('cadera', formData.cadera);
            formDataSend.append('pantorrilla', formData.pantorrilla);
            formDataSend.append('pecho', formData.pecho);
            formDataSend.append('pierna_a', formData.pierna_a);
            formDataSend.append('pierna_b', formData.pierna_b);
            formDataSend.append('pierna_m', formData.pierna_m);
            formDataSend.append('brazo', formData.brazo);
            formDataSend.append('cintura', formData.cintura);
            formDataSend.append('antebrazo  ', formData.antebrazo);
            formDataSend.append('masa_corporal', formData.masa_corporal);
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`,
                        'content-Type': 'multipart/form-data',
                    }
                }
                if (getTypeUser === "coach") {
                    const res = await clienteAxios.post('/admin/register/user-coach', userCoach, config);
                    dispatch(setUsers([...getUsers, res.data.data]))
                } else {
                    const res = await clienteAxios.post('/admin/register/user-sportsman', formDataSend, config);
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
                                onChange={handleUserSportsManChange}
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
                                onChange={handleUserSportsManChange}
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
                                onChange={handleUserSportsManChange}
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
                                onChange={handleUserSportsManChange}
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
                                value={formData.name}
                                onChange={handleUserSportsManChange}
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
                                value={formData.lastname}
                                onChange={handleUserSportsManChange}
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
                                value={formData.identification}
                                onChange={handleUserSportsManChange}
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
                                value={formData.profession}
                                onChange={handleUserSportsManChange}
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
                                value={formData.level}
                                onChange={handleUserSportsManChange}
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
                                value={formData.age}
                                onChange={handleUserSportsManChange}
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
                                value={formData.weight}
                                onChange={handleUserSportsManChange}
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
                                value={formData.size}
                                onChange={handleUserSportsManChange}
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
                                value={formData.medical_history}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>

                        {/* Campo de carga de archivos */}
                        <FormControl variant="standard" fullWidth style={{ paddingTop: 10 }}>
                            <InputLabel shrink>
                                Imagen descriptiva
                            </InputLabel>
                            <Input
                                id="document"
                                name="document"
                                type="file"
                                onChange={(e)=>setImage(e.target.files)}
                                size="small"
                                required
                            />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <Typography component="h2">
                                Medidas Corporales
                            </Typography>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="hombros"
                                name="hombros"
                                type='number'
                                placeholder="medida hombros"
                                value={formData.hombros}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="cadera"
                                name="cadera"
                                type='number'
                                placeholder="medida cadera"
                                value={formData.cadera}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="pantorrilla"
                                name="pantorrilla"
                                type='number'
                                placeholder="medida pantorrillas"
                                value={formData.pantorrilla}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="pecho"
                                name="pecho"
                                type='number'
                                placeholder="medida pecho"
                                value={formData.pecho}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="pierna_a"
                                name="pierna_a"
                                type='number'
                                placeholder="medida pierna a"
                                value={formData.pierna_a}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="pierna_m"
                                name="pierna_m"
                                type='number'
                                placeholder="medida pierna m"
                                value={formData.pierna_m}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="pierna_b"
                                name="pierna_b"
                                type='number'
                                placeholder="medida pierna b"
                                value={formData.pierna_b}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="brazo"
                                name="brazo"
                                type='number'
                                placeholder="medida brazo"
                                value={formData.brazo}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="cintura"
                                name="cintura"
                                type='number'
                                placeholder="medida  cintura"
                                value={formData.cintura}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="antebrazo"
                                name="antebrazo"
                                type='number'
                                placeholder="medida antebrazo"
                                value={formData.antebrazo}
                                onChange={handleUserSportsManChange}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                        </FormControl>
                        <FormControl
                            variant="standard"
                            fullWidth
                            style={{ paddingTop: 10 }}>
                            <TextField
                                sx={{ border: 2, borderRadius: 1 }}
                                id="masa_corporal"
                                name="masa_corporal"
                                type='number'
                                placeholder="medida masa corporal"
                                value={formData.masa_corporal}
                                onChange={handleUserSportsManChange}
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