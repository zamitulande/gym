import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal } from '../../redux/features/userSlice';

const ModalInfo = () => {

    const dispatch = useDispatch();
    const getOpenModal = useSelector((state) => state.user.openModal)
    const getTypeUser = useSelector((state) => state.user.typeUser)
    const user = useSelector((state) => state.user.userInfo);

    const handleCloseModal = () => {
        dispatch(setOpenModal(!getOpenModal))
    }
    return (
        <Modal
            open={getOpenModal}
            style={{ margin: '25%', zIndex: 999999 }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
            {getTypeUser === 'sportsman' && (
                    <div>
                        <span>{user.name}</span>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>                                    
                                        <TableCell>Edad</TableCell>
                                        <TableCell>Peso</TableCell>
                                        <TableCell>Talla</TableCell>
                                        <TableCell>Fecha inicio</TableCell>
                                        <TableCell>fecha fin</TableCell>
                                        <TableCell>Historia medica</TableCell>
                                        <TableCell>profesion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>                                    
                                        <TableRow key={user.userId}>
                                            <TableCell align="center">{user.age}</TableCell>
                                            <TableCell align="center">{user.weight}</TableCell>
                                            <TableCell align="center">{user.size}</TableCell>
                                            <TableCell align="center">{user.start}</TableCell>
                                            <TableCell align="center">{user.end}</TableCell>
                                            <TableCell align="center">{user.medical_history}</TableCell>
                                            <TableCell align="center">{user.profession}</TableCell>
                                        </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                <Button variant="contained" color="primary"onClick={() => handleCloseModal()}>cerrar</Button>
            </Box>
        </Modal>
    )
}

export default ModalInfo