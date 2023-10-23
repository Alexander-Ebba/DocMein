import axios from 'axios';
import React from 'react'
import {Link, useHistory} from 'react-router-dom'
import swal from 'sweetalert';

function Navbar() {
	const history = useHistory();

    const logoutSubmit = (e) => {
        e.preventDefault();

        axios.post(`/api/logout`).then(res => {
            if(res.data.status === 200)
            {
                localStorage.removeItem('auth_token');
                localStorage.removeItem('auth_name');
                swal("Success", res.data.message, "success")
                history.push('/')
                window.location.reload(false)
            }
            else
            {

            }
        })
    }

    var AuthButtons = '';
    if(!localStorage.getItem('auth_token'))
    {
        AuthButtons = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link className="nav-link" to="/login">Login</Link>
                </li>
                <li className="nav-item">
                    <Link className="nav-link" to="/register">Register</Link>
                </li>
            </ul>
        );
    }
    else 
    {
        AuthButtons = (
            <li className="nav-item">
                <button type='button' onClick={logoutSubmit} className='nav-link btn btn-danger btn-sm text-white bg-danger'>Logout</button>
            </li>
        );
    }
	return (
		<nav className="navbar navbar-expand navbar-light navbar-bg">
                {/* // left side stuff */}
				<div className="navbar-collapse collapse">
					<ul className="navbar-nav ms-auto mb-2 mb-lg-0">
							<li className="nav-item">
								<Link className="nav-link" aria-current="page" to="/">Home</Link>
							</li>
							{AuthButtons}
					</ul>
				</div>
			</nav>
	)
	}

export default Navbar

