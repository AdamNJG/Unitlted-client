import './postList.css'
import React from 'react';

import {  useDispatch} from 'react-redux'
import makeRequest from '../handlers/httpHandlers';
import {newErrorAlert } from '../features/error/errorSlice'
import StarBorderIcon from '@material-ui/icons/StarBorder';
import StarIcon from '@material-ui/icons/Star';
import Button from '@material-ui/core/Button';
import { yellow } from '@material-ui/core/colors';

const Stared = ({starred, setStarred, postId, starNumber, setCount}) => {
    const dispatch = useDispatch()

    const toggle = () => {
        starred ? setStarred(false) : setStarred(true);

        makeRequest("/content/giveprops", "POST", postId)
        .then((response) => {
            return response.text();
          })
          .then((responseText) => {
            if(responseText === "Star added." || responseText === "Star removed."){
                      dispatch(newErrorAlert({message: responseText, variant: "success"}));
                      console.log(starNumber)
                  } else {
                    dispatch(newErrorAlert({message: responseText, variant: "error"}));
                  }
                })
          .catch(error => alert(error))

          setCount(prevCount => prevCount + 1)
    }

    return(
        <div>{starred ? <Button size="small"  onClick={toggle}><StarIcon style={{ color: yellow[700] }} /></Button> : <Button size="small" onClick={toggle}><StarBorderIcon style={{ color: yellow[700] }} /></Button> }</div>
    )
} 
export default Stared;