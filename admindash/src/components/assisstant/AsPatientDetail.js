import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {Link, useHistory } from 'react-router-dom'
import swal from 'sweetalert';



function AsPatientDetail(props) {

  const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [patientInput, setPatient] = useState([])
    

    useEffect(() => {
        const patient_id = props.match.params.id;
        axios.get(`/api/edit_patient/${patient_id}`).then(res=> {
            if(res.data.status === 200) 
            {
                setPatient(res.data.patient);
            }
            else if(res.data.status === 404)
            {
                swal("Error", res.data.message, 'error');
                history.push('/assisstant/view_patient');
            }
            setLoading(false)
        })
    }, [props.match.params.id, history])
  

  if (loading) {
    return <h4>Loading patient information...</h4>;
  }


  return (
        <div>
        <div className='row'>
          <div className="col-12 col-lg-6">
              <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Patient Information</h5>
                    <Link to={`/assisstant/AssissPatient`}>Back to List of Patients</Link>
                  </div>
                  <div className='card-body'>
                  <div className='mb-3'>
                      <h4 className="form-h4">Patient's Full name</h4>
                      <p>{patientInput.patient_name}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Patient's Date of birth</h4>
                      <p>{patientInput.patient_date}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Patient's Gender</h4>
                      <p>{patientInput.patient_gender}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Patient's Contact information</h4>
                      <p>{patientInput.patient_contact}</p>
                  </div>
                  </div>
              </div>
          </div>
          <div className="col-12 col-lg-6">
              <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Medical History</h5>
                  </div>
                  <div className="card-body">
                  <div className='mb-3'>
                      <h4 className="form-h4">Existing medical conditions</h4>
                      <p>{patientInput.medical_condition}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Allergies </h4>
                      <p>{patientInput.allergies}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Current medications</h4>
                      <p>{patientInput.medications}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Past surgeries or hospitalizations</h4>
                      <p>{patientInput.surgery}</p>
                  </div>
                  </div>
              </div>
              <div>
              </div>
          </div>
          <div className="col-12 col-lg-6">
              <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Vital Signs</h5>
                  </div>
                  <div className="card-body">
                  <div className='mb-3'>
                      <h4 className="form-h4">Height</h4>
                      <p>{patientInput.height}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Weight</h4>
                      <p>{patientInput.weight}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Blood Pressure systolic</h4>
                      <p>{patientInput.blood_pressure}</p>
                      <h4 className="form-h4">Blood Pressure diastotic</h4>
                      <p>{patientInput.blood_pressure_two}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Pulse rate</h4>
                      <p>{patientInput.pulse_rate}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Temperature</h4>
                      <p>{patientInput.temperature}</p>
                  </div>
                  </div>
              </div>
              <div>
              </div>
          </div>
          <div className="col-12 col-lg-6">
              <div className="card">
                  <div className="card-header">
                    <h5 className="card-title mb-0">Emergency Contact</h5>
                  </div>
                  <div className="card-body">
                  <div className='mb-3'>
                      <h4 className="form-h4">Name of an emergency contact person</h4>
                      <p>{patientInput.emergency_name}</p>
                  </div>
                  <div className='mb-3'>
                      <h4 className="form-h4">Contact info of the emergency person</h4>
                      <p>{patientInput.emergency_phone}</p>
                  </div>
                  </div>
              </div>
              <div>
              </div>
          </div>
        </div>
        </div>
  );
}

export default AsPatientDetail