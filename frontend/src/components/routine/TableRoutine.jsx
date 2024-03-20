import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';

const TableRoutine = () => {

    const navigate = useNavigate()

    const handleOpenDialog = () => {
        navigate("/register-routine")
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Agregar Rutina
            </Button>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Identificacion</TableCell>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Apellido</TableCell>
                            <TableCell>Nivel</TableCell>
                            <TableCell>Acciones</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                       
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableRoutine