import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Fab, Input, TableFooter } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { useState } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useRowSelect, useSortBy, useTable } from 'react-table';
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

export default function TableLines({ columns, dataTable, setDataTable, selectedItem, handleChange }) {

    const { app, model } = useParams();
    const history = useHistory()
    const [search, setSearch] = React.useState({});
    const [validateForm, setValidateForm] = React.useState({})


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
                console.log(selectedItem)
                setDataTable(dataTable.concat(selectedItem))
                console.log(JSON.stringify(dataTable))
            }
            console.log('enter')
        }
    }

    /**
     * 
     * @param {number} id 
     */
    const handlerDelete = (id) => {
        console.log(id)
        const newData = dataTable.filter(el => el.id !== id)
        console.log(newData)
        setDataTable(newData)
        //console.log(id)
    }

    // Render the UI for your table
    return (
        <TableContainer component={Paper} sx={{ overflowX: 'scroll', width: "100%" }}>
            <Table size="small" id="table1">
                <TableHead>
                    <StyledTableRow>
                        {columns.map(column => (
                            <TableCell>
                                {column.Header}
                            </TableCell>
                        ))}
                        <TableCell>
                            Eliminar
                        </TableCell>
                    </StyledTableRow>
                </TableHead>
                <TableBody>
                    {dataTable.map((row, i, arr) => (
                        <TableRow >
                            {columns.map(el => <TableCell >
                                {row[el.accessor]}
                            </TableCell>
                            )}
                            < TableCell >
                                <Fab aria-label="print" onClick={() => { handlerDelete(row.id); }} size="small" color="primary" sx={{ color: 'white' }}>
                                    <i className="fas fa-trash"></i>
                                </Fab>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
                <TableFooter>
                    <StyledTableRow >
                        {columns.map((column, i, arr) => (
                            <TableCell>
                                {/*arr[i + 1].accessor*/}
                                {
                                    column.item && <GenerateFields key={column.item.id} item={column.item} selectedItem={selectedItem} handleChange={handleChange} keyDown={(e) => keyDown(e, ((i + 1) < (arr.length)) && arr[i + 1].accessor)} validateForm={validateForm} />
                                }
                            </TableCell>
                        ))}
                        <TableCell>
                            <Input type="button">Insertar linea</Input>
                        </TableCell>
                    </StyledTableRow>
                </TableFooter>
            </Table >
        </TableContainer >
    )
}


