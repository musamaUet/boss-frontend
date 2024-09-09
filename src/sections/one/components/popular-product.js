import { m } from 'framer-motion';

import { Box, ButtonBase, Card, CardContent, CardHeader, Divider, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'
import Image from 'src/components/image'
import { varHover } from 'src/components/animate';
import { SvgHeartIcon, SvgLinkIcon, SvgMessageIcon } from 'src/sections/common/components/list-svg-icons';

const PopularProduct = () => {
  return (
    <Card sx={{ bgcolor: '#F0F0F0', borderRadius: 2.5, mt: 3.5 }}>
      <CardHeader title="Popular product" sx={{ fontSize: '20px', fontWeight: 'bold' }} />
      <CardContent>
        <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
          <Typography variant='overline' textTransform={'capitalize'}>Product</Typography>
          <Typography variant='overline' textTransform={'capitalize'}>Earnings</Typography>
        </Stack>
        <Divider sx={{ mt: 2 }} />
        <Stack gap={3.5} mt={2.5}>
          {
            [1, 2, 3].map((item, index) => (
              <Stack direction={'row'} gap={'18.5px'}>
                <img src='/assets/product.png' style={{ width: '48px', height: '48px' }} />
                <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} width={1} gap={'8.5px'}>
                  <Typography variant='text1'>Item - 3600</Typography>
                  <Stack alignItems={'flex-end'}>
                    <Typography>199.99</Typography>
                    <Stack sx={{ border: '1px solid #030303', borderRadius: '30px',p: '1px', bgcolor: 'white', cursor: 'pointer', width: 1 }}>
                      <Typography variant='h7' textAlign={'center'} width={1} sx={{fontSize: '10px'}}>Active</Typography>
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            ))
          }
        <Divider />
          <Stack sx={{ border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px',  bgcolor: 'white', cursor: 'pointer', width: 1 }}>
            <Typography variant='h7' textAlign={'center'} width={1}>View All</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default PopularProduct
