import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Skeleton } from '@mui/material';
import Box from '@mui/material/Box';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Snackbar from '@mui/material/Snackbar';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import UserContext from '../application/UserContext';
import CreateUsers from './CreateUsers';
import ModifyUsers from './ModifyUsers';
import TableReact from './TableReact';
import UserList from './UserList';


const baseUrl = process.env.REACT_APP_URL + '/api/users/';

const Users = () => {
    const [data, setData] = useState([]);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [cargando, setCargando] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const { SelectedUser, setSelectedUser } = React.useContext(UserContext);

    /*const [SelectedUser, setSelectedUser] = useState({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    })*/



    const [state, setState] = React.useState({
        open: false,
        vertical: 'top',
        horizontal: 'right',
    });

    const handleClickOpenCreateModal = () => {
        setOpenCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setOpenCreateModal(false);
    };

    const handleClickOpenModifyModal = () => {
        setOpenModifyModal(true);
    };

    const handleCloseModifyModal = () => {
        setOpenModifyModal(false);
    };

    const handleClickOpenDeleteModal = () => {
        setOpenDeleteModal(true);
    };

    const handleCloseDeleteModal = () => {
        setOpenDeleteModal(false);
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
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    setData(response);
                    enqueueSnackbar('Actualizado', { variant: 'success' });
                    setCargando(false)
                })
                .catch(error => {
                    console.log(error.message)
                    enqueueSnackbar(error.message, { variant: 'error' });
                })

        } catch (e) {
            console.log(e.message)
        }

    }

    const requestPost = async () => {
        await fetch(baseUrl, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SelectedUser),

        })
            .then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                //console.log(response['email'])

                if (Validator(response)) {
                    enqueueSnackbar('Usuario ' + response.name + ' agregado correctamente', { variant: 'success' })
                    setData(data.concat(data))
                    console.log(data)
                    handleCloseCreateModal()
                }


            })
    }

    const requestPut = async () => {
        await fetch(baseUrl + SelectedUser.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SelectedUser),

        }).then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                var dataNueva = data;
                dataNueva.map(Usuario => {
                    if (SelectedUser.id === Usuario.id) {
                        Usuario.name = SelectedUser.name;
                        Usuario.email = SelectedUser.email;
                        Usuario.password = SelectedUser.password;
                    }
                })
                setData(dataNueva);

            })
    }

    const requestDelete = async () => {
        await fetch(baseUrl + SelectedUser.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(SelectedUser),

        })
            .then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                setData(data.filter(Usuario => Usuario.id !== SelectedUser.id));
                handleCloseDeleteModal();
                enqueueSnackbar('Registro ' + response && response.name + ' eliminado', { variant: 'success' });
                setSelectedUser({});
            })
    }

    const selectUser = (Usuario) => {
        setSelectedUser(Usuario);
        /* (caso === 'Editar') ? abrirCerrarModalEditar() : abrirCerrarModalEliminar()*/
    }

    useEffect(() => {
        const fetchData = async () => {
            await requestGet()
        }
        fetchData()
    }, [])

    function Validator(response) {

        if (data['0'] === 'errors') {
            for (const property in data) {
                if (property !== '0') {
                    data[property].forEach(element => {
                        enqueueSnackbar(element, { variant: 'error' });
                    });
                }
            }
        } else {
            return true
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
                <IconButton aria-label="create" onClick={handleClickOpenCreateModal} size="large" color="primary">
                    <AddCircleIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={SelectedUser.id ? handleClickOpenModifyModal : () => { enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' }) }} size="large" color="secondary">
                    <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={SelectedUser.id ? handleClickOpenDeleteModal : () => { enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' }) }} size="large" color="error">
                    <DeleteIcon />
                </IconButton>
            </Stack>

            {/*cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                </Box>
                :
                data.length !== 0 ?
                    <UserList data={data} setData={setData} />
                    :
                    'Sin datos'
            */}
            {
                data.length !== 0 ?
                    <UserList data={data} setData={setData} />
                    :
                    <Box sx={{ width: '100%' }}>
                        <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                        <Skeleton animation="wave" variant="rectangular" width='100%' height={300} />
                        <Skeleton animation="wave" variant="text" width='200px' sx={{ float: 'right' }} />
                    </Box>

            }


            <Dialog open={openCreateModal} onClose={handleCloseCreateModal}>
                <DialogTitle>Insertar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <CreateUsers handleChange={handleChange} methodPost={requestPost}></CreateUsers>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseCreateModal}>Cancel</Button>
                    <Button onClick={requestPost} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openModifyModal} onClose={handleCloseModifyModal}>
                <DialogTitle>Modificar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <ModifyUsers handleChange={handleChange} methodPut={requestPut}></ModifyUsers>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseModifyModal}>Cancel</Button>
                    <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteModal} onClose={handleCloseDeleteModal} >
                <DialogTitle>Eliminar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea eliminar este registro. <b>{SelectedUser.name}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDeleteModal}>Cancel</Button>
                    <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Users
