import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';
import React from 'react'

const TableRoutine = () => {

    const handleOpenDialog = () => {
        navigate("/register-routine")
    };

    return (
        <>
            <Button variant="contained" color="primary" onClick={handleOpenDialog}>
                Agregar Deportista
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
                        {getUsers.map((user) => (
                            <TableRow key={user.userId}>
                                <TableCell align="center">{user.identification}</TableCell>
                                <TableCell align="center">{user.name}</TableCell>
                                <TableCell align="center">{user.lastname}</TableCell>
                                <TableCell align="center">{user.level}</TableCell>
                                <TableCell>
                                    <Button variant="contained" color="primary" onClick={() => handleOpenModal(user)}>
                                        ver
                                    </Button>
                                    <Button variant="contained" color="primary" >
                                        editar
                                    </Button>
                                    <Button variant="contained" color="primary" onClick={() => handleDelete(user.userId)}>
                                        eliminar
                                    </Button>
                                    <Button variant="contained" color="primary" >
                                        rutina
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}

export default TableRoutine