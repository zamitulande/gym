import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import Logo from '../assets/logo.png'
import Header from './Header'

const Home = () => {
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
                <TextField label="Ingresa tu identificacion" variant="outlined" style={{ marginBottom: '20px' }} />
            </Box>
        </>

    )
}

export default Home