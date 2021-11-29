import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import React from 'react';

import { display } from '@mui/system';

const PdfCreator = () => {
    const [component, setComponent] = React.useState('');


    const handleChange = (event) => {
        setComponent(event.target.value);
    };

    return (
        <div>
            <Paper sx={{ padding: 2, flexGrow: 1 }}>
                <Box
                    component="form"
                    sx={{
                        '& .MuiTextField-root': { m: 1 }, flexDirection: 'column'
                    }}
                    noValidate
                    autoComplete="off"
                >
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        Usuarios
                    </Typography>
                    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
                        <Paper sx={{ display: 'flex', gap: '1rem' }}>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Componentes</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={component}
                                    label="Componentes"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>1 Columna</MenuItem>
                                    <MenuItem value={20}>2 Columnas</MenuItem>
                                    <MenuItem value={30}>3 Columnas</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Contenido</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={component}
                                    label="Contenido"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Titulo</MenuItem>
                                    <MenuItem value={20}>Direccion</MenuItem>
                                    <MenuItem value={30}>DATA</MenuItem>
                                </Select>
                            </FormControl>
                            <FormControl fullWidth>
                                <InputLabel id="demo-simple-select-label">Contenido</InputLabel>
                                <Select
                                    labelId="demo-simple-select-label"
                                    id="demo-simple-select"
                                    value={component}
                                    label="Contenido"
                                    onChange={handleChange}
                                >
                                    <MenuItem value={10}>Titulo</MenuItem>
                                    <MenuItem value={20}>Direccion</MenuItem>
                                    <MenuItem value={30}>DATA</MenuItem>
                                </Select>
                            </FormControl>
                        </Paper>
                        <Paper>

                        </Paper>
                    </Box>

                </Box>
            </Paper>
        </div >
    )
}

export default PdfCreator
