import { Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import { useSnackbar } from 'notistack';
import Validator from '../../application/Utils';
import * as React from 'react';

export default function CreateG(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, children } = props;

    const requestPost = async (e) => {

        try {
            const response = await fetch(baseUrl, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(selectedItem),
            })

            let dataG = await response.json()

            console.log(dataG)
            if (response.ok) {
                console.log("ok")
                enqueueSnackbar(`${modelName} ${response.id} agregado correctamente`, { variant: 'success' })
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
            <DialogTitle>Insertar</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                <DialogContentText>
                    <Paper sx={{ padding: 2 }}>
                        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                            Crear {modelName}
                        </Typography>
                        <Box
                            component="form"
                            sx={{
                                '& .MuiTextField-root': { m: 1 }, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                            }}
                            onSubmit={requestPost}
                        >
                            {fields.map((item) => {

                                switch (item.type) {
                                "select":
                            return <>
                                <InputLabel id="demo-simple-select-label">Age</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={age}
                                    label="Age"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Ten</MenuItem>
                                    <MenuItem value={20}>Twenty</MenuItem>
                                    <MenuItem value={30}>Thirty</MenuItem>
                                </Select>
                            </>
                            default:
                            return <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.required && { required: item.required })} /> 
                                }
                                

})}
                        </Box>
                    </Paper>
                </DialogContentText>

            </DialogContent>
            <DialogActions>
                {children}
                <Button type="submit" variant="contained">Crear</Button>
            </DialogActions>

        </>

    );
}