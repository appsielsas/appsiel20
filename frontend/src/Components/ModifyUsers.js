import * as React from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import UserContext from '../application/UserContext';

export default function SimplePaper({ handleChange }) {

    const { SelectedUser } = React.useContext(UserContext);

    return (

        <Paper sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Modificar Usuario
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 }, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                }}
                noValidate
                autoComplete="off"
            >

                <TextField fullWidth name="name" onChange={handleChange} label="Nombre" variant="standard" value={SelectedUser && SelectedUser.name} />
                <TextField fullWidth name="email" onChange={handleChange} label="Email" variant="standard" value={SelectedUser && SelectedUser.email} />
                <TextField fullWidth type="password" name="password" onChange={handleChange} label="Contraseña" variant="standard" />
                <TextField fullWidth type="password" name="password_confirmation" onChange={handleChange} onBlur={handleChange} label="Confirmar Contraseña" variant="standard" />
            </Box>
        </Paper>


    );
}