import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'

const InfoRoutine = ({ routines }) => {

    let lastDate = '';
    let lastRoutine = '';

    return (
        <div>
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>Fecha</TableCell>
                        <TableCell>Rutina</TableCell>
                        <TableCell>Ejercicio</TableCell>
                        <TableCell>Observaciones</TableCell>
                        <TableCell>Repeticiones</TableCell>
                        <TableCell>Peso a levantar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {routines.map((days) => {
                        return days.dayWeek.map((day) => {
                            return day.routines.map((routine) => {
                                let isFirstRoutine = true;
                                return routine.exercises.map((exercise) => {
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
                                            <TableRow key={exercise.exerciseId}>
                                                {/* Render fecha only if it's the first exercise of the routine */}
                                                <TableCell>{showDate && currentDate}</TableCell>
                                                {/* Render routine name only if it's the first exercise of the routine */}
                                                <TableCell>{showRoutine && currentRoutine}</TableCell>
                                                <TableCell>{exercise.name}</TableCell>
                                                <TableCell>{exercise.observations}</TableCell>
                                                <TableCell>{exercise.repeticiones}</TableCell>
                                                <TableCell>{exercise.levantar_peso}</TableCell>
                                            </TableRow>
                                        );
                                    });
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