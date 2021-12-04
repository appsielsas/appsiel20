import { Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Skeleton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Show from '../Show';
import CreateG from './CreateG';
import GenericList from './GenericList';
import ModifyG from './ModifyG';


const Generic = ({ path }) => {
    /**
     * Parametros obtenidos por la URL
     */
    const { app, model } = useParams();
    /**
     * URL base del modelo actual
     * @type {baseUrl: string} 
     */
    const baseUrl = `${process.env.REACT_APP_URL}/api/${path}?app_id=${app}&model_id=${model}`;

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

    const [showView, setShowView] = React.useState(true)

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
            await fetch(baseUrl, {
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
                    setData(response.model_data_table.data);
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
    }, [app, model])

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
                    {useParams().app}
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {useParams().model}
                </Link>
                <Typography color="text.primary">Index</Typography>
            </Breadcrumbs>
            <hr />
            <Stack direction="row" spacing={1}>
                {actions.map((action) => (
                    <Fab key={action.id + ''} aria-label={action.label} onClick={() => handleOpenModal(action)} size="small" color="primary" sx={{ color: 'white' }}>
                        <i className={action.icon}></i>
                    </Fab>
                ))}
                <Divider orientation="vertical" flexItem />
                <Fab aria-label="print" onClick={() => handleOpenModal({ type: "print" })} size="small" color="primary" sx={{ color: 'white' }}>
                    <i className="fas fa-print"></i>
                </Fab>
                <Fab aria-label="print" onClick={() => setShowView(!showView)} size="small" color="primary" sx={{ color: 'white' }}>
                    <i className="fas fa-file"></i>
                </Fab>
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                </Box>
                :
                showView ?
                    <GenericList setSelectedItem={setSelectedItem} modelName={modelName} data={data} setData={setData} headers={headers} />
                    :
                    <Show data={selectedItem}></Show>
            }

            {/*Modal create*/}
            <Dialog open={openCreateModal} onClose={() => handleCloseModal({ type: "create" })}>
                <CreateG
                    baseUrl={baseUrl}
                    modelName={modelName}
                    fields={fields}
                    handleChange={handleChange}
                    data={data}
                    setData={setData}
                    handleCloseModal={handleCloseModal}
                >
                    <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                </CreateG>
            </Dialog>

            {/*Modal edit*/}

            <Dialog open={openModifyModal} onClose={() => handleCloseModal({ type: "edit" })}>
                <ModifyG
                    baseUrl={baseUrl}
                    selectedItem={selectedItem}
                    modelName={modelName}
                    fields={fields}
                    handleChange={handleChange}
                    data={data}
                    setData={setData}
                    handleCloseModal={handleCloseModal}
                >
                    <Button onClick={() => handleCloseModal({ type: "edit" })}>Cancel</Button>
                </ModifyG>
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
                    <ModifyG selectedItem={selectedItem} modelName={modelName} fields={actionWithFields.fields} handleChange={handleChange}></ModifyG>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "generic" })}>Cancel</Button>
                    <Button type="submit" variant="contained">Modificar</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}

export default Generic
