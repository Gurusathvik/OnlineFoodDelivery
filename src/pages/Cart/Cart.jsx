import { Box, Button, Card, Divider, Grid, Modal, TextField } from '@mui/material';
import React, { useState } from 'react';
import CartItem from './CartItem';
import AddressCard from './AddressCard';
import AddLocationAltIcon from '@mui/icons-material/AddLocationAlt';
import { useThemeContext } from '../../Theme/ThemeContext';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import { style } from '../../utils/ModelStyles';

const Cart = () => {
  const { mode } = useThemeContext();
  
  const [cartItems, setCartItems] = useState([1, 1, 1]); // Example array for cart items
  const [addresses, setAddresses] = useState([]); // State for storing addresses
  const [open, setOpen] = useState(false);

  const createOrderUsingSelectedAddress = () => {
    console.log('Order Created');
  };

  const handleOpenAddressModel = () => {
    setOpen(true);
  };

  const handleCloseAddressModel = () => {
    setOpen(false);
  };

  const initialValues = {
    streetAddress: '',
    state: '',
    pincode: '',
    city: ''
  };

  const validationSchema = Yup.object().shape({
    streetAddress: Yup.string().required("Street address is required"),
    state: Yup.string().required("State is required"),
    pincode: Yup.string().required("Pincode is required"),
    city: Yup.string().required("City is required")
  });

  const handleSubmit = (values) => {
    console.log(`New Address: ${JSON.stringify(values)}`);
    setAddresses([...addresses, values]); // Add the new address to the list
    handleCloseAddressModel(); // Close the modal after adding
  };

  // Function to remove an address
  const handleRemoveAddress = (index) => {
    const newAddresses = addresses.filter((_, i) => i !== index);
    setAddresses(newAddresses);
  };

  return (
    <div>
      <main className='lg:flex justify-between'>
        <section className='lg:w-[30%] space-y-6 lg:min-h-screen pt-10 mb-4'>
          {cartItems.map((_, index) => <CartItem key={index} />)}
          <Divider />
          <div className='px-5 text-sm'>
            <p className='font-extralight py-5'>Bill Details</p>
            <div className='space-y-3'>
              <div className='flex justify-between'>
                <p>Item Total</p>
                <p>Rs.6767</p>
              </div>
              <div className='flex justify-between'>
                <p>Delivery Fee</p>
                <p>Rs.340</p>
              </div>
              <div className='flex justify-between'>
                <p>GST and Restaurant Charges</p>
                <p>Rs.67</p>
              </div>
              <Divider />
            </div>
            <div className='flex justify-between'>
              <p>Total Pay</p>
              <p>Rs.7167</p>
            </div>
          </div>
        </section>
        <Divider orientation='vertical' flexItem />
        <section className='w-[70%] flex justify-center px-5 pb-10 lg:pb-0'>
          <div>
            <h1 className='text-center font-semibold text-2xl py-10'>Choose Delivery Address</h1>
            <div className='flex gap-5 flex-wrap justify-center'>
              {addresses.length > 0 ? addresses.map((address, index) => (
                <AddressCard 
                  key={index} 
                  address={address}  // Ensure you're passing the address object
                  showButton={true} 
                  handleSelectAddress={createOrderUsingSelectedAddress} 
                  handleRemoveAddress={() => handleRemoveAddress(index)} // Pass the remove function
                />
              )) : (
                <p>No addresses added yet.</p> // Display message when no addresses exist
              )}
            </div>
            <Card className='flex gap-5 w-64 p-5 mt-4' style={{ backgroundColor: `${mode === "dark" ? "#EEE" : "#526D82"}`, color: `${mode === "dark" ? "#000" : "#fff"}` }}>
              <AddLocationAltIcon />
              <div className='space-y-3'>
                <h1 className='font-semibold text-lg'>Add New Address</h1>
                <Button variant='contained' fullWidth onClick={handleOpenAddressModel}>Add</Button>
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Modal
        open={open}
        onClose={handleCloseAddressModel}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="streetAddress"
                    label="Street Address"
                    fullWidth
                    variant="outlined"
                    error
                    helperText={<ErrorMessage name="streetAddress" />}
                    InputProps={{ style: { color: '#000' } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="state"
                    label="State"
                    fullWidth
                    variant="outlined"
                    error
                    helperText={<ErrorMessage name="state" />}
                    InputProps={{ style: { color: '#000' } }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <Field
                    as={TextField}
                    name="pincode"
                    label="Pincode"
                    fullWidth
                    variant="outlined"
                    error
                    helperText={<ErrorMessage name="pincode" />}
                    InputProps={{ style: { color: '#000' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Field
                    as={TextField}
                    name="city"
                    label="City"
                    fullWidth
                    variant="outlined"
                    error
                    helperText={<ErrorMessage name="city" />}
                    InputProps={{ style: { color: '#000' } }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button fullWidth variant='contained' type='submit' color='primary'>Deliver Here</Button>
                </Grid>
              </Grid>
            </Form>
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};

export default Cart;
