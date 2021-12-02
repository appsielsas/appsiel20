import { Grow, Slide } from '@mui/material';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import DataTable from 'datatables.net';
import $ from 'jquery';
import React from 'react';
import { usePagination, useRowSelect, useTable } from 'react-table';

$.DataTable = DataTable;

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



function TableCheckBox({ columns, data, setSelected }) {

  // Use the state and functions returned from useTable to build your UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page, // Instead of using 'rows', we'll use page,
    // which has only the rows for the active page

    // The rest of these things are super handy, too ;)
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    selectedFlatRows,
    state: { pageIndex, pageSize, selectedRowIds },
  } = useTable(
    {
      columns,
      data,
    },
    usePagination,
    useRowSelect,
    hooks => {
      hooks.visibleColumns.push((columns) => [
        // Let's make a column for selection
        {
          id: "selection",
          // The header can use the table's getToggleAllRowsSelectedProps method
          // to render a checkbox
          Header: () => <div ><i className="far fa-check-square"></i></div>,
          // The cell can use the individual row's getToggleRowSelectedProps method
          // to the render a checkbox
          Cell: ({ row, getToggleAllRowsSelectedProps }) => {
            if (
              page.filter((row) => row.isSelected).length < 1 ||
              row.isSelected
            ) {
              return (
                <div>
                  <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                </div>
              );
            } else {

              return (

                <div>

                  <IndeterminateCheckbox
                    checked={false}
                    readOnly
                    style={row.getToggleRowSelectedProps().style}
                  />
                </div>
              );
            }
          }
        },
        ...columns
      ]);
    }
  );

  React.useEffect(() => {
    if (selectedFlatRows.length > 0) {
      selectedFlatRows.map(u => {
        const item = { ...u.original };
        /*for (const property in item) {
          if (columns.find(e => e.accessor === property) === undefined && property !== 'id') delete item[property]
        }*/
        delete item.created_at
        delete item.updated_at

        //console.log(item)
        //console.log(u.original)
        return setSelected(item)
      })

    } else {
      setSelected({})
    }

  }, [selectedFlatRows])

  // Render the UI for your table
  return (
    <>
      <TableContainer component={Paper} >
        <Table size="small" {...getTableProps()} id="table1">
          <TableHead>
            {headerGroups.map(headerGroup => (
              <TableRow {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map(column => (
                  <TableCell {...column.getHeaderProps()}>{column.render('Header')}</TableCell>
                ))}
              </TableRow>
            ))}
          </TableHead>
          <TableBody {...getTableBodyProps()}>
            {page.map((row, i) => {
              prepareRow(row)
              return (
                <TableRow {...row.getRowProps()}>
                  {row.cells.map(cell => {
                    return <TableCell {...cell.getCellProps()}>{cell.render('Cell')}</TableCell>
                  })}
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        component="div"
        count={rows.length}
        page={pageIndex}
        onPageChange={(event, newPage) => {
          gotoPage(newPage)
        }}
        rowsPerPage={10}
        onRowsPerPageChange={(event) => {
          setPageSize(parseInt(event.target.value, 10));
          gotoPage(0)
        }}
        SelectProps={{
          inputProps: {
            'aria-label': 'Registros por pagina',
          },
          native: true,
        }}
      />
    </>
  )
}

const TableReact = ({ data, columns, setSelected }) => {

  return (
    <>
      <TableCheckBox columns={columns} data={data} setSelected={setSelected} />
    </>
  )
}

export default TableReact
