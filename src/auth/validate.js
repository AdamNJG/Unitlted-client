
import React, { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import makeRequest from '../handlers/httpHandlers';

export default function Validate(handleError){
    const history = useHistory();
    const { token } = useParams();

    useEffect(() =>{
        if(token < 100000 || token > 999999){
          handleError("Invalid token");
          history.push("/login");
        }
        makeRequest("/auth/emailval", "POST", "{\"token\" : \"" + token + "\"}")
        .then(alert("Email Validated"))
        .then(history.push("/login"))
        .catch(error => console.log(error))
      },[token, history, handleError])


    return(
        <div>
            validating...
        </div>
    )
}