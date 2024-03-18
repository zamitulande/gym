import { AppBar, Box, Button, Container, IconButton, Menu, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState,  } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {

    const [selectedItem, setSelectedItem] = useState('');
    const navigate = useNavigate()

    const handleOpenDialog = () => {
        navigate("/register")
      };
    
      const handleCloseDialog = () => {
        setOpenDialog(false);
      };
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
              <Button variant="contained" color="primary"  onClick={handleOpenDialog}>
                Agregar Entrenador
              </Button>
              <TableContainer component={Paper}>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell align="center" >Nombre</TableCell>
                      <TableCell align="center" >Apellido</TableCell>
                      <TableCell align="center" >Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                      <TableRow>
                        <TableCell>luis</TableCell>
                        <TableCell>gomez</TableCell>
                        <TableCell>
                          <Button variant="contained" color="primary" >
                             editar
                          </Button>
                          <Button  variant="contained" color="primary"  onClick={() => handleDeleteItem(trainer.id)}>
                            eliminar
                          </Button>
                        </TableCell>
                      </TableRow>
                    
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
                          <Button  variant="contained" color="primary"  onClick={() => handleDeleteItem(trainer.id)}>
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