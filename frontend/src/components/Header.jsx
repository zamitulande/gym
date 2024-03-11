import { AppBar, Box, Container, Toolbar } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
    return (
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
    )
}

export default Header