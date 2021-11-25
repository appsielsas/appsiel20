import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import TableChartIcon from '@mui/icons-material/TableChart';
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
import CreateUsers from './CreateUsers';
import ModifyUsers from './ModifyUsers';
import TableReact from './TableReact';
import UserContext from '../application/UserContext';

const baseUrl = 'http://localhost/appsiel20/backend/public/api/users';

const Users = () => {
    const [data, setData] = useState([]);
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
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

    const { vertical, horizontal, open } = state;

    const handleClick = (newState) => () => {
        setState({ open: true, ...newState });
    };

    const handleClose = () => {
        setState({ ...state, open: false });
    };

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
        console.log(JSON.stringify(SelectedUser));
    }

    const requestGet = async () => {
        await fetch(baseUrl)
            .then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                console.log(response)
                setData(response);
                enqueueSnackbar('Actualizado', { variant: 'success' });
            })
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
                setData(data.concat(response))
                !response.email || !response.password ? enqueueSnackbar('Usuario ' + response.name + ' agregado correctamente', { variant: 'success' }) : console.log('')
                enqueueSnackbar(response.email, { variant: 'error' });
                enqueueSnackbar(response.password, { variant: 'error' });
                console.log(response)
                handleCloseCreateModal()
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
                enqueueSnackbar(response && response.id + ' eliminado', { variant: 'success' });
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
            <Stack direction="row" spacing={1}>

                <IconButton aria-label="create" onClick={handleClickOpenCreateModal}>
                    <AddCircleIcon />
                </IconButton>
                <IconButton aria-label="edit" onClick={handleClickOpenModifyModal}>
                    <CreateIcon />
                </IconButton>
                <IconButton aria-label="delete" onClick={handleClickOpenDeleteModal}>
                    <DeleteIcon />
                </IconButton>
            </Stack>

            {data && data.length !== 0 ? <TableReact data={data} setData={setData} /> : <Box sx={{ width: '100%' }}> <LinearProgress /> </Box>}


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
            < Snackbar
                anchorOrigin={{ vertical, horizontal }}
                open={open}
                onClose={handleClose}
                message="I love snacks"
                key={vertical + horizontal}
            />
        </>
    )
}

export default Users
