import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import { Table, TableContainer, TableHead, TableCell, TableBody, TableRow, Modal, Button, TextField } from '@mui/material';
import { Edit, Delete } from '@mui/icons-material';
import Card from '@mui/material/Card';
import Box from '@mui/material/Box';

const baseUrl = 'https://fakestoreapi.com/users'


function App() {
  const [data, setData] = useState([]);
  const [modalInsertar, setModalInsertar] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);

  const [UsuarioSeleccionada, setUsuarioSeleccionada] = useState({
    nombre: '',
    email: '',
    phone: '',
  })

  const handleChange = e => {
    const { name, value } = e.target;
    setUsuarioSeleccionada(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(UsuarioSeleccionada);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl)
      .then(response => {
        setData(response.data);
      })
  }

  const peticionPost = async () => {
    await axios.post(baseUrl, UsuarioSeleccionada)
      .then(response => {
        setData(data.concat(response.data))
        abrirCerrarModalInsertar()
      })
  }

  const peticionPut = async () => {
    await axios.put(baseUrl + UsuarioSeleccionada.id, UsuarioSeleccionada)
      .then(response => {
        var dataNueva = data;
        dataNueva.map(Usuario => {
          if (UsuarioSeleccionada.id === Usuario.id) {
            Usuario.username = UsuarioSeleccionada.username;
            Usuario.email = UsuarioSeleccionada.email;
            Usuario.phone = UsuarioSeleccionada.phone;
          }
        })
        setData(dataNueva);
        abrirCerrarModalEditar();
      })
  }

  const peticionDelete = async () => {
    await axios.delete(baseUrl + UsuarioSeleccionada.id)
      .then(response => {
        setData(data.filter(Usuario => Usuario.id !== UsuarioSeleccionada.id));
        abrirCerrarModalEliminar();
      })
  }

  const abrirCerrarModalInsertar = () => {
    setModalInsertar(!modalInsertar);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  }

  const abrirCerrarModalEliminar = () => {
    setModalEliminar(!modalEliminar);
  }

  const seleccionarUsuario = (Usuario, caso) => {
    setUsuarioSeleccionada(Usuario);
    (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
  }

  useEffect(async () => {
    await peticionGet();
  }, [])

  const bodyInsertar = (
    <Box component="form"
      noValidate
      autoComplete="off" sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      <Card variant="outlined" sx={{ minWidth: 500, padding: 2 }}>

        <h3>Agregar Nueva Usuario</h3>
        <TextField fullWidth name="username" label="Nombre de Usuario" onChange={handleChange} variant="standard" />
        <br />
        <TextField fullWidth name="email" label="Email" onChange={handleChange} variant="standard" />
        <br />
        <TextField fullWidth name="phone" label="Telefono" onChange={handleChange} variant="standard" />
        <br /><br />
        <div align="right">
          <Button variant="contained" color="primary" onClick={() => peticionPost()}>Insertar</Button>
          <Button variant="outlined" onClick={() => abrirCerrarModalInsertar()}>Cancelar</Button>
        </div>
      </Card>
    </Box>


  )

  const bodyEditar = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      <Card variant="outlined" sx={{ minWidth: 500, padding: 2 }}>
        <h3>Editar Usuario</h3>
        <TextField fullWidth name="username" label="Nombre de Usuario" onChange={handleChange} value={UsuarioSeleccionada && UsuarioSeleccionada.username} variant="standard"/>
        <br />
        <TextField fullWidth name="email" label="Email" onChange={handleChange} value={UsuarioSeleccionada && UsuarioSeleccionada.email} variant="standard"/>
        <br />
        <TextField fullWidth name="phone" label="Telefono" onChange={handleChange} value={UsuarioSeleccionada && UsuarioSeleccionada.phone} variant="standard"/>
        <br /><br />
        <div align="right">
          <Button variant="contained" color="primary" onClick={() => peticionPut()}>Editar</Button>
          <Button variant="outlined" onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
        </div>
      </Card>
    </Box>

  )

  const bodyEliminar = (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 4 }}>
      <Card variant="outlined" sx={{ minWidth: 500, padding: 2 }}>
        <p>Estás seguro que deseas eliminar la Usuario <b>{UsuarioSeleccionada && UsuarioSeleccionada.username}</b> ? </p>
        <div align="right">
          <Button variant="contained" color="secondary" onClick={() => peticionDelete()} >Sí</Button>
          <Button variant="outlined" onClick={() => abrirCerrarModalEliminar()}>No</Button>

        </div>
      </Card>
    </Box>

  )


  return (
    <div className="App">
      <br />
      <Button onClick={() => abrirCerrarModalInsertar()} variant="contained">Insertar</Button>
      <br /><br />
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre de Usuario</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Telefono</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map(Usuario => (
              <TableRow key={Usuario.id}>
                <TableCell>{Usuario.username}</TableCell>
                <TableCell>{Usuario.email}</TableCell>
                <TableCell>{Usuario.phone}</TableCell>
                <TableCell>
                  <Edit onClick={() => seleccionarUsuario(Usuario, 'Editar')} />
                  &nbsp;&nbsp;&nbsp;
                  <Delete onClick={() => seleccionarUsuario(Usuario, 'Eliminar')} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Modal
        open={modalInsertar}
        onClose={abrirCerrarModalInsertar}>
        {bodyInsertar}
      </Modal>

      <Modal
        open={modalEditar}
        onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>

      <Modal
        open={modalEliminar}
        onClose={abrirCerrarModalEliminar}>
        {bodyEliminar}
      </Modal>
    </div>
  );
}

export default App;