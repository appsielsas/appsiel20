import { Button, ButtonGroup, IconButton, TableFooter } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useEffect } from 'react';
import { ValidatorForm } from '../application/Utils';
import { StyledTableRow } from './../CustomStyles';
import GenerateFields from './Inputs/GenerateFields';

export default function TableLines({ fields, columns, dataTable, setDataTable, selectedItem, handleChange }) {

    const [validateForm, setValidateForm] = React.useState(selectedItem)
    const [selectedItemEdit, setSelectedItemEdit] = React.useState({ id: -1 })
    const [changed, setChanged] = React.useState(true)

    const keyDown = (e, next) => {
        if (e.code === 'Enter' || e.code === 'NumpadEnter') {
            console.log(next)
            const nextfield = document.querySelector(
                `input[name=${next}]`
            );

            // If found, focus the next field
            if (nextfield !== null) {
                nextfield.focus();
            } else {

                document.querySelector('#insert').focus()
            }
            console.log('enter')
        }
    }

    const refreshId = () => {
        const newData = dataTable.map((el, i) => el.id = i)
        setDataTable(newData)
        setChanged(!changed)
    }

    const handleInsert = (e) => {
        e.preventDefault()
        if (ValidatorForm(fields, selectedItem, setValidateForm)) {
            return
        }
        console.log(selectedItem)
        refreshId()
        setDataTable(dataTable.concat(selectedItem))
        window.localStorage.setItem('dataTableLines', JSON.stringify(dataTable.concat(selectedItem)))
        console.log(dataTable)
        resetForm()
    }

    const handlerDelete = (id) => {
        console.log(id)
        const newData = dataTable.filter(el => el.id !== id)
        console.log(newData)
        refreshId()
        setDataTable(newData)
        window.localStorage.setItem('dataTableLines', JSON.stringify(newData))
    }

    const handlerEdit = () => {
        if (ValidatorForm(fields, selectedItemEdit, setValidateForm)) {
            return
        }
        let newData = dataTable.map(row => selectedItemEdit.id === row.id ? selectedItemEdit : row)
        refreshId()
        setDataTable(newData);
        window.localStorage.setItem('dataTableLines', JSON.stringify(newData))
        setSelectedItemEdit({ id: -1 })
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setSelectedItemEdit(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(selectedItemEdit)
    }

    const sortByButton = (sentido, idx) => {
        const newData = dataTable;
        if (sentido) {
            if (idx > 0) {
                const prevRow = { ...newData[idx - 1] }
                const currentRow = { ...newData[idx] }
                delete prevRow.id
                delete currentRow.id
                newData[idx] = Object.assign(newData[idx], prevRow)
                newData[idx - 1] = Object.assign(newData[idx - 1], currentRow)
                refreshId()
                setDataTable(newData)
                window.localStorage.setItem('dataTableLines', JSON.stringify(newData))
                console.log(dataTable)
            }
        } else {
            if (idx < newData.length - 1) {
                const currentRow = { ...newData[idx] }
                const nextRow = { ...newData[idx + 1] }
                delete currentRow.id
                delete nextRow.id
                newData[idx] = Object.assign(newData[idx], nextRow)
                newData[idx + 1] = Object.assign(newData[idx + 1], currentRow)
                refreshId()
                setDataTable(newData)
                window.localStorage.setItem('dataTableLines', JSON.stringify(newData))
                console.log(dataTable)
            }
        }
    }

    const resetForm = () => {
        const tempFields = fields.reduce((acc, item) => {
            acc = { ...acc, [item.name]: '' }
            return acc
        }, {})
        for (const property in tempFields) {
            handleChange({ target: { name: property, value: '' } })
        }
        setValidateForm(tempFields)
    }

    useEffect(() => {
        console.log('cambi??')

    }, [changed])



    // Render the UI for your table
    return (

        <TableContainer component={Paper} sx={{ width: "100%" }}>
            <Table size="small" id="table1">
                <TableHead>
                    <StyledTableRow>
                        <TableCell width="20px">
                            Ordenar
                        </TableCell>
                        <TableCell width="20px">
                            ID
                        </TableCell>
                        {columns.map((column, i) => (
                            <TableCell key={i}>
                                {column.Header}
                            </TableCell>
                        ))}
                        <TableCell width="20px">
                            Acciones
                        </TableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {dataTable.map((row, idx, arr) => (
                        <TableRow key={row.id}>
                            <TableCell style={{ textAlign: 'center' }}>
                                <ButtonGroup
                                    orientation="vertical"
                                    aria-label="vertical outlined button group"
                                    variant='text'
                                >
                                    {idx > 0 && <Button aria-label="sortUp" onClick={() => { sortByButton(true, idx); }} size="small" color="primary">
                                        <i className="fas fa-chevron-up"></i>
                                    </Button>}
                                    {idx < arr.length - 1 && <Button aria-label="sortDown" onClick={() => { sortByButton(false, idx); }} size="small" color="primary">
                                        <i className="fas fa-chevron-down"></i>
                                    </Button>}
                                </ButtonGroup>
                            </TableCell>
                            <TableCell style={{ textAlign: 'center' }}>
                                {row.id}
                            </TableCell>
                            {columns.map((column, j, arj) => {
                                if (row.id === selectedItemEdit.id) {
                                    return <TableCell key={j}>
                                        {
                                            column.item && <GenerateFields item={column.item} selectedItem={selectedItemEdit} handleChange={handleChangeEdit} keyDown={(e) => keyDown(e, ((j + 1) < (arj.length)) && arj[j + 1].accessor)} validateForm={validateForm} />
                                        }
                                    </TableCell>
                                } else {
                                    return <TableCell onDoubleClick={() => setSelectedItemEdit(row)} onClick={() => { selectedItemEdit.id !== -1 && handlerEdit(); console.log('entro') }}>
                                        {column.item.type === "monetary" || column.item.attributes === "monetary" ? Number(row[column.accessor]).toLocaleString('es-CO', { style: 'currency', currency: 'USD', minimumFractionDigits: 2 }) : row[column.accessor]}
                                    </TableCell>
                                }
                            }
                            )}
                            <TableCell >
                                {row.id === selectedItemEdit.id ? <IconButton aria-label="set" id="insert" onClick={() => { handlerEdit(row.id); }} sx={{ boxShadow: 3, bgcolor: 'secondary.dark', color: 'text.secondary' }}>
                                    <i className="fas fa-check"></i>
                                </IconButton> :
                                    <IconButton aria-label="delete" onClick={() => { handlerDelete(row.id); }} sx={{ boxShadow: 3, bgcolor: 'error.light', color: 'text.error' }}>
                                        <i className="fas fa-trash"></i>
                                    </IconButton>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow >
                        <TableCell>

                        </TableCell>
                        <TableCell>
                            {selectedItem.id}
                        </TableCell>
                        {selectedItemEdit.id === -1 && columns.map((column, i, arr) => (
                            <TableCell key={column.item.id}>
                                {
                                    column.item && <GenerateFields item={column.item} selectedItem={selectedItem} handleChange={handleChange} keyDown={(e) => keyDown(e, ((i + 1) < (arr.length)) && arr[i + 1].accessor)} validateForm={validateForm} />
                                }
                            </TableCell>
                        ))}
                        <TableCell>
                            {selectedItemEdit.id === -1 && <IconButton aria-label="insert" id="insert" onClick={handleInsert} sx={{ boxShadow: 3, bgcolor: 'secondary.dark', color: 'text.secondary' }}>
                                <i className="fas fa-check"></i>
                            </IconButton>}
                        </TableCell>
                    </StyledTableRow>
                </TableFooter>
            </Table >
        </TableContainer >
    )
}


