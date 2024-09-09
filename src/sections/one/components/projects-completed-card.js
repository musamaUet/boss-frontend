import { ButtonBase, Card, CardContent, CardHeader } from '@mui/material'
import React from 'react'
import Iconify from 'src/components/iconify'
import ChartColumnSingle from './chart-single-column'

const ProjectsCompleteCard = () => {
  return (
    <Card sx={{mt: 3.5, bgcolor: '#F0F0F0', borderRadius: 2.5}}>
    <CardHeader title="Projects completed" sx={{fontSize: '20px', fontWeight: 'bold'}}  action={
    <ButtonBase
      sx={{
        pl: 1,
        py: 0.5,
        pr: 0.5,
        borderRadius: 1,
        typography: 'subtitle2',
        bgcolor: 'white',
      }}
    >
      Search Projetcs

      <Iconify
        width={16}
        icon={'eva:arrow-ios-downward-fill'}
        sx={{ ml: 0.5 }}
      />
    </ButtonBase>
  }/>
    <CardContent>
      <ChartColumnSingle
        series={[
          {
            name: 'Net Profit',
            data: [44, 55, 57, 56, 61, 58],
          },
        ]}
      />
    </CardContent>
  </Card>
  )
}

export default ProjectsCompleteCard
