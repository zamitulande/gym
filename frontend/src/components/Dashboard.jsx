import { AppBar, Box, Button, ButtonGroup, Container, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useEffect, useState, } from 'react'
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../config/Axios';
import { useDispatch, useSelector } from 'react-redux';
import { setLogin, setOpenModal, setTypeUser, setUserInfo, setUsers } from '../redux/features/userSlice';
import Swal from 'sweetalert2';
import ModalInfo from './user/ModalInfo'
import TableSportsman from './user/TableSportsman';
import TableCoach from './user/TableCoach';
import RegisterRoutine from './routine/RegisterRoutine';
import TableRoutine from './routine/TableRoutine';
import TableExercise from './exercise/TableExercise';
import { setExercises } from '../redux/features/exerciseSlice';

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState('');
    const [currentPage, setCurrentPage] = useState(0);

    const [open, setOpen] = useState(false);
    const [anchorElNav, setAnchorElNav] = useState(null)
    const [anchorElUser, setAnchorElUser] = useState(null)
    const [value, setValue] = useState(0)

    const navigate = useNavigate()
    const dispatch = useDispatch();
    const getToken = useSelector((state) => state.user.token);
    const getUsers = useSelector((state) => state.user.users);
    const getTypeUser = useSelector((state) => state.user.typeUser)
    const getOpenModal = useSelector((state) => state.user.openModal)

    const handleOpenDialog = () => {
        navigate("/register")
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
                } else if (getTypeUser === "exercise") {
                    const res = await clienteAxios.get('admin/dashboard/all-exercise', config);
                    dispatch(setExercises(res.data))
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

    const handleLogout = () => {
        dispatch(dispatch(setLogin(false)))
        navigate("/")
    }

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    return (
        <Container>

            <Box sx={{ flexGrow: 1 }}>
                {getOpenModal ? <ModalInfo /> : null}
                <AppBar position="static">
                    <Toolbar>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                <ButtonGroup orientation="vertical" variant="contained" aria-label="Vertical button group">
                                    <Button color="inherit" onClick={() => { dispatch(setTypeUser('coach')); handleCloseNavMenu() }}>Entrenador</Button>
                                    <Button color="inherit" onClick={() => { dispatch(setTypeUser('sportsman')); handleCloseNavMenu() }}>Deportista</Button>
                                    <Button color="inherit" onClick={() => { dispatch(setTypeUser('routine')); handleCloseNavMenu() }}>Rutinas</Button>
                                    <Button color="inherit" onClick={() => { dispatch(setTypeUser('exercise')); handleCloseNavMenu() }}>Ejercicios</Button>
                                    <Box style={{ marginLeft: 'auto' }}>
                                        <Button color="inherit" onClick={handleLogout}>Salir</Button>
                                    </Box>
                                </ButtonGroup>
                            </Menu>

                        </Box>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'block' } }}>
                            <Button color="inherit" onClick={() => { dispatch(setTypeUser('coach')); handleCloseNavMenu() }}>Entrenador</Button>
                            <Button color="inherit" onClick={() => { dispatch(setTypeUser('sportsman')); handleCloseNavMenu() }}>Deportista</Button>
                            <Button color="inherit" onClick={() => { dispatch(setTypeUser('routine')); handleCloseNavMenu() }}>Rutinas</Button>
                            <Button color="inherit" onClick={() => { dispatch(setTypeUser('exercise')); handleCloseNavMenu() }}>Ejercicios</Button>
                            <Button color="error" onClick={handleLogout}>Salir</Button>
                        </Box>
                    </Toolbar>
                </AppBar>
                <div style={{ padding: '20px' }}>
                    {getTypeUser === 'coach' && (
                        <TableCoach
                            handleOpenDialog={handleOpenDialog}
                            handleDelete={handleDelete}
                        />
                    )}
                    {getTypeUser === 'sportsman' && (
                        <TableSportsman
                            handleOpenModal={handleOpenModal}
                            handleOpenDialog={handleOpenDialog}
                            handleDelete={handleDelete}
                        />
                    )}
                    {getTypeUser === 'routine' && (
                        <TableRoutine />
                    )}
                    {getTypeUser === 'exercise' && (
                        <TableExercise />
                    )}
                </div>
            </Box>
        </Container>
    )
}

export default Dashboard