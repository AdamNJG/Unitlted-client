import React, {useState, useEffect} from 'react';
import './register.css';
import {Container, CssBaseline, Avatar, Grid,Typography,TextField} from '@material-ui/core';
import {  makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import VpnKeyIconOutlinedIcon from '@material-ui/icons/VpnKeyOutlined';
import { useHistory, useParams } from 'react-router-dom';
import makeRequest from '../handlers/httpHandlers';


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


export default function ForgotPW({handleError}) {


      const classes = useStyles();
      const [regDeets, setRegDeets] = useState({password: ''});

      const [isPass, setIsPass] = useState(false);
      const [passHelp, setPassHelp] = useState("");

      const [isPassRep, setIsPassRep] = useState(false);
      const [passRepHelp, setPassRepHelp] = useState("");
      const [fullValid, setFullValid] = useState(true);
      const [passMatch, setPassMatch] = useState(false);
      const history = useHistory();
      let { token } = useParams();

      const passwordMessage = "Password must be at least 8 characters long, with at least: 1 upper case letter, 1 lower case letter, 1 special character and 1 number";
      const passwordRepeat =  "passwords do not match";
      

      useEffect(() =>{
        if(token < 100000 || token > 999999){
          handleError("Invalid token","error");
          history.push("/login");
        }
      },[token, history, handleError])


      const resetPassword = React.useCallback((e) => {
        e.preventDefault();


          var resetSubmit = "{\"token\" : \"" + token + "\", \"newPassword\" : \"" + regDeets.password + "\"}";

  
          makeRequest("/auth/resetpassword", "PUT", resetSubmit)
          .then((response) => {
            return response.text();
          })
          .then((responseText) => {
            if(responseText === "Password Reset"){
                      handleError(responseText, "success");
                      history.push("/login")
                  } else {
                    handleError(responseText, "error");
                    history.push("/login")
                  }})
          .catch(error => alert(error))

        
     
      },[regDeets, history, token, handleError])


useEffect(() => {
 
  if(passMatch){
    setFullValid(false) 
  }else (setFullValid(true))
 
},[passMatch, setFullValid ])
      



  const passwordChangedHandler = React.useCallback((event) => {

    var spChars = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[#$@!%&*?])[A-Za-z\d#$@!%&*?]{8,30}$/;
 
 
     if(new RegExp(spChars).test(event.target.value)){
       setIsPass(false);
       setPassHelp("");
       setRegDeets({...regDeets, [event.target.name] : event.target.value});
 
     } else {
       setIsPass(true);;
       setPassHelp(passwordMessage);
     
     }
 
     if(event.target.value === regDeets.passwordRepeat){
       setIsPassRep(false);
       setPassRepHelp("");
       setPassMatch(true)
     } else {
       setIsPassRep(true);
       setPassRepHelp(passwordRepeat)
    
     }
     
   },[setIsPass, setPassHelp, setIsPassRep, setPassRepHelp, regDeets, setRegDeets, setPassMatch])
 

 
   const passRepeatChangedHandler = React.useCallback( (event) => {
 
     if(event.target.value === regDeets.password){

       setPassMatch(true);
       setIsPassRep(false);
       setPassRepHelp("");
       setRegDeets({...regDeets, [event.target.name] : event.target.value});
       
     } else if(!(event?.target.value === regDeets.password)){
       setPassMatch(false);
       setIsPassRep(true);
       setPassRepHelp(passwordRepeat)
       setRegDeets({...regDeets, [event.target.name] : event?.target.value});
      
     } 
   },[setIsPassRep, setPassRepHelp, regDeets, setRegDeets, setPassMatch])

       
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
                        >Reset password
                        </Button>
               
                        </Grid>
            
        </form>

        
        </Container>
    )

}