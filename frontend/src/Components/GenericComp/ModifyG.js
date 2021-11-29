import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import * as React from 'react';
import UserContext from '../../application/UserContext';

export default function SimplePaper({ fields, handleChange, modelName, selectedItem }) {

    //const { SelectedUser } = React.useContext(UserContext);

    return (

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
                {fields.map((item) => (
                    <TextField key={item.id + ''} fullWidth type={item.type} name={item.name} onChange={handleChange} onBlur={handleChange} label={item.label} variant="standard" value={selectedItem[item.name]} />
                ))}
            </Box>
        </Paper>


    );
}