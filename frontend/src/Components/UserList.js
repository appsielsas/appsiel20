import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import React from 'react';
import TableReact from './TableReact';
import UserContext from '../application/UserContext';
import TableDataTable from './TableDataTable';


const UserList = (props) => {

    const { SelectedUser, setSelectedUser } = React.useContext(UserContext);

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
            {<TableReact data={data} columns={columns} setSelected={setSelectedUser}></TableReact>}
            {/*<TableDataTable data={data} columns={columns} setSelected={setSelectedUser}></TableDataTable>*/}
        </>
    )
}

export default UserList
