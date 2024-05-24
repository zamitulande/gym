import { AppBar, Box, Container, Grid, Toolbar, Typography } from '@mui/material'
import React from 'react'
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { Link } from 'react-router-dom'
import Logo from '../assets/logo.png'

const Header = () => {

    const theme = useTheme();
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
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
                            <Link to="login" underline="hover"> Acceder</Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            <Box width='100%' justifyContent='right'>
                    <img src={Logo} alt="Logo"
                        width={isDesktop ? "100%" : "100%"}
                        style={{ borderRadius: "1rem" }} />               
            </Box>
            <Box sx={{
                width: "100%",
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