import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import feather from 'feather-icons'

function SideNav({ isCollapsed }) {

	const sidebarClass = isCollapsed ? 'sidebar js-sidebar' : 'sidebar js-sidebar collapsed';

	const [activeItem, setActiveItem] = useState('Dashboard');

	const handleLinkClick = (itemName) => {
		console.log('Clicked:', itemName);
		setActiveItem(itemName);
	};

	useEffect(() => {
		feather.replace();
	  }, []);
  return (
    <nav id="sidebar" className={sidebarClass}>
			<div className="sidebar-content js-simplebar">
				<Link className="sidebar-brand" to="/doctor/dashboard">
					<span className="align-middle">DocMeIn</span>
				</Link>

				<ul className="sidebar-nav">
					<li className="sidebar-header">
						Dashboard Overview
					</li>

					<li className={`sidebar-item ${activeItem === 'DocCalendar' ? 'active' : ''}`}>
						<Link className="sidebar-link" to='/doctor/DocCalendar' onClick={() => handleLinkClick('DocCalendar')}>
							<i className="align-middle" data-feather="calendar"></i> <span className="align-middle">Calendar</span>
						</Link>
					</li>

					<li className="sidebar-header">
						Tools
					</li>
					<li className={`sidebar-item ${activeItem === 'DocAvailability' ? 'active' : ''}`}>
						<Link className="sidebar-link" to='/doctor/DocAvailability' onClick={() => handleLinkClick('DocAvailability')}>
							<i className="align-middle" data-feather="check"></i> <span className="align-middle">Availability</span>
						</Link>
					</li>
					<li className={`sidebar-item ${activeItem === 'DocPatient' ? 'active' : ''}`}>
						<Link className="sidebar-link" to='/doctor/DocPatient' onClick={() => handleLinkClick('DocPatient')}>
							<i className="align-middle" data-feather="users"></i> <span className="align-middle">Patients</span>
						</Link>
					</li>
					<li className={`sidebar-item ${activeItem === 'DocProfile' ? 'active' : ''}`}>
						<Link className="sidebar-link" to='/doctor/DocProfile' onClick={() => handleLinkClick('DocProfile')}>
							<i className="align-middle" data-feather="user"></i> <span className="align-middle">Profile</span>
						</Link>
					</li>

					
				</ul>
				</div>
		</nav>
  )
}

export default SideNav