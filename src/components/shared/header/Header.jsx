import { Box, Button, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { BookRounded, DarkMode, FlareRounded, HomeRounded, LightMode, MoreHorizRounded } from '@mui/icons-material';
import { useState } from 'react';
import { useCities } from '../../../store/Cities';

  const Header = () => {
    const { handleChangeTheme, isDarkMode } = useCities();
  const location = useLocation().pathname;
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const StyledButton = styled(Button)({
    fontWeight: '600',
    fontSize: '18px',
    textTransform: 'none',
    padding: '2px 30px',
    borderRadius: '20px',
    transition: 'all 0.3s ease',
    '&:hover': {
      backgroundColor: isDarkMode ? '#1d1d1d' : 'rgba(255, 255, 255)',
    },
  });

  return (
    <Box sx={{  }}>
      <Box
        sx={{
          padding: '8px 16px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: '10px',
          marginTop: '10px',
          position: 'relative',
          zIndex: 10,
          boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.4)',
        }}
      >
        <Box
          sx={{
            padding: '4px 12px',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            transition: 'transform 0.3s ease, background 0.3s ease',
            '&:hover': {
            },
          }}
        >
          <Link to="/" style={{ textDecoration: 'none' }}>
            <Typography
              variant="h5"
              sx={{
                fontWeight: '700',
                background: 'linear-gradient(90deg, #00c6ff, #0072ff)',
                WebkitBackgroundClip: 'text',
                backgroundClip: 'text',
                color: 'transparent',
                fontFamily: "'Poppins', sans-serif",
                textShadow: '2px 2px 8px rgba(0, 0, 0, 0.2)',
              }}
            >
              Journey TJ
            </Typography>
          </Link>
        </Box>


        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              background: isDarkMode ? 'rgba(0, 0, 0, 0.8)' : 'rgba(255, 255, 255, 0.8)',
              boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.2)',
              borderRadius: '10px',
              padding: '5px 10px',
            },
          }}
        >
          <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', border: location === '/' ? `2px solid ${isDarkMode ? 'white' : 'lightGray'}` : 'none' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'flex', padding: '5px', borderRadius: '10px', color: isDarkMode ? 'white' : 'black' }}>
              <HomeRounded sx={{ marginRight: '10px' }} /> Home
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', border: location === '/cities' ? `2px solid ${isDarkMode ? 'white' : 'lightGray'}` : 'none' }}>
            <Link to="/cities" style={{ textDecoration: 'none', display: 'flex', padding: '5px', borderRadius: '10px', color: isDarkMode ? 'white' : 'black' }}>
              <FlareRounded sx={{ marginRight: '10px' }} /> Cities of Tajikistan
            </Link>
          </MenuItem>
          <MenuItem onClick={handleClose} sx={{ borderRadius: '10px', border: location === '/about' ? `2px solid ${isDarkMode ? 'white' : 'lightGray'}` : 'none' }}>
            <Link to="/about" style={{ textDecoration: 'none', display: 'flex', padding: '5px', borderRadius: '10px', color: isDarkMode ? 'white' : 'black' }}>
              <BookRounded sx={{ marginRight: '10px' }} /> About Tajikistan
            </Link>
          </MenuItem>
        </Menu>

        <Box
          sx={{
            display: { md: 'flex', xs: 'none' },
            gap: '50px',
            alignItems: 'center',
            padding: '5px',
            borderRadius: '20px',
            backdropFilter: 'blur(6px)',
            transition: 'all 0.2s ease'
          }}
        >
          <Link to="/" style={{
            textDecoration: 'none',
            backgroundColor: location === '/' ? `${isDarkMode ? '#5555ff50' : '#0000ff30'}` : 'transparent',
            borderRadius: '25px',
            padding: '2px'
          }}>
            <StyledButton>Home</StyledButton>
          </Link>
          <Link to="/cities" style={{
            textDecoration: 'none',
            backgroundColor: location === '/cities' ? `${isDarkMode ? '#5555ff50' : '#0000ff30'}` : 'transparent',
            borderRadius: '25px',
            padding: '2px'
          }}>
            <StyledButton>Cities</StyledButton>
          </Link>
          <Link to="/about" style={{
            textDecoration: 'none',
            backgroundColor: location === '/about' ? `${isDarkMode ? '#5555ff50' : '#0000ff30'}` : 'transparent',
            borderRadius: '25px',
            padding: '2px'
          }}>
            <StyledButton>About</StyledButton>
          </Link>
        </Box>

        <Box sx={{ gap: '10px', alignItems: 'center', display: 'flex' }}>
          {/* <StyledButton>
            <Link to="/signup" style={{ textDecoration: 'none', display: 'flex', gap: '5px', color: 'inherit' }}>
              <PersonAddRounded /> Sign Up
            </Link>
          </StyledButton> */}
          <Box sx={{ display: 'flex', gap: '20px' }}>
            <IconButton sx={{ display: { md: 'none', xs: 'flex' } }} onClick={handleClick}>
              <MoreHorizRounded />
            </IconButton>
            <IconButton sx={{ height: 'fit-content' }} onClick={handleChangeTheme}>
              {localStorage.getItem('theme') === 'true' ? <LightMode /> : <DarkMode color="info" />}
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Header;
