import React, { useEffect, useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert';
import {Link, useHistory} from 'react-router-dom'


function EditAvailability(props)
{


    const history = useHistory();
    const [loading, setLoading] = useState(true);
    const [availabilityInput, setAvailability] = useState([])
    const [availabilitylist, setAvailabilitylist] = useState([])
    const [error, setError] =  useState([])


    const handleInput = (e) => {
        e.persist();

        setAvailability({...availabilityInput, [e.target.name]: e.target.value})
    }


    useEffect(() => {

        const availability_id = props.match.params.id;
        axios.get(`/api/doctor/EditAvailability/${availability_id}`).then(res=>{
            if(res.data.status === 200) {
                setAvailability(res.data.availability);
            }
            else if(res.data.status === 404) {
                swal("Error", res.data.message, 'error');
                history.push('/doctor/DocAvailability')
            }
        })

    }, [props.match.params.id, history])

    useEffect(() => {
        axios.get(`/api/doctor/view-availability`).then(res=>{
          if(res.status === 200)
          {
            setAvailabilitylist(res.data.availability)
          }
          setLoading(false)
        })
      }, [])

 
    
    var viewavailability = "";
    if(loading)
    {
        return <h4>Loading Availibilities</h4>
    }
    else
    {
        
        viewavailability =
        availabilitylist.map((item, idx)=>{
            return (
            <div key={idx}>
                <ul>
                <li><span> <strong>Start Time: </strong> {item.start_time}</span></li>
                <li><span> <strong>End Time: </strong> {item.end_time}</span></li>
                <Link to={`/doctor/EditAvailability/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
                </ul>
            </div>
            )
            })
    }


    const updateAvailability = (e) => {
        e.preventDefault();

        const availability_id = props.match.params.id;
        const data = availabilityInput;
        axios.put(`/api/doctor/updateAvailability/${availability_id}`, data).then(res=>{
            if(res.data.status === 200)
            {
                swal("Success", res.data.message, 'success')
                setError([]);
            }
            else if(res.data.status === 422)
            {
                swal('All input fields are required','', 'error');
                setError(res.data.errors);
            }
            else if(res.data.status === 404) {
                swal('Error', res.data.message, 'error');
                history.push('doctor/DocAvailability')
            }
        })

        axios.get(`/api/doctor/view-availability`).then(res=>{
            if(res.status === 200)
            {
              setAvailabilitylist(res.data.availability)
            }
        })
    }

    
    return (
        <div className="container-fluid p-0">
          <div className='mb-3'>
            <h1 className="h3 d-inline align-middle">Add Your Availability</h1>
          </div>
          <div className='row'>
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0"> Availability Information </h5>
                    </div>
                    <div className='card-header'>
                        
                        <Link className='text-success' to={`/doctor/DocAvailability`}>Add new availability</Link>
                    </div>
                    <div className="card-body">
                      <form onSubmit={updateAvailability}>
                      <div className='mb-3'>
                          <label className="form-label">Your Start Time</label>
                          <input type="time" name='start_time' onChange={handleInput} value={availabilityInput.start_time} className="form-control"/>
                          <span className='text-danger'>{error.start_time}</span>
                      </div>
                      <div className='mb-3'>
                          <label className="form-label">Your End Time</label>
                          <input type="time" name='end_time' onChange={handleInput} value={availabilityInput.end_time} className="form-control"/>
                          <span className='text-danger'>{error.end_time}</span>
                      </div>
                      <div className='d-flex justify-content-center'>
                          <button type='submit' className="btn btn-secondary">Update</button>
                      </div>
                      </form>
                    </div>
                </div>
            </div>
            
            <div className="col-12 col-lg-6">
                <div className="card">
                    <div className="card-header">
                      <h5 className="card-title mb-0"> Availabilty Slots </h5>
                    </div>
                    <div className="card-body">
                      <div className='mb-3'>
                            {viewavailability}
                      </div>
                    </div>
                </div>
                
            </div>
            
          </div>
        </div>
      );
}

export default EditAvailability;