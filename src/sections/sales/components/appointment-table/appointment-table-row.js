import React from 'react';
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
import { Chip, CircularProgress } from '@mui/material';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { formatDate } from 'src/utils/format-number';

export default function AppointmentTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  setSelectedRow,
  appointmentDialog,
  getData
}) {
  const confirm = useBoolean();
  const delLoading = useBoolean()
  const popover = usePopover();
  const router = useRouter()
  const { enqueueSnackbar } = useSnackbar();

  const deleteData = async (id) => {
    delLoading.onTrue()
    try {
      const res = await axios.delete(API_ENDPOINTS.schedule.appointment.delete + `${id}`)
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
      <TableRow key={row.id}>
        {/* <TableCell onClick={() => router.push(paths.dashboard.invoice)} sx={{ cursor: 'pointer' }}> {row.title} </TableCell> */}
        <TableCell> {row.title} </TableCell>
        <TableCell align="center">{formatDate(row.date)}</TableCell>
        <TableCell align="center">{row.time}</TableCell>
        <TableCell align="center">
          <Stack direction={'row'} alignItems={'center'} justifyContent={'end'} gap={1} width={'230px'} flexWrap={'wrap'}>
            {
              row?.participants?.map((option, index) => (
                <Chip
                  size="small"
                  color="info"
                  variant="soft"
                  label={option}
                />
              ))
            }
          </Stack>
        </TableCell>
        <TableCell align="center">{row.additionalNotes}</TableCell>
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
                appointmentDialog.onTrue()
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
            appointmentDialog.onTrue()
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
