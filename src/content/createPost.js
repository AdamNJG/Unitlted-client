import React, { useState } from 'react';
import './createPost.css';
import { makeStyles } from '@material-ui/core/styles';
import {Button} from '@material-ui/core'
import makeRequest from '../handlers/httpHandlers'
import TextField from "@material-ui/core/TextField";

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

export default function CreatePost({count, setCount}){
    const [postContent, setPostContent] = useState({content: ""});
    const classes = useStyles();
    

    const handlePost = (event) => {
        
        event.preventDefault();
       
        makeRequest("/content/post", 'POST', postContent.content)
      
        .then(setCount(prevcount => prevcount+1))

        setPostContent({content: ""})
        }

    const handleContent = (event) => {
        setPostContent({...postContent, [event.target.name] : event.target.value});
        
    }

        return (
            <form onSubmit={handlePost} className="postForm">
        <TextField
          name="content"
          label="What are you thinking?"
          multiline
          autoFocus 
          onChange={handleContent}
          fullWidth
          variant="outlined"
          value={postContent.content}
        />
     
                <Button type="submit" value="Post" classes={{
                    root: classes.root, // class name, e.g. `classes-nesting-label-x`
                }}> Post </Button>           
            </form>
        );
    
}