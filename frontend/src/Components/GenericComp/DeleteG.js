import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"
import { useSnackbar } from "notistack";
import { useParams } from "react-router-dom";
import { optionsDELETE } from './../../application/Utils'

const DeleteG = (props) => {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model, page = 1, id } = useParams();

    const requestDelete = async () => {
        try {
            const response = await fetch(`${baseUrl}/${selectedItem.id}?app_id=${app}&model_id=${model}`, optionsDELETE(selectedItem))

            let dataG = await response.json();

            if (response.ok) {
                setData(data.filter(Usuario => Usuario.id !== selectedItem.id));
                enqueueSnackbar('Registro ' + selectedItem.id + ' eliminado', { variant: 'success' });
                //setSelectedItem({});
                handleCloseModal({ type: "delete" })
            } else {
                Validator(dataG, response.status)
            }
        } catch (e) {
            console.log(e)
            enqueueSnackbar(e.message, { variant: 'error' });
        }
    }

    return (
        <>
            <DialogTitle>Eliminar {modelName}</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                <DialogContentText>
                    Realmente desea eliminar este registro. <b>{selectedItem.id}</b>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseModal({ type: "delete" })}>Cancel</Button>
                <Button type="submit" onClick={requestDelete} variant="contained">Eliminar</Button>
            </DialogActions>
        </>
    )
}

export default DeleteG
