import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { Box, Container, Grid, IconButton, Paper, Tooltip, Typography } from '@mui/material';
import React from 'react';
import { UserContext } from "../../application/UserProvider";


const FieldValue = ({ field, value }) => {
    return <>
        <Grid item xs={4} sm={2} md={1}>
            <Typography variant="subtitle2">{field}</Typography>
        </Grid>
        <Grid item xs={8} sm={4} md={3}>
            <Typography variant="body2">
                {value}
                <Tooltip title="Copiar al portapapeles">
                    <IconButton
                        color="secondary"
                        onClick={() => navigator.clipboard.writeText(value)}
                        size="small"
                    >
                        <ContentCopyIcon fontSize="inherit" />
                    </IconButton>
                </Tooltip>
            </Typography>
        </Grid>
    </>
}

const Users = () => {

    //sesiones de usuario
    const { user } = React.useContext(UserContext);

    return (
        <Container>
            <Typography variant="h3">Perfil</Typography>
            <Box component={Paper} sx={{ p: 4 }}>
                <Grid container spacing={2}>
                    <FieldValue field="Usuario:" value={user.name}></FieldValue>
                    <FieldValue field="Email:" value={user.email}></FieldValue>
                    <FieldValue field="Email verificado:" value={user.email_verified_at ? 'si' : 'no'}></FieldValue>
                </Grid>
            </Box>
        </Container>
    )
}

export default Users
