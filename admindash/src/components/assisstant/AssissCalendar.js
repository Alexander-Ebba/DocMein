import React, { useState, useEffect, useRef } from 'react';
import { formatDate } from '@fullcalendar/core';
import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import axios from 'axios';

function AssissCalendar() {
  const [weekendsVisible, setWeekendsVisible] = useState(true);
  const [currentEvents, setCurrentEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const calendarRef = useRef('');
  const slotMinTime = '09:00:00'; // Minimum time (e.g., 8:00 AM)
  const slotMaxTime = '17:00:00'; // Maximum time (e.g., 5:00 PM);
  const [showAllAppointments, setShowAllAppointments] = useState(false);
  const initialVisibleAppointments = 15;
  const [isHovered, setIsHovered] = useState(false);

	const handleMouseEnter = () => {
		setIsHovered(true);
	};

	const handleMouseLeave = () => {
		setIsHovered(false);
	};

  const API_BASE_URL = '/api/events'; // Adjust this base URL as needed

  const handleWeekendsToggle = () => {
    setWeekendsVisible(!weekendsVisible);
  };

  const handleViewChange = (viewInfo) => {
    if (calendarRef.current) {
      calendarRef.current.getApi().refetchEvents();
    }
  };

  const fetchEvents = () => {
    axios
      .get(API_BASE_URL)
      .then((res) => {
        const fetchedEvents = res.data;
        setCurrentEvents(fetchedEvents);

        if (calendarRef.current) {
          calendarRef.current.getApi().refetchEvents();
        }
      })
      .catch((error) => {
        console.error('Error fetching appointments:', error);
      });
  };

  const handleDateSelect = (selectInfo) => {
    const title = prompt('Please enter a new patient name for your appointment');

    if (title) {
      const newEvent = {
        title,
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay,
      };

      axios
        .post(`${API_BASE_URL}/store`, newEvent)
        .then((res) => {
          setCurrentEvents([...currentEvents, res.data]);
        })
        .then(fetchEvents);
    }
  };

  useEffect(() => {
    axios
      .get(API_BASE_URL)
      .then((res) => {
        setCurrentEvents(res.data);
        fetchEvents();
        calendarRef.current = calendarRef.current || document.getElementById('my-calendar');
        setLoading(false);
      });
  }, []);

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the appointment with '${clickInfo.event.title}'`)) {
      const eventId = clickInfo.event.id;
      clickInfo.event.remove();
      axios
        .delete(`${API_BASE_URL}/delete/${eventId}`)
        .then(fetchEvents);
    }
  };

  const handleEventDrop = (dropInfo) => {
    const eventId = dropInfo.event.id;
    const newEvent = {
      title: dropInfo.event.title,
      start: dropInfo.event.startStr,
      end: dropInfo.event.endStr,
      allDay: dropInfo.event.allDay,
    };

  

    axios
      .put(`${API_BASE_URL}/update/${eventId}`, newEvent)
      .then((res) => {
        setCurrentEvents((prevEvents) => {
          return prevEvents.map((event) => (event.id === eventId ? res.data : event));
        });
      })
      .then(fetchEvents);
  };

  const handleEventResize = (resizeInfo) => {
    const eventId = resizeInfo.event.id;
    const newEvent = {
      title: resizeInfo.event.title,
      start: resizeInfo.event.startStr,
      end: resizeInfo.event.endStr,
      allDay: resizeInfo.event.allDay,
    };

    axios
      .put(`${API_BASE_URL}/update/${eventId}`, newEvent)
      .then((res) => {
        setCurrentEvents((prevEvents) => {
          return prevEvents.map((event) => (event.id === eventId ? res.data : event));
        });
      })
      .then(fetchEvents);
  };

  const handleShowMoreAppointments = () => {
    setShowAllAppointments(true);
  };

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <p><b>{eventInfo.timeText}</b></p>
        <span><i>{eventInfo.event.title}</i></span>
      </>
    );
  };

  if (loading) {
    return <h3>Loading Calendar events</h3>;
  }

  currentEvents.sort((a, b) => new Date(a.start) - new Date(b.start));

  return (
    <div className='row'>
      <div className="col-12 col-lg-4">
        <div className="card">
          <div className="card-body">
          <div className='mb-3'>
            <ul className="nav-item dropdown">
							<b className="nav-icon dropdown-toggle"  id="alertsDropdown" data-bs-toggle="dropdown">
								<div
								className="position-relative"
								onMouseEnter={handleMouseEnter}
								onMouseLeave={handleMouseLeave}
								>
								<i className="align-middle" data-feather="help-circle">Guide</i>
								{isHovered && (
									<small className="popup">
										Calendar User Guide
									</small>
								)}
								</div>
							</b>
							<div className="dropdown-menu dropdown-menu-lg dropdown-menu-end py-0" aria-labelledby="alertsDropdown">
								<div className="dropdown-menu-header text-primary">
									Calendar User Guide
								</div>
								<div className="list-group">
									<span className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i data-feather="alert-circle"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Select Dates</div>
												<div className="text-muted small mt-1">you will be prompted to create a new Appointment</div>
											</div>
										</div>
									</span>
									<span className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i data-feather="alert-circle"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Managements</div>
												<div className="text-muted small mt-1">Drag, drop, and resize Appointments</div>
											</div>
										</div>
									</span>
									<span className="list-group-item">
										<div className="row g-0 align-items-center">
											<div className="col-2">
												<i data-feather="alert-circle"></i>
											</div>
											<div className="col-10">
												<div className="text-dark">Delete Appointment</div>
												<div className="text-muted small mt-1">Click on the Appointment in order to delete it</div>
											</div>
										</div>
									</span>
								</div>
							</div>
						</ul>
            </div>
            <div className='mb-3'>
              <label >
                <input
                  type='checkbox'
                  checked={weekendsVisible}
                  onChange={handleWeekendsToggle}
                />
                <span><strong> Toggle Weekends</strong></span>
              </label>
            </div>
            <div className='mb-3'>
              <h2 className='card-title mb-0'>All Appointments ({currentEvents.length})</h2>
              <br />
              <div className='mb-3'>
                {currentEvents
                  .slice(0, showAllAppointments ? currentEvents.length : initialVisibleAppointments)
                  .map((item, idx) => (
                    <div key={idx}>
                      <ul>
                        <li>
                          <b>
                            {formatDate(new Date(item.start), {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}{' '}
                            :
                          </b>{' '}
                          <i>{item.title}</i>
                        </li>
                      </ul>
                    </div>
                  ))}
              </div>
              {currentEvents.length > initialVisibleAppointments && !showAllAppointments && (
                <div className='d-flex justify-content-center'>
                <button onClick={handleShowMoreAppointments} className="btn btn-primary">Show More</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="col-12 col-lg-8">
        <div className="card">
          <div className='card-body'>
            <div className='mb-3'>
              <FullCalendar
                id="my-calendar"
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                headerToolbar={{
                  left: 'prev,next today',
                  center: 'title',
                  right: 'dayGridMonth,timeGridWeek,timeGridDay',
                }}
                initialView="dayGridMonth"
                editable={true}
                selectable={true}
                selectMirror={true}
                dayMaxEvents={true}
                eventOverlap={false}
                weekends={weekendsVisible}
                datesSet={handleViewChange}
                select={handleDateSelect}
                eventContent={renderEventContent}
                eventDrop={handleEventDrop}
                slotMinTime={slotMinTime}
                slotMaxTime={slotMaxTime}
                eventResize={handleEventResize}
                eventClick={handleEventClick}
                events={currentEvents}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AssissCalendar;
