import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import React from 'react';
import $ from 'jquery';
import DataTable from 'datatables.net'
import { usePagination, useRowSelect, useTable } from 'react-table';

$.DataTable = DataTable;

const TableDataTable = ({ data, columns, setSelected }) => {

    React.useEffect(() => {
        //console.log(SelectedUser)
        $('#table1').DataTable({
            dom: 'Bfrtip',
            buttons: [
                { extend: 'excel' }
            ],
            searching: false,
            "language": {
                "search": "Buscar",
                "zeroRecords": "Ningún registro encontrado.",
                "info": "Página _PAGE_ de _PAGES_",
                "infoEmpty": "Tabla vacía.",
                "infoFiltered": "(filtrado de _MAX_ registros totales)",
                paginate: {
                    first: "Primero",
                    previous: "Anterior",
                    next: "Siguiente",
                    last: "Ultimo"
                },
            }

        });
    }, [])

    const UpdateDataTable = () => {

    }

    return (
        <>
            <table size="medium" id="table1">
                <thead>
                    <tr>
                        {columns.map(column => (
                            <td>{column.Header}</td>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map(row => (
                        <tr>
                            {columns.map(column => (
                                <td>{row[column.accessor]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        </>
    )
}

export default TableDataTable
