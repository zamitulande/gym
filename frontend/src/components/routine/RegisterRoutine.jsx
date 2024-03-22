import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/Axios';
import { useSelector } from 'react-redux';

const RegisterRoutine = () => {

    const [userId, setUserId] = useState();
    const [fecha, setFecha] = useState('');
    const [name, setNombreRutina] = useState('');
    const [exercises, setEjercicios] = useState(["ejercicio 1"]);
    const [observaciones, setObservaciones] = useState(['ninguna']);
    const [repeticiones, setRepeticiones] = useState(['99']);
    const [levantarPeso, setLevantarPeso] = useState(['21']);

    const navigate = useNavigate()

    const [routine, setRoutine] = useState({
        name: "",
        date: "",
        observation: ""
    })
    const getToken = useSelector((state) => state.user.token);
    const getExercises = useSelector((state) => state.exercise.exercises)

    const [selectedExercises, setSelectedExercises] = useState([]);

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setSelectedExercises(prevSelected => [...prevSelected, value]);
        } else {
            setSelectedExercises(prevSelected => prevSelected.filter(item => item !== value));
        }
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setRoutine(prevUser => ({
            ...prevUser,
            [name]: value
        }));

    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`
                }
            }
            const response = await clienteAxios.post(
                `/admin/usuarios/${userId}/rutina`,
                {
                    userId,
                    fecha,
                    name,
                    exercises,
                    observations: observaciones,
                    repeticiones: repeticiones,
                    levantar_peso: levantarPeso
                }, config
            );

            console.log(response.data); // Maneja la respuesta del backend aquí
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };


    
    return (

       <>
        <form onSubmit={handleSubmit}>


            <button type="submit">Enviar</button>
        </form>
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
                        id de usuario
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="userId"
                        name="userId"
                        type='text'
                        placeholder="Escribe nombre de la rutina"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
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
                        fecha
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="fecha"
                        name="fecha"
                        type='date'
                        placeholder="Escribe nombre de la rutina"
                        value={fecha}
                        onChange={(e) => setFecha(e.target.value)}
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
                        nombre rutina
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="name"
                        name="name"
                        type='text'
                        placeholder="Escribe nombre de la rutina"
                        value={name}
                        onChange={(e) => setNombreRutina(e.target.value)}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>


                {/* Checkboxes para los ejercicios */}
                <FormControl component="fieldset" style={{ marginTop: 10 }}>
                    <Box>
                        {getExercises.map((exercise, index) => (
                            <>
                                 <FormControlLabel key={exercise.exerciseId} control={<Checkbox value={exercise.name} onChange={handleCheckboxChange} />} label={exercise.name} />
                               
                            </>
                           
                       
                        
                       ))}
                    </Box>
                </FormControl>

                {/* Lista de ejercicios seleccionados */}
                <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                    Ejercicios Seleccionados para esta rutina:
                </Typography>
                <ul>
                    {selectedExercises.map((exercise, index) => (
                        <>
                            <li key={index}>{exercise}</li>
                        {exercise && (
                            <>
                                 <TextField
                                value={observaciones[index]}
                                onChange={(e) => handleObservationsChange(index, e.target.value)}
                                placeholder={`Observaciones ${index + 1}`}
                            />
                            <TextField
                                value={repeticiones[index]}
                                onChange={(e) => handleRepetitionsChange(index, e.target.value)}
                                placeholder={`Repeticiones ${index + 1}`}
                            />
                            <TextField
                                value={levantarPeso[index]}
                                onChange={(e) => handleLiftingWeightsChange(index, e.target.value)}
                                placeholder={`Levantar peso ${index + 1}`}
                            />
                            </>
                        )}
                        </>
                    ))}
                </ul>

                <button onClick={() => setEjercicios([...ejercicios, ''])}>Agregar Ejercicio</button>

                <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Enviar</Button>
            </form>
        </Box>
       </>
    )
}

export default RegisterRoutine