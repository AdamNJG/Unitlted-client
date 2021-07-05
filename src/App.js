import React, {useCallback, useEffect} from 'react';
import makeRequest from './handlers/httpHandlers'
import './App.css';
import {createMuiTheme, ThemeProvider} from '@material-ui/core'
import purple from '@material-ui/core/colors/purple';
import orange from '@material-ui/core/colors/orange';
import Login from './auth/login'
import {Switch, Route, Redirect} from "react-router-dom";
import Snackbar from '@material-ui/core/snackbar';
import Alert from '@material-ui/lab/Alert';
import { useSelector, useDispatch } from 'react-redux'
import {setUser, setInvalid} from './features/user/userSlice'
import {newErrorAlert, clearErrorAlert } from './features/error/errorSlice'
import Register from './auth/register'
import PwRequest from './auth/pwRequest'
import ForgotPW from './auth/forgotPW'
import Validate from './auth/validate'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import TemporaryDrawerLeft from './ui/temporaryDrawerLeft'
import HomeButton from './ui/HomeButton'
import Content from './content/content'

function App() {
  const errorAlert = useSelector((state) => state.error)
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()




  const handleError = (error, severity) => {
    dispatch(newErrorAlert({message: error, variant: severity}))
  };


  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
   dispatch(clearErrorAlert())
  };



  const checkValid = useCallback(() => {
    makeRequest('/content/getuser', 'GET', "")
    .then((response) => response.json())
      .then((data) => {
        if(data.status === 401){
          dispatch(setInvalid())
            }
          else {
            dispatch(setUser({username: data.username, role: data.role, validated: true}))
         }
        }
        )
   .catch((error) => {console.log(error);})
},[dispatch] )

useEffect(() => {
  checkValid()
  if(user.valid){
  dispatch(newErrorAlert({message: `welcome ${user.username}`, variant: "success"}))}
},[checkValid, dispatch, user] );


  return (
    <ThemeProvider theme={theme}>

      <Snackbar
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'center',
              }}
      open={errorAlert.open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={errorAlert.variant}>
          {errorAlert.message}
        </Alert>
      </Snackbar>
      <Switch>
      <Route path="/register">
      {user.validated ? <Redirect to="/"/> : null}
         <Register handleError={handleError}/>
        </Route>
        <Route path="/resetpassword">
        {user.validated ? <Redirect to="/"/> : null}
          <PwRequest handleError={handleError}/>
        </Route>
        <Route path="/password/:token">
        <ForgotPW handleError={handleError}/>
      </Route>
      <Route path="/validate/:token">
        <Validate handleError={handleError}/>
      </Route>
      
        <Route path="/login" onEnter={checkValid}>
        {user.validated ? <Redirect to="/"/> : null}
    <div className="App">
        <Login handleError={handleError}/>
    </div>
    </Route>
    <Route path="/" onEnter={checkValid}>
    {user.validated ? null : <Redirect to="/login"/>}
    <div className="background">
       <AppBar position="static">
          <Toolbar>
            <div className="homecontainer"><HomeButton/> </div>
            <div className="titleDiv">
             UNTITLED
            </div>
            <div>
              <TemporaryDrawerLeft/>
           </div>
          </Toolbar>
        </AppBar>
        <div className="content">
          <Content />
        </div>
    </div>
  </Route>
    </Switch>
    </ThemeProvider>
  );
}

const theme = createMuiTheme({
  palette: {
    primary: {
      main: purple[500],
    },
    secondary: {
      main: orange[500],
    },
  },

});

export default App;
