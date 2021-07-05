import React, {useState} from 'react';
import Wall from './wall'


function Content() {
  
    const [count, setCount] = useState(() =>0);


    return(


       <Wall count={count} setCount={setCount}/>

    )
    }export default Content;