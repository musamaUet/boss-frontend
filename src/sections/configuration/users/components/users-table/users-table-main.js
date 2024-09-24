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
import Divider from '@mui/material/Divider';

// hooks
import { useBoolean } from 'src/hooks/use-boolean';

import Iconify from 'src/components/iconify';
import Scrollbar from 'src/components/scrollbar';

import {
  useTable,
  emptyRows,
  getComparator,
  TableEmptyRows,
  TableHeadCustom,
  TablePaginationCustom,
  TableNoData,
  TableSkeleton,
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

import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import UsersTableRow from './users-table-row';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_DATA = Array(10)
  .fill()
  .map((_, index) => ({
    user_name: 'Jhon Doe',
    email: 'jhon@gmaol.com',
    role: 'Admin',
    status: 'inActive',
  }));

const TABLE_HEAD = [
  { id: 'user_name', label: 'Name', align: 'left' },
  { id: 'email', label: 'Email', align: 'center' },
  { id: 'role', label: 'Role', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' },
];

const UsersTable = ({ loading, data, getData, setSelectedRow, paymentsDialog, setSelectedPayment, selectedPayment }) => {
  const table = useTable({
    defaultOrderBy: 'calories',
  });

  const confirm = useBoolean();

  const theme = useTheme();

  const popover = usePopover();

  const [tableData, setTableData] = useState([]);

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
    <>
      <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
        <Scrollbar>
          <Table size={table.dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
            <TableHeadCustom
              headLabel={TABLE_HEAD}
            />

            <TableBody>
              {/* {
                loading?.value ?
                  [...Array(table.rowsPerPage)].map((i, index) => (
                    <TableSkeleton key={index} sx={{ height: denseHeight }} />
                  ))
                  : */}
              {TABLE_DATA?.map((row) => (
                <>
                  <UsersTableRow
                    key={row.id}
                    row={row}
                    onSelectRow={() => table.onSelectRow(row.id)}
                    onViewRow={() => handleViewRow(row.id)}
                    onEditRow={() => handleEditRow(row.id)}
                    onDeleteRow={() => handleDeleteRow(row.id)}
                    setSelectedRow={setSelectedRow}
                    paymentsDialog={paymentsDialog}
                    getData={getData}
                    selectedPayment={selectedPayment}
                    setSelectedPayment={setSelectedPayment}
                  />
                </>
              ))}
              {
                TABLE_DATA?.length === 0 && (
                  <TableNoData
                    notFound={tableData?.length === 0}
                    sx={{
                      m: -2,
                      borderRadius: 1.5,
                      border: `dashed 1px ${theme.palette.divider}`,
                    }}
                  />
                )
              }
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

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.invoice.details(row?._id))
            popover.onClose();
          }}
        >
          <Iconify icon="solar:eye-bold" />
          View
        </MenuItem>

        <MenuItem
          onClick={() => {
            onEditRow();
            popover.onClose();
          }}
        >
          <Iconify icon="solar:pen-bold" />
          Edit
        </MenuItem>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <MenuItem
          onClick={() => {
            confirm.onTrue();
            popover.onClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <Iconify icon="solar:trash-bin-trash-bold" />
          Delete
        </MenuItem>
      </CustomPopover>

      <ConfirmDialog
        open={confirm.value}
        onClose={confirm.onFalse}
        title="Delete"
        content="Are you sure want to delete?"
        action={
          <Button variant="contained" color="error" onClick={confirm.onFalse}>
            Delete
          </Button>
        }
      />
    </>
  );
};

export default UsersTable;
