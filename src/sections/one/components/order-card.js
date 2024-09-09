import { m } from 'framer-motion';

import { Box, ButtonBase, Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'
import Image from 'src/components/image'
import { varHover } from 'src/components/animate';
import { SvgCartIcon, SvgHeartIcon, SvgLinkIcon, SvgMessageIcon } from 'src/sections/common/components/list-svg-icons';

const OrderCard = () => {
  return (
    <Card sx={{boxShadow: 'none', mt: 3.5}}>
      <CardHeader title="Order Status" sx={{ fontSize: '20px', fontWeight: 'bold' }} />
      <CardContent sx={{ mt: 2 }}>
        <Stack gap={3.5}>
              <Stack direction={'row'} alignItems={'center'} gap={'10.5px'}>
              <Box>
                {SvgCartIcon}
                </Box>
                <Typography variant='text1'>You have 52 open refund requests pending. This includes 8 new requests.</Typography>
              </Stack>
          <Stack sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer', width: 1}}>
            <Typography variant='h7' textAlign={'center'} width={1}>View All</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default OrderCard
