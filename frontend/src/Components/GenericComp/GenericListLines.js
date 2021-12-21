import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import TableLines from '../TableLines';
//import { GenerateFields } from './CreateG';


const GenericListLines = () => {

    const [dataTable, setDataTable] = useState([]);
    const [selectedItem, setSelectedItem] = React.useState({});
    const [fields, setFields] = useState([])

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(selectedItem)
    }

    const columns = React.useMemo(
        () => fields.map((item) => (
            {
                Header: item.label,
                accessor: item.name,
                item: item,
            }
        )), [fields])


    React.useEffect(() => {
        console.log('recargs');
        async function fetchData() {
            const response = await fetch('/fields.json')
            const dataF = await response.json()
            setFields(dataF)
        }
        fetchData()

        const tempItem = fields.reduce((acc, item) => {
            acc = { ...acc, [item.name]: '' }
            return acc
        }, {})

        setSelectedItem(tempItem)

        const tempData = JSON.parse(window.localStorage.getItem('dataTableLines'))
        console.log(tempData)
        tempData && setDataTable(tempData)

        console.log(JSON.parse(window.localStorage.getItem('dataTableLines')))

    }, [])


    React.useEffect(() => {
        setSelectedItem({ ...selectedItem, id: dataTable.length })
    }, [dataTable])


    return (
        <div>
            <Typography variant="h4" color="text.secondary" gutterBottom>
                Lineas de Registro
            </Typography>
            <TableLines fields={fields} columns={columns} dataTable={dataTable} setDataTable={setDataTable} selectedItem={selectedItem} handleChange={handleChange} ></TableLines>
        </div>
    )
}

export default GenericListLines
