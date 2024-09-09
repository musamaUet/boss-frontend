// @mui
import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Skeleton from '@mui/material/Skeleton';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableRow, { tableRowClasses } from '@mui/material/TableRow';

// ----------------------------------------------------------------------

export default function TableSkeleton({ ...other }) {
  const theme = useTheme();
  const defaultStyles = {
    '&:first-of-type': {
      borderTopLeftRadius: 24,
      borderBottomLeftRadius: 24,
    },
    '&:last-of-type': {
      borderTopRightRadius: 16,
      borderBottomRightRadius: 16,
    },
  };

  return (
    <TableRow
      {...other}
      sx={{
        // borderRadius: 3,
        backgroundColor: '#FFFFFF',
        // boxShadow: '0px 3px 3px #E0E9EF',
        [`&.${tableRowClasses.selected}, &:hover`]: {
          backgroundColor: 'background.paper',
          boxShadow: theme.customShadows.z20,
          transition: theme.transitions.create(['background-color', 'box-shadow'], {
            duration: theme.transitions.duration.shortest,
          }),
          '&:hover': {
            backgroundColor: 'background.paper',
            // boxShadow: theme.customShadows.z20,
          },
        },
        [`& .${tableCellClasses.root}`]: {
          ...defaultStyles,
        },
      }}
    >
      <TableCell colSpan={12}>
        <Stack spacing={3} direction="row" alignItems="center">
          {/* <Skeleton sx={{ borderRadius: 1.5, width: 48, height: 48, flexShrink: 0 }} /> */}
          <Skeleton sx={{ width: 180, height: 12 }} />
          <Skeleton sx={{ width: 180, height: 12 }} />
          <Skeleton sx={{ width: 180, height: 12 }} />
          <Skeleton sx={{ width: 160, height: 12 }} />
          <Skeleton sx={{ width: 140, height: 12 }} />
          <Skeleton sx={{ width: 120, height: 12 }} />
        </Stack>
      </TableCell>
    </TableRow>
  );
}
