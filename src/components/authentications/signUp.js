import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useState } from "react";
import UserDataService from "../../services/UserService";

import { Link } from 'react-router-dom';
const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
    height:"50%",
  width:"50%"
  },
  form: {
    width: '100%', 
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
    backgroundColor:'#c3073f',
  },
}));

export default function SignUp(props) {
  const classes = useStyles();
  const initialState = {
    username: "",
    address: "",
    emailId: "", 
    password: "",

  };
 
  const [user, setUser] = useState(initialState);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };
  const saveUser = (event) => {
    event.preventDefault();
    const data = {
      username: user.username,
      address: user.address,
      email_id: user.emailId,
      password: user.password
     
    };
    UserDataService.create(data)
      .then((response) => {
        setUser({
            username: response.username,
            address: response.address,
            email_id: response.emailId,
            password: response.password
          
        });
        props.handleSignupClose();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
      <Avatar src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcStCWD5gVVR-_KmtcVR3rj3ErpF-TdvnJWBrQ&usqp=CAU" className={classes.avatar} >
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          SIGN UP
        </Typography>
        <form className={classes.form} onSubmit={saveUser} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
              value={user.username}
              onChange={handleInputChange}
                autoComplete="uname"
                name="username"
                variant="outlined"
                placeholder="Username*"
                required
                fullWidth
                autoFocus
                inputProps={{maxLength :20,minLength:3}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
               value={user.address}
               onChange={handleInputChange}
                variant="outlined"
                fullWidth
                placeholder="Address*"
                name="address"
                autoComplete="Add"
                required
                inputProps={{maxLength :50,minLength:5}}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                value={user.emailId}
                onChange={handleInputChange}
                variant="outlined"
                type="email"
                fullWidth
                placeholder="Email*"
                name="emailId"
                autoComplete="EmailId"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField  
              value={user.password}
                onChange={handleInputChange}
                variant="outlined"
                fullWidth
                name="password"
                type="password"
                id="password"
                placeholder="Password*"
                autoComplete="current-password"
                required
                inputProps={{maxLength :10,minLength:3,pattern: '^.{6,}$'}}
              
              />
            </Grid>
          </Grid>
          <Button 
            type="submit"
            fullWidth
            variant="contained"
            color="secondary"
            className={classes.submit}
          >
            Sign Up
          </Button >
          <Grid container justify="flex-end">
            <Grid item>
              <Link  to="/Login" variant="body2">
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
      
      </Box>
    </Container>
  );
}