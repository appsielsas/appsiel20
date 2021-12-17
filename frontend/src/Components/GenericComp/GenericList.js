import { Pagination, PaginationItem } from '@mui/material';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import TableReact from '../TableReact';


const GenericList = (props) => {

    const columns = React.useMemo(
        () => props.headers,
        []
    )

    //const data = React.useMemo(() => [...props.data], [props.data])
    const data = props.data
    /**
     * @param {number} page
     */
    const { app, model, page = 1 } = useParams();

    return (
        <>
            <Typography variant="h3" color="text.secondary" gutterBottom>
                {props.modelName}
            </Typography>
            <TableReact
                key={props.modelName + app + model}
                data={data}
                columns={columns}
                setSelected={props.setSelectedItem}
                setSelectedItemsToDelete={props.setSelectedItemsToDelete}
            />
            <Pagination sx={{ mt: 2 }} page={parseInt(page)} count={props.pages} color="secondary" renderItem={(item) => (
                <PaginationItem
                    component={Link}
                    to={`/crud/${app}/model/${model}/page/${item.page}`}
                    {...item}
                />
            )} />
        </>
    )
}

export default GenericList
