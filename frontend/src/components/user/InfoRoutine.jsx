import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalViewExercises from './ModalViewExercises';
import { setOpenModal } from '../../redux/features/exerciseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setRoutine } from '../../redux/features/routineSlice';
import clienteAxios from '../../config/Axios';
import Swal from 'sweetalert2';

const InfoRoutine = ({ routines, setRoutines }) => {

    const dispatch = useDispatch();
    const getOpenModal = useSelector((state) => state.exercise.openModal)
    const login = useSelector((state) => state.user.login);
    const getToken = useSelector((state) => state.user.token);

    const handleOpenModal = (routine) => {
        dispatch(setOpenModal(!getOpenModal))
        dispatch(setRoutine(routine))
    }

    const handleDelete = async (id) => {
        try {
            const config = {
                headers: {
                    'Authorization': `Bearer${getToken}`
                }
            }
            const res = await clienteAxios.delete(`/admin/delete-routine/${id}`, config)
            if (res.status === 200) {
                const routinesFilter = routines.filter(routine => routine.dayId !== id);
                Swal.fire({
                    title: "Estas seguro?",
                    text: "Esta accion no se puede revertir!",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Si, Eliminar",
                    cancelButtonText: "Cancelar"
                }).then((result) => {
                    if (result.isConfirmed) {
                        Swal.fire({
                            title: "Borrado!",
                            text: "El usuario ha sido borrado",
                            icon: "success"
                        });
                        setRoutines(routinesFilter)
                    }
                });
            }
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div>
            {getOpenModal ? <ModalViewExercises /> : null}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" >Fecha</TableCell>
                            <TableCell align="center" >Rutina</TableCell>
                            <TableCell align="center" >Accion</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {routines.map((days) => {
                            return days.routines.map((routine, index) => {
                                return (
                                    <TableRow key={routine.routineId}>
                                        <TableCell align="center">{index === 0 && days.fecha}</TableCell>
                                        <TableCell align="center">{routine.name}</TableCell>
                                        <TableCell align="center">
                                            <Button variant="contained" color="primary" onClick={() => handleOpenModal(routine)}>
                                                ver
                                            </Button>
                                            {login ?
                                                <Button variant="contained" color="primary" onClick={() => handleDelete(routine.routineId)}>
                                                    eliminar
                                                </Button> : null}
                                        </TableCell>
                                    </TableRow>
                                )
                            });
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InfoRoutine