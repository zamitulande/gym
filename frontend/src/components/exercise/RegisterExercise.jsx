import { Box, Button, Checkbox, FormControl, FormControlLabel, Input, InputLabel, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/Axios';

const RegisterExercise = () => {

    const navigate = useNavigate()
    const handleBack = () => {
        navigate("/dashboard");
    };

    const capitalizeFirstLetter = (str) => {
        return str.charAt(0).toUpperCase() + str.slice(1);
    }

    const getToken = useSelector((state) => state.user.token);


    const [image, setImage] = useState({});
    const [name, setName] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', name); 
        if (image.length > 0) {
            for (const file of image) {
              formData.append('document', file); 
            }
          }
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`,
                    'content-Type': 'multipart/form-data'
                }
            }
            const response = await clienteAxios.post("admin/register/exercise",formData, config)
            console.log(response)
            setName("")
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
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
            <form encType="multipart/form-data" onSubmit={handleSubmit}>
                <FormControl
                    variant="standard"
                    fullWidth
                    style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="bootstrap-input">
                        nombre de ejercicio
                    </InputLabel>
                    <TextField sx={{ border: 2, borderRadius: 1 }}
                        id="name"
                        name="name"
                        type='text'
                        placeholder="Escribe nombre del ejercicio"
                        value={name}
                        onChange={(e) => setName(capitalizeFirstLetter(e.target.value))}
                        fullWidth
                        margin="normal"
                        size="small"
                        required />
                </FormControl>

                {/* Campo de carga de archivos */}
                <FormControl variant="standard" fullWidth style={{ paddingTop: 10 }}>
                    <InputLabel shrink htmlFor="image">
                        Imagen descriptiva
                    </InputLabel>
                    <Input
                        id="image"
                        name="image"
                        type="file"
                        onChange={(e) => setImage(e.target.files)}
                        size="small"
                        required
                    />
                </FormControl>


                <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Enviar</Button>
            </form>
        </Box>
    )
}

export default RegisterExercise