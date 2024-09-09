import PropTypes from 'prop-types';
import { forwardRef } from 'react';
// @mui
import Box from '@mui/material/Box';

// ----------------------------------------------------------------------

const SvgColor = forwardRef(({ src, sx, ...other }, ref) => (
  <Box
    component="span"
    className="svg-color"
    ref={ref}
    sx={{
      width: 24,
      height: 24,
      display: 'inline-block',
      // bgcolor: 'currentColor',
      '& svg': {
        width: '100%',
        height: '100%',
        fill: 'currentColor',
        // path: { fill: 'red' },
      },
      ...sx,
    }}
    {...other}
  >
    {src}
  </Box>
));

SvgColor.propTypes = {
  src: PropTypes.string,
  sx: PropTypes.object,
};

export default SvgColor;
