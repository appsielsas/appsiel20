import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import TableReact from './TableReact';


const UserList = (props) => {
    return (
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
                <TableReact data={props.data}></TableReact>
            </Box>
        </Paper>
    )
}

export default UserList
