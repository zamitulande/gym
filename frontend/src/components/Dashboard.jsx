import { AppBar, Box, Button, Container, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'

import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { setOpenModal, setTypeUser, setUserInfo, setUsers } from '../redux/features/userSlice';
import Swal from 'sweetalert2';
import ModalInfo from './ModalInfo';

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const getToken = useSelector((state) => state.user.token);
    const getUsers = useSelector((state) => state.user.users);
    const getTypeUser = useSelector((state) => state.user.typeUser)
    const getOpenModal = useSelector((state) => state.user.openModal)

    const handleOpenDialog = () => {
        navigate("/register")
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (id) => {
        console.log(id)
        Swal.fire({
            title: "Estas seguro?",
            text: "Esta accion no se puede revertir!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, Eliminar",
            cancelButtonText: "Cancelar"
        }).then(async (result) => {
            try {
                if (result.isConfirmed) {
                    const config = {
                        headers: {
                            'Authorization': `Bearer ${getToken}`
                        }
                    }
                    const res = await clienteAxios.delete(`admin/delete/${id}`, config);
                    console.log(res.data.status)
                    if (res.data.status === 200) {
                        const usersFilter = getUsers.filter(user => user.userId !== id);
                        Swal.fire({
                            title: "¡Borrado!",
                            text: "El usuario ha sido borrado",
                            icon: "success"
                        });
                        dispatch(setUsers(usersFilter));
                    }
                } else {
                    console.log('Failed to delete user');
                }
            } catch (error) {
                console.log("Error:", error);
            }
        });
    }
    useEffect(() => {
        const fetchData = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`
                    }
                }
                if (getTypeUser === "coach") {
                    const res = await clienteAxios.get('admin/dashboard/coach', config);
                    dispatch(setUsers(res.data.content))
                } else if (getTypeUser === "sportsman") {
                    const res = await clienteAxios.get('admin/dashboard/sportsman', config);
                    dispatch(setUsers(res.data.content))
                }

            } catch (error) {
                console.log('error al cargar lista inicial ' + error)
            }
        }
        fetchData();
    }, [getTypeUser])

    const handleOpenModal = (user) => {
        dispatch(setOpenModal(!getOpenModal))
        dispatch(setUserInfo(user))
    }
    return (

        <Box sx={{ flexGrow: 1 }}>
            {getOpenModal ? <ModalInfo /> : null}
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => dispatch(setTypeUser('coach'))}>Entrenador</Button>
                    <Button color="inherit" onClick={() => dispatch(setTypeUser('sportsman'))}>Deportista</Button>
                    <Button color="inherit" onClick={() => dispatch(setTypeUser('Logout'))}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '20px' }}>
                {getTypeUser === 'coach' && (
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
                )}
                {getTypeUser === 'sportsman' && (
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
                                                <Button variant="contained" color="primary" >
                                                    rutina
                                                </Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
            </div>
        </Box>
    )
}

export default Dashboard