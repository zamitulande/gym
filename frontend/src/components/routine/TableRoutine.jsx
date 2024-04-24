import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow  } from '@mui/material';
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Home from '../Home';

const TableRoutine = () => {

    const navigate = useNavigate()

    const handleOpenDialog = () => {
        navigate("/register-routine")
    };

    return (
       <Home/>
    )
}

export default TableRoutine