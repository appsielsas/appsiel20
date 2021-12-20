import { Box, Button, Paper, TextField, Typography, DialogActions, DialogContent, DialogTitle, InputLabel, Select, MenuItem, FormControl, Grid, useMediaQuery, FormHelperText, InputAdornment, Input } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPOST, ValidatorForm } from './../../application/Utils'
import Asynchronous from '../Inputs/Asynchronous'
import React, { useEffect } from 'react';
import Functions from '../../application/Functions';
import GenerateFields from '../Inputs/GenerateFields';

export default function CreateG(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model, page = 1 } = useParams();
    const [validateForm, setValidateForm] = React.useState({})

    const requestPost = async () => {

        if (ValidatorForm(fields, selectedItem, setValidateForm)) {
            return
        }

        try {
            const response = await fetch(`${baseUrl}?app_id=${app}&model_id=${model}&page=${page}`, optionsPOST(selectedItem))

            let dataG = await response.json()

            console.log(dataG)
            if (response.ok) {
                console.log("ok")
                enqueueSnackbar(`${modelName} ${dataG.id} agregado correctamente`, { variant: 'success' })
                setData(data.concat(dataG))
                handleCloseModal({ type: "create" })
            } else {
                Validator(dataG, response.status)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const tempFields = fields.reduce((acc, item) => {
            acc = { ...acc, [item.name]: '' }
            return acc
        }, {})

        setValidateForm(tempFields)

    }, [])

    return (
        <>
            <DialogTitle>Insertar {modelName}</DialogTitle>
            <DialogContent dividers sx={{ minWidth: 500 }}>
                <Paper sx={{ padding: 2 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Formulario insertar
                    </Typography>
                    <Grid container spacing={2} sx={{ p: 2 }}>
                        {fields.map((item, i, arr) => {
                            return <Grid item xs={12} sm={arr.length > 5 ? 6 : 12}>
                                <GenerateFields item={item} selectedItem={selectedItem} handleChange={handleChange} validateForm={validateForm} />
                                {console.log(arr[i])}
                            </Grid>
                        })}
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                <Button onClick={requestPost} variant="contained">Crear</Button>
            </DialogActions>
        </ >

    );
}

