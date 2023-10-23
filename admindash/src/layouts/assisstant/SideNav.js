import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import feather from 'feather-icons'


function SideNav({ isCollapsed }) {

  	const sidebarClass = isCollapsed ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed';

	const [activeItem, setActiveItem] = useState('Dashboard');

	useEffect(() => {
		feather.replace();
	  }, []);

	const handleLinkClick = (itemName) => {
		console.log('Clicked:', itemName);
		setActiveItem(itemName);
	};


  return (
    <nav id="sidebar" className={sidebarClass}>
			<div className="sidebar-content js-simplebar">
				<Link className="sidebar-brand" to="/assisstant/AssissCalendar">
					<span className="align-middle">DocMeIn</span>
				</Link>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Calendar Overview
					</li>

					<li className={`sidebar-item ${activeItem === 'Calendar' ? 'active' : ''}`}>
						<Link className="sidebar-link" to='/assisstant/AssissCalendar' onClick={() => handleLinkClick('Calendar')}>
							<i className="align-middle" data-feather="calendar"></i> <span className="align-middle">Calendar</span>
						</Link>
					</li>

					<li className="sidebar-header">
						Tools
					</li>

					{/* <li className={`sidebar-item ${activeItem === 'AssissAppointment' ? 'active' : ''}`}>
						<Link className="sidebar-link" to="/assisstant/AssissAppointment" onClick={() => handleLinkClick('AssissAppointment')}>
							<i className="align-middle" data-feather="calendar"></i> <span className="align-middle">Appointments</span>
						</Link>
					</li> */}

					

					<li className={`sidebar-item ${activeItem === 'AssissAddPatient' ? 'active' : ''}`}>
						<Link className="sidebar-link" to="/assisstant/AddPatient" onClick={() => handleLinkClick('AssissAddPatient')}>
							<i className="align-middle" data-feather="plus"></i> <span className="align-middle">Add Patient</span>
						</Link>
					</li>
			
					<li className={`sidebar-item ${activeItem === 'AssissPatient' ? 'active' : ''}`}>
						<Link className="sidebar-link" to="/assisstant/AssissPatient"  onClick={() => handleLinkClick('AssissPatient')}>
							<i className="align-middle" data-feather="users"></i> <span className="align-middle">Patients</span>
						</Link>
					</li>
					<li className={`sidebar-item ${activeItem === 'patient/AssissProfile' ? 'active' : ''}`}>
						<Link className="sidebar-link" to="/assisstant/AssissProfile"  onClick={() => handleLinkClick('patient/AssissProfile')}>
							<i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
						</Link>
					</li>
				</ul>
			</div>
		</nav>
  )
}

export default SideNav