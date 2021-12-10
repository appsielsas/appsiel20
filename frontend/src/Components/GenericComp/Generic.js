import { Box, Breadcrumbs, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Divider, Fab, Skeleton, Stack, Typography } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import Validator from '../../application/Utils';
import Show from '../Show';
import CreateG from './CreateG';
import GenericList from './GenericList';
import ModifyG from './ModifyG';


const Generic = ({ path = true, breadcrumbs = true, tab = 0 }) => {
    /**
         * Parametros obtenidos por la URL
         */
    const { app, model, page = 1, id } = useParams();
    /**
     * URL base del modelo actual
     * @type {baseUrl: string} 
     */
    const baseUrl = path ?
        `${process.env.REACT_APP_URL}/api/crud?app_id=${app}&model_id=${model}&page=${page}` :
        `${process.env.REACT_APP_URL}/api/crud/${id}?app_id=${app}&model_id=${model}`;



    const [modelName, setModelName] = useState("");
    const [headers, setHeaders] = useState([]);
    const [numberPages, setNumberPages] = useState(0)
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

    const [showView, setShowView] = React.useState(false)

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
                    setOpenModifyModal(true) : enqueueSnackbar('Debe seleccionar un registro', { variant: 'warning' })
                break;
            case 'delete':
                selectedItem.id ?
                    setOpenDeleteModal(true) : enqueueSnackbar('Debe seleccionar un registro', { variant: 'warning' })
                break;
            case 'show':
                selectedItem.id ?
                    setShowView(true) : enqueueSnackbar('Debe seleccionar un registro', { variant: 'warning' })
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
            const response = await fetch(baseUrl, {
                method: "GET",
                headers: {
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                },
            })

            let dataG = await response.json()

            if (!path) {
                console.log(dataG)
                dataG = dataG.tabs[tab].data
                console.log(dataG)
            }

            if (response.ok) {
                setModelName(dataG.name)
                setHeaders(dataG.model_headers_table);
                setData(dataG.model_data_table.data);
                setFields(dataG.model_fields);
                setActions(dataG.model_actions);
                setNumberPages(dataG.model_data_table.last_page)
                console.log(dataG)
            } else {
                Validator(dataG, response.status)
            }

            setCargando(false)

        } catch (e) {
            console.log(e.message)
            enqueueSnackbar(e.message, { variant: 'error' });
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
            } else {
                Validator(dataG, response.status)
            }
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    }

    useEffect(() => {
        const fetchData = async () => {
            await requestGet()

        }

        fetchData()
    }, [app, model, page])

    return (
        <> {breadcrumbs &&
            <Breadcrumbs aria-label="breadcrumb">
                <Link underline="hover" color="inherit" to="/">
                    Appsiel
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {app}
                </Link>
                <Link
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {model}
                </Link>
                <Typography color="text.primary">Index</Typography>
            </Breadcrumbs>
        }
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
                <Fab aria-label="print" onClick={!showView ? () => handleOpenModal({ type: "show" }) : () => setShowView(false)} size="small" color="primary" sx={{ color: 'white' }}>
                    <i className="fas fa-file"></i>
                </Fab>
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                    <Typography variant="h3" width="300px"><Skeleton animation="wave" /></Typography>
                </Box>
                :
                showView ?
                    <Show data={selectedItem}></Show>
                    :
                    <GenericList pages={numberPages} setSelectedItem={setSelectedItem} modelName={modelName} data={data} setData={setData} headers={headers} />
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
