import { makeStyles } from '@material-ui/core/styles';

export default function OrangeButtons() {    

    const useStyles = makeStyles(theme => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B69 30%, #FF8E53 90%)',
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
return useStyles;
}