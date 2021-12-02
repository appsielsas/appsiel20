import Typography from '@mui/material/Typography';
import React from 'react';
import TableReact from '../TableReact';


const GenericList = (props) => {

    const columns = React.useMemo(
        () => props.headers,
        []
    )

    const data = React.useMemo(() => [...props.data], [props.data])

    return (
        <>
            <Typography variant="h3" color="text.secondary" gutterBottom>
                {props.modelName}
            </Typography>
            {<TableReact data={data} columns={columns} setSelected={props.setSelectedItem}></TableReact>}
        </>
    )
}

export default GenericList
