import React, { useState } from 'react';
import Navbar from '../../../layouts/frontend/Navbar'
import axios from 'axios';
import {useHistory} from 'react-router-dom';
import swal from 'sweetalert';
import { Link } from 'react-router-dom'

function Login() {

    const history = useHistory();
    const [loginInput, setLogin] = useState({
        email: '',
        password: '',
        error_list: [],
    })

    const handleInput = (e) => {
        e.persist();
        setLogin({...loginInput, [e.target.name]: e.target.value})
    }

    const loginSubmit = (e) => {
        e.preventDefault();
        const data = {
            email: loginInput.email,
            password: loginInput.password,
        }

        axios.get('/sanctum/csrf-cookie').then(response=> {
            axios.post(`api/login`, data).then(res => {
                if(res.data.status === 200)
                {
                    localStorage.setItem('auth_token', res.data.token);
                    localStorage.setItem('auth_name', res.data.username);
                    swal("Success", res.data.message, "success")
                    if(res.data.role === 'doctor')
                    {
                        history.push('/doctor/DocCalendar')
                    }
                    else if(res.data.role === 'assisstant')
                    {
                        history.push('/assisstant/AssissCalendar')
                    }
                    else
                    {
                        history.push('/')
                    }
                }
                else if(res.data.status === 401)
                {
                    swal("Warning", res.data.message, "warning")
                }
                else
                {
                    setLogin({...loginInput, error_list: res.data.validation_errors})
                }
            });
        });
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
                                    <h1 className="h2">Welcome back!</h1>
                                    <p className="lead">
                                        Sign in to your account to continue
                                    </p>
                                </div>

                                <div className="card">
                                    <div className="card-body">
                                        <div className="m-sm-3">
                                            <form onSubmit={loginSubmit}>
                                                <div className="mb-3">
                                                    <label className="form-label">Email</label>
                                                    <input type='email' name='email' onChange={handleInput} value={loginInput.email} className='form-control' />
                                                    <span className='text-danger'>{loginInput.error_list.email}</span>
                                                </div>
                                                <div className="mb-3">
                                                    <label className="form-label">Password</label>
                                                    <input type='password' name='password' onChange={handleInput} value={loginInput.password} className='form-control'/>
                                                    <span className='text-danger'>{loginInput.error_list.password}</span>
                                                </div>
                                                <div className="d-grid gap-2 mt-3">
                                                    <button type='submit' className="btn btn-lg btn-primary">Login</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                                <div className="text-center mb-3">
                                    Don't have an account? <Link to="/Register">Sign up</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
	        </main>
        </div>
    )
}

export default Login;