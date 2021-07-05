import React, {useState} from 'react';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import { Avatar, CssBaseline, FormControlLabel, TextField, Typography, Checkbox, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import purple from '@material-ui/core/colors/purple';
import red from '@material-ui/core/colors/red';
import './login.css';
import makeRequest from '../handlers/httpHandlers';
import {useHistory} from "react-router-dom";
import LoginPageButton from '../ui/LoginPageButton';
import {useDispatch } from 'react-redux'
import {setUser, setInvalid} from '../features/user/userSlice'
import {newErrorAlert} from '../features/error/errorSlice'



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
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: red[500],
      },
    },
  }));

 

export default function SignIn({handleError}) {

  const dispatch = useDispatch()
 
  const classes = useStyles();
  const [rememberMe, setRememberMe] = useState(false);
  const [logDeets, setLogDeets] = useState({username: '', password: ''});


  const history = useHistory();
    

  const POST = 'POST';

  const login = (e) => {

          
    e.preventDefault();

    var uname = logDeets.username.trim();
    var password = logDeets.password;
    var auth = "{ \"username\": \"" + uname + "\" , \"password\" : \"" + password + "\"}";
          
    if(rememberMe){
      auth = "{ \"username\": \"" + uname + "\" , \"password\" : \"" + password + "\" , \"rememberMe\" : " + rememberMe + "}";
    }
          

    handleError("Signing in", 'info');
          makeRequest("/auth/signin", POST, auth)
          .then((response) => {
            return response.text();

          })
          .then((responseText) => {
            if(responseText === "Logged in"){
              makeRequest('/content/getuser', 'GET', "")
              .then((response) => response.json())
                .then((data) => {
                  if(data.status === 401){
                    dispatch(setInvalid())
                      }
                    else {
                      dispatch(setUser({username: data.username, role: data.role, validated: true}))
                      dispatch(newErrorAlert({message: `welcome ${data.username}`, variant: "success"}))
                   }
                  }
                  )
             .catch((error) => {console.log(error);})
            } else {
              handleError(responseText, "error")
            }
          })
          .catch(error => console.log(error))
      }
  
        const inputChangedHandler = (event) =>  {
          setLogDeets({...logDeets, [event.target.name] : event.target.value});
          }

  
        const handleRemember =(event) => {
          if(rememberMe){
            setRememberMe(false);
          } else {
            setRememberMe(true);
          }
        }

        const reg = () => {
          history.push("/register");
          
        }

        const pass = () => {
          history.push("/resetpassword");
        }



    
    return(
      <div>

        <Container>
              <CssBaseline />
              
              <div>
              
                  <Avatar className={classes.avatar}>
                      <LockOutlinedIcon />
                  </Avatar>
                  <Typography component="h1"variant="h5">
                      Sign in 
                  </Typography>
                  
                  <form  onSubmit={login} className={classes.form}>
                          <TextField
                          varient="outlined"
                          margin="normal"
                          required
                          fullWidth
                          id="username"
                          label="Username"
                          name="username"
                          autoComplete="username"
                          //={userDetails.username}
                          autoFocus
                          onChange={inputChangedHandler}
                          />
                          <TextField
                          varient="outlined"
                          margin="normal"
                          required
                          fullWidth
                          name="password"
                          label="Password"
                          type="password"
                          id="password"
                          //value={userDetails.password} 
                          autoComplete="current-password"
                          onChange={inputChangedHandler}
                          />
                          <FormControlLabel 
                          control={<Checkbox checked={rememberMe} onChange={handleRemember} color="primary" />}
                          label="Remember me (for two weeks)"
                          />
                          <Button
                          type="submit"
                          fullWidth
                          variant="contained"
                          color="primary"
                          className={classes.submit}
                          >Sign in
                          </Button>
                          <Box display="flex" justifyContent="space-between">
                            
                                  <LoginPageButton link={pass} string="Forgot password?"/>
                           
                                  <LoginPageButton link={reg} string="Don't have an account? Sign Up!"/>
                          
                          </Box>
                  </form>
               
              </div>
          </Container>
 
        
    
  
        </div>
    

    );
       

};

