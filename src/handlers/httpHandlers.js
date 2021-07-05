
const SERVER_URL = 'http://localhost:8080';

export const makeRequest = (endpoint, method, body) => {
if(method !== "GET"){

    return fetch(SERVER_URL +endpoint, {
         method: method,
         credentials: 'include',
         headers: {
           "Accept": "application/json",
           'Content-Type': 'application/json', 
           'charset': 'utf-8'
         },
         body: body
               })} else {
                return fetch(SERVER_URL +endpoint, {
                    method: method,
                    credentials: 'include',
                    headers: {
                      "Accept": "application/json",
                      'Content-Type': 'application/json', 
                      'charset': 'utf-8'
                    }
                          })


               }

  };

  export default makeRequest;