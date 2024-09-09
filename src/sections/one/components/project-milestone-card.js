import { Box, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import CommonWidgetSummary from './common-widget-summary'
import { SvgPurpleChart, SvgPurplePurchase } from 'src/sections/common/components/list-svg-icons'
import Image from 'src/components/image'

const ProjectMilestoneCard = () => {

  const [active, setActive] = useState('Profit')

  return (
    <Box sx={{ bgcolor: '#F0F0F0', p: 3.5, borderRadius: '20px' }}>
      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={1}>
        <Typography variant='h5'>Project Milestone</Typography>
        <TextField
          fullWidth
          size='small'
          placeholder="Search project"
          sx={{ maxWidth: '150px', bgcolor: 'white', borderRadius: 1 }}
        />
      </Stack>
      <Stack direction={{ xs: 'column', sm: 'row' }} sx={{ p: 0.5, width: 1, backgroundColor: 'white', borderRadius: '20px', mt: 3.5 }} spacing={2}>
        <CommonWidgetSummary active={active} setActive={setActive} title='Profit' icon={SvgPurpleChart} percent={'+ 28.4%'} value='489k' />
        <CommonWidgetSummary active={active} setActive={setActive} title='Purchases' icon={SvgPurplePurchase} percent={'- 7.4%'} value='16,146' />
      </Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'} width={1} mt={3.5}>
      <Typography variant='h5'>Welcome 456 new workers with a personal message</Typography>
      <Box sx={{border: '1px solid #030303', borderRadius: '30px', px: '14px', py: '8.5px', bgcolor: 'white', cursor: 'pointer'}}>
            <Typography variant='h7'>Send Message</Typography>
          </Box>
      </Stack>

      <Stack direction={'row'} alignItems={'center'} justifyContent={'space-evenly'} width={1} mt={3.5}>
          <Stack alignItems={'center'} gap={1.2} sx={{cursor: 'pointer'}}>
            <Image src='/assets/avatar1.png' sx={{width: '64px', height: '64px'}}/>
            <Typography variant='overline' sx={{textTransform: 'capitalize'}}>Jane Doe</Typography>
          </Stack>

          <Stack alignItems={'center'} gap={1.2} sx={{cursor: 'pointer'}}>
            <Image src='/assets/avatar1.png' sx={{width: '64px', height: '64px'}}/>
            <Typography variant='overline' sx={{textTransform: 'capitalize'}}>Mark Johnson</Typography>
          </Stack>

          <Stack alignItems={'center'} gap={1.2} sx={{cursor: 'pointer'}}>
            <Image src='/assets/avatar1.png' sx={{width: '64px', height: '64px'}}/>
            <Typography variant='overline' sx={{textTransform: 'capitalize'}}>Sarah Thompson</Typography>
          </Stack>

          <Stack alignItems={'center'} gap={1.2} sx={{cursor: 'pointer'}}>
            <Image src='/assets/right_arrow.png' sx={{width: '64px', height: '64px'}}/>
            <Typography variant='overline' sx={{textTransform: 'capitalize'}}>View All</Typography>
          </Stack>
      </Stack>
    </Box>
  )
}

export default ProjectMilestoneCard
