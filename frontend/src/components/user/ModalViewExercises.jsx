import { Box, Button, Card, CardContent, CardMedia, Divider, Grid, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal, setUrls } from '../../redux/features/exerciseSlice'
import { useState } from 'react'
import clienteAxios from '../../config/Axios';

const ModalViewExercises = () => {

    const dispatch = useDispatch();
    const getOpenModal = useSelector((state) => state.exercise.openModal)
    const getRoutine = useSelector((state) => state.routine.routine)
    const imageUrls = useSelector((state) => state.exercise.urls)

    const handleCloseModal = () => {
        dispatch(setOpenModal(!getOpenModal))
    }


    useEffect(() => {
        const loadImage = async (url) => {
            try {
                const response = await clienteAxios.get(`admin/image/${url}`, {
                    responseType: 'arraybuffer'
                });
                if (response.data instanceof ArrayBuffer) {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Tipo de datos no compatible:', typeof response.data);
                    return null;
                }
            } catch (error) {
                console.log('error al cargar imagen ' + error);
                return null;
            }
        };

        const loadImageUrls = async () => {
            const imageUrls = {};
            for (const exercise of getRoutine.exercises) {
                const imageUrl = await loadImage(exercise.documentUrl);
                imageUrls[exercise.exerciseId] = imageUrl;
            }
            dispatch(setUrls(imageUrls));
        };

        if (getOpenModal && getRoutine.exercises.length > 0) {
            loadImageUrls();
        }

    }, [getOpenModal, getRoutine])
    return (
        <Modal
            open={getOpenModal}
            style={{ margin: '5%', zIndex: 999999 }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box>
                <Paper style={{ maxHeight: 600, overflowY: 'auto', padding: '16px' }}>
                    <Typography variant="h6">
                        {`Esta rutina tiene  ${getRoutine.exercises.length} ejercicios asignados`}
                    </Typography>
                    <Grid container spacing={2} mt={2}>
                        {getRoutine.exercises.map((exercise) => (
                            <Grid item xs={12} sm={6} md={4} lg={3} key={exercise.exerciseId}>
                                <Divider>Descripción grafica</Divider>
                                <Card sx={{ maxWidth: 365 }}>
                                    {imageUrls[exercise.exerciseId] && (
                                        <CardMedia
                                            component="img"
                                            image={imageUrls[exercise.exerciseId]}
                                            alt={exercise.name}
                                        />
                                    )}
                                    <Divider>Información</Divider>
                                    <CardContent sx={ {bgcolor: 'primary.main' }}>
                                        <Typography variant="h6" className="name">
                                            Ejercicio: {exercise.name}
                                        </Typography>
                                        {exercise.items.map((item) => (
                                            <Box key={item.itemId} sx={{ mt: 2}} >
                                                <Typography variant="body1">
                                                    <span className="table-header">Repetir: </span>{item.repeticiones}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <span className="table-header">Levantar Peso: </span>{item.levantarPeso}
                                                </Typography>
                                                <Typography variant="body1">
                                                    <span className="table-header">Observaciones: </span>{item.observation}
                                                </Typography>
                                            </Box>
                                        ))}
                                    </CardContent>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Paper>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={handleCloseModal}>
                        Cerrar
                    </Button>
                </Box>
            </Box>
        </Modal>
    )
}

export default ModalViewExercises