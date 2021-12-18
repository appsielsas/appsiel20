import { Button, ButtonGroup, Fab, TableFooter } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import { ValidatorForm } from '../application/Utils';
import { StyledTableRow } from './../CustomStyles';
import { GenerateFields } from './GenericComp/CreateG';


const IndeterminateCheckbox = React.forwardRef(
    ({ indeterminate, ...rest }, ref) => {
        const defaultRef = React.useRef();
        const resolvedRef = ref || defaultRef;

        React.useEffect(() => {
            resolvedRef.current.indeterminate = indeterminate;
        }, [resolvedRef, indeterminate]);

        return (
            <>
                <Checkbox ref={resolvedRef} {...rest} />
            </>
        );
    }
);

export default function TableLines({ fields, columns, dataTable, setDataTable, selectedItem, handleChange }) {

    const [validateForm, setValidateForm] = React.useState(selectedItem)
    const [tableLineEdit, setTableLineEdit] = React.useState({ id: -1 })
    const [changed, setChanged] = React.useState(true)

    const keyDown = (e, next) => {
        if (e.code === 'Enter') {
            console.log(next)
            const nextfield = document.querySelector(
                `input[name=${next}]`
            );

            // If found, focus the next field
            if (nextfield !== null) {
                nextfield.focus();
            } else {
                handleInsert(e)
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
        let newData = dataTable.map(row => tableLineEdit.id === row.id ? tableLineEdit : row)
        refreshId()
        setDataTable(newData);
        window.localStorage.setItem('dataTableLines', JSON.stringify(newData))
        setTableLineEdit({ id: -1 })
    }

    const handleChangeEdit = (e) => {
        const { name, value } = e.target;
        setTableLineEdit(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(tableLineEdit)
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


        setValidateForm(tempFields)
    }

    useEffect(() => {
        console.log('cambió')

    }, [changed])

    // Render the UI for your table
    return (

        <TableContainer component={Paper} sx={{ overflowX: 'scroll', width: "100%" }}>
            <Table size="small" id="table1">
                <TableHead>
                    <StyledTableRow>
                        <TableCell width="120px">
                            Ordenar
                        </TableCell>
                        {columns.map(column => (
                            <TableCell>
                                {column.Header}
                            </TableCell>
                        ))}
                        <TableCell>
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
                            {columns.map((column, j, arj) => {
                                if (row.id === tableLineEdit.id) {
                                    return <TableCell>
                                        {
                                            column.item && <GenerateFields key={j} item={column.item} selectedItem={tableLineEdit} handleChange={handleChangeEdit} validateForm={validateForm} />
                                        }
                                    </TableCell>
                                } else {
                                    return <TableCell onDoubleClick={() => setTableLineEdit(row)} onClick={() => { handlerEdit(); console.log('entro') }}>
                                        {row[column.accessor]}
                                    </TableCell>
                                }
                            }
                            )}
                            <TableCell >
                                {row.id === tableLineEdit.id ? <Fab aria-label="set" onClick={() => { handlerEdit(row.id); }} size="small" color="secondary" sx={{ color: 'white' }}>
                                    <i className="fas fa-check"></i>
                                </Fab> :
                                    <Fab aria-label="delete" onClick={() => { handlerDelete(row.id); }} size="small" color="primary" sx={{ color: 'white' }}>
                                        <i className="fas fa-trash"></i>
                                    </Fab>}
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow >
                        <TableCell>

                        </TableCell>
                        {columns.map((column, i, arr) => (
                            <TableCell>
                                {
                                    column.item && <GenerateFields key={column.item.id} item={column.item} selectedItem={selectedItem} handleChange={handleChange} keyDown={(e) => keyDown(e, ((i + 1) < (arr.length)) && arr[i + 1].accessor)} validateForm={validateForm} />
                                }
                            </TableCell>
                        ))}
                        <TableCell>
                            <Fab aria-label="insert" onClick={handleInsert} size="small" color="secondary" sx={{ color: 'white' }}>
                                <i className="fas fa-check"></i>
                            </Fab>
                        </TableCell>
                    </StyledTableRow>
                    <TableRow>
                        <TableCell colSpan={2}><Button variant="contained">Registrar documento</Button></TableCell>
                    </TableRow>
                </TableFooter>
            </Table >
        </TableContainer >
    )
}


