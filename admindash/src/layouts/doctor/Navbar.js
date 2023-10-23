import React, { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import axios from 'axios'
import swal from 'sweetalert'



function Navbar({ toggleSidebar }) {


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

  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
				<a className="sidebar-toggle js-sidebar-toggle" onClick={ toggleSidebar }>
					<i className="hamburger align-self-center"></i>
				</a>

				<div className="navbar-collapse collapse">
					<ul className="navbar-nav navbar-align">
					
						<li className="nav-item dropdown">
							<Link className="nav-icon dropdown-toggle d-inline-block d-sm-none" to="#" data-bs-toggle="dropdown">
								<i className="align-middle" data-feather="settings"></i>
							</Link>
							<Link className="nav-link dropdown-toggle d-none d-sm-inline-block" to="#" data-bs-toggle="dropdown">
								<span className="text-dark">Doctor </span>
							</Link>
							<div className="dropdown-menu dropdown-menu-end">
								<Link className="dropdown-item" to="pages-profile.html"><i className="align-middle me-1" data-feather="user"></i> Profile</Link>
								<Link className="dropdown-item" to="#"><i className="align-middle me-1" data-feather="pie-chart"></i> Analytics</Link>
								<div className="dropdown-divider"></div>
								<Link className="dropdown-item" to="#"><i className="align-middle me-1" data-feather="help-circle"></i> Help Center</Link>
								<div className="dropdown-divider"></div>
								<Link className="dropdown-item" to="#" onClick={logoutSubmit}>Log out</Link>
							</div>
						</li>
					</ul>
				</div>
			</nav>
  )
}

export default Navbar