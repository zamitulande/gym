import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterRoutine = () => {

    const navigate = useNavigate()

    const [routine, setRoutine] = useState({
        name: "",
        date: "",
        observation: ""
    })

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

    const handleSubmit = () => {
        console.log("Rutina:", routine);
        console.log("Ejercicios seleccionados:", selectedExercises);
    }

    const exercises = [
        "Ejercicio 1",
        "Ejercicio 2",
        "Ejercicio 3",
        // Agrega más ejercicios según necesites
    ];
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
                        placeholder="Escribe nombre de la rutina"
                        value={routine.name}
                        onChange={handleOnChange}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>


                 {/* Checkboxes para los ejercicios */}
                 <FormControl component="fieldset" style={{ marginTop: 10 }}>
                    <Box>
                        {exercises.map((exercise, index) => (
                            <FormControlLabel key={index} control={<Checkbox value={exercise} onChange={handleCheckboxChange} />} label={exercise} />
                        ))}
                    </Box>
                </FormControl>

                {/* Lista de ejercicios seleccionados */}
                <Typography variant="subtitle1" style={{ marginTop: 10 }}>
                    Ejercicios Seleccionados para esta rutina:
                </Typography>
                <ul>
                    {selectedExercises.map((exercise, index) => (
                        <li key={index}>{exercise}</li>
                    ))}
                </ul>


                <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Enviar</Button>
            </form>
        </Box>
    )
}

export default RegisterRoutine