import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { Fab, TableFooter } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React from 'react';
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

export default function TableLines({ columns, data, setData }) {

    const { app, model } = useParams();
    const history = useHistory()
    const [search, setSearch] = React.useState({});
    const [selectedItem, setSelectedItem] = React.useState({});

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelectedItem(prevState => ({
            ...prevState,
            [name]: value
        }))
        console.log(selectedItem)
    }

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
                setData(data.concat(selectedItem))
            }
            console.log('enter')
        }
    }

    // Use the state and functions returned from useTable to build your UI
    const {
        getTableProps,
        getTableBodyProps,
        getSortByToggleProps,
        headerGroups,
        footerGroups,
        prepareRow,
        rows,
        selectedFlatRows,
        state: { selectedRowIds },
    } = useTable(
        {
            columns,
            data,
        },
        useSortBy,
        useRowSelect,

        hooks => {
            hooks.visibleColumns.push((columns) => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
                {
                    Header: () => (
                        <div>
                            Eliminar
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <Fab aria-label="print" onClick={() => console.log(row.original.id)} size="small" color="primary" sx={{ color: 'white' }}>
                                <i className="fas fa-trash"></i>
                            </Fab>
                        </div>
                    ),
                },
            ]);
        }
    );


    // Render the UI for your table
    return (
        <form>
            <TableContainer component={Paper} sx={{ overflowX: 'scroll', width: "100%" }}>
                <Table size="small" {...getTableProps()} id="table1">
                    <TableHead>
                        {headerGroups.map((headerGroup, i) => (
                            <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <TableCell {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? <ArrowDropDownIcon fontSize='inherit' />
                                                    : <ArrowDropUpIcon fontSize='inherit' />
                                                : ''}
                                        </span>
                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableHead>
                    <TableBody {...getTableBodyProps()} >
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <TableRow {...row.getRowProps()} >
                                    {row.cells.map(cell => {
                                        return <TableCell {...cell.getCellProps()} sx={{ cursor: 'pointer' }}>
                                            {cell.render('Cell')}
                                        </TableCell>
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableBody>
                    <TableFooter>
                        {headerGroups.map((headerGroup, i) => (
                            <StyledTableRow {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map((column, i, arr) => (
                                    <TableCell {...column.getHeaderProps()}>
                                        {column.item && <GenerateFields key={column.item.id} item={column.item} selectedItem={selectedItem} handleChange={handleChange} keyDown={(e) => keyDown(e, arr[i + 1].id)} />}

                                    </TableCell>
                                ))}
                            </StyledTableRow>
                        ))}
                    </TableFooter>
                </Table>
            </TableContainer >
        </form>
    )
}


