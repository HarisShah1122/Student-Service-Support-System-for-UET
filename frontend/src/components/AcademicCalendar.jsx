import React, { useEffect, useState } from 'react';
import axios from 'axios';

const AcademicCalendar = () => {
  const [calendars, setCalendars] = useState([]);
  const [newEvent, setNewEvent] = useState({ eventName: '', date: '', description: '', semester: '', location: '', isHoliday: false, durationDays: 1, createdBy: '' });
  const port = process.env.REACT_APP_API_PORT || 3000;

  useEffect(() => {
    axios.get(`http://localhost:${port}/academic-calendar`)
      .then(response => setCalendars(response.data.data))
      .catch(error => console.error('Error fetching calendars:', error));
  }, [port]);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setNewEvent(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post(`http://localhost:${port}/academic-calendar`, newEvent)
      .then(response => setCalendars([...calendars, response.data.data]))
      .catch(error => console.error('Error creating calendar:', error));
    setNewEvent({ eventName: '', date: '', description: '', semester: '', location: '', isHoliday: false, durationDays: 1, createdBy: '' });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Academic Calendar</h1>
      <form onSubmit={handleSubmit} className="mt-4 space-y-4">
        <input name="eventName" value={newEvent.eventName} onChange={handleInputChange} placeholder="Event Name" className="border p-2 w-full" />
        <input name="date" type="date" value={newEvent.date} onChange={handleInputChange} className="border p-2 w-full" />
        <textarea name="description" value={newEvent.description} onChange={handleInputChange} placeholder="Description" className="border p-2 w-full" />
        <input name="semester" value={newEvent.semester} onChange={handleInputChange} placeholder="Semester" className="border p-2 w-full" />
        <input name="location" value={newEvent.location} onChange={handleInputChange} placeholder="Location" className="border p-2 w-full" />
        <input name="isHoliday" type="checkbox" checked={newEvent.isHoliday} onChange={handleInputChange} /> Holiday
        <input name="durationDays" type="number" value={newEvent.durationDays} onChange={handleInputChange} className="border p-2 w-full" />
        <input name="createdBy" value={newEvent.createdBy} onChange={handleInputChange} placeholder="Created By" className="border p-2 w-full" />
        <button type="submit" className="bg-blue-500 text-white p-2">Add Event</button>
      </form>
      <ul className="mt-4">
        {calendars.map(calendar => (
          <li key={calendar.id} className="py-2 border-b">
            {calendar.eventName} - {new Date(calendar.date).toLocaleDateString()} (Semester: {calendar.semester})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AcademicCalendar;