import { Box, Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import ModalViewExercises from './ModalViewExercises';
import { setOpenModal } from '../../redux/features/exerciseSlice';
import { useDispatch, useSelector } from 'react-redux';
import { setRoutine } from '../../redux/features/routineSlice';

const InfoRoutine = ({ routines }) => {

    const dispatch = useDispatch();

    const getOpenModal = useSelector((state) => state.exercise.openModal)

    let lastDate = '';
    let lastRoutine = '';

    const handleOpenModal = (routine) => {
        dispatch(setOpenModal(!getOpenModal))
        dispatch(setRoutine(routine))
    }

    return (
        <div>
            {getOpenModal ? <ModalViewExercises /> : null}
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Fecha</TableCell>
                            <TableCell>Rutina</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {routines.map((days) => {
                            return days.dayWeek.map((day) => {
                                return day.routines.map((routine) => {
                                    let isFirstRoutine = true;
                                    let currentDate = isFirstRoutine ? day.fecha : '';
                                    let currentRoutine = isFirstRoutine ? routine.name : '';
                                    isFirstRoutine = false;
                                    // Check if current date and routine are the same as last one
                                    let showDate = currentDate !== lastDate;
                                    let showRoutine = currentRoutine !== lastRoutine;
                                    // Update last date and routine
                                    lastDate = currentDate;
                                    lastRoutine = currentRoutine;
                                    return (
                                        <TableRow key={routine.routineId}>
                                            <TableCell>{showDate && currentDate}</TableCell>
                                            <TableCell>{showRoutine && currentRoutine}</TableCell>
                                            <TableCell>
                                                <Button variant="contained" color="primary" onClick={() => handleOpenModal(routine)}>
                                                    ver
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    )
                                });
                            });
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default InfoRoutine