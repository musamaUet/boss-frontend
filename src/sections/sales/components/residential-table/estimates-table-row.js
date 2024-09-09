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

export default function EstimatesTableRow({
  row,
  selected,
  onSelectRow,
  onViewRow,
  onEditRow,
  onDeleteRow,
}) {
  const confirm = useBoolean();

  const popover = usePopover();
  const router = useRouter()
  return (
    <>
      <TableRow key={row.id}>
        <TableCell onClick={() => router.push(paths.dashboard.invoice)} sx={{ cursor: 'pointer' }}> {row.doc_num} </TableCell>
        <TableCell align="center">{row.date}</TableCell>
        <TableCell align="center">{row.type}</TableCell>
        <TableCell align="center">{row.contractor}</TableCell>
        <TableCell align="center">{row.customer}</TableCell>
        <TableCell align="center">{row.amount}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">{row.paid}</TableCell>
        <TableCell align="center">{row.notes}</TableCell>
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
                console.log(e);
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
            router.push(paths.dashboard.invoice)
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
          <Button variant="contained" color="error" onClick={confirm.onFalse}>
            Delete
          </Button>
        }
      />
    </>
  );
}
