import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios';
import swal from 'sweetalert';
import {useHistory, Link} from 'react-router-dom'


function Register() {

    const history = useHistory();
    const [registerInput, setRegister] = useState({
        name: '',
        email: '',
        password: '',
        error_list: [],
    });

    const handleInput = (e) => {
        e.persist();
        setRegister({...registerInput, [e.target.name]: e.target.value})
    }

    const registerSubmit = (e) => {
        e.preventDefault();

        const data = {
            name:registerInput.name,
            email:registerInput.email,
            password:registerInput.password,
        }
        axios.get('/sanctum/csrf-cookie').then(response=> {
            axios.post(`/api/register`, data).then(res =>
            {
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success"); //notif
                    history.push('/');
                }
                else
                {
                    setRegister({...registerInput,error_list: res.data.validation_errors});
                }
            })   
        })
    }

    


    return (
        <div>
            <Navbar />
            <main className="d-flex w-100">
                <div className="container d-flex flex-column">
                    <div className="row vh-100">
                        <div className="col-sm-10 col-md-8 col-lg-6 col-xl-5 mx-auto d-table h-100">
                            <div className="d-table-cell align-middle">

                                <div className="text-center mt-4">
                                    <h1 className="h2">Get started</h1>
                                    <p className="lead">
                                        Start your health Jounrey !
                                    </p>
                                </div>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-3">
                                            <form onSubmit={registerSubmit}>
                                                <div className='form-group mb-3'>
                                            <label>Full Name</label>
                                            <input type='' name='name' onChange={handleInput} value={registerInput.name} className='form-control'  />
                                            <span className='text-danger'>{registerInput.error_list.name}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Email</label>
                                                    <input type='email' name='email' onChange={handleInput} value={registerInput.email} className='form-control'  />
                                                    <span className='text-danger'>{registerInput.error_list.email}</span>
                                                </div>
                                                <div className='form-group mb-3'>
                                                    <label>Password</label>
                                                    <input type='password' name='password' onChange={handleInput} value={registerInput.password} className='form-control'  />
                                                    <span className='text-danger'>{registerInput.error_list.password}</span>
                                                </div>
                                                <div className="d-grid gap-2 mt-3">
                                                    <button type='submit' className='btn btn-lg btn-primary'>Register</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    Already have account? <Link to='/Login'>Log In</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	        </main>
        </div>
    )
}

export default Register;