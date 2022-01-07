import { Box, Paper, Button, TextField, Typography, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPUT, ValidatorForm } from './../../application/Utils'
import Asynchronous from '../Inputs/Asynchronous'
import GenerateFields from '../Inputs/GenerateFields';
import { useState } from 'react';

export default function SimplePaper(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model } = useParams();
    const [validateForm, setValidateForm] = useState({})

    const requestPut = async () => {
        if (ValidatorForm(fields, selectedItem, setValidateForm)) {
            return
        }
        //console.log(selectedItem)
        try {
            const response = await fetch(`${baseUrl}/${selectedItem.id}?app_id=${app}&model_id=${model}`, optionsPUT(selectedItem))

            let dataG = await response.json()
            //var dataNueva = dataU;
            if (response.ok) {
                let dataNueva = data.map(row => selectedItem.id === row.id ? dataG : row)
                //console.log(dataNueva)
                setData(dataNueva);
                handleCloseModal({ type: "edit" })
                enqueueSnackbar(`${modelName} ${dataG.id} modificado correctamente`, { variant: 'success' })
            } else {
                //console.log("error")
                Validator(dataG, response.status)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <DialogTitle>Modificar {modelName}</DialogTitle>
            <DialogContent dividers sx={{ minWidth: 500 }}>
                <Paper sx={{ padding: 2 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Formulario modificar
                    </Typography>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {fields.map((item, i, arr) => {
                            return <Grid item xs={12} sm={arr.length > 4 ? 6 : 12} key={item.id}>
                                <GenerateFields item={item} selectedItem={selectedItem} handleChange={handleChange} validateForm={validateForm} modify={true} />
                            </Grid>
                        })}
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseModal({ type: "edit" })}>Cancel</Button>
                <Button onClick={requestPut} variant="contained">Modificar</Button>
            </DialogActions>
        </>


    );
}