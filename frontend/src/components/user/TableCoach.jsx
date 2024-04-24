import React from 'react'
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import { useSelector } from 'react-redux';

const TableCoach = ({handleOpenDialog, handleDelete }) => {

    const getUsers = useSelector((state) => state.user.users);

  return (
    <div>
    <Button variant="contained" color="primary" onClick={handleOpenDialog}>
        Agregar Entrenador
    </Button>
    <TableContainer component={Paper}>
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell align="center" >Identificacion</TableCell>
                    <TableCell align="center" >Nombre</TableCell>
                    <TableCell align="center" >Apellido</TableCell>
                    <TableCell align="center" >Acciones</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {getUsers.map((user) => (
                    <TableRow key={user.userId}>
                        <TableCell>{user.identification}</TableCell>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.lastname}</TableCell>
                        <TableCell>
                            <Button variant="contained" color="primary" >
                                editar
                            </Button>
                            <Button variant="contained" color="primary" onClick={() => handleDelete(user.userId)}>
                                eliminar
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

export default TableCoach