import sum from 'lodash/sum';
import { useEffect, useCallback, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { inputBaseClasses } from '@mui/material/InputBase';

import { fCurrency } from 'src/utils/format-number';

import { INVOICE_SERVICE_OPTIONS } from 'src/_mock';

import Iconify from 'src/components/iconify';
import { RHFSelect, RHFTextField } from 'src/components/hook-form';
import { MultiFilePreview, UploadBox } from 'src/components/upload';
import Grid from '@mui/material/Unstable_Grid2'
import { TextField } from '@mui/material';
import Image from 'src/components/image';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes/paths';

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails() {
  const { control, setValue, watch, resetField, reset } = useFormContext();

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * item.price);

  const subTotal = sum(totalOnRow);

  const totalAmount = subTotal - values.discount - values.shipping + values.taxes;

  useEffect(() => {
    setValue('totalAmount', totalAmount);
  }, [setValue, totalAmount]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      service: '',
      quantity: 1,
      price: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].price`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleSelectService = useCallback(
    (index, option) => {
      setValue(
        `items[${index}].price`,
        INVOICE_SERVICE_OPTIONS.find((service) => service.name === option)?.price
      );
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].price`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * item.price)[index]
      );
    },
    [setValue, values.items]
  );

  const [files, setFiles] = useState([]);

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );

      setFiles([...files, ...newFiles]);
    },
    [files]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = files.filter((file) => file !== inputFile);
      setFiles(filtered);
    },
    [files]
  );


  useEffect(() => {
    if (fields.length === 1 && !fields[0].title) {
      reset({
        items: [
          { title: '4702 jet machine work', description: 'Water, drainage, concrete, and fixtures .', quantity: 1, rate: 100, total: 100 },
          { title: 'Plumbing material and Labor', description: `4 in PVC DWV pipe, one section 2", fittings, and auxiliary materials. 3/4 CPVC overhead cold water with shut off valve and ending with a
utility sink with faucet with hose connection. The water drop will be with a hard copper pipe. Floor Side 4 in pipe with indirect connection
for machine drainage. Testing, permit, and city inspection .`, quantity: 2, rate: 150, total: 300 },
          { title: 'Concrete cutting and pouring mixin ..', description: `Concrete cutting and hauling to the dumpster. Digging connection area to drain, trench, and machine area. Slab work Dimensions 135 FT
long x 2.5 FT wide x 4 inches thick. Total 4.5 or Cubic Yards. 5/8 rebar setting every 3 FT on each side will be every 1.5 FT or 44 rebars per
side or 86 total anchored with epoxy and isolated concrete from dirt with a plastic vapor barrier. Concrete pouring and finishing. area
cleaning. It includes material and labor .`, quantity: 3, rate: 200, total: 600 },
          { title: 'Rental equipment', description: `Walk behind cutting saw, backhoe 1 ton, scissor lift, Jack hammer, sweeper, accessories, and delivery`, quantity: 4, rate: 250, total: 1000 },
        ]
      });
    }
  }, [fields, reset]);



  const renderTotal = (
    <Grid container spacing={5} mt={3}>
      <Grid md={4}>
        <Box sx={{border: '4px solid #67C118', borderRadius: 2}}>
          <Box sx={{backgroundColor: '#67C118', padding: 2, borderRadius: 1}}>
            <Typography color={'#ffffff'}>Notes</Typography>
          </Box>
          <TextField multiline rows={6} placeholder='Document notes here' fullWidth sx={{border: 'none', '& .MuiOutlinedInput': {
            border: 'none'
          }}}/>
        </Box>
      </Grid>
      <Grid md={4}>
        <Stack width={1} spacing={2}>
          <Box sx={{bgcolor: '#67C118', borderRadius: '100px', width: 1, p: 1}}>
            <Stack direction={'row'} gap={1}>
              <Image src='/assets/images/tiger.png' sx={{width: '69px', height: '69px'}}/>
              <Stack>
                <Typography color={'#ffffff'}>Pic 1</Typography>
                <Typography color={'#ffffff'}>Caption line 1 here</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{bgcolor: '#67C118', borderRadius: '100px', width: 1, p: 1}}>
            <Stack direction={'row'} gap={1}>
              <Image src='/assets/images/tiger.png' sx={{width: '69px', height: '69px'}}/>
              <Stack>
                <Typography color={'#ffffff'}>Pic 1</Typography>
                <Typography color={'#ffffff'}>Caption line 1 here</Typography>
              </Stack>
            </Stack>
          </Box>
        </Stack>
      </Grid>
      <Grid md={4}>
        <Stack
          spacing={2}
          alignItems="flex-end"
          sx={{ textAlign: 'right', typography: 'body2' }}
        >
          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Subtotal</Box>
            <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subTotal) || '-'}</Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Markup</Box>
            <Box sx={{ width: 160 }}><Link style={{textDecorationLine: 'none'}} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
            {/* <Box
              sx={{
                width: 160,
                ...(values.shipping && { color: 'error.main' }),
              }}
            >
              {values.shipping ? `- ${fCurrency(values.shipping)}` : '-'}
            </Box> */}
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Discount</Box>
            <Box sx={{ width: 160 }}><Link style={{textDecorationLine: 'none'}} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Request a deposit</Box>
            <Box sx={{ width: 160 }}><Link style={{textDecorationLine: 'none'}} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Payment Schedule</Box>
            <Box sx={{ width: 160 }}><Link style={{textDecorationLine: 'none'}} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
            <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '-'}</Box>
          </Stack>

          <Stack direction="row" sx={{ typography: 'subtitle1' }}>
            <Box>Total</Box>
            <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || '-'}</Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
        Details:
      </Typography>

      <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
        {fields.map((item, index) => (
          <Stack key={item.id} spacing={1.5}>
            <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
              {/* <RHFTextField
                size="small"
                name={`items[${index}].title`}
                label="Title"
                InputLabelProps={{ shrink: true }}
              /> */}

              <RHFTextField
                size="small"
                name={`items[${index}].title`}
                label="Title"
                InputLabelProps={{ shrink: true }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].rate`}
                label="Rate"
                placeholder="0.00"
                onChange={(event) => handleChangePrice(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].markup`}
                label="Markup"
                placeholder="0.00"
                onChange={(event) => handleChangePrice(event, index)}
                // InputProps={{
                //   startAdornment: (
                //     <InputAdornment position="start">
                //       <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                //     </InputAdornment>
                //   ),
                // }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].quantity`}
                label="Quantity"
                placeholder="0"
                onChange={(event) => handleChangeQuantity(event, index)}
                InputLabelProps={{ shrink: true }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                size="small"
                type="number"
                name={`items[${index}].tax`}
                label="Tax"
                placeholder="0.00"
                onChange={(event) => handleChangePrice(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{ maxWidth: { md: 96 } }}
              />

              <RHFTextField
                disabled
                size="small"
                type="number"
                name={`items[${index}].total`}
                label="Total"
                placeholder="0.00"
                value={values.items[index].total === 0 ? '' : values.items[index].total.toFixed(2)}
                onChange={(event) => handleChangePrice(event, index)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Box sx={{ typography: 'subtitle2', color: 'text.disabled' }}>$</Box>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  maxWidth: { md: 104 },
                  [`& .${inputBaseClasses.input}`]: {
                    textAlign: { md: 'right' },
                  },
                }}
              />
            </Stack>
            <Stack width={1}>
            <RHFTextField
                size="small"
                multiline
                name={`items[${index}].description`}
                label="Description"
                fullWidth
                sx={{mt: 1}}
                InputLabelProps={{ shrink: true }}
              />
            </Stack>
            <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
              <Stack direction={'row'} alignItems={'center'}>
                {/* <Button variant='outlined' color='success'>UPLOAD PHOTOS</Button> */}
                <MultiFilePreview
                  thumbnail
                  files={files}
                  onRemove={(file) => handleRemoveFile(file)}
                  sx={{ width: 64, height: 64 }}
                />
                <UploadBox onDrop={handleDrop} placeholder={<Typography variant='text1' color={'#67C118'}>UPLOAD PHOTOS</Typography>} sx={{ border: '1px solid #67C118', bgcolor: 'white' }} />
              </Stack>
              <Button
                size="small"
                color="error"
                startIcon={<Iconify icon="solar:trash-bin-trash-bold" />}
                onClick={() => handleRemove(index)}
              >
                Remove
              </Button>
            </Stack>
          </Stack>
        ))}
      </Stack>

      <Divider sx={{ my: 3, borderStyle: 'dashed' }} />

      <Stack
        spacing={3}
        direction={{ xs: 'column', md: 'row' }}
        alignItems={{ xs: 'flex-end', md: 'center' }}
      >
        <Button
          size="small"
          color="primary"
          startIcon={<Iconify icon="mingcute:add-line" />}
          onClick={handleAdd}
          sx={{ flexShrink: 0 }}
        >
          Add Item
        </Button>

        {/* <Stack
          spacing={2}
          justifyContent="flex-end"
          direction={{ xs: 'column', md: 'row' }}
          sx={{ width: 1 }}
        >
          <RHFTextField
            size="small"
            label="Shipping($)"
            name="shipping"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />

          <RHFTextField
            size="small"
            label="Discount($)"
            name="discount"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />

          <RHFTextField
            size="small"
            label="Taxes(%)"
            name="taxes"
            type="number"
            sx={{ maxWidth: { md: 120 } }}
          />
        </Stack> */}
      </Stack>

      {renderTotal}
    </Box>
  );
}
