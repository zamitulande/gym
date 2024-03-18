import React, { useState } from 'react'
import Register from './Register'
import { AppBar, Button, Dialog, DialogContent, DialogTitle, Drawer, IconButton, List, ListItem, ListItemText, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Toolbar, Typography } from '@mui/material';

const Dartboard = () => {
    const [selectedItem, setSelectedItem] = useState('');
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState({
      trainers: [
        { id: 1, name: 'Entrenador 1', age: 30, sport: 'Fútbol' },
        { id: 2, name: 'Entrenador 2', age: 35, sport: 'Baloncesto' }
      ],
      athletes: [
        { id: 1, name: 'Deportista 1', age: 25, sport: 'Natación' },
        { id: 2, name: 'Deportista 2', age: 28, sport: 'Atletismo' }
      ]
    });
    const [formData, setFormData] = useState({ name: '', age: '', sport: '' });
  
    const handleOpenDialog = () => {
      setOpenDialog(true);
    };
  
    const handleCloseDialog = () => {
      setOpenDialog(false);
    };
  
    const handleInputChange = (event) => {
      const { name, value } = event.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleAddItem = () => {
      if (selectedItem === 'Entrenador') {
        const newTrainer = { id: data.trainers.length + 1, ...formData };
        setData({ ...data, trainers: [...data.trainers, newTrainer] });
      } else if (selectedItem === 'Deportista') {
        const newAthlete = { id: data.athletes.length + 1, ...formData };
        setData({ ...data, athletes: [...data.athletes, newAthlete] });
      }
      setFormData({ name: '', age: '', sport: '' });
      handleCloseDialog();
    };
  
    const handleDeleteItem = (id) => {
      if (selectedItem === 'Entrenador') {
        const updatedTrainers = data.trainers.filter(trainer => trainer.id !== id);
        setData({ ...data, trainers: updatedTrainers });
      } else if (selectedItem === 'Deportista') {
        const updatedAthletes = data.athletes.filter(athlete => athlete.id !== id);
        setData({ ...data, athletes: updatedAthletes });
      }
    };
  
    return (
      <div>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" color="inherit" aria-label="menu">
              {/* <MenuIcon /> */}
            </IconButton>
            <Typography variant="h6">
              Dashboard
            </Typography>
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
                      <TableCell>Nombre</TableCell>
                      <TableCell>Edad</TableCell>
                      <TableCell>Deporte</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.trainers.map((trainer) => (
                      <TableRow key={trainer.id}>
                        <TableCell>{trainer.name}</TableCell>
                        <TableCell>{trainer.age}</TableCell>
                        <TableCell>{trainer.sport}</TableCell>
                        <TableCell>
                          <IconButton aria-label="editar">
                            {/* <EditIcon /> */}
                          </IconButton>
                          <IconButton aria-label="eliminar" onClick={() => handleDeleteItem(trainer.id)}>
                            {/* <DeleteIcon /> */}
                          </IconButton>
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
                      <TableCell>Nombre</TableCell>
                      <TableCell>Edad</TableCell>
                      <TableCell>Deporte</TableCell>
                      <TableCell>Acciones</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {data.athletes.map((athlete) => (
                      <TableRow key={athlete.id}>
                        <TableCell>{athlete.name}</TableCell>
                        <TableCell>{athlete.age}</TableCell>
                        <TableCell>{athlete.sport}</TableCell>
                        <TableCell>
                          <IconButton aria-label="editar">
                            {/* <EditIcon /> */}
                          </IconButton>
                          <IconButton aria-label="eliminar" onClick={() => handleDeleteItem(athlete.id)}>
                            {/* <DeleteIcon /> */}
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </div>
        <Dialog open={openDialog} onClose={handleCloseDialog}>
          <DialogTitle>{`Agregar ${selectedItem}`}</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              name="name"
              label="Nombre"
              type="text"
              fullWidth
              value={formData.name}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="age"
              label="Edad"
              type="text"
              fullWidth
              value={formData.age}
              onChange={handleInputChange}
            />
            <TextField
              margin="dense"
              name="sport"
              label="Deporte"
              type="text"
              fullWidth
              value={formData.sport}
              onChange={handleInputChange}
            />
            <Button onClick={handleAddItem} color="primary">
              Agregar
            </Button>
            <Button onClick={handleCloseDialog} color="primary">
              Cancelar
            </Button>
          </DialogContent>
        </Dialog>
      </div>
    );
    
}

export default Dartboard