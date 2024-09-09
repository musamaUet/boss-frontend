import PropTypes from 'prop-types';

import Chart, { useChart } from 'src/components/chart';

// ----------------------------------------------------------------------

export default function ChartColumnSingle({ series }) {
  const chartOptions = useChart({
    plotOptions: {
      bar: {
        borderRadius: 20,
        columnWidth: '45%',
      },
    },
    stroke: {
      show: false,
    },
    xaxis: {
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    },
    tooltip: {
      enabled: false, // Disable tooltip
    },
    colors: ['#D226F0'],
  });

  return (
    <Chart dir="ltr" type="bar" series={series} options={chartOptions} width="100%" height={320} />
  );
}

ChartColumnSingle.propTypes = {
  series: PropTypes.array,
};
