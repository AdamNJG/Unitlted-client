import React, {useState} from 'react';
import './wall.css';
import Delete from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import Button from '@material-ui/core/Button';
import TextField from "@material-ui/core/TextField";
import { makeStyles } from '@material-ui/core/styles';

import makeRequest from '../handlers/httpHandlers';


const useStyles = makeStyles(theme => ({
    root: {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      borderRadius: 3,
      border: 0,
      color: 'white',
      height: 30,
      padding: '0 30px',
      boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
      jusitfy: "right",
      margin: "5px",
    },
  
  }));

const Comment = ({id, content, user, userDeets, dateCreated, setCount}) => {
    const date = new Date(dateCreated);
    const finDate = date.toLocaleString({timeZoneName: "long"});
    const [update, setUpdate] = useState(false);
    const [updateContent, setUpdateContent] = useState("");
    const classes = useStyles();
    

    const toggleUpdate = () => {
        update ? setUpdate(false) : setUpdate(true)
        setUpdateContent(content)
    }

    
    const updateContentHandler = (event)=>{
        setUpdateContent(event.target.value);
    }

    const updateHandler = (e) =>{
        e.preventDefault();
        var body = "{\"content\" : \"" + updateContent +"\",  \"id\" : " + id + "}";
        console.log(body)
        makeRequest("/content/updatecomment", "PATCH", body)
        .then(setUpdate(false))
        .then(setUpdateContent({...updateContent ,content:''}))
        .then(() => {
            setCount(prevcount => prevcount+1);})
    }

return (
    <div className="commentContainer">
        <div className="username">
            <Button className="userButton" onClick={userDeets}>{user.username.toUpperCase()}
            </Button>
           <div className="deleteUpdate">

                <Button onClick={toggleUpdate}>
                    <EditIcon color="primary" />
                </Button>
                <Button >
                    <Delete color="primary"/>
                </Button>
</div> 
        </div>
        {update? 
        <form>
        <pre>
        <TextField
        name="content"
        label="Update"
        value={updateContent}
         multiline
        autoFocus 
        onChange={updateContentHandler}
        fullWidth
        variant="outlined"
                                        />
                                        </pre>
        <Button variant="contained" color="secondary" 
        classes={{
            root: classes.root, 
        }} onClick={updateHandler} >Update </Button>
        </form>
    : 
<pre>
<TextField
  name="content"
  multiline
  autoFocus 
  value={content} readOnly
  fullWidth
  variant="outlined"
/></pre>}
<div className="dateCreated">{finDate}</div>

</div>)
}
export default Comment;
