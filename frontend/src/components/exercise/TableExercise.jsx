import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const TableExercise = () => {

    const navigate = useNavigate()

    const getRoutine = useSelector((state) => state.routine.routine)
    const imageUrls = useSelector((state) => state.exercise.urls)

    const handleOpenDialog = () => {
        navigate("/register-exercise")
    };
    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Agregar Ejercicio
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>name</TableCell>
                            <TableCell>imagen</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {getRoutine.exercises.map((exercise) => {
                            return (
                                <TableRow key={exercise.exerciseId}>
                                    <TableCell align="center">{exercise.name}</TableCell>
                                    <TableCell align="center"> {imageUrls[exercise.exerciseId] && (
                                        <img src={imageUrls[exercise.exerciseId]} alt="Exercise" />
                                    )}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableExercise