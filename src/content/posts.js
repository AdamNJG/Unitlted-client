import React, {useEffect, useState } from 'react';
import './wall.css';
import Delete from '@material-ui/icons/DeleteOutlined';
import EditIcon from '@material-ui/icons/EditOutlined';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import makeRequest from '../handlers/httpHandlers';
import { useSelector} from 'react-redux'
import { useHistory
 } from 'react-router';
 import TextField from "@material-ui/core/TextField";
import PostStats from './postStats'
import AddCommentIcon from '@material-ui/icons/AddComment';
import Comment from './comment';

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


export default function Posts({user, content, dateCreated, id, starList, setCount, comments}) {

    const [update, setUpdate] = useState(false);   
    const [updateContent, setUpdateContent] = useState("");
    const [comment, setComment] = useState(false);
    const [showComments, setShowComments] = useState(true)
    const [commentContent, setCommentContent] = useState("");
    const [starred, setStarred] = useState(() => false);
    const date = new Date(dateCreated);
    const finDate = date.toLocaleString({timeZoneName: "long"});
    var newUser = user;
    const history = useHistory();
    const classes = useStyles();
    const userDetails = useSelector((state) => state.user)


var uname = newUser.username;

if (uname === null){
    uname = "not found"
}

useEffect(() => {

    if (starList?.includes(uname)){
      setStarred(true)
    }
  },[starList, setStarred, uname] );


    const deleteHandler = (e) => {
        e.preventDefault();
        makeRequest("/content/deletepost", "DELETE", id)
       // .then(alert("Post Deleted"))
        .then(setCount(prevcount => prevcount+1))
        .catch(error => console.log(error))
    }

    const updateHandler = (e) => {
        e.preventDefault();
        var body = "{\"content\" : \"" + updateContent +"\",  \"id\" : " + id + "}";
        console.log(body)
        makeRequest("/content/updatepost", "PATCH", body)
        .then(setUpdate(false))
        .then(setUpdateContent({...updateContent ,content:''}))
        .then(() => {
            setCount(prevcount => prevcount+1);})
    
    }

    const commentHandler = (e) => {
        e.preventDefault();
        var body = "{\"content\" : \"" + commentContent +"\",  \"postId\" : " + id + "}";
        console.log(body)
        makeRequest("/content/comment", "POST", body)
        .then(setComment(false))
        .then(setCommentContent({content:''}))
        .then(() => {
            setCount(prevcount => prevcount+1);})
    
    }

    const userDeets =() => {
        history.push(`/user/${uname}`)
    }

    const updateContentHandler = (event)=>{
        setUpdateContent(event.target.value);
        console.log(updateContent)
    }
    
    const commentContentHandler = (event)=>{
        setCommentContent(event.target.value);
        console.log(updateContent)
    }
    

    const clickUpdate = () => {
        if(!update){
        setUpdateContent(content)
        setUpdate(true);
        setShowComments(false)
        setComment(false)
        } else {
            setUpdate(false);
        }
        
    }
    const clickComment = () => {
        if(!comment){
        setUpdate(false)
    
        setComment(true)
        } 
            else {
            setComment(false);
        }
        
    }

    const toggleComment = () => {
        if(!showComments){
            setUpdate(false)
            setShowComments(true)
            console.log(showComments)
        } else {
            setShowComments(false)
        }

    }
    
    if(uname === userDetails.username || userDetails.role === "MOD"){
      
        return (
            <div className="postContainer">
                <div className="username">
                    <Button className="userButton" onClick={userDeets}>{uname.toUpperCase()}
                    </Button>
                    <PostStats starred={starred} setStarred={setStarred} postId={id} setCount={setCount} starList={starList} comments={comments} toggleComment={toggleComment}/>
                    <div className="deleteUpdate">
                        <Button onClick={clickComment}>
                            <AddCommentIcon color="primary"/>
                        </Button>
                        <Button onClick={clickUpdate}>
                            <EditIcon color="primary" />
                        </Button>
                        <Button onClick={deleteHandler}>
                            <Delete color="primary"/>
                        </Button>
                    </div> 
                </div>
        <pre>
        <TextField
          name="content"
          multiline
          autoFocus 
          value={content} readOnly
          fullWidth
          variant="outlined"
        /></pre>
        
                    <div className="dateCreated">{finDate}</div>
                    {update ? (
                        <div>
                            <form>
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
                                <Button variant="contained" color="secondary" 
                                classes={{
                                    root: classes.root, 
                                }} onClick={updateHandler} >Update </Button>
                            </form>
                        </div>
                    ):(null)}
                                        {showComments ? (<div> 

{comments?.map((p,i) => 
<Comment {...p} key={'post-' + i} userDeets={userDeets} starred={starred} setStarred={setStarred} postId={id} setCount={setCount} starList={starList} comments={comments} toggleComment={toggleComment}/>
)}

</div>):(null)}
                                       {comment ? (
                        <div>
                            <form>
                            <TextField
                                name="content"
                                label="Comment"
                                multiline
                                autoFocus 
                                onChange={commentContentHandler}
                                fullWidth
                                variant="outlined" />
                                <Button variant="contained" color="secondary" 
                                classes={{
                                    root: classes.root, 
                                }} onClick={commentHandler} >Post Comment  </Button>
                            </form>
                        </div>
                    ):(null)}

            </div>
                

        );
                    } else {
                        return(
                            <div className="postContainer">
                                <div className="username"><Button onClick={userDeets}>{uname.toUpperCase()}</Button>
                                <PostStats starred={starred} setStarred={setStarred} postId={id} setCount={setCount} starList={starList} comments={comments} setComments={setComment}/>
                                    <div className="deleteUpdate"> 
                                        <Button onClick={clickComment}>
                                            <AddCommentIcon color="primary"/>
                                        </Button>
                                    </div> 
                                </div>
                                <pre>
                     <TextField
                      name="content"
                      multiline
                      autoFocus 
                      value={content} readOnly
                      fullWidth
                      variant="outlined"
                    /></pre>
            
                                <div className="dateCreated">{finDate}</div>
                                {showComments ? (   
                        <div> 
                            {comments?.map((p,i) => 
                            <Comment {...p} key={'post-' + i} userDeets={userDeets}/>)}
                        </div>):(null)}
                                {comment ? (
                        <div>
                            <form>
                            <TextField
                                name="content"
                                label="Comment"
                                value={commentContent}
                                multiline
                                autoFocus 
                                onChange={commentContentHandler}
                                fullWidth
                                variant="outlined" />
                                <Button variant="contained" color="secondary" 
                                classes={{
                                    root: classes.root, 
                                }} onClick={commentHandler} >Post Comment </Button>
                            </form>
                        </div>
                    ):(null)}
            
                        </div>)
                    }
                
                    

}

