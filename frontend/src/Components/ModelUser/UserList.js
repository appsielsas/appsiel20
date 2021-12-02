import Typography from '@mui/material/Typography';
import React from 'react';
import TableReact from './../TableReact';


const UserList = (props) => {

    const columns = React.useMemo(
        () => [
            {
                Header: 'Nombre',
                accessor: 'name'
            },
            {
                Header: 'Email',
                accessor: 'email'
            }
        ],
        []
    )

    const data = React.useMemo(() => [...props.data], [props.data])

    return (
        <>
            <Typography variant="h3" color="text.secondary" gutterBottom>
                Usuarios
            </Typography>
            {<TableReact data={data} columns={columns} setSelected={props.setSelected}></TableReact>}
        </>
    )
}

export default UserList
