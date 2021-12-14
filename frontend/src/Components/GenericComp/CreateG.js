import { Box, Button, Paper, TextField, Typography, DialogActions, DialogContent, DialogTitle, InputLabel, Select, MenuItem, FormControl, Grid, useMediaQuery } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPOST } from './../../application/Utils'
import Asynchronous from '../Inputs/Asynchronous'
import React, { useEffect } from 'react';

export default function CreateG(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model, page = 1 } = useParams();

    const requestPost = async (e) => {

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
                            return item.pivot.editable === 1 &&
                                <Grid item xs={12} sm={arr.length > 5 ? 6 : 12}>
                                    <GenerateFields item={item} selectedItem={selectedItem} handleChange={handleChange} />
                                    {console.log(arr[i])}
                                </Grid>
                        })}
                    </Grid>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                <Button type="submit" onClick={requestPost} variant="contained">Crear</Button>
            </DialogActions>
        </ >

    );
}

export const GenerateFields = ({ item, selectedItem, handleChange, keyDown }) => {

    useEffect(() => {
        console.log('re-render')
    }, [])

    return <>
        {item.type === "autocomplete" && <Asynchronous key={item.id + ''} item={item} handleChange={handleChange} keyDown={keyDown} path={item.options} />}
        {
            item.type === "select" && <FormControl fullWidth variant="standard" {...(item.pivot.required === 1 && { required: true })} key={item.id + ''}>
                <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                <Select
                    labelId={`simple-select-label-${item.label}`}
                    id={`simple-select-${item.label}`}
                    name={item.name}
                    value={selectedItem[item.name] || item.value}
                    label={item.label}
                    onChange={handleChange}
                >
                    {JSON.parse(item.options).map((el) => {
                        const [value, label] = el;
                        return <MenuItem value={value}>{label}</MenuItem>
                    })}
                </Select>
            </FormControl>
        }
        {item.type !== "select" && item.type !== "autocomplete" && <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.required && { required: item.required })} value={selectedItem[item.name] || ''} onKeyDown={keyDown}

        />}
    </>
}