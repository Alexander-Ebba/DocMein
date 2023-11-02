import React, { useState, useEffect} from 'react'
import axios from 'axios';
import {useHistory} from 'react-router-dom'
import swal from 'sweetalert';

function AssissEditPatient(props) {

    const GenderOptions = [
        {label: 'Male', value: 'male'},
        {label: 'Female', value: 'female'},
      ];

    const history = useHistory();
    const [loading, setLoading] = useState(true)
    const [patientInput, setPatient] = useState([])
    const [error, setError] = useState([])
    

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
                history.push('/assisstant/AssissPatient');
            }
            setLoading(false)
        })
    }, [props.match.params.id, history])


    const handleInput = (e) => {
        e.persist();
        setPatient({...patientInput, [e.target.name]: e.target.value})
    }

    if(loading) {
        return <h3>Loading Patient Profile ....</h3>
    }

    const updatePatient = (e) => {
        e.preventDefault();

        const patient_id = props.match.params.id;
        const data = patientInput;
        axios.put(`/api/update_patient/${patient_id}`, data).then(res => {
            if(res.data.status === 200)
            {
                swal("Succes", res.data.message, 'success');
                setError([]);
                history.push("/assisstant/AssissPatient");
            }
            else if(res.data.status === 422)
            {
                swal("Some fields are mandertory", '', 'error');
                setError(res.data.errors);
            }
            else if(res.data.status === 404) 
            {
                swal("Error", res.data.message, 'error');
                history.push('/assisstant/AssissPatient');
            }
        })
    }




  return (
    <div>
        <div className='mb-3'>
        <h1 className="h3 d-inline align-middle">Edit Patients</h1>
      </div>
      <form onSubmit={updatePatient}>
      <div className='row'>
        <div className="col-12 col-lg-6">
            <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Patient Information</h5>
                </div>
                <div className='card-body'>
                <div className='mb-3'>
                    <label className="form-label">Patient's Full name</label>
                    <input type="text" name='patient_name' onChange={handleInput} value={patientInput.patient_name} className="form-control" placeholder="enter the patient's name"/>
                    <small className='text-danger'>{error.patient_name}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Patient's Date of birth</label>
                    <input type="date" name='patient_date' onChange={handleInput} value={patientInput.patient_date} className="form-control" placeholder="enter the patient's date of birth"/>
                    <small className='text-danger'>{error.patient_date}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Patient's Gender</label>
                    <select
                      name="patient_gender"
                      onChange={handleInput} 
                      value={patientInput.patient_gender}
                      className="form-select mb-3"
                    >
                    <option value="" disabled>Select the patient's Gender</option>
                      {GenderOptions.map((option, idx) => (
                        <option key={idx} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                    <small className='text-danger'>{error.patient_gender}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Patient's Contact information</label>
                    <input type="text" name='patient_contact' onChange={handleInput} value={patientInput.patient_contact} className="form-control" placeholder="(address, phone number, email)"/>
                    <small className='text-danger'>{error.patient_contact}</small>
                </div>
                </div>
            </div>
        </div>
        <div className="col-12 col-lg-6">
            <div className="card">
                <div className="card-header">
                  <h5 className="card-title mb-0">Medical History (could be Optional)</h5>
                </div>
                <div className="card-body">
                <div className='mb-3'>
                    <label className="form-label">Existing medical conditions</label>
                    <input type="text" name='medical_condition' onChange={handleInput} value={patientInput.medical_condition} className="form-control" placeholder=" (e.g., diabetes, hypertension)"/>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Allergies </label>
                    <input type="text" name='allergies' onChange={handleInput} value={patientInput.allergies} className="form-control" placeholder="(medications, foods, environmental)"/>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Current medications</label>
                    <input type="text" name='medications' onChange={handleInput} value={patientInput.medications} className="form-control" placeholder=" (include dosage and frequency)"/>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Past surgeries or hospitalizations</label>
                    <input type="text" name='surgery' onChange={handleInput} value={patientInput.surgery} className="form-control" placeholder="Surgery or hospitalizations infos"/>
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
                    <label className="form-label">Height</label>
                    <input type="number" name='height' onChange={handleInput} value={patientInput.height} className="form-control" placeholder="Patient's Height (cm)"/>
                    <small className='text-danger'>{error.height}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Weight</label>
                    <input type="number" name='weight' onChange={handleInput} value={patientInput.weight} className="form-control" placeholder="Patient's Weight (kg)"/>
                    <small className='text-danger'>{error.weight}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Blood Pressure</label>
                    <input type="number" name='blood_pressure' onChange={handleInput} value={patientInput.blood_pressure} className="form-control" placeholder="Patient's Blood pressure (systolic)"/> 
                    <small className='text-danger'>{error.blood_pressure}</small>
                    <input type="number" name='blood_pressure_two' onChange={handleInput} value={patientInput.blood_pressure_two} className="form-control" placeholder="Patient's Blood pressure (diastotic)"/> 
                    <small className='text-danger'>{error.blood_pressure_two}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Pulse rate</label>
                    <input type="number" name='pulse_rate' onChange={handleInput} value={patientInput.pulse_rate} className="form-control" placeholder="Patient's pulse rate (beats per minute)"/>
                    <small className='text-danger'>{error.pulse_rate}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Temperature</label>
                    <input type="text" name='temperature' onChange={handleInput} value={patientInput.temperature} className="form-control" placeholder="Patient's Temperature (Celsius)"/>
                    <small className='text-danger'>{error.temperature}</small>
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
                    <label className="form-label">Name of an emergency contact person</label>
                    <input type="text" name='emergency_name' onChange={handleInput} value={patientInput.emergency_name} className="form-control" placeholder="enter the patient emergency contact name"/>
                    <small className='text-danger'>{error.emergency_name}</small>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Contact of the emergency person</label>
                    <input type="text" name='emergency_phone' onChange={handleInput} value={patientInput.emergency_phone} className="form-control" placeholder="emergency contact info"/>
                    <small className='text-danger'>{error.emergency_phone}</small>
                </div>
                </div>
            </div>
            <div>
            </div>
        </div>
        <div className='d-flex justify-content-center'>
            <button type='submit' className="btn btn-secondary">Update</button>
        </div>
      </div>
      </form> 
    </div>
  )
}


export default AssissEditPatient;
