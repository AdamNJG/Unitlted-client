import React from 'react';
import { makeStyles } from '@material-ui/core/styles';



class PurpleButtons extends React.Component (){    

  
    useStyles = makeStyles(theme => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B69 30%, #d618a0 90%)',
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

} export default PurpleButtons;