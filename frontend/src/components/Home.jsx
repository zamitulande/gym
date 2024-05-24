import { Box, Button, Container, Grid, TextField, useMediaQuery   } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useTheme } from '@mui/material/styles';

import Header from './Header'
import clienteAxios from '../config/Axios';
import InfoRoutine from './user/InfoRoutine';
import { useSelector } from 'react-redux';

const Home = () => {

    const [identificacion, setIdentification] = useState("");
    const [routines, setRoutines] = useState([])

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const login = useSelector((state)=> state.user.login);
    const pageSize = 7;


    const handleSubmit = async (e) => {
        e?.preventDefault();
        try {
            const response = await clienteAxios.get(
                `/admin/search/${identificacion}?page=${currentPage}&size=${pageSize}`
            );
            console.log(response)
            setRoutines(response.data.content)
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error al enviar los datos:', error);
        }
    }
    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
    };

    useEffect(() => {
        if (identificacion !== '') {
            handleSubmit();
        }
    }, [currentPage]);

    return (
        <Container fixed>
            <Grid container justifyContent="center" mt={5}>
                <Grid container item xs={10} md={8} xl={6}>
                    {!login ? <Header/> : null}
                    <Box sx={{
                        width: "100%",
                        textAlign: "center",
                    }}>
                        <form onSubmit={(e) => handleSubmit(e, currentPage)}>
                           <Grid container alignItems='center' spacing={2}>
                            <Grid item xs={12} sm={8}>
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
                            </Grid>
                            <Grid item xs={12} sm={4} style={isMobile ? { marginTop: 16 } : {}}>
                            <Button variant="contained" type="submit" fullWidth={isMobile}>Consultar</Button>
                            </Grid>                          
                           </Grid>
                        </form>

                    </Box>
                </Grid>

            </Grid>
            <Box>
                {routines.length ?
                    <>
                        <InfoRoutine
                            routines={routines}
                            setRoutines={setRoutines}
                        />
                        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                            <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
                                Anterior
                            </Button>
                            <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
                                Siguiente
                            </Button>
                        </Box>
                    </> : null}
            </Box>

        </Container>

    )
}

export default Home