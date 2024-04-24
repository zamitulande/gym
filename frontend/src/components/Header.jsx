import { AppBar, Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Header = () => {
    return (
        <>
            <AppBar position='static'>
                <Container maxWidth="xl">
                    <Toolbar
                        disableGutters
                        sx={{
                            justifyContent: "center",
                        }}>
                        <Box sx={{ display: "flex", maxWidth: { xs: 130 } }}>
                            <Link to="login"> Login</Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
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
        </>
    )
}

export default Header