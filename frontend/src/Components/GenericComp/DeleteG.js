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
                let newData = data.filter(item => !(selectedItem.some(i => i.id === item.id)))
                setData(newData);
                selectedItem.forEach(element => {
                    enqueueSnackbar('Registro ' + element.id + ' eliminado', { variant: 'success' });
                });
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
                    Realmente desea eliminar este registro. <b>{selectedItem.reduce(((acc, el) => acc = acc + ' ' + el.id), '')}</b>
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
