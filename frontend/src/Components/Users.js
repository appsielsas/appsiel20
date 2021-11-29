import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Skeleton, Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../application/UserContext';
import CreateUsers from './CreateUsers';
import ModifyUsers from './ModifyUsers';
import UserList from './UserList';

const baseUrl = process.env.REACT_APP_URL + '/api/users/';

const Users = () => {
    const [data, setData] = useState([]);

    const [cargando, setCargando] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { SelectedUser, setSelectedUser } = React.useContext(UserContext);

    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);

    const handleOpenModal = (action) => {
        switch (action.type) {
            case 'create':
                setOpenCreateModal(true)
                break;
            case 'edit':
                SelectedUser.id ?
                    setOpenModifyModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
            case 'delete':
                SelectedUser.id ?
                    setOpenDeleteModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
            default:
                break;
        }
    };

    const handleCloseModal = (action) => {
        switch (action.type) {
            case 'create':
                setOpenCreateModal(false);
                break;
            case 'edit':
                setOpenModifyModal(false);
                break;
            case 'delete':
                setOpenDeleteModal(false);
                break;
            default:
                break;
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedUser(prevState => ({
            ...prevState,
            [name]: value
        }))
        //console.log(JSON.stringify(SelectedUser));
    }

    const requestGet = async () => {
        setCargando(true)
        try {
            await fetch(baseUrl)
                .then(res => {
                    if (!res.ok) {
                        throw Error(res.json);
                    }
                    return res.json()
                })
                .then(response => {
                    console.log(response)
                    setData(response);
                    enqueueSnackbar('Actualizado', { variant: 'success' });
                    setCargando(false)
                })
                .catch(error => {
                    console.error(error.message)
                    enqueueSnackbar(error.message, { variant: 'error' });
                })

        } catch (e) {
            console.log(e.message)
        }
    }

    const requestPost = async () => {
        console.log(SelectedUser)
        try {
            let response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SelectedUser),
            })

            let dataU = await response.json()

            console.log(dataU)
            if (response.ok) {
                console.log("ok")
                enqueueSnackbar('Usuario ' + response.name + ' agregado correctamente', { variant: 'success' })
                setData(data.concat(dataU))
                handleCloseModal({ type: "create" })
            } else {
                console.log("error")
                Validator(dataU)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const requestPut = async () => {
        console.log(SelectedUser)
        try {
            const response = await fetch(baseUrl + SelectedUser.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(SelectedUser),
            })

            let dataU = await response.json()
            //var dataNueva = dataU;
            if (response.ok) {
                let dataNueva = data.map(Usuario => SelectedUser.id === Usuario.id ? dataU : Usuario)
                console.log(dataNueva)
                setData(dataNueva);
                handleCloseModal({ type: "edit" })
            } else {
                console.log("error")
                Validator(dataU)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const requestDelete = async () => {
        try {
            const response = await fetch(baseUrl + SelectedUser.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            let dataU = await response.json();

            if (response.ok) {
                setData(data.filter(Usuario => Usuario.id !== SelectedUser.id));
                enqueueSnackbar('Registro ' + SelectedUser.id + ' eliminado', { variant: 'success' });
                setSelectedUser({});
                handleCloseModal({ type: "delete" })
            }
        } catch (error) {
            console.log(error)
        }
    }

    /*const selectUser = (Usuario) => {
        setSelectedUser(Usuario);
         (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()
    }*/

    useEffect(() => {
        const fetchData = async () => {
            await requestGet()
        }
        fetchData()
    }, [])

    function Validator(response) {
        for (const property in response) {
            if (property !== '0') {
                response[property].forEach(element => {
                    enqueueSnackbar(element, { variant: 'error' });
                });
            }
        }
    }


    return (
        <>
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    Appsiel
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    User
                </Link>
                <Typography color="text.primary">Index</Typography>
            </Breadcrumbs>
            <hr />
            <Stack direction="row">
                <IconButton aria-label="create" onClick={() => handleOpenModal({ type: "create" })} size="large" color="primary">
                    <AddCircleIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={() => handleOpenModal({ type: "edit" })} size="large" color="secondary">
                    <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={() => handleOpenModal({ type: "delete" })} size="large" color="error">
                    <DeleteIcon />
                </IconButton>
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                </Box>
                :
                <UserList data={data} setData={setData} />
            }
            <Dialog open={openCreateModal} onClose={() => handleCloseModal({ type: "create" })}>
                <DialogTitle>Insertar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <CreateUsers handleChange={handleChange} methodPost={requestPost}></CreateUsers>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                    <Button onClick={requestPost} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openModifyModal} onClose={() => handleCloseModal({ type: "edit" })}>
                <DialogTitle>Modificar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <ModifyUsers handleChange={handleChange} methodPut={requestPut}></ModifyUsers>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "edit" })}>Cancel</Button>
                    <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteModal} onClose={() => handleCloseModal({ type: "delete" })} >
                <DialogTitle>Eliminar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea eliminar este registro. <b>{SelectedUser.name}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "delete" })}>Cancel</Button>
                    <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Users
