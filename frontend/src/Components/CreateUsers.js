import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';

export default function SimplePaper({handleChange}) {
    return (

        <Paper sx={{ padding: 2}}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                    Crear Usuario
                </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1}, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                }}
                noValidate
                autoComplete="off"
            >
                
                    <TextField fullWidth type="text" name="name" onChange={handleChange} onBlur={handleChange} label="Nombre" variant="standard" />
                    <TextField fullWidth type="email" name="email" onChange={handleChange} onBlur={handleChange} label="Email" variant="standard" />
                    <TextField fullWidth type="password" name="password" onChange={handleChange} onBlur={handleChange} label="Contraseña" variant="standard" />                    
                    <TextField fullWidth type="password" name="password_confirmation" onChange={handleChange} onBlur={handleChange} label="Confirmar Contraseña" variant="standard" />  
            </Box>
        </Paper>


    );
}