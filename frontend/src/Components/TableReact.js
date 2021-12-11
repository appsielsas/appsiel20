import { TextField, Tooltip } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import React, { Fragment } from 'react';
import { useParams } from 'react-router';
import { useHistory } from 'react-router-dom';
import { useColumnOrder, useFilters, useResizeColumns, useRowSelect, useSortBy, useTable } from 'react-table';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// Define a default UI for filtering
function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter },
}) {
  const count = preFilteredRows.length

  return (
    <TextField
      variant="standard"
      value={filterValue || ''}
      onChange={e => {
        setFilter(e.target.value || undefined) // Set undefined to remove the filter entirely
      }}
      placeholder={`Buscar ${count} registros...`}
      size="small"
    >
    </TextField>
  )
}



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
    state: { pageIndex, pageSize, selectedRowIds },
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
        // Let's make a column for selection
        /*{
          //id: 'selection',
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: () => (
            <div>
              Eliminar
            </div>
          ),
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row }) => (
            <div>
              <Button variant="contained" color="primary">{row.original.id}</Button>
            </div>
          ),
        },*/
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

    <TableContainer  >
      <Tooltip title="Doble clic para abrir registro" followCursor>
        <Table size="small" {...getTableProps()} id="table1">
          <TableHead>
            {headerGroups.map((headerGroup, i) => (
              <Fragment key={i}>
                <TableRow {...headerGroup.getHeaderGroupProps()}>
                  {headerGroup.headers.map(column => (
                    <TableCell {...column.getHeaderProps()}>
                      <div>
                        {column.canFilter ? <TextField
                          variant="standard"
                          name={column.id}
                          onChange={handleChange}
                          placeholder={`Buscar ${column.Header}...`}
                          size="small"
                        >
                        </TextField> : null}
                      </div>
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
                </TableRow>
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
                      {console.log(cell)}
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


