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
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useSnackbar } from 'src/components/snackbar';
import { formatDate } from 'src/utils/format-number';
import { Chip, CircularProgress } from '@mui/material';

export default function EstimatesTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
  currentTab,
  currentTabValue,
  getData,
  page
}) {
  const confirm = useBoolean();

  const popover = usePopover();
  const router = useRouter()
  const delLoading = useBoolean()

  const { enqueueSnackbar } = useSnackbar();

  const deleteData = async (id) => {
    delLoading.onTrue()
    try {
      const res = await axios.delete(API_ENDPOINTS.schedule.invoices.delete + `${id}`)
      getData(currentTabValue)
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
        <TableCell onClick={() => router.push(paths.dashboard.invoice.details(row?._id, page))} sx={{ cursor: 'pointer' }}> {row.docNumber || '-'} </TableCell>
        <TableCell align="center">{formatDate(row.date) || '-'}</TableCell>
        <TableCell align="center">{currentTab}</TableCell>
        <TableCell align="center">{row.company || '-'}</TableCell>
        <TableCell align="center">{row.customer || '-'}</TableCell>
        <TableCell align="center">{row.subTotal ? `$${row?.subTotal}` : '-'}</TableCell>
        <TableCell align="center">
          <Stack direction={'row'} alignItems={'center'} justifyContent={'center'} gap={1} flexWrap={'wrap'} maxWidth={'200px'}>
            {
              row?.payment?.map((item, index) => (
                <Chip key={index} label={item?.paymentCategory} variant='soft' color='primary' />
              ))
            }
          </Stack>
        </TableCell>
        {/* <TableCell align="center">{row.status || 'pending'}</TableCell>
        <TableCell align="center">{row.payment?.paymentCategory || '-'}</TableCell> */}
        <TableCell align="center">{row.additionalNotes || '-'}</TableCell>
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
              onClick={() => router.push(paths.dashboard.invoice.details(row?._id, page))}
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
            router.push(paths.dashboard.invoice.details(row?._id, page))
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
