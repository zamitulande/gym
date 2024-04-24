import { Box, Button, Container, Grid, TextField, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

import Header from './Header'
import clienteAxios from '../config/Axios';
import InfoRoutine from './user/InfoRoutine';
import { useSelector } from 'react-redux';

const Home = () => {

    const [identificacion, setIdentification] = useState("");
    const [routines, setRoutines] = useState([])

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
        <>
            <Grid container justifyContent="center">
                <Grid container item xs={10} md={8} xl={6}>
                    {!login ? <Header/> : null}
                    <Box sx={{
                        width: "100%",
                        textAlign: "center",
                    }}>
                        <form onSubmit={(e) => handleSubmit(e, currentPage)}>
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

        </>

    )
}

export default Home