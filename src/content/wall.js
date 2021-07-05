import React, {useState, useEffect} from 'react';
import PostList from './postList';
import CreatePost from './createPost'
import './wall.css';
import makeRequest from '../handlers/httpHandlers';



export default function Wall({count, setCount}) {

    const [posts, setPosts] = useState();
    const [sortBy, setSortBy] = useState(() => "Ascending");


    useEffect(()=> {
       GetListOfPosts(sortBy, setPosts);
    },[count, sortBy]);


    useEffect(() => {
        const interval = setInterval(() => {
            GetListOfPosts(sortBy, setPosts);
        }, 10000);
        return () => clearInterval(interval);
      },[sortBy] );


  
    return( 
        <div>
            <CreatePost setCount={setCount} count ={count}/>
            <div className="postContainer">
                <PostList posts={posts} setCount={setCount} count={count} sortBy={sortBy} setSortBy={setSortBy}/>
            </div>
        </div>
    );

}

function GetListOfPosts(sortBy, setPosts) {

    
        makeRequest(urlSwitch(sortBy), "GET", "")
        .then((response) => response.json())
        .then((data) => {
           var posts = data
           setPosts(posts)
        })
        .catch(err => console.log(err))
    

}

const urlSwitch = (sortBy) => {

    var getUrl;

    switch(sortBy){
        case "Ascending":
            getUrl = "/content/getpostasc";
            break;
        case "Descending":
            getUrl = "/content/getpostdesc";
            break;
        case "Popular":
            getUrl = "/content/getpostpop";
            break;
        default:
            getUrl = "/content/getpost";
            break;
}
return getUrl
}