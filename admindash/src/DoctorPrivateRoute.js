import React, { useEffect, useState } from 'react';
import {Route, Redirect, useHistory} from 'react-router-dom'
import MasterLayout from './layouts/doctor/MasterLayout';
import axios from 'axios';
import swal from 'sweetalert';



function DoctorPrivateRoute({...rest}) {

    const history = useHistory();

    const [Authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Use Axios to make an HTTP GET request to the '/api/checkingAuthenticated' endpoint
        axios.get(`/api/checkingAuthenticated`).then(res => {
          // Check if the HTTP response status is 200 (OK)
          if (res.status === 200) {
            // If the status is 200, set the 'authenticated' state to 'true'
            setAuthenticated(true);
          }
      
          // Regardless of the response status, set 'loading' state to 'false'
          setLoading(false);
        });
      
        // This return function is used for cleanup when the component unmounts or when the dependencies change.
        // In this case, it sets the 'authenticated' state to 'false' when the component unmounts.
        return () => {
          setAuthenticated(false);
        };
      }, []);

        axios.interceptors.response.use(undefined, function axiosRetryInterceptor(err) {
            // Check if the error response has a status code of 401 (Unauthorized)
            if (err.response) {
              if (err.response.status === 401) {
                // Display a warning using the "swal"
                swal('Unauthorized', err.response.data.message, 'warning');
                
                // Redirect the user to the home page
                history.push('/');  
              }
            }
            // Reject the promise, indicating that the error should propagate further
            return Promise.reject(err);
        });

        axios.interceptors.response.use(function (response) {
            return response;
          }, 
          function(error){
            // Check if there's a response object in the error
            if (error.response) {
              const { status } = error.response;
        
              if (status === 401) {
                // Handle 401 (Unauthorized) error
                swal('Unauthorized', error.response.data.message, 'warning');
                history.push('/');
              } else if (status === 403) {
                // Handle 403 (Forbidden) error
                swal('Forbidden', error.response.data.message, 'warning');
                history.push('/403');
              } else if (status === 404) {
                // Handle 404 (Not Found) error
                swal('404 Not Found!', 'Url/Page Not Found', 'warning');
                history.push('/404');
              }
            } else {
              // Handle other errors (e.g., network issues)
              console.error('Network Error:', error.message);
              // Optionally, you can redirect to a generic error page
            }
        
            // Reject the promise to propagate the error further
            return Promise.reject(error);
          }
        );

        if(loading) {
            return <div>Loading...</div>;
        }

    return (

        <Route  {...rest}
            render={({props,location}) =>
                Authenticated ?
                (<MasterLayout {...props}/>) :
                (<Redirect to={{pathname: "/login", state: {from:location}}}/>)
            }
        />
    );
}

export default DoctorPrivateRoute;