import React, {useState} from 'react';
import './register.css';
import {Box,  Container, CssBaseline, Avatar, Grid,Typography,TextField} from '@material-ui/core';
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKeyIconOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import makeRequest from '../handlers/httpHandlers';
import LoginPageButton from '../ui/LoginPageButton';

import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%', // Fix IE 11 issue.
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
      background: 'linear-gradient(45deg, #2063ab 30%, #d618a0 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 48,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      jusitfy: "right",
    },
  }));


export default function PwRequest({handleError}) {


      const classes = useStyles();
      const [regDeets, setRegDeets] = useState({username: '', password: '', passwordRepeat: '', email: '' });
      const history = useHistory();


      


      const resetPassword = React.useCallback((e) => {
        e.preventDefault();
        handleError("Sending email", "info");

          var resetSubmit = "{\"username\": \"" + regDeets.username.toLowerCase() + "\"}";

          makeRequest("/auth/pwtoken", 'POST', resetSubmit)
          .then((response) => {
            return response.text();

          })
          .then((responseText) => {
            if(responseText === "Password reset email sent"){
                      handleError(responseText, "success");
                      history.push("/login")
                  } else {
                    handleError(responseText, "error");
                  }})
          .catch(error => alert(error))

        
     
      },[regDeets, history, handleError])     


  const usenameChangedHandler = React.useCallback((event) => {

  setRegDeets({...regDeets, [event.target.name] : event.target.value});
  
},[regDeets, setRegDeets]);


   const pass = () => {
     history.push("/login")
   }
       
    return( 
        <Container>
            <CssBaseline />
             <Avatar className={classes.avatar}>
                    <VpnKeyIconOutlinedIcon/>
                </Avatar>
                   <Typography component="h1"variant="h5">
                  
                    Forgotten Password
                </Typography>
        <form onSubmit={resetPassword} >
        <div className="formContainer">
        <TextField
                        varient="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="username"
                        label="Username or E-mail Address"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={usenameChangedHandler}
                        /><br/>
       
                        
                        </div>
                        <Grid item>
            <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        >Request password reset
                        </Button>
                        </Grid>
            
        </form>
     <Box display="flex"   justifyContent="flex-end" alignItems="flex-end">
       
                        <LoginPageButton link={pass} string="Back"/>
                        </Box>
        
        </Container>
    )

}