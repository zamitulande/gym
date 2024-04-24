import { Box, Button, Modal, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setOpenModal } from '../../redux/features/userSlice';
import clienteAxios from '../../config/Axios';

const ModalInfo = () => {

    const dispatch = useDispatch();
    const getOpenModal = useSelector((state) => state.user.openModal)
    const getTypeUser = useSelector((state) => state.user.typeUser)
    const user = useSelector((state) => state.user.userInfo);

    const [urlImage, setUrlImage] = useState([])

    const handleCloseModal = () => {
        dispatch(setOpenModal(!getOpenModal))
    }
    console.log(user)

    useEffect(() => {

        const loadImage = async (url) => {
            try {
                const response = await clienteAxios.get(`admin/user/image/${url}`, {
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
            const imageUrl = await loadImage(user.documentUrl);
            imageUrls[user.userId] = imageUrl;
            setUrlImage(imageUrls);
        };
        if (user) {
            loadImageUrls();
        }
    }, [user])
    return (
        <Modal
            open={getOpenModal}
            style={{ margin: '10%', zIndex: 999999 }}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box>
                {getTypeUser === 'sportsman' && (
                    <div>
                        <span>{user.name}</span>
                        <img src={urlImage[user.userId]} alt="Exercise" />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Edad</TableCell>
                                        <TableCell>Peso</TableCell>
                                        <TableCell>Talla</TableCell>
                                        <TableCell>Historia medica</TableCell>
                                        <TableCell>profesion</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    <TableRow key={user.userId}>
                                        <TableCell align="center">{user.age}</TableCell>
                                        <TableCell align="center">{user.weight}</TableCell>
                                        <TableCell align="center">{user.size}</TableCell>
                                        <TableCell align="center">{user.medical_history}</TableCell>
                                        <TableCell align="center">{user.profession}</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <span>Medidas</span>
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Antebrazo</TableCell>
                                        <TableCell>Brazo</TableCell>
                                        <TableCell>Cadera</TableCell>
                                        <TableCell>Cintura</TableCell>
                                        <TableCell>Masa</TableCell>
                                        <TableCell>Pantorrilla</TableCell>
                                        <TableCell>Pecho</TableCell>
                                        <TableCell>Pierna A</TableCell>
                                        <TableCell>Pierna B</TableCell>
                                        <TableCell>Pierna M</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {user.measures.map((measure) => (
                                        <TableRow key={measure.measureId}>
                                            <TableCell>{measure.antebrazo}</TableCell>
                                            <TableCell>{measure.brazo}</TableCell>
                                            <TableCell>{measure.cadera}</TableCell>
                                            <TableCell>{measure.hombros}</TableCell>
                                            <TableCell>{measure.masa_corporal}</TableCell>
                                            <TableCell>{measure.pantorrilla}</TableCell>
                                            <TableCell>{measure.pecho}</TableCell>
                                            <TableCell>{measure.pierna_a}</TableCell>
                                            <TableCell>{measure.pierna_b}</TableCell>
                                            <TableCell>{measure.pierna_m}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                )}
                <Button variant="contained" color="primary" onClick={() => handleCloseModal()}>cerrar</Button>
            </Box>
        </Modal>
    )
}

export default ModalInfo