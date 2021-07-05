import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import makeRequest from '../handlers/httpHandlers';
import { useDispatch } from 'react-redux'
import {clearUser} from '../features/user/userSlice'
import {newErrorAlert } from '../features/error/errorSlice'


const useStyles = makeStyles(theme => ({
  root: {
    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    borderRadius: 3,
    border: 0,
    color: 'white',
    height: 48,
    padding: '0 30px',
    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    jusitfy: "right",
    margin: "5px",
  },
}));

export default function Logout() {
  const dispatch = useDispatch()

  const handleError = (error, severity) => {
    dispatch(newErrorAlert({message: error, variant: severity}))
  };



  const classes = useStyles();

    const reset = () => {
        dispatch(clearUser());
      } 
     

    const deleteCookies = () => {
      makeRequest("/auth/logout", "POST")
      .then((response) => {
        return response.text();
      })
      .then((responseText) => {
        if(responseText === "logged out"){
                  handleError(responseText, "success");
              } else {
                handleError(responseText, "error");
              }})
      .catch(error => alert(error))
                
              }
      
    
    const logoutHandler = () => {
      deleteCookies();
      reset();
    }



    

    return (
        <div>
        <Button classes={{
            root: classes.root, // class name, e.g. `classes-nesting-label-x`
        }} onClick={logoutHandler}> <MeetingRoomIcon /> </Button>
        </div>
          
    )
}
