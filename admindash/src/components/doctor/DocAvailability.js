import axios from 'axios';
import React, { useEffect, useState } from 'react';
import swal from 'sweetalert';
import {Link} from 'react-router-dom'


function DocAvailability() {


  const initialAvailability = {

    start_time: '',
    end_time: '',
    error_list: []
  }

  const [loading, setLoading] = useState(true);
  const [availabilitylist, setAvailabilitylist] = useState([])
  const [availabilityInput, setAvailability] = useState(initialAvailability)


  useEffect(() => {
    axios.get(`/api/doctor/view-availability`).then(res=>{
      if(res.status === 200)
      {
        setAvailabilitylist(res.data.availability)
      }
      setLoading(false)
    })
  }, [])


  const deleteAvailability = (e, id) => {
    e.preventDefault();

    const ThisClicked = e.currentTarget;

    axios.delete(`/api/doctor/DeleteAvailability/${id}`).then(res=> {
        if(res.data.status === 200){
            swal('Success', res.data.message, "success");
            setAvailabilitylist(prevList => prevList.filter(item => item.id !== id));
        }
        else if(res.data.status === 404) {
            swal("Error", res.data.message,'error');
            ThisClicked.innerText = "Delete";
        }
    })
  }

  var viewavailability = "";
  if(loading)
  {
    return <h4>Loading Availibilities</h4>
  }
  else
  {
    // availabilitylist.sort((a, b) => {
    //   const daysOrder = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    //   return daysOrder.indexOf(a.day.toLowerCase()) - daysOrder.indexOf(b.day.toLowerCase());
    // });

    viewavailability =
    availabilitylist.map((item, idx)=>{
      return (
        <div key={idx}>
          <ul>
            {/* <li><span> <strong >Day: </strong> {item.day}</span></li> */}
            <li><span> <strong>Start Time: </strong> {item.start_time}</span></li>
            <li><span> <strong>End Time: </strong> {item.end_time}</span></li>
            <Link to={`/doctor/EditAvailability/${item.id}`} className="btn btn-success btn-sm">Edit</Link>
            <button type='button' onClick={ (e) => deleteAvailability(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
          </ul>
        </div>
      )
      })
  }


  function handleInput(e) {
    e.persist();
    const { name, value } = e.target;

    setAvailability({...availabilityInput, [name]: value});
  }

  function submitAvailability(e) {
    e.preventDefault(
      console.log(JSON.stringify(availabilityInput))
    );

    const data = {
      day: availabilityInput.day,
      start_time: availabilityInput.start_time,
      end_time: availabilityInput.end_time
    }

    axios.post(`/api/doctor/availability`, data).then(res => {
      if(res.data.status === 200) 
      {
        swal("Success", res.data.message, 'success');
        setAvailability({
          ...availabilityInput,
          error_list: []
        });

        axios.get(`/api/doctor/view-availability`).then(res=>{
          if(res.status === 200)
          {
            setAvailabilitylist(res.data.availability)
          }
        })
      }
      else if(res.data.status === 400)
      {
        setAvailability({...availabilityInput, error_list:res.data.errors}) // errors from controller laravel
      }
    })
  }

  return (
    <div className="container-fluid p-0">
      <div className='mb-3'>
        <h1 className="h3 d-inline align-middle">Add Your Pause Time</h1>
      </div>
      <div className='row'>
        <div className="col-12 col-lg-6">
            <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0"> Pause Time Information </h5>
                </div>
                <div className="card-body">
                  <form onSubmit={submitAvailability}>
                  <div className='mb-3'>
                      <label className="form-label">Your Start Time</label>
                      <input type="time" name='start_time' onChange={handleInput} value={availabilityInput.start_time} className="form-control"/>
                      <span className='text-danger'>{availabilityInput.error_list.start_time}</span>
                  </div>
                  <div className='mb-3'>
                      <label className="form-label">Your End Time</label>
                      <input type="time" name='end_time' onChange={handleInput} value={availabilityInput.end_time} className="form-control"/>
                      <span className='text-danger'>{availabilityInput.error_list.end_time}</span>
                  </div>
                  <div className='d-flex justify-content-center'>
                      <button type='submit' className="btn btn-secondary">Submit</button>
                  </div>
                  </form>
                </div>
            </div>
        </div>
        
        <div className="col-12 col-lg-6">
            <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0"> Pause Time Slot (editable)</h5>
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

export default DocAvailability;
