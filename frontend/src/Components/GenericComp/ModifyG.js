import { Box, Paper, Button, TextField, Typography, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, Grid } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPUT } from './../../application/Utils'
import Asynchronous from '../Inputs/Asynchronous'

export default function SimplePaper(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model } = useParams();

    const requestPut = async () => {
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
                            return item.pivot.editable === 1 &&
                                <Grid item xs={12} sm={arr.length > 5 ? 6 : 12}>
                                    {item.type === "autocomplete" && <Asynchronous key={item.id + ''} item={item} path={item.options} handleChange={handleChange} />}
                                    {item.type === "select" && <FormControl fullWidth variant="standard" key={item.id + ''}>
                                        <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                                        <Select
                                            labelId={`simple-select-label-${item.label}`}
                                            id={`simple-select-${item.label}`}
                                            name={item.name}
                                            value={selectedItem[item.name] || item.value || ''}
                                            label={item.label}
                                            onChange={handleChange}
                                        >
                                            {JSON.parse(item.options).map((el) => {
                                                const [value, label] = el;
                                                return <MenuItem value={value}>{label}</MenuItem>
                                            })}
                                        </Select>
                                    </FormControl>}
                                    {item.type !== "select" && item.type !== "autocomplete" && <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.required && { required: item.required })} value={selectedItem && selectedItem[item.name]} />}
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