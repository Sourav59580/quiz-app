import React from 'react'
import { Box, Button, Stack, Typography } from '@mui/material'
import { Link } from 'react-router-dom';
import notfound from '../../assets/images/404 Error-bro.svg';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';

const Error = () => {
  return (
    <Box sx={{ width: '100%', height: '100vh', p: 4 }}>
      <Stack direction="column" justifyContent="center" alignItems="center">
        <img src={notfound} alt='404' style={{ width: '350px' }} loading="lazy"/>
        <Typography variant='h6' sx={{ mb: 4}}>The page you were looking for doesn't exist.</Typography>
        <Link to='/quiz'>
          <Button size='large' variant="contained"><ArrowBackIosIcon sx={{ fontSize: '15px' }} />Go Back</Button>
        </Link>
      </Stack>
    </Box>
  )
}

export default Error