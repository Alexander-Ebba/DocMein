import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import swal from 'sweetalert';


function AssissPatient() {

  const [loading, setLoading] = useState(true);
  const [patientList, setPatientlist] = useState([]);

  useEffect(()=> {
    axios.get(`/api/view_patient`).then(res=>{
      if(res.status === 200)
      {
        setPatientlist(res.data.patient)
      }
      setLoading(false)
    })
  }, [])

  const deletePatient = (e, id) => {
    e.preventDefault();
    const thisClicked = e.currentTarget;
    thisClicked.innerText = 'Deleting';

    axios.delete(`/api/delete_patient/${id}`).then(res=>{
      if(res.data.status === 200)
      {
        swal('Success', res.data.message, 'success');
        thisClicked.closest('tr').remove();
      }
      else if(res.data.status === 404)
      {
        swal('Error', res.data.message, 'error')
        thisClicked.innerText = 'Delete';
      }
    })
  }

  var viewpatient = "";
  if(loading)
  {
    return <h3>Loading patients list ...</h3>
  }
  else {
    viewpatient = 
    patientList.map((item)=>{
      return  (
        <tr key={item.id}>
          <td>{item.patient_name}</td>
          <td>{item.patient_contact}</td>
          <td>{item.emergency_phone}</td>
          <td>
            <Link to={`edit_patient/${item.id}`} className='btn btn-success btn-sm'>Edit</Link>
          </td>
          <td>
            <button type='button' onClick={(e)=>deletePatient(e, item.id)} className='btn btn-danger btn-sm'>Delete</button>
          </td>
        </tr>
      )
    })
  }

  return (
    <div>
      <div className="card">
          <div className="card-body">
            <div className='mb-3'>
              <h2 className="card-title mb-0">Patients Profiles</h2>
              <br />
              <div className='mb-3'>
                <table className='table table-bordered table-striped'>
                  <thead>
                    <tr>
                      <th>Patient Name</th>
                      <th>Patient Contact Informations</th>
                      <th>Patient Emergency Person Contact</th>
                      <th>Edit</th>
                      <th>Delete</th>
                    </tr>
                  </thead>
                  <tbody>
                    {viewpatient}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
      </div>
    </div>
  )
}

export default AssissPatient