import PropTypes from 'prop-types';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { alpha, useTheme } from '@mui/material/styles';

import { fPercent, fCurrency } from 'src/utils/format-number';

import { bgGradient } from 'src/theme/css';

import Iconify from 'src/components/iconify';
import { SvgPurpleChart } from 'src/sections/common/components/list-svg-icons';
// import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function CommonWidgetSummary({
  title,
  total,
  icon,
  percent,
  color = 'primary',
  chart,
  sx,
  value,
  active,
  setActive,
  ...other
}) {
  const theme = useTheme();

  // const { series, options } = chart;

  // const chartOptions = useChart({
  //   colors: [theme.palette[color].dark],
  //   chart: {
  //     sparkline: {
  //       enabled: true,
  //     },
  //   },
  //   xaxis: {
  //     labels: {
  //       show: false,
  //     },
  //   },
  //   yaxis: {
  //     labels: {
  //       show: false,
  //     },
  //   },
  //   legend: {
  //     show: false,
  //   },
  //   grid: {
  //     show: false,
  //   },
  //   tooltip: {
  //     marker: {
  //       show: false,
  //     },
  //     y: {
  //       formatter: (value) => fCurrency(value),
  //       title: {
  //         formatter: () => '',
  //       },
  //     },
  //   },
  //   ...options,
  // });

  return (
    <Box sx={{backgroundColor: active === title ? '#F0F0F0' : '', p: '20px', borderRadius: '20px', cursor: 'pointer', width: 1}} onClick={() => setActive(title)}>
    <Stack direction={'row'} alignItems={'flex-start'} width={1} gap={'10px'}>
      {icon}
      <Stack width={1}>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={1}>
          <Typography variant='h7'>{title}</Typography>
          <Box sx={{border: '1px solid #030303', borderRadius: '30px', px: '6px', py: '3px'}}>
            <Typography variant='h7'>{percent}</Typography>
          </Box>
        </Stack>
        <Typography variant='h2'>{value}</Typography>
      </Stack>
    </Stack>
    </Box>
  );
}

CommonWidgetSummary.propTypes = {
  chart: PropTypes.object,
  color: PropTypes.string,
  icon: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
  percent: PropTypes.number,
  sx: PropTypes.object,
  title: PropTypes.string,
  total: PropTypes.number,
};
