import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal } from '../../redux/features/exerciseSlice'

const ModalViewExercises = () => {

    const dispatch = useDispatch();
    const getOpenModal = useSelector((state) => state.exercise.openModal)
    const getRoutine = useSelector((state) => state.routine.routine)

    const handleCloseModal = () => {
        dispatch(setOpenModal(!getOpenModal))
    }
    console.log(getRoutine)
    return (
        <Modal
            open={getOpenModal}
            style={{ margin: '5%', zIndex: 999999 }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >

            <Box>
            <TableContainer component={Paper} style={{ maxHeight: 750, overflowY: 'auto' }}>
            <Table sx={{ minWidth: 300 }} aria-label="customized table">
                        <TableBody>
                            {getRoutine.exercises.map((exercise)=>{
                                return (
                                   <React.Fragment  key={exercise.exerciseId}>
                                    <TableRow>
                                        <TableCell align="center" className='name'>
                                            <span className="table-header name">Nombre =</span>
                                            <span className='name'>{exercise.name}</span>
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <span className="table-header">Repetir =</span>
                                            {exercise.repeticiones}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <span className="table-header">Levantar Peso = </span>
                                            {exercise.levantar_peso}
                                        </TableCell>
                                    </TableRow>
                                    <TableRow>
                                        <TableCell>
                                            <span className="table-header">Observaciones =</span>
                                            {exercise.observations}
                                        </TableCell>
                                    </TableRow>
                                   </React.Fragment>
                                )
                            })}
                        </TableBody>
                    </Table>
            </TableContainer>
                <Button variant="contained" color="primary" onClick={() => handleCloseModal()}>cerrar</Button>
            </Box>
        </Modal>
    )
}

export default ModalViewExercises