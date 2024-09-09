import { m } from 'framer-motion';

import { Box, ButtonBase, Card, CardContent, CardHeader, IconButton, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'
import Image from 'src/components/image'
import { varHover } from 'src/components/animate';
import { SvgHeartIcon, SvgLinkIcon, SvgMessageIcon } from 'src/sections/common/components/list-svg-icons';

const MessagesCard = () => {
  return (
    <Card sx={{ bgcolor: '#F0F0F0', borderRadius: 2.5 }}>
      <CardHeader title="Messages" sx={{ fontSize: '20px', fontWeight: 'bold' }} />
      <CardContent sx={{ mt: 2 }}>
        <Stack gap={3.5}>
          {
            [1, 2, 3].map((item, index) => (
              <Stack direction={'row'} gap={'18.5px'}>
                <img src='/assets/avatar_c.png' style={{ width: '48px', height: '48px' }} />
                <Stack gap={'8.5px'}>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <Typography variant='h7'>John Smith</Typography>
                    <Typography variant='text1'>1</Typography>
                  </Stack>
                  <Typography variant='text1'>on Project - 3600</Typography>
                  <Typography variant='text1'>Great progress, keep it up!</Typography>
                  <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                    <IconButton
                      component={m.button}
                      whileTap="tap"
                      whileHover="hover"
                      variants={varHover(1.05)}
                    >
                      {SvgMessageIcon}
                    </IconButton>

                    <IconButton
                      component={m.button}
                      whileTap="tap"
                      whileHover="hover"
                      variants={varHover(1.05)}
                    >
                      {SvgHeartIcon}
                    </IconButton>

                    <IconButton
                      component={m.button}
                      whileTap="tap"
                      whileHover="hover"
                      variants={varHover(1.05)}
                    >
                      {SvgLinkIcon}
                    </IconButton>
                  </Stack>
                </Stack>
              </Stack>
            ))
          }
          <Stack sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer', width: 1}}>
            <Typography variant='h7' textAlign={'center'} width={1}>View All</Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  )
}

export default MessagesCard
