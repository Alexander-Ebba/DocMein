import React, { useState } from 'react'
import axios from 'axios'
import swal from 'sweetalert'



function AssissAddPatient() {

  const GenderOptions = [
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'},
  ];

  const initialPatient = {
    patient_name: '',
    patient_date: '',
    patient_gender: '',
    patient_contact: '',
    medical_condition: '',
    allergies: '',
    medications: '',
    surgery: '',
    height: '',
    weight: '',
    blood_pressure: '',
    blood_pressure_two: '',
    pulse_rate: '',
    temperature: '',
    emergency_name: '',
    emergency_phone: '',
    error_list: [],
  }

  const [patientInput, setPatient] = useState(initialPatient)

  function convertDateFormat(dateString) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [month, day, year] = parts;
      // Convert to 'YYYY-MM-DD' format
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
    }
    // Return the original string if it's not in the expected format
    return dateString;
  }

  function handleInput(e) {
    e.persist();
    const { name, value } = e.target;

    if (name === 'patient_date') {
      // Convert the date format
      const convertedDate = convertDateFormat(value);
      setPatient({ ...patientInput, [name]: convertedDate });
    } else {
      // For other input fields, set the value directly
      setPatient({ ...patientInput, [name]: value });
    }
  }

  function submitPatient(e) {
    e.preventDefault(
    console.log(JSON.stringify(patientInput))
    );

    const data = {
      patient_name: patientInput.patient_name,
      patient_date: patientInput.patient_date,
      patient_gender: patientInput.patient_gender,
      patient_contact: patientInput.patient_contact,
      medical_condition: patientInput.medical_condition,
      allergies: patientInput.allergies,
      medications: patientInput.medications,
      surgery: patientInput.surgery,
      height: patientInput.height,
      weight: patientInput.weight,
      blood_pressure: patientInput.blood_pressure,
      blood_pressure_two: patientInput.blood_pressure_two,
      pulse_rate: patientInput.pulse_rate,
      temperature: patientInput.temperature,
      emergency_name: patientInput.emergency_name,
      emergency_phone: patientInput.emergency_phone,
    }

    axios.post(`/api/store_patient`, data).then(res => { //sending data inside the api
      if(res.data.status === 200) 
      {
        swal("Success", res.data.message, 'success');
        setPatient(initialPatient)
      }
      else if(res.data.status === 400)
      {
        setPatient({...patientInput, error_list:res.data.errors}) // errors from controller laravel
      }
    })
  }


  return (
    <div>
      <div className='mb-3'>
        <h1 className="h3 d-inline align-middle">Add Patients</h1>
      </div>
      <form onSubmit={submitPatient}>
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
                    <span className='text-danger'>{patientInput.error_list.patient_name}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Patient's Date of birth</label>
                    <input type="date" name='patient_date' onChange={handleInput} value={patientInput.patient_date} className="form-control" placeholder="enter the patient's date of birth"/>
                    <span className='text-danger'>{patientInput.error_list.patient_date}</span>
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
                    <span className='text-danger'>{patientInput.error_list.gender}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Patient's Contact information</label>
                    <input type="text" name='patient_contact' onChange={handleInput} value={patientInput.patient_contact} className="form-control" placeholder="(address, phone number, email)"/>
                    <span className='text-danger'>{patientInput.error_list.contact}</span>
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
                    <span className='text-danger'>{patientInput.error_list.height}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Weight</label>
                    <input type="number" name='weight' onChange={handleInput} value={patientInput.weight} className="form-control" placeholder="Patient's Weight (kg)"/>
                    <span className='text-danger'>{patientInput.error_list.weight}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Blood Pressure</label>
                    <input type="number" name='blood_pressure' onChange={handleInput} value={patientInput.blood_pressure} className="form-control" placeholder="Patient's Blood pressure (systolic)"/> 
                    <span className='text-danger'>{patientInput.error_list.blood_pressure}</span>
                    <input type="number" name='blood_pressure_two' onChange={handleInput} value={patientInput.blood_pressure_two} className="form-control" placeholder="Patient's Blood pressure (diastotic)"/> 
                    <span className='text-danger'>{patientInput.error_list.blood_pressure_two}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Pulse rate</label>
                    <input type="number" name='pulse_rate' onChange={handleInput} value={patientInput.pulse_rate} className="form-control" placeholder="Patient's pulse rate (beats per minute)"/>
                    <span className='text-danger'>{patientInput.error_list.pulse_rate}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Temperature</label>
                    <input type="number" name='temperature' onChange={handleInput} value={patientInput.temperature} className="form-control" placeholder="Patient's Temperature (Celsius)"/>
                    <span className='text-danger'>{patientInput.error_list.temperature}</span>
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
                    <span className='text-danger'>{patientInput.error_list.emergency_name}</span>
                </div>
                <div className='mb-3'>
                    <label className="form-label">Phone number of the emergency contact</label>
                    <input type="number" name='emergency_phone' onChange={handleInput} value={patientInput.emergency_phone} className="form-control" placeholder="emergency contact phone number"/>
                    <span className='text-danger'>{patientInput.error_list.emergency_phone}</span>
                </div>
                </div>
            </div>
            <div>
            </div>
        </div>
        <div className='d-flex justify-content-center'>
            <button type='submit' className="btn btn-secondary">Submit</button>
        </div>
      </div>
      </form> 
    </div>
  )
}

export default AssissAddPatient