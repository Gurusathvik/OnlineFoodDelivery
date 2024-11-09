import { useThemeContext } from '../Theme/ThemeContext';
import { useTheme } from '@mui/material/styles';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import SearchIcon from '@mui/icons-material/Search';
import { Avatar, IconButton, Box, InputBase } from '@mui/material';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import CloseIcon from '@mui/icons-material/Close';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useDispatch, useSelector } from 'react-redux';
import { userProfile } from '../redux/slices/authSlice';

const NavBar = () => {
  const { token, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeContext();
  const theme = useTheme();
  const [showSearch, setShowSearch] = useState(false);

  useEffect(() => {
    if (!token && !user) {
      navigate('/account/login');
    } else {
      dispatch(userProfile());
    }
  }, [token, user, navigate, dispatch]);

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        paddingX: { xs: 2, lg: 4 },
        backgroundColor: theme.palette.background.nav,
        boxShadow: 1,
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}
    >
      <Box
        onClick={() => navigate('/')}
        sx={{ display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      >
        <FastfoodIcon sx={{ color: theme.palette.primary.main, fontSize: '2.3rem' }} />
        <h1 className='font-dancing' style={{ fontSize: '2rem' }}>Foody</h1>
      </Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
        <IconButton onClick={() => setShowSearch(!showSearch)} sx={{ display: { lg: 'none', xs: 'block' } }}>
          <SearchIcon sx={{ fontSize: '2rem' }} />
        </IconButton>
        <Box
          sx={{
            display: { xs: 'none', lg: 'block' },
            border: `2px solid ${theme.palette.primary.main}`,
            borderRadius: '50px',
            width: '700px',
          }}
        >
          <InputBase
            sx={{ width: '100%', padding: '10px', borderRadius: '50px' }}
            placeholder='search .........'
            inputProps={{ 'aria-label': 'search' }}
          />
        </Box>
        <Box onClick={() => navigate('/cart')} sx={{ position: 'relative', cursor: 'pointer' }}>
          <LocalMallIcon sx={{ fontSize: '2rem' }} />
          <Box
            sx={{
              position: 'absolute',
              top: '-7px',
              right: '-12px',
              backgroundColor: theme.palette.primary.main,
              color: theme.palette.background.default,
              width: '25px',
              height: '25px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span>1</span>
          </Box>
        </Box>
        <IconButton onClick={toggleTheme}>
          {mode === 'dark' ? (
            <LightModeIcon sx={{ fontSize: '2rem' }} />
          ) : (
            <DarkModeIcon sx={{ fontSize: '2rem', color: theme.palette.primary.icon }} />
          )}
        </IconButton>
        {user ? (
          <Avatar onClick={() => navigate('/profile')} sx={{ backgroundColor: theme.palette.primary.main, cursor: 'pointer' }}>
            {user?.fullName?.charAt(0).toUpperCase()}
          </Avatar>
        ) : (
          <IconButton onClick={() => navigate('/account/login')}>
            <AccountCircleIcon sx={{ fontSize: '3rem', color: theme.palette.primary.main }} />
          </IconButton>
        )}
      </Box>

      {/* mobile search */}
      <Box
        sx={{
          display: { lg: 'none' },
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.nav,
          opacity: showSearch ? 1 : 0,
          transform: showSearch ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'opacity 0.5s, transform 0.5s',
          zIndex: 2000,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
        }}
      >
        <InputBase
          sx={{
            width: '80%',
            height: '50px',
            borderRadius: '25px',
            border: `1px solid ${theme.palette.secondary.main}`,
            paddingLeft: '10px',
            color: '#000',
          }}
          placeholder='search .........'
          inputProps={{ 'aria-label': 'search' }}
        />
        <CloseIcon
          className='absolute top-6 right-6 cursor-pointer'
          sx={{ fontSize: '2.5rem' }}
          onClick={() => setShowSearch(!showSearch)}
        />
      </Box>
    </Box>
  );
};

export default NavBar;
