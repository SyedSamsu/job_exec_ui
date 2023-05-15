import { Grid, Paper, styled } from '@mui/material'
import React from 'react'
import Login from './Login'
import SignUp from './SignUp'

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const loginSignup = () => {
  return (
    <Grid container spacing={2} columns={16}>
    <Grid item xs={8}>
      <Item><Login /></Item>
    </Grid>
    <Grid item xs={8}>
      <Item><SignUp /></Item>
    </Grid>
    </Grid>
  )
}

export default loginSignup
