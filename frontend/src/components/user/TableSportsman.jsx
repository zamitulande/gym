import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setIdAddRoutine } from '../../redux/features/userSlice';
import { useNavigate } from 'react-router-dom';

const TableSportsman = ({handleOpenDialog, handleOpenModal, handleDelete }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate()
    const getUsers = useSelector((state) => state.user.users);

    const handleAddRoutine = (userId) => {
        dispatch(setIdAddRoutine(userId))
        navigate('/register-routine')
    };
    
    return (
        <div>
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
                                    <Button variant="contained" color="primary" onClick={() => handleAddRoutine(user.userId)} >
                                        rutina
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default TableSportsman