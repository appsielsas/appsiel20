import AddCircleIcon from '@mui/icons-material/AddCircle';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { Skeleton, Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Stack, Typography, Avatar, Fab, Divider, Slide } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import CreateG from './CreateG';
import ModifyG from './ModifyG';
import GenericList from './GenericList';

/**
 * URL base del modelo actual
 * @type {baseUrl: string} 
 */
const baseUrl = process.env.REACT_APP_URL + '/api/users/';
//const baseUrl = '/getGenericUser.json';

const Generic = () => {
    //const { aplication, module, models } = useParams();
    const [modelName, setModelName] = useState("");
    const [headers, setHeaders] = useState([]);
    const [data, setData] = useState([]);
    const [fields, setFields] = useState([]);
    const [actionWithFields, setActionWithFields] = useState([]);
    const [actions, setActions] = useState([]);
    const [cargando, setCargando] = React.useState(false);
    const { enqueueSnackbar } = useSnackbar();
    const [selectedItem, setSelectedItem] = React.useState({ id: '' });

    //open Modals
    const [openCreateModal, setOpenCreateModal] = React.useState(false);
    const [openModifyModal, setOpenModifyModal] = React.useState(false);
    const [openDuplicateModal, setOpenDuplicateModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openGenericModal, setOpenGenericModal] = React.useState(false);

    /**
     * Action Object
     * @param {{type: string}} action 
     */
    const handleOpenModal = (action) => {
        switch (action.type) {
            case 'create':
                setOpenCreateModal(true)
                break;
            case 'edit':
                selectedItem.id ?
                    setOpenModifyModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
            case 'delete':
                selectedItem.id ?
                    setOpenDeleteModal(true) : enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                break;
            default:
                if (selectedItem.id) {
                    setActionWithFields(action)
                    setOpenGenericModal(true)
                } else {
                    enqueueSnackbar('Debe seleccionar un usuario', { variant: 'warning' })
                }
                break;
        }
    };
    /**
     * Action Object
     * @param {{type: string}} action 
     */
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
            case 'duplicate':

                break;
            default:
                setOpenGenericModal(false)
                break;
        }
    };

    /**
     * Establece los valores del objeto seleccionado 
     */
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
            await fetch('/getGenericUser.json', {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                },
            })
                .then(res => res.json())
                .then(response => {
                    console.log(response)
                    setModelName(response.name)
                    setHeaders(response.model_headers_table);
                    setData(response.model_data_table);
                    setFields(response.model_fields);
                    setActions(response.model_actions);
                    //enqueueSnackbar('Actualizado', { variant: 'success' });
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

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedItem),
            })

            let dataG = await response.json()

            console.log(dataG)
            if (response.ok) {
                console.log("ok")
                enqueueSnackbar(`${modelName} ${response.id} agregado correctamente`, { variant: 'success' })
                setData(data.concat(dataG))
                handleCloseModal({ type: "create" })
            } else {
                console.log("error")
                Validator(dataG)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const requestPut = async () => {
        console.log(selectedItem)
        try {
            const response = await fetch(baseUrl + selectedItem.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                },
                body: JSON.stringify(selectedItem),
            })

            let dataG = await response.json()
            //var dataNueva = dataU;
            if (response.ok) {
                let dataNueva = data.map(Usuario => selectedItem.id === Usuario.id ? dataG : Usuario)
                console.log(dataNueva)
                setData(dataNueva);
                handleCloseModal({ type: "edit" })
            } else {
                console.log("error")
                Validator(dataG)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const requestDelete = async () => {
        try {
            const response = await fetch(baseUrl + selectedItem.id, {
                method: "DELETE",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                }
            })

            let dataG = await response.json();

            if (response.ok) {
                setData(data.filter(Usuario => Usuario.id !== selectedItem.id));
                enqueueSnackbar('Registro ' + selectedItem.id + ' eliminado', { variant: 'success' });
                setSelectedItem({});
                handleCloseModal({ type: "delete" })
            }
        } catch (error) {
            console.log(error)
        }
    }

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
            <Stack direction="row" spacing={1}>
                {actions.map((action) => (
                    <Fab key={action.id + ''} aria-label={action.label} onClick={() => handleOpenModal(action)} size="small" color="primary">
                        <i className={action.icon}></i>
                    </Fab>
                ))}
                <Divider orientation="vertical" flexItem />
                <Fab aria-label="print" onClick={() => handleOpenModal({ type: "print" })} size="small" color="primary">
                    <i className="fas fa-print"></i>
                </Fab>
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                </Box>
                :
                <GenericList setSelectedItem={setSelectedItem} modelName={modelName} data={data} setData={setData} headers={headers} />
            }

            {/*Modal create*/}
            <Dialog open={openCreateModal} onClose={() => handleCloseModal({ type: "create" })}>
                <DialogTitle>Insertar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <CreateG modelName={modelName} fields={fields} handleChange={handleChange} methodPost={requestPost}></CreateG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                    <Button onClick={requestPost} variant="contained">Crear</Button>
                </DialogActions>
            </Dialog>

            {/*Modal edit*/}
            <Dialog open={openModifyModal} onClose={() => handleCloseModal({ type: "edit" })}>
                <DialogTitle>Modificar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <ModifyG selectedItem={selectedItem} modelName={modelName} fields={fields} handleChange={handleChange} methodPut={requestPut}></ModifyG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "edit" })}>Cancel</Button>
                    <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>
            {/*Modal duplicate*/}
            <Dialog open={openDeleteModal} onClose={() => handleCloseModal({ type: "delete" })} >
                <DialogTitle>Duplicate</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea duplicar este registro. <b>{selectedItem.id}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "delete" })}>Cancel</Button>
                    <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>
            {/*Modal delete*/}
            <Dialog open={openDuplicateModal} onClose={() => handleCloseModal({ type: "delete" })} >
                <DialogTitle>Eliminar</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea eliminar este registro. <b>{selectedItem.id}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "delete" })}>Cancel</Button>
                    <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>

            {/*Modal generico*/}
            <Dialog open={openGenericModal} onClose={() => handleCloseModal({ type: "generic" })}>
                <DialogTitle>{actionWithFields.label}</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>

                    </DialogContentText>
                    <ModifyG selectedItem={selectedItem} modelName={modelName} fields={actionWithFields.fields} handleChange={handleChange} methodPut={requestPut}></ModifyG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "generic" })}>Cancel</Button>
                    <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Generic
