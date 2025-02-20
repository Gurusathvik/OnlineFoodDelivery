import { Box, Modal } from '@mui/material';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { style } from '../../utils/ModelStyles';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

function Auth() {
  const location = useLocation();
  const navigate = useNavigate();
  const { pathname } = location;

  const handleOnClose = () => {
    navigate('/'); // Navigate to the home page when modal is closed
  };

  return (
    <Modal onClose={handleOnClose} open={pathname === "/account/register" || pathname === "/account/login"}>
      <Box sx={style}>
        {pathname === "/account/register" ? <RegisterForm /> : <LoginForm />}
      </Box>
    </Modal>
  );
}

export default Auth;
