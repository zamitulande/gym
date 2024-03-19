import { AppBar, Box, Button, Container, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'

import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { setUsers } from '../redux/features/userSlice';
import Swal from 'sweetalert2';

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const getToken = useSelector((state) => state.user.token);
    const getUsers = useSelector((state) => state.user.users)

    const handleOpenDialog = () => {
        navigate("/register")
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleDelete = async (id) => {
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
                const res = await clienteAxios.get('admin/dashboard', config);
                dispatch(setUsers(res.data.content))
            } catch (error) {
                console.log('error al cargar lista inicial ' + error)
            }
        }
        fetchData();
    }, [])
    return (

        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Button color="inherit" onClick={() => setSelectedItem('Entrenador')}>Entrenador</Button>
                    <Button color="inherit" onClick={() => setSelectedItem('Deportista')}>Deportista</Button>
                    <Button color="inherit" onClick={() => setSelectedItem('Logout')}>Logout</Button>
                </Toolbar>
            </AppBar>
            <div style={{ padding: '20px' }}>
                {selectedItem === 'Entrenador' && (
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
                {selectedItem === 'Deportista' && (
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
                                        <TableCell>Edad</TableCell>
                                        <TableCell>Nivel</TableCell>
                                        <TableCell>Peso</TableCell>
                                        <TableCell>Talla</TableCell>
                                        <TableCell>Fecha inicio</TableCell>
                                        <TableCell>fecha fin</TableCell>
                                        <TableCell>Rutina Nº</TableCell>
                                        <TableCell>Acciones</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>

                                    <TableRow >
                                        <TableCell align="center">123456</TableCell>
                                        <TableCell align="center">Lucas</TableCell>
                                        <TableCell align="center">Ramos</TableCell>
                                        <TableCell align="center">25</TableCell>
                                        <TableCell align="center">Principiante</TableCell>
                                        <TableCell align="center">72.5</TableCell>
                                        <TableCell align="center">26.8</TableCell>
                                        <TableCell align="center">15-ene-2024</TableCell>
                                        <TableCell align="center">20-dic-2024</TableCell>
                                        <TableCell align="center">18</TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" >
                                                editar
                                            </Button>
                                            <Button variant="contained" color="primary" onClick={() => handleDelete(user.id)}>
                                                eliminar
                                            </Button>
                                        </TableCell>
                                        <TableCell>
                                            <Button variant="contained" color="primary" >
                                                asignar rutina
                                            </Button>
                                        </TableCell>
                                    </TableRow>
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