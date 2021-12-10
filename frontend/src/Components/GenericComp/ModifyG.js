import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import Validator from '../../application/Utils';
import * as React from 'react';

export default function SimplePaper(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, children } = props;

    const requestPut = async () => {
        console.log(selectedItem)
        try {
            const response = await fetch(baseUrl + selectedItem.id, {
                method: "PUT",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${window.localStorage.getItem("loggedAppsielApp")}`
                },
                body: JSON.stringify(selectedItem),
            })

            let dataG = await response.json()
            //var dataNueva = dataU;
            if (response.ok) {
                let dataNueva = data.map(row => selectedItem.id === row.id ? dataG : row)
                console.log(dataNueva)
                setData(dataNueva);
                handleCloseModal({ type: "edit" })
                enqueueSnackbar(`${modelName} ${response.id} modificado correctamente`, { variant: 'success' })
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
                                            <MenuItem value={10}>Ten</MenuItem>
                                            <MenuItem value={20}>Twenty</MenuItem>
                                            <MenuItem value={30}>Thirty</MenuItem>
                                        </Select>
                                    </FormControl>
                                default:
                                    return <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.required && { required: item.required })} />
                            }
                        })}
                    </Box>
                </Paper>
            </DialogContent>
            <DialogActions>
                {children}
                <Button type="submit" onClick={requestPut} variant="contained">Modificar</Button>
            </DialogActions>
        </>


    );
}