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
} from '@mui/material';
import { applyFilter } from 'src/layouts/_common/searchbar/utils';
import { SvgCrossGray, SvgEditSquare } from 'src/sections/common/components/list-svg-icons';
import CalenderTableRow from './calender-table-row';
import TableSkeleton from '../table-skeleton';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_DATA = Array(10)
  .fill()
  .map((_, index) => ({
    id: index,
    name: 'Christmas',
    date: '04 Aug 2024',
    time: '5:47 pm',
    location: 'United States',
    description: 'Lorem Ipsum is simply',
  }));

const TABLE_HEAD = [
  { id: 'name', label: 'Event Name', align: 'left' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'time', label: 'Time', align: 'center' },
  { id: 'location', label: 'Location', align: 'center' },
  { id: 'desc', label: 'Description', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'right' },
];

const CalenderTableMain = ({ loading, data, getData, setSelectedRow, calenderDialog }) => {
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
                      <CalenderTableRow
                        key={row.id}
                        row={row}
                        onSelectRow={() => table.onSelectRow(row.id)}
                        onViewRow={() => handleViewRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        setSelectedRow={setSelectedRow}
                        calenderDialog={calenderDialog}
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
        page={table.page}
        rowsPerPage={table.rowsPerPage}
        onPageChange={table.onChangePage}
        onRowsPerPageChange={table.onChangeRowsPerPage}
        //
        dense={table.dense}
        onChangeDense={table.onChangeDense}
      />
    </div>
  );
};

export default CalenderTableMain;
