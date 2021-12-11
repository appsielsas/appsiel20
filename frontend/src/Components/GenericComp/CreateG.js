import { Box, Button, Paper, TextField, Typography, DialogActions, DialogContent, DialogTitle, InputLabel, Select, MenuItem, FormControl } from '@mui/material';
import { useSnackbar } from 'notistack';
import { useParams } from 'react-router-dom';
import { optionsPOST } from './../../application/Utils'

export default function CreateG(props) {

    const { enqueueSnackbar } = useSnackbar();
    const { baseUrl, modelName, fields, handleChange, selectedItem, handleCloseModal, data, setData, Validator } = props;
    const { app, model, page = 1, id } = useParams();

    const requestPost = async (e) => {
        e.preventDefault()
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

            <DialogTitle>Insertar</DialogTitle>
            <DialogContent sx={{ minWidth: 500 }}>
                <Paper sx={{ padding: 2 }}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Crear {modelName}
                    </Typography>
                    <Box
                        component="form"
                        sx={{
                            '& .MuiTextField-root, & .MuiFormControl-root': { m: 1 }, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                        }}
                        onSubmit={requestPost}
                    >
                        {fields.map((item) => {
                            console.log(item)
                            switch (item.type) {
                                case "select":
                                    return <FormControl variant="standard" {...(item.pivot.required === 1 && { required: true })} key={item.id + ''}>
                                        <InputLabel id="demo-simple-select-label">{item.label}</InputLabel>
                                        <Select
                                            labelId={`simple-select-label-${item.label}`}
                                            id={`simple-select-${item.label}`}
                                            name={item.name}
                                            value={selectedItem[item.name] || ''}
                                            label={item.label}
                                            onChange={handleChange}

                                        >
                                            <MenuItem value={1}>demoAppsiel</MenuItem>
                                        </Select>
                                    </FormControl>
                                default:
                                    return <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" {...(item.pivot.required === 1 && { required: true })} />
                            }
                        })}
                        <DialogActions>
                            <Button onClick={() => handleCloseModal({ type: "create" })}>Cancel</Button>
                            <Button type="submit" variant="contained">Crear</Button>
                        </DialogActions>
                    </Box>
                </Paper>
            </DialogContent>


        </>

    );
}