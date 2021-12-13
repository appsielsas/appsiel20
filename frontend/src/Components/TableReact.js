import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import { TextField, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useRowSelect, useSortBy, useTable } from 'react-table';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&.MuiTableRow-head': {
    backgroundColor: theme.palette.primary.light,
  },
  '& .MuiTableCell-head': {
    color: theme.palette.primary.contrastText,
  },
}));

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

export default function TableReact({ columns, data, setSelected }) {

  const { app, model } = useParams();
  const history = useHistory()
  const [search, setSearch] = React.useState({});

  const defaultColumn = React.useMemo(
    () => ({
      // Let's set up our default Filter UI

    }),
    []
  )

  const handleChange = e => {
    const { name, value } = e.target;
    setSearch(prevState => ({
      ...prevState,
      [name]: value
    }))
    console.log(search);
  }

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    getSortByToggleProps,
    headerGroups,
    prepareRow,
    rows,
    selectedFlatRows,
    state: { selectedRowIds },
  } = useTable(
    {
      columns,
      data,
      defaultColumn,
    },
    useSortBy,
    useRowSelect,

    hooks => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: ({ getToggleAllRowsSelectedProps }) => (
            <div>
              <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
            </div>
          ),
        },
        ...columns,
      ]);
    }
  );

  React.useEffect(() => {
    if (selectedFlatRows.length > 0) {
      selectedFlatRows.map(u => {
        const item = { ...u.original };
        delete item.created_at
        delete item.updated_at

        return setSelected(item)
      })
    } else {
      setSelected({})
    }
  }, [selectedFlatRows])

  // Render the UI for your table
  return (

    <TableContainer component={Paper} sx={{ overflowX: 'scroll', width: "100%" }}>
      <Tooltip title="Doble clic para abrir registro" followCursor>
        <Table size="small" {...getTableProps()} id="table1">
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <Fragment key={i + ''}>
                <TableRow>
                  {headerGroup.headers.map(column => (
                    <TableCell>
                      {column.id === 'selection' ? null : <TextField
                        variant="standard"
                        name={column.id}
                        onChange={handleChange}
                        placeholder={`Buscar ${column.Header}...`}
                        size="small"
                      >
                      </TextField>}
                    </TableCell>
                  ))}
                </TableRow>
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
              </Fragment >
            ))}
          </TableHead>

          <TableBody {...getTableBodyProps()} >
            {rows.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()} >
                  {row.cells.map(cell => {
                    return <TableCell {...cell.getCellProps()} onDoubleClick={() => history.push(`/crud/${app}/model/${model}/index/${row.original.id}`)} sx={{ cursor: 'pointer' }}>

                      {cell.render('Cell')}

                    </TableCell>
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </Tooltip>
    </TableContainer >
  )
}


