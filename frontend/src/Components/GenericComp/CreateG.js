import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';

export default function CreateG({ fields, handleChange, modelName }) {
    return (

        <Paper sx={{ padding: 2 }}>
            <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Crear {modelName}
            </Typography>
            <Box
                component="form"
                sx={{
                    '& .MuiTextField-root': { m: 1 }, display: 'grid', gridTemplateColumns: '1fr', gap: 2
                }}
            >
                {fields.map((item) => (
                    <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" required {...(item.required && { required: item.required })} />
                ))}
            </Box>
        </Paper>


    );
}