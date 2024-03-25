import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import Logo from '../assets/logo.png'
import Header from './Header'
import clienteAxios from '../config/Axios';
import InfoRoutine from './user/InfoRoutine';

const Home = () => {

    const [identificacion, setIdentification] = useState("");
    const [routines, setRoutines] = useState([])

    const handleSubmit = async (e) => {
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
            <Grid container justifyContent="center">
                <Grid container item xs={10} md={8} xl={6}>
                    <Header />
                    <Box sx={{
                        width: "100%",
                        mt: 6,
                        textAlign: "center",
                    }}>
                        <Grid item xs={12} md={6}>
                            <img src={Logo} alt="Logo"
                                width="100%"
                                style={{ borderRadius: "1rem" }} />
                        </Grid>

                        <Box sx={{
                            width: "100%",
                            mt: 4,
                            textAlign: "center",
                        }}>
                            <Typography variant="h5" gutterBottom >
                                Consultar rutina
                            </Typography>
                        </Box>
                        <form onSubmit={handleSubmit}>
                            <TextField sx={{ border: 2, borderRadius: 1 }}
                                id="name"
                                name="name"
                                type='text'
                                placeholder="Ingrese su identificacion"
                                value={identificacion}
                                onChange={(e) => setIdentification(e.target.value)}
                                fullWidth
                                margin="normal"
                                size="small"
                                required />
                            <Button variant="contained" type="submit" style={{ marginTop: 10 }}>Consultar</Button>
                        </form>

                    </Box>
                </Grid>

            </Grid>
            <Box>
                {routines.length ? <InfoRoutine routines={routines} /> : null}
            </Box>
        </>

    )
}

export default Home