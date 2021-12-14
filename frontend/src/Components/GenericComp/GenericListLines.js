import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Typography from '@mui/material/Typography';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Asynchronous from '../Inputs/Asynchronous';
import TableLines from '../TableLines';
//import { GenerateFields } from './CreateG';


const GenericListLines = () => {


    const [data, setData] = useState([]);
    const [table, setTable] = useState([])
    const [fields, setFields] = useState([])



    const columns = React.useMemo(
        () => table.map((item) => (
            {
                Header: item.label,
                accessor: item.name,
                item: item,
            }
        )), [table])

    React.useEffect(() => {
        console.log('recargs')
        const dataF = JSON.parse('[{ "id": 1, "label": "Nombre", "type": "text", "name": "name", "options": "", "value": "", "attributes": "", "definition": "", "created_at": "2021-12-01T23:44:14.000000Z", "updated_at": "2021-12-01T23:44:14.000000Z", "pivot": { "model_id": 1, "field_id": 1, "position": 1, "required": 1, "editable": 1, "unique": 0 } }, { "id": 2, "label": "E-mail", "type": "email", "name": "email", "options": "", "value": "", "attributes": "", "definition": "", "created_at": "2021-12-01T23:44:14.000000Z", "updated_at": "2021-12-01T23:44:14.000000Z", "pivot": { "model_id": 1, "field_id": 2, "position": 2, "required": 1, "editable": 1, "unique": 1 } }, { "id": 3, "label": "Contraseña", "type": "password", "name": "password", "options": "", "value": "", "attributes": "", "definition": "", "created_at": "2021-12-01T23:44:14.000000Z", "updated_at": "2021-12-01T23:44:14.000000Z", "pivot": { "model_id": 1, "field_id": 3, "position": 3, "required": 1, "editable": 0, "unique": 0 } }, { "id": 4, "label": "Confirmar contraseña", "type": "password", "name": "password_confirmation", "options": "", "value": "", "attributes": "", "definition": "", "created_at": "2021-12-01T23:44:14.000000Z", "updated_at": "2021-12-01T23:44:14.000000Z", "pivot": { "model_id": 1, "field_id": 4, "position": 4, "required": 1, "editable": 0, "unique": 0 } }, { "id": 8, "label": "Empresa", "type": "autocomplete", "name": "company_id", "options": "model_companies", "value": "", "attributes": "", "definition": "", "created_at": "2021-12-01T23:44:14.000000Z", "updated_at": "2021-12-01T23:44:14.000000Z", "pivot": { "model_id": 1, "field_id": 8, "position": 2, "required": 1, "editable": 1, "unique": 0 } }]')

        setTable(dataF)

        const tempData = table.reduce((acc, item) => {
            acc = { ...acc, [item.name]: '' }
            return acc
        }, {})

        //setData([tempData])



    }, [])



    return (
        <div>
            <Typography variant="h3" color="text.secondary" gutterBottom>

            </Typography>
            <TableLines key={'lanuevatabla'} data={data} columns={columns} setData={setData} ></TableLines>
        </div>
    )
}

export default GenericListLines
