import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/Axios';
import { useSelector } from 'react-redux';

const RegisterRoutine = () => {

    const navigate = useNavigate()

    const [dataExercise, setDataExercise] = useState([])
    const [exercises, setExercises] = useState([])
    const [observations, setObservations] = useState([])    
    const [repeticiones, setRepeticiones] = useState([])
    const [levantar_peso, setLevantarPeso] = useState([])
    const [fecha, setFecha] = useState("")
    const [name, setName] = useState("")


    const getToken = useSelector((state) => state.user.token);
    const userId = useSelector((state) => state.user.idAddRoutine)

    const handleCheckboxChange = (e) => {
        const { value, checked } = e.target;
        if (checked) {
            setExercises(prevSelected => [...prevSelected, value]);
        } else {
            setExercises(prevSelected => prevSelected.filter(item => item !== value));
        }
    };

    const handleObservationsChange = (index, value) => {
        const newObservations = [...observations];
        newObservations[index] = value;
        setObservations(newObservations);
    };

    const handleRepetitionsChange = (index, value) => {
        const newRepetitions = [...repeticiones];
        newRepetitions[index] = value;
        setRepeticiones(newRepetitions);
    };

    const handleLevantarPesoChange = (index, value) => {
        const newLevantarPeso = [...levantar_peso];
        newLevantarPeso[index] = value;
        setLevantarPeso(newLevantarPeso);
    };

    const handleBack = () => {
        navigate("/dashboard");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`
                    }
                }
                    const res = await clienteAxios.get('admin/dashboard/all-exercise', config);
                    setDataExercise(res.data)
            } catch (error) {
                console.log('error al cargar lista inicial ' + error)
            }
        }
        fetchData();
    }, [dataExercise])
    
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`
                }
            }
            const newRoutine={
                userId,
                fecha,
                name,
                exercises,
                observations,
                repeticiones,
                levantar_peso
            }
            const response = await clienteAxios.post(
                `/admin/usuarios/${userId}/rutina`, newRoutine, config
            );
            setExercises([]);
            setObservations([]);
            setRepeticiones([]);
            setLevantarPeso([]);
            setFecha("");
            setName("");
            handleBack();
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    };
    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    return (
       <>
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
                        fecha
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="fecha"
                        name="fecha"
                        type='date'
                        placeholder="Escribe nombre de la rutina"
                        value={fecha}
                        onChange={(e)=>setFecha(e.target.value)}
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
                        onChange={(e)=>setName(capitalizeFirstLetter(e.target.value))}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>
                {/* Checkboxes para los ejercicios */}
                <FormControl component="fieldset" style={{ marginTop: 10 }}>
                    <Box>
                        {dataExercise.map((exercise, index) => (
                                 <FormControlLabel key={index} control={<Checkbox value={exercise} onChange={handleCheckboxChange} />} label={exercise} />
                       ))}
                    </Box>
                </FormControl>
                {/* Lista de ejercicios seleccionados */}
                <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                    Ejercicios Seleccionados para esta rutina:
                </Typography>
                <ul>
                    {exercises.map((exercise, index) => (
                        <div  key={index}>
                            <li>{exercise}</li>
                        {exercise && (
                            <>
                                 <TextField
                                value={observations[index]}
                                onChange={(e) => handleObservationsChange(index, e.target.value)}
                                placeholder={`Observaciones`}
                            />
                            <TextField
                                value={repeticiones[index]}
                                onChange={(e) => handleRepetitionsChange(index, e.target.value)}
                                placeholder={`Repeticiones `}
                            />
                            <TextField
                                value={levantar_peso[index]}
                                onChange={(e) => handleLevantarPesoChange(index, e.target.value)}
                                placeholder={`Levantar peso`}
                            />
                            </>
                        )}
                        </div>
                    ))}
                </ul>
                <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Enviar</Button>
            </form>
        </Box>
       </>
    )
}

export default RegisterRoutine