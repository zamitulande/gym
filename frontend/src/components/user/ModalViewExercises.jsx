import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
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
                <TableContainer component={Paper} style={{ maxHeight: 750, overflowY: 'auto' }}>
                    <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableBody>
                            {getRoutine.exercises.map((exercise) => {
                                return (
                                    <React.Fragment key={exercise.exerciseId}>
                                        <TableRow>
                                            <TableCell align="center" className='name'>
                                                <span className="table-header name">Nombre =</span>
                                                <span className='name'>{exercise.name}</span>
                                                {imageUrls[exercise.exerciseId] && (
                                                <img src={imageUrls[exercise.exerciseId]} alt="Exercise" />
                                            )}
                                            </TableCell>
                                        </TableRow>
                                        {exercise.items.map((item) => {
                                            return (
                                                <React.Fragment key={item.itemId}>
                                                    <TableRow>
                                                        <TableCell>
                                                            <span className="table-header">Repetir =</span>
                                                            {item.repeticiones}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <span className="table-header">Levantar Peso = </span>
                                                            {item.levantarPeso}
                                                        </TableCell>
                                                    </TableRow>
                                                    <TableRow>
                                                        <TableCell>
                                                            <span className="table-header">Observaciones =</span>
                                                            {item.observation}
                                                        </TableCell>
                                                    </TableRow>
                                                </React.Fragment>
                                            )
                                        })}
                                    </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Button variant="contained" color="primary" onClick={() => handleCloseModal()}>cerrar</Button>
            </Box>
        </Modal>
    )
}

export default ModalViewExercises