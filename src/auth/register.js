import React, {useEffect, useState} from 'react';
import './register.css';
import {Box,  Container, CssBaseline, Avatar, Grid,Typography,TextField} from '@material-ui/core';
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import AccountCircleOutlinedIcon from '@material-ui/icons/AccountCircleOutlined';
import {useHistory} from "react-router-dom";
import makeRequest from '../handlers/httpHandlers';
import LoginPageButton from '../ui/LoginPageButton';

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


export default function Register({handleError}) {


      const classes = useStyles();
      const [regDeets, setRegDeets] = useState({username: '', password: '', passwordRepeat: '', email: '' });
      const [isUname, setIsUname] = useState(false);
      const [unameHelp, setUnameHelp] = useState("");
      const [isPass, setIsPass] = useState(false);
      const [passHelp, setPassHelp] = useState("");
      const [isPassRep, setIsPassRep] = useState(false);
      const [passRepHelp, setPassRepHelp] = useState("");
      const [isEmail, setIsEmail] = useState(false);
      const [emailHelp, setEmailHelp] = useState("");
      const [fullValid, setFullValid] = useState(true);
      const [passMatch, setPassMatch] = useState(false);
      const history = useHistory();


      const userMessage = "Username must be at least 4 characters long";
      const passwordMessage = "Password must be at least 8 characters long, with at least: 1 upper case letter, 1 lower case letter, 1 special character and 1 number";
      const emailMessage = "Please enter a valid email address";
      


      const registerUser = React.useCallback((e) => {
        e.preventDefault();

        handleError("Registering User", "success");

          var regSubmit = "{\"username\": \"" + regDeets.username + "\" , \"email\" : \""+ regDeets.email.toLowerCase() +"\" , \"password\" : \"" + regDeets.password + "\"}";

          makeRequest("/auth/signup", "POST", regSubmit)
          .then((response) => {
            return response.text();
          })
          .then((responseText) => {
            if(responseText === "User registered successfully, validation email sent!"){
                      handleError(responseText, "success");
                      history.push("/login")
                  } else {
                    handleError(responseText, "error");
                  }})
          .catch(error => alert(error))

      },[ regDeets, history, handleError])


      useEffect(() => {
        if(!isUname &&  passMatch){
          setFullValid(false) 
        }else (setFullValid(true))
       
      },[isUname, setFullValid, passMatch])
      
const reg = () => {
history.push("/login")
  }

  const usenameChangedHandler = React.useCallback((event) => {

    if(event.target.value.length < 4){
      setIsUname(true)
      setUnameHelp(userMessage)
    } else{
      setIsUname(false);
      setUnameHelp("")
  setRegDeets({...regDeets, [event.target.name] : event.target.value});
  }
},[setIsUname, setUnameHelp, regDeets, setRegDeets]);




  const passwordChangedHandler = React.useCallback((event) => {

   var spChars = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;


    if(new RegExp(spChars).test(event.target.value)){
      setIsPass(false);
      setPassHelp("");
      setRegDeets({...regDeets, [event.target.name] : event.target.value});

    } else {
      setIsPass(true);;
      setPassHelp(passwordMessage);;
    }

    if(event.target.value === regDeets.passwordRepeat){
      setIsPassRep(false);
      setPassRepHelp("");
    } else {
      setIsPassRep(true);
      setPassRepHelp("passwords do not match")
    }
    
  },[setIsPass, setPassHelp, setIsPassRep, setPassRepHelp, regDeets, setRegDeets])


  const emailChangedHandler = React.useCallback((event) => {
    var email =   /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,})+$/;
    if(!event.target.value.match(email)){
      setIsEmail(true);
      setEmailHelp(emailMessage)
      setPassMatch(false);
    } else {
      setIsEmail(false);
      setEmailHelp("")
      setRegDeets({...regDeets, [event.target.name] : event.target.value});
      setPassMatch(true)
    }
  },[setIsEmail, setEmailHelp, setRegDeets, regDeets])

  const passRepeatChangedHandler = React.useCallback((event) => {

    if(event.target.value === regDeets.password){
      setPassMatch(true)
      setIsPassRep(false);
      setPassRepHelp("");
      setRegDeets({...regDeets, [event.target.name] : event.target.value})
    } else if(!(event?.target.value === regDeets.password)){
      setPassMatch(false);
      setIsPassRep(true);
      setPassRepHelp("passwords do not match")
      setRegDeets({...regDeets, [event.target.name] : event?.target.value});
    } 
  },[setIsPassRep, setPassRepHelp, regDeets, setRegDeets])
      
  
    return( 
        <Container>
            <CssBaseline />
             <Avatar className={classes.avatar}>
                    <AccountCircleOutlinedIcon/>
                </Avatar>
                   <Typography component="h1"variant="h5">
                  
                    Register
                </Typography>
        <form onSubmit={registerUser} >
        <div className="formContainer">
        <TextField
                        varient="outlined"
                        margin="normal"
                        required
                        fullWidth
                        helperText={unameHelp}
                        error={isUname}
                        id="username"
                        label="Username"
                        name="username"
                        autoComplete="username"
                        autoFocus
                        onChange={usenameChangedHandler}
                        /><br/>
                          <TextField
                        varient="outlined"
                        margin="normal"
                        required
                        fullWidth
                        helperText={emailHelp}
                        error={isEmail}
                        id="email"
                        label="E-mail Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={emailChangedHandler}
                        /><br/>
                            <TextField
                        varient="outlined"
                        margin="normal"
                        required
                        fullWidth
                        helperText={passHelp}
                        error={isPass}
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        //value={userDetails.password} 
                        autoComplete="current-password"
                        onChange={passwordChangedHandler}
                        /><br/>
                                 <TextField
                        varient="outlined"
                        margin="normal"
                        required
                        fullWidth
                        helperText={passRepHelp}
                        error={isPassRep}
                        name="passwordRepeat"
                        label="Repeat Password"
                        type="password"
                        id="passwordRepeat"
                        //value={userDetails.password} 
                        autoComplete="current-password"
                        onChange={passRepeatChangedHandler}
                        />
                        
                        </div>
                        <Grid item>
            <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        disabled={fullValid}
                        className={classes.submit}
                        >Register
                        </Button>
                        </Grid>
            
        </form>
     <Box display="flex"   justifyContent="flex-end" alignItems="flex-end">
      
                        <LoginPageButton link={reg} string="back"/>
                        </Box>
        
        </Container>
    )

    }