import { useState, useEffect } from 'react';
import { useTheme } from '@mui/material/styles';
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
  TableNoData,
} from 'src/components/table';

import {
  FormControl,
  InputAdornment,
  InputLabel,
  MenuItem,
  Input,
  Select,
  TextField,
  Button,
  Badge,
  Chip,
} from '@mui/material';
import { applyFilter } from 'src/layouts/_common/searchbar/utils';
import { SvgCrossGray, SvgEditSquare } from 'src/sections/common/components/list-svg-icons';
import TodoTableRow from './todo-table-row';
import TableSkeleton from '../table-skeleton';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_DATA = Array(10)
  .fill()
  .map((_, index) => ({
    name: 'Gardening',
    priority: 'High',
    date: '04 Aug 2024',
    assigned: 'Amiah Pruitt',
    note: 'xyz',
  }));

const TABLE_HEAD = [
  { id: 'title', label: 'Task Title', align: 'left' },
  { id: 'priority', label: 'Priority', align: 'center' },
  { id: 'date', label: 'Due Date', align: 'center' },
  { id: 'assigned', label: 'Assigned', align: 'center' },
  { id: 'notes', label: 'Notes', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' },
];

const TodoTableMain = ({ loading, data, getData, setSelectedRow, todoDialog }) => {
  const table = useTable({
    defaultOrderBy: 'calories',
  });

  const [tableData, setTableData] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    if (data) {
      setTableData(data);
    }
  }, [data]);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(table.order, table.orderBy),
  });

  const denseHeight = table.dense ? 34 : 34 + 20;

  return (
    <div>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
            />

            <TableBody>
              {
                loading?.value ?
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                  :
                  tableData?.map((row) => (
                    <>
                      <TodoTableRow
                        key={row.id}
                        row={row}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        setSelectedRow={setSelectedRow}
                        todoDialog={todoDialog}
                        getData={getData}
                      />
                    </>
                  ))}
              <TableNoData
                notFound={tableData?.length === 0}
                sx={{
                  m: -2,
                  borderRadius: 1.5,
                  border: `dashed 1px ${theme.palette.divider}`,
                }}
              />
            </TableBody>
          </Table>
        </Scrollbar>
      </TableContainer>

      <TablePaginationCustom
        count={dataFiltered.length}
        page={table?.page}
        rowsPerPage={table?.rowsPerPage}
        onPageChange={table?.onChangePage}
        onRowsPerPageChange={table?.onChangeRowsPerPage}
        //
        dense={table?.dense}
        onChangeDense={table?.onChangeDense}
      />
    </div>
  );
};

export default TodoTableMain;
