import { Box, Button, Card, Container, Stack, Typography } from '@mui/material'
import React from 'react'
import { useSettingsContext } from 'src/components/settings';
import Grid from '@mui/material/Unstable_Grid2'

const MessagesView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Card sx={{ py: 3, border: '1px solid #FF9500' }}>
        <Stack width={1} alignItems={'center'}>
          <Typography variant='h3' color={'#FF9500'}>Messages</Typography>
        </Stack>
      </Card>
      <Box my={3}>
        <Button variant='outlined'>
          All Messages
        </Button>
      </Box>
      <Grid container spacing={2}>
        <Grid md={4}>
          <Typography>Contact Messages to Admin</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={4}>
          <Typography>Contact Messages to Contractors</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={4}>
          <Typography>Contractor Messages to Conatct</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={4}>
          <Typography>Project Messages</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={4}>
          <Typography>Personnel Messages</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={4}>
          <Typography>Contractor and Subs Messages</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>

        <Grid md={8}>
          <Typography>Messages Cofiguration</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Grid container spacing={2}>
              <Grid md={6}>
                <Button variant='outlined' fullWidth>New</Button>
              </Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>Sections</Button></Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>List</Button></Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>Categories</Button></Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>Configurator</Button></Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>Sub Categories</Button></Grid>
              <Grid md={6}><Button variant='outlined' fullWidth>Types</Button></Grid>
            </Grid>
          </Card>
        </Grid>
        <Grid md={4}>
          <Typography>Sales Messages</Typography>
          <Card sx={{ border: '1px solid #BEBEBE', backgroundColor: '#F9F9F9', px: 3, py: 6 }}>
            <Stack direction={'row'} justifyContent={'space-between'} alignItems={'center'} gap={2}>
              <Button variant='outlined' fullWidth>
                List
              </Button>
              <Button variant='outlined' fullWidth>
                View
              </Button>
            </Stack>
          </Card>
        </Grid>
      </Grid>
    </Container>
  )
}

export default MessagesView
