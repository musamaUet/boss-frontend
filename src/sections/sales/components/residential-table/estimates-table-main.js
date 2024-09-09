import { useState, useEffect } from 'react';

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
import EstimatesTableRow from './estimates-table-row';

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const TABLE_HEAD = [
  { id: 'doc_num', label: 'Doc #', align: 'left' },
  { id: 'date', label: 'Date', align: 'center' },
  { id: 'type', label: 'Type', align: 'center' },
  { id: 'contractor', label: 'Contractor', align: 'center' },
  { id: 'customer', label: 'Customer', align: 'center' },
  { id: 'amount', label: 'Amount', align: 'center' },
  { id: 'status', label: 'Status', align: 'center' },
  { id: 'paid', label: 'Paid', align: 'center' },
  { id: 'notes', label: 'Notes', align: 'center' },
  { id: 'actions', label: 'Actions', align: 'center' },
];

const EstimatesTable = ({ type }) => {

  const TABLE_DATA = Array(10)
    .fill()
    .map((_, index) => ({
      doc_num: 'E-2024-221',
      date: 'Jul-12-2024',
      type: type === 'residential' ? 'Residential' : type === 'commercial' ? 'Commercial' : 'Services',
      contractor: 'Mr. Alli',
      customer: 'Alice',
      amount: '$25.50',
      status: 'Pending',
      paid: 'Deposit',
      notes: 'Mornings call',
    }));

  const table = useTable({
    defaultOrderBy: 'calories',
  });

  const confirm = useBoolean();

  const popover = usePopover();

  const [tableData, setTableData] = useState([]);

  useEffect(() => {
    setTableData(TABLE_DATA);
  }, []);

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
              order={table.order}
              orderBy={table.orderBy}
              headLabel={TABLE_HEAD}
              rowCount={tableData.length}
              numSelected={table.selected.length}
            />

            <TableBody>
              {dataFiltered
                .slice(
                  table.page * table.rowsPerPage,
                  table.page * table.rowsPerPage + table.rowsPerPage
                )
                .map((row) => (
                  <>
                    {console.log(row)}
                    <EstimatesTableRow
                      key={row.id}
                      row={row}
                      onSelectRow={() => table.onSelectRow(row.id)}
                      onViewRow={() => handleViewRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                    />
                    {/* <TableRow hover key={row.name}>
                    <TableCell> {row.name} </TableCell>
                    <TableCell align="center">{row.calories}</TableCell>
                    <TableCell align="center">{row.fat}</TableCell>
                    <TableCell align="center">{row.carbs}</TableCell>
                    <TableCell align="center">{row.protein}</TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        whiteSpace: 'nowrap',
                      }}
                    >
                      <Stack direction={'row'} justifyContent="end" spacing={1}>
                        <Button
                          variant="outlined"
                          sx={{ width: 40, minWidth: 40, height: 40 }}
                          onClick={(e) => {
                            console.log(e);
                          }}
                        >
                          {SvgEditSquare}
                        </Button>
                        <Button variant="outlined" sx={{ width: 40, minWidth: 40, height: 40 }}>
                          {SvgCrossGray}
                        </Button>
                      </Stack>
                    </TableCell>
                  </TableRow> */}
                  </>
                ))}

              <TableEmptyRows
                height={denseHeight}
                emptyRows={emptyRows(table.page, table.rowsPerPage, tableData.length)}
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

      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            router.push(paths.dashboard.invoice)
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

export default EstimatesTable;
