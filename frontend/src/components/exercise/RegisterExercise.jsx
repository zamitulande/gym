import { Box, Button, Checkbox, FormControl, FormControlLabel, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const RegisterExercise = () => {

    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/dashboard");
    };


    const [exercise, setExercise] = useState({
        name:""
    })

    const handleSubmit = () => {
        console.log("Rutina:", routine);
        console.log("Ejercicios seleccionados:", selectedExercises);
    }

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        setRoutine(prevUser => ({
            ...prevUser,
            [name]: value
        }));

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
                placeholder="Escribe nombre del ejercicio"
                value={exercise.name}
                onChange={handleOnChange}
                fullWidth
                margin="normal"
                size="small"
                required />
        </FormControl>


        <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Enviar</Button>
    </form>
</Box>
  )
}

export default RegisterExercise