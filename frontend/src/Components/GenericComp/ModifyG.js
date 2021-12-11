import { Box, Paper, Button, TextField, Typography, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPUT } from './../../application/Utils'

export default function SimplePaper(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model, page = 1, id } = useParams();

    const requestPut = async () => {
        console.log(selectedItem)
        try {
            const response = await fetch(`${baseUrl}/${selectedItem.id}?app_id=${app}&model_id=${model}`, optionsPUT(selectedItem))

            let dataG = await response.json()
            //var dataNueva = dataU;
            if (response.ok) {
                let dataNueva = data.map(row => selectedItem.id === row.id ? dataG : row)
                console.log(dataNueva)
                setData(dataNueva);
                handleCloseModal({ type: "edit" })
                enqueueSnackbar(`${modelName} ${dataG.id} modificado correctamente`, { variant: 'success' })
            } else {
                console.log("error")
                Validator(dataG, response.status)
            }

        } catch (error) {
            console.log(error)
        }
    }


    return (
        <>
            <DialogTitle>Modificar</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                <Paper sx={{ padding: 2 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Modificar {modelName}
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root': { m: 1 }, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        {fields.map((item) => {

                            switch (item.type) {
                                case "select":
                                    return <FormControl variant="standard" key={item.id + ''}>
                                        <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                                        <Select
                                            labelId={`simple-select-label-${item.label}`}
                                            id={`simple-select-${item.label}`}
                                            name={item.name}
                                            value={selectedItem[item.name] || ''}
                                            label={item.label}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>Ten</MenuItem>
                                        </Select>
                                    </FormControl>
                                default:
                                    return item.pivot.editable === 1 ? <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.required && { required: item.required })} value={selectedItem && selectedItem[item.name]} /> : ''
                            }
                        })}
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => handleCloseModal({ type: "edit" })}>Cancel</Button>
                <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
            </DialogActions>
        </>


    );
}