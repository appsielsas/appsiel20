import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Skeleton, Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import UserContext from '../../application/UserContext';
import CreateG from './CreateG';
import ModifyG from './ModifyG';
import GenericList from './GenericList';

const baseUrl = '/getGenericUser.json';

const Generic = () => {
    //const { aplication, module, models } = useParams();
    const [modelName, setModelName] = useState("");
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [actions, setActions] = useState([]);
    const [cargando, setCargando] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedItem, setSelectedItem] = React.useState({ id: '' });

    //open Modals
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);



    const handleOpenModal = (action) => {
        switch (action) {
            case 'Crear':
                setOpenCreateModal(true)
                break;
            case 'Editar':
                selectedItem.id ?
                    setOpenModifyModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
            case 'Eliminar':
                selectedItem.id ?
                    setOpenDeleteModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
        }

    };

    const handleCloseModal = (action) => {
        switch (action) {
            case 'Crear':
                setOpenCreateModal(false);
                break;
            case 'Editar':
                setOpenModifyModal(false);
                break;
            case 'Eliminar':
                setOpenDeleteModal(false);
                break;
        }
    };

    const handleChange = e => {
        const { name, value } = e.target;
        setSelectedItem(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(JSON.stringify(selectedItem));
    }

    const requestGet = async () => {
        setCargando(true)
        try {
            await fetch(baseUrl)
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    setModelName(response.name)
                    setHeaders(response.model_headers_table);
                    setData(response.model_data_table);
                    setFields(response.model_fields);
                    setActions(response.model_actions);
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
            body: JSON.stringify(selectedItem),

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
                    handleCloseModal("Crear")
                }


            })
    }

    const requestPut = async () => {
        await fetch(baseUrl + selectedItem.id, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedItem),

        }).then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                var dataNueva = data;
                dataNueva.map(Usuario => {
                    if (selectedItem.id === Usuario.id) {
                        Usuario.name = selectedItem.name;
                        Usuario.email = selectedItem.email;
                        Usuario.password = selectedItem.password;
                    }
                })
                setData(dataNueva);

            })
    }

    const requestDelete = async () => {
        await fetch(baseUrl + selectedItem.id, {
            method: "DELETE",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(selectedItem),

        })
            .then(res => res.json())
            .catch(error => {
                console.log(error)
            })
            .then(response => {
                setData(data.filter(Usuario => Usuario.id !== selectedItem.id));
                handleCloseModal("Eliminar");
                enqueueSnackbar('Registro ' + response && response.name + ' eliminado', { variant: 'success' });
                setSelectedItem({});
            })
    }

    useEffect(() => {
        const fetchData = async () => {
            await requestGet()
        }
        fetchData()
    }, [])

    function Validator(data) {

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
                    {useParams().module}
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {useParams().models}
                </Link>
                <Typography color="text.primary">Index</Typography>
            </Breadcrumbs>
            <hr />
            <Stack direction="row">
                {actions.map((action) => (
                    <IconButton key={action.id + ''} aria-label={action.label} onClick={() => handleOpenModal(action.label)} size="large" color="primary">
                        <i className={action.icon}></i>
                    </IconButton>
                ))}
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                </Box>
                :
                <GenericList setSelectedItem={setSelectedItem} modelName={modelName} data={data} setData={setData} headers={headers} />
            }

            <Dialog open={openCreateModal} onClose={() => handleCloseModal("Crear")}>
                <DialogTitle>Insertar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <CreateG modelName={modelName} fields={fields} handleChange={handleChange} methodPost={requestPost}></CreateG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal("Crear")}>Cancel</Button>
                    <Button onClick={requestPost} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openModifyModal} onClose={() => handleCloseModal("Editar")}>
                <DialogTitle>Modificar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <ModifyG selectedItem={selectedItem} modelName={modelName} fields={fields} handleChange={handleChange} methodPut={requestPut}></ModifyG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal("Editar")}>Cancel</Button>
                    <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>

            <Dialog open={openDeleteModal} onClose={() => handleCloseModal("Eliminar")} >
                <DialogTitle>Eliminar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea eliminar este registro. <b>{selectedItem.id}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal("Eliminar")}>Cancel</Button>
                    <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Generic
