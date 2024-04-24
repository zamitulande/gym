import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import clienteAxios from '../../config/Axios';

const TableExercise = () => {

    const navigate = useNavigate()

    const getToken = useSelector((state) => state.user.token);

    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);

    const [exercises, setExercises] = useState([])
    const [urlImage, setUrlImage] = useState([])

    useEffect(()=>{
        const fetchDataExercises = async () => {
            try {
                const config = {
                    headers: {
                        'Authorization': `Bearer${getToken}`
                    }
                }
                const res = await clienteAxios.get(`admin/dashboard/exercise?page=${currentPage}&size=7`, config);
                setExercises(res.data.content)
                setTotalPages(res.data.totalPages);
            
            } catch (error) {
                console.log('error al cargar lista inicial ' + error)
            }
        }
        fetchDataExercises();

    }, [currentPage])

    useEffect(() => {
        const loadImage = async (url) => {
            try {
                const response = await clienteAxios.get(`admin/image/${url}`, {
                    responseType: 'arraybuffer'
                });
                if (response.data instanceof ArrayBuffer) {
                    const blob = new Blob([response.data], { type: response.headers['content-type'] });
                    const imageUrl = URL.createObjectURL(blob);
                    return imageUrl;
                } else {
                    console.error('Tipo de datos no compatible:', typeof response.data);
                    return null;
                }
            } catch (error) {
                console.log('error al cargar imagen ' + error);
                return null;
            }
        };

        const loadImageUrls = async () => {
            const imageUrls = {};
            for (const exercise of exercises) {
                const imageUrl = await loadImage(exercise.documentUrl);
                imageUrls[exercise.exerciseId] = imageUrl;
            }
            setUrlImage(imageUrls);
        };
        if (exercises.length > 0) {
            loadImageUrls();
        }
    }, [exercises])
    
    const handleOpenDialog = () => {
        navigate("/register-exercise")
    };

    const handleNextPage = () => {
        if (currentPage < totalPages - 1) {
            setCurrentPage(prevPage => prevPage + 1);
        }
    };
    
    const handlePreviousPage = () => {
        if (currentPage > 0) {
            setCurrentPage(prevPage => prevPage - 1);
        }
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
                        {exercises.map((exercise) => {
                            return (
                                <TableRow key={exercise.exerciseId}>
                                    <TableCell align="center">{exercise.name}</TableCell>
                                    <TableCell align="center"> {urlImage[exercise.exerciseId] && (
                                        <img src={urlImage[exercise.exerciseId]} alt="Exercise" />
                                    )}</TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2 }}>
                <Button variant="contained" disabled={currentPage === 0} onClick={handlePreviousPage}>
                    Anterior
                </Button>
                <Button variant="contained" disabled={currentPage === totalPages - 1} onClick={handleNextPage}>
                    Siguiente
                </Button>
            </Box>
        </>
    )
}

export default TableExercise