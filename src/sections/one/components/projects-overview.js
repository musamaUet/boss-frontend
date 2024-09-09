import { Box, ButtonBase, Card, CardContent, CardHeader, Stack, Typography } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'
import Grid from '@mui/material/Unstable_Grid2';
import { SvgCalenderOutline, SvgEditOutline, SvgExportOutline, SvgLeftOutline, SvgMovieOutline, SvgPhoneOutline } from 'src/sections/common/components/list-svg-icons';

const data = [
  SvgCalenderOutline,
  SvgLeftOutline,
  SvgEditOutline,
  SvgMovieOutline,
  SvgPhoneOutline,
  SvgExportOutline,
]

const ProjectsOverview = () => {
  return (
    <Card sx={{ mt: 3.5, bgcolor: '#F0F0F0', borderRadius: 2.5 }}>
      <CardHeader title="Project Overview" subheader='Need inspiration for your next project?' sx={{ fontSize: '20px', fontWeight: 'bold' }} />
      <CardContent>
        <Grid container rowSpacing={3.5}>
          {
            data.map((item, index) => (
              <Grid md={6} key={index}>
                <Stack direction={'row'} alignItems={'center'} gap={'18.5px'}>
                  {item}
                  <Stack gap={'8.5px'}>
                    <Typography variant='h7'>Expert Tips</Typography>
                    <Stack direction={'row'} alignItems={'center'} gap={'10px'}>
                      <Box sx={{ backgroundColor: '#D226F0', borderRadius: '20px', px: '14px', py: '4.5' }}>
                        <Typography variant='overline' sx={{ textTransform: 'capitalize' }} color='white'>Info</Typography>
                      </Box>
                      <Box sx={{ backgroundColor: 'white', borderRadius: '20px', p: '2px' }}>
                        <Stack direction={'row'} alignItems={'center'} pr={2} gap={1}>
                          <img src='/assets/avatar_c.png' style={{ width: '20px', height: '20px' }} />
                          <Typography variant='overline' sx={{ textTransform: 'capitalize' }}>Estimated reading</Typography>
                        </Stack>
                      </Box>
                    </Stack>
                  </Stack>
                </Stack>
              </Grid>
            ))
          }
        </Grid>
      </CardContent>
    </Card>
  )
}

export default ProjectsOverview
