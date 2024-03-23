import { Box, Button, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import Header from './Header'
import clienteAxios from '../config/Axios';
import InfoRoutine from './user/InfoRoutine';

const Home = () => {

    const [identificacion, setIdentification] = useState("");
    const [routines, setRoutines] = useState([])

    const handleSubmit = async (e)=>{
        e.preventDefault();
        try {
            const response = await clienteAxios.get(
                `/admin/search/${identificacion}`
            );
            setRoutines(response.data.content)
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    }
    return (
        <>
            <Header />
            <Box sx={{
                width: "100%",
                mt: 6,
                textAlign: "center",
            }}>
                <img src={Logo} alt="Logo" style={{ width: '400px' }} />
                <Box sx={{
                    width: "100%",
                    mt: 6,
                    textAlign: "center",
                }}>
                    <Typography variant="h4" gutterBottom >
                        Consultar rutina
                    </Typography>
                </Box>
                <form onSubmit={handleSubmit}>
                <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="name"
                                name="name"
                                type='text'
                                placeholder="Escribe aquí tu nombre"
                                value={identificacion}
                                onChange={(e)=> setIdentification(e.target.value)}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                  <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Consultar</Button>
                </form>
                
            </Box>
            {routines.length ? <InfoRoutine routines={routines}/> : null}
        </>

    )
}

export default Home