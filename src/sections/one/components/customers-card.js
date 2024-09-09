import { Box, ButtonBase, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'

const CustomersCard = () => {
  return (
    <Card sx={{mt: 3.5, bgcolor: '#F0F0F0', borderRadius: 2.5}}>
    <CardHeader title="Acquire More Customers!" subheader='Learn how to attract more customers by following these simple tips.' sx={{fontSize: '20px', fontWeight: 'bold'}} />
    <CardContent sx={{mt:2}}>
      <Stack direction={'row'} alignItems={'center'} gap={'11px'}>
        <Stack sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer', width: 1}}>
            <Typography variant='h7' textAlign={'center'} width={1}>Facebook</Typography>
          </Stack>
          <Stack sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer', width: 1}}>
            <Typography variant='h7' textAlign={'center'} width={1}>Instagram</Typography>
          </Stack>
          <Stack sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer', width: 1}}>
            <Typography variant='h7' textAlign={'center'} width={1}>LinkedIn</Typography>
          </Stack>
      </Stack>
    </CardContent>
  </Card>
  )
}

export default CustomersCard
