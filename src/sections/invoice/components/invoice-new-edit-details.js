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
import { CircularProgress, TextField } from '@mui/material';
import Image from 'src/components/image';
import { Link } from 'react-router-dom';
import { paths } from 'src/routes/paths';
import axios, { API_ENDPOINTS } from 'src/utils/axios';
import { useBoolean } from 'src/hooks/use-boolean';
import AddDiscountDialog from './add-discount-dialog';

// ----------------------------------------------------------------------

export default function InvoiceNewEditDetails({ data, selectedImages, setSelectedImages }) {
  const { control, setValue, watch, resetField, reset } = useFormContext();

  const imgUploadLoading = useBoolean()
  const addDiscountDialog = useBoolean()

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const values = watch();

  const totalOnRow = values.items.map((item) => item.quantity * (item.rate + item.tax + item.markUp));
  const totalMarkupRows = values.items.map((item) => item.markUp);
  const totalTaxRows = values.items.map((item) => item.tax);
  const totalMarkup = sum(totalMarkupRows)
  const totalTax = sum(totalTaxRows)
  const subTotal = sum(totalOnRow);

  const totalAmount = subTotal - values?.discount;

  useEffect(() => {
    setValue('subTotal', subTotal - values?.discount);
  }, [setValue, subTotal, data, values]);

  const handleAdd = () => {
    append({
      title: '',
      description: '',
      quantity: 1,
      rate: 1,
      tax: 0,
      markUp: 0,
      total: 0,
    });
  };

  const handleRemove = (index) => {
    remove(index);
  };

  const handleClearService = useCallback(
    (index) => {
      resetField(`items[${index}].quantity`);
      resetField(`items[${index}].rate`);
      resetField(`items[${index}].total`);
    },
    [resetField]
  );

  const handleChangeQuantity = useCallback(
    (event, index) => {
      setValue(`items[${index}].quantity`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * (item.rate + item.markUp + item.tax))[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangePrice = useCallback(
    (event, index) => {
      setValue(`items[${index}].rate`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * (item.rate + item.markUp + item.tax))[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeMarkup = useCallback(
    (event, index) => {
      setValue(`items[${index}].markUp`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * (item.rate + item.markUp + item.tax))[index]
      );
    },
    [setValue, values.items]
  );

  const handleChangeTax = useCallback(
    (event, index) => {
      setValue(`items[${index}].tax`, Number(event.target.value));
      setValue(
        `items[${index}].total`,
        values.items.map((item) => item.quantity * (item.rate + item.markUp + item.tax))[index]
      );
    },
    [setValue, values.items]
  );

  const handleUploadImages = async (values) => {
    imgUploadLoading.onTrue()
    const formData = new FormData();
    values.forEach(element => {
      formData.append('files', element);
    });

    try {
      const { data } = await axios.put(API_ENDPOINTS.schedule.upload_images.put, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('File uploaded successfully!');
      setSelectedImages((prev) => [...prev, ...data?.data])
      imgUploadLoading.onFalse()
    } catch (error) {
      console.error(error);
      imgUploadLoading.onFalse()
    }
  }

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const newFiles = acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      );
      handleUploadImages(newFiles)
    },
    [selectedImages]
  );

  const handleRemoveFile = useCallback(
    (inputFile) => {
      const filtered = selectedImages.filter((file) => file !== inputFile);
      setSelectedImages(filtered);
    },
    [selectedImages]
  );



  const renderTotal = (
    <Grid container spacing={5} mt={3}>
      <Grid md={4}>
        <Box sx={{ border: '4px solid #67C118', borderRadius: 2 }}>
          <Box sx={{ backgroundColor: '#67C118', padding: 2, borderRadius: 1 }}>
            <Typography color={'#ffffff'}>Notes</Typography>
          </Box>
          <RHFTextField name='additionalNotes' multiline rows={6} placeholder='Document notes here' fullWidth sx={{
            border: 'none', '& .MuiOutlinedInput': {
              border: 'none'
            }
          }} />
        </Box>
      </Grid>
      <Grid md={4}>
        <Stack width={1} spacing={2}>
          <Stack direction={'row'} alignItems={'center'} spacing={2} flexWrap={'wrap'}>
            <MultiFilePreview
              thumbnail
              files={selectedImages}
              onRemove={(file) => handleRemoveFile(file)}
              sx={{ width: 64, height: 64 }}
            />
          </Stack>
          <UploadBox disabled={imgUploadLoading?.value} onDrop={handleDrop} placeholder={<Typography variant='text1' color={'#67C118'}>
            {imgUploadLoading?.value ?
              <CircularProgress color='success' />
              : 'UPLOAD PHOTOS'}
          </Typography>} sx={{ border: '1px solid #67C118', bgcolor: 'white' }} />
          {/* <Box sx={{ bgcolor: '#67C118', borderRadius: '100px', width: 1, p: 1 }}>
            <Stack direction={'row'} gap={1}>
              <Image src='/assets/images/tiger.png' sx={{ width: '69px', height: '69px' }} />
              <Stack>
                <Typography color={'#ffffff'}>Pic 1</Typography>
                <Typography color={'#ffffff'}>Caption line 1 here</Typography>
              </Stack>
            </Stack>
          </Box>

          <Box sx={{ bgcolor: '#67C118', borderRadius: '100px', width: 1, p: 1 }}>
            <Stack direction={'row'} gap={1}>
              <Image src='/assets/images/tiger.png' sx={{ width: '69px', height: '69px' }} />
              <Stack>
                <Typography color={'#ffffff'}>Pic 1</Typography>
                <Typography color={'#ffffff'}>Caption line 1 here</Typography>
              </Stack>
            </Stack>
          </Box> */}
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
            <Box sx={{ width: 160, typography: 'subtitle2' }}>{fCurrency(subTotal) || data?.subTotal}</Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Total Markup</Box>
            {/* <Box sx={{ width: 160 }}><Link style={{ textDecorationLine: 'none' }} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box> */}
            <Box sx={{ width: 160 }}>${totalMarkup}</Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Total Discount</Box>
            <Box sx={{ width: 160, cursor: 'pointer' }} onClick={() => addDiscountDialog.onTrue()}>
              {
                values?.discount ?
                  <Typography>${values?.discount}</Typography>
                  :
                  <Stack><Typography color={'#67C118'}>Add</Typography></Stack>
              }
            </Box>
          </Stack>

          {/* <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Request a deposit</Box>
            <Box sx={{ width: 160 }}><Link style={{ textDecorationLine: 'none' }} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
          </Stack>

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Payment Schedule</Box>
            <Box sx={{ width: 160 }}><Link style={{ textDecorationLine: 'none' }} to={paths.dashboard.payment}><Typography color={'#67C118'}>Add</Typography></Link></Box>
          </Stack> */}

          <Stack direction="row">
            <Box sx={{ color: 'text.secondary' }}>Taxes</Box>
            {/* <Box sx={{ width: 160 }}>{values.taxes ? fCurrency(values.taxes) : '-'}</Box> */}
            <Box sx={{ width: 160 }}>${totalTax}</Box>
          </Stack>

          <Stack direction="row" sx={{ typography: 'subtitle1' }}>
            <Box>Total</Box>
            <Box sx={{ width: 160 }}>{fCurrency(totalAmount) || data?.subTotal}</Box>
          </Stack>
        </Stack>
      </Grid>
    </Grid>
  );

  return (
    <>
      <Box sx={{ p: 3 }}>
        <Typography variant="h6" sx={{ color: 'text.disabled', mb: 3 }}>
          Details:
        </Typography>

        <Stack divider={<Divider flexItem sx={{ borderStyle: 'dashed' }} />} spacing={3}>
          {fields.map((item, index) => (
            <Stack key={item.id} spacing={1.5}>
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={2} sx={{ width: 1 }}>
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
                  name={`items[${index}].markUp`}
                  label="Markup"
                  placeholder="0.00"
                  onChange={(event) => handleChangeMarkup(event, index)}
                  sx={{ maxWidth: { md: 96 } }}
                />

                <RHFTextField
                  size="small"
                  type="number"
                  name={`items[${index}].tax`}
                  label="Tax"
                  placeholder="0.00"
                  onChange={(event) => handleChangeTax(event, index)}
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
                  name={`items[${index}].quantity`}
                  label="Quantity"
                  placeholder="0"
                  onChange={(event) => handleChangeQuantity(event, index)}
                  InputLabelProps={{ shrink: true }}
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
                  sx={{ mt: 1 }}
                  InputLabelProps={{ shrink: true }}
                />
              </Stack>
              <Stack direction={'row'} alignItems={'center'} justifyContent={'space-between'}>
                <Stack direction={'row'} alignItems={'center'}>
                  {/* <Button variant='outlined' color='success'>UPLOAD PHOTOS</Button> */}
                  {/* <MultiFilePreview
                  thumbnail
                  files={files}
                  onRemove={(file) => handleRemoveFile(file)}
                  sx={{ width: 64, height: 64 }}
                />
                <UploadBox onDrop={handleDrop} placeholder={<Typography variant='text1' color={'#67C118'}>UPLOAD PHOTOS</Typography>} sx={{ border: '1px solid #67C118', bgcolor: 'white' }} /> */}
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
      <AddDiscountDialog dialog={addDiscountDialog} setValue={setValue} values={values} />
    </>
  );
}
