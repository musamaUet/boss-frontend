import React, { useState } from 'react';
//@mui
import Table from '@mui/material/Table';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import TableRow from '@mui/material/TableRow';
import Checkbox from '@mui/material/Checkbox';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
// hooks
import { useBoolean } from 'src/hooks/use-boolean';
// components
import CustomPopover, { usePopover } from 'src/components/custom-popover';
import { ConfirmDialog } from 'src/components/custom-dialog';
import Iconify from 'src/components/iconify';
import { SvgEditSquare } from 'src/sections/common/components/list-svg-icons';
import { useRouter } from 'src/routes/hooks';
import { paths } from 'src/routes/paths';
import { formatDate } from 'src/utils/format-number';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { CircularProgress, Radio } from '@mui/material';

export default function PaymentsTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  setSelectedRow,
  paymentsDialog,
  getData,
  selectedPayment,
  setSelectedPayment
}) {
  const confirm = useBoolean();
  const delLoading = useBoolean()
  const popover = usePopover();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const deleteData = async (id) => {
    delLoading.onTrue()
    try {
      const res = await axios.delete(API_ENDPOINTS.schedule.payment.delete + `${id}`)
      console.log(res?.data)
      getData()
      delLoading.onFalse()
      enqueueSnackbar(`Deleted Successfully!`, { variant: 'success' });
      confirm.onFalse()
    } catch (error) {
      console.log(error)
      delLoading.onFalse()
    }
  }

  return (
    <>
      <TableRow key={row._id}>
        <TableCell><Radio value={row._id} onChange={(e) => setSelectedPayment(row._id)} /></TableCell>
        <TableCell> {row.paymentCategory} </TableCell>
        <TableCell align="center">{row.paymentType}</TableCell>
        <TableCell align="center">{row.bankName}</TableCell>
        <TableCell align="center">{row.cardType}</TableCell>
        <TableCell align="center">{row.chequeNumber || '-'}</TableCell>
        <TableCell align="center">{row.amountReceived}</TableCell>
        <TableCell align="center">{row.currency}</TableCell>
        <TableCell align="center">{formatDate(row.date)}</TableCell>
        <TableCell align="center">{row.finalAmountDue}</TableCell>
        <TableCell
          align="center"
          sx={{
            whiteSpace: 'nowrap',
          }}
        >
          <Stack direction={'row'} justifyContent="center" spacing={1}>
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: 40, minWidth: 40, height: 40 }}
              onClick={(e) => {
                setSelectedRow(row)
                paymentsDialog.onTrue()
              }}
            >
              <Iconify icon="solar:pen-bold" />
            </Button>
            <Button
              variant="outlined"
              color="primary"
              sx={{ width: 40, minWidth: 40, height: 40 }}
              onClick={popover.onOpen}
            >
              <Iconify icon="eva:more-vertical-fill" />
            </Button>
          </Stack>
        </TableCell>
      </TableRow>
      <CustomPopover
        open={popover.open}
        onClose={popover.onClose}
        arrow="right-top"
        sx={{ width: 160 }}
      >
        <MenuItem
          onClick={() => {
            setSelectedRow(row)
            paymentsDialog.osnTrue()
            popover.onClose();
          }}
          sx={{ color: 'primary.main' }}
        >
          <Iconify icon="solar:eye-bold" />
          View
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
          <Button disabled={delLoading?.value} variant="contained" color="error" onClick={() => deleteData(row?._id)}>
            {
              delLoading?.value ?
                <CircularProgress />
                :
                'Delete'
            }
          </Button>
        }
      />
    </>
  );
}
