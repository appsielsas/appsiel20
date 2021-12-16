import { useTheme } from '@emotion/react';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Breadcrumbs, Dialog, Divider, Fab, Link as LinkMui, Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from "react-router-dom";
import { UserContext } from '../../application/UserProvider';
import CreateG from './CreateG';
import DeleteG from './DeleteG';
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
        `${process.env.REACT_APP_URL}/api/crud` :
        `${process.env.REACT_APP_URL}/api/crud/${id}?app_id=${app}&model_id=${model}`;

    //const baseUrl = path ?
    //`${process.env.REACT_APP_URL}/api/crud?app_id=${app}&model_id=${model}&page=${page}` :
    //`${process.env.REACT_APP_URL}/api/crud/${id}?app_id=${app}&model_id=${model}`;

    const { user, signIn, signOut } = React.useContext(UserContext);

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


    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

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

    }

    const requestGet = async () => {
        setCargando(true)
        try {
            const response = await fetch(`${baseUrl}?app_id=${app}&model_id=${model}&page=${page}`, {
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
                setHeaders(dataG.model_table_headers);
                setData(dataG.model_table_rows.data);
                setFields(dataG.model_fields);
                setActions(dataG.model_actions);
                setNumberPages(dataG.model_table_rows.last_page)
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

    function Validator(data, status) {

        if (status === 401) {
            signOut()
        }

        for (const property in data) {
            console.log(data[property])
            data[property].forEach(element => {
                enqueueSnackbar(element, { variant: 'error' });
            });
        }
    }

    useEffect(() => {

        const fetchData = async () => {
            await requestGet()
            const tempFields = fields.reduce((acc, item) => {
                acc = { ...acc, [item.name]: '' }
                return acc
            }, {})

            console.log(tempFields)

            setSelectedItem(tempFields)

        }

        fetchData()
    }, [app, model, page])

    return (
        <> {breadcrumbs &&
            <Breadcrumbs aria-label="breadcrumb" separator={<NavigateNextIcon fontSize="small" />}>
                <LinkMui component={Link} underline="hover" color="inherit" to="/">
                    Appsiel
                </LinkMui>
                <LinkMui component={Link}
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {app}
                </LinkMui>
                <LinkMui component={Link}
                    underline="hover"
                    color="inherit"
                    to="/users/"
                >
                    {model}
                </LinkMui>
                <Typography color="inherit">Registros</Typography>
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
            </Stack>

            {cargando ?
                <Box sx={{ width: '100%' }}>
                    <Typography variant="h2" width="300px"><Skeleton animation="wave" /></Typography>
                    <Skeleton animation="wave" variant="rectangular" width='100%' height={118} />
                    <Typography variant="h3" width="300px"><Skeleton animation="wave" /></Typography>
                </Box>
                :
                <GenericList pages={numberPages} setSelectedItem={setSelectedItem} modelName={modelName} data={data} setData={setData} headers={headers} />
            }

            {/*Modal create*/}
            <Dialog fullScreen={fullScreen} fullWidth maxWidth={'lg'} component="form" open={openCreateModal} onClose={() => handleCloseModal({ type: "create" })}>
                <CreateG
                    baseUrl={baseUrl}
                    modelName={modelName}
                    fields={fields}
                    selectedItem={selectedItem}
                    handleChange={handleChange}
                    data={data}
                    setData={setData}
                    handleCloseModal={handleCloseModal}
                    Validator={Validator}
                >
                </CreateG>
            </Dialog>

            {/*Modal edit*/}

            <Dialog fullScreen={fullScreen} fullWidth maxWidth={'lg'} component="form" open={openModifyModal} onClose={() => handleCloseModal({ type: "edit" })}>
                <ModifyG
                    baseUrl={baseUrl}
                    selectedItem={selectedItem}
                    modelName={modelName}
                    fields={fields}
                    handleChange={handleChange}
                    data={data}
                    setData={setData}
                    handleCloseModal={handleCloseModal}
                    Validator={Validator}
                />
            </Dialog>


            {/*Modal duplicate
            <Dialog open={openDeleteModal} onClose={() => handleCloseModal({ type: "delete" })} >
                <DialogTitle>Duplicate</DialogTitle>
                <DialogContent sx={{ minWidth: 500 }}>
                    <DialogContentText>
                        Realmente desea duplicar este registro. <b>{selectedItem.id}</b>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => handleCloseModal({ type: "delete" })}>Cancel</Button>
                    <Button type="submit" variant="contained">Eliminar</Button>
                </DialogActions>
            </Dialog>*/}
            {/*Modal delete*/}
            <Dialog fullScreen={fullScreen} open={openDeleteModal} onClose={() => handleCloseModal({ type: "delete" })} >
                <DeleteG
                    baseUrl={baseUrl}
                    selectedItem={selectedItem}
                    modelName={modelName}
                    data={data}
                    setData={setData}
                    handleCloseModal={handleCloseModal}
                    Validator={Validator}
                ></DeleteG>
            </Dialog>

            {/*Modal generico
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
            </Dialog>*/}
        </>
    )
}

export default Generic
