import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import axios from 'axios';
import styled from 'styled-components';
import EventForm from './EventForm';
import Modal from 'react-modal';
import './calendarStyles.css';

const CalendarContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCalendar = styled(Calendar)`
  border: none;
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  font-family: 'Arial', sans-serif;

  .react-calendar__tile {
    position: relative;
    overflow: hidden;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ddd;
    transition: background-color 0.3s;
    font-size: 14px;
  }

  .react-calendar__tile--hasEvents {
    background-color: #e0f7fa;
  }

  .react-calendar__tile--hasEvents::before {
    content: '';
    display: block;
    background-color: red;
    border-radius: 50%;
    width: 8px;
    height: 8px;
    left: 5%;
  }

  .react-calendar__tile--active {
    background-color: #007bff;
    color: #fff;
  }

  .react-calendar__month-view__days__day {
    padding: 5px;
  }

  .react-calendar__month-view__days__day--neighboringMonth {
    visibility: hidden;
    pointer-events: none;
  }
`;

const EventList = styled.div`
  margin-top: 20px;
  
  width:100%;
  display: grid;
  grid-template-columns: repeat(4, 1fr); 
  gap: 20px; /* Add some gap between columns */
  
  @media (max-width: 1200px) {
    grid-template-columns: repeat(2, 1fr); /* For medium screens, display 2 columns */
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(1, 1fr); /* For small screens, display 1 column */
  }
`;

const EventItem = styled.div`
  background: #f9f9f9;
  border: 1px solid #e0e0e0; 
  border-radius: 8px;
  padding: 20px;
  position: relative;
  transition: background-color 0.3s;

  &:hover {
    background: #ffffff;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
`;




const DeleteButton = styled.button`
  
  top: 5px;
  right: 5px;
  background-color: #ff6961;
  color: #fff;
  border: none;
  border-radius: 4px;
  padding: 5px 10px;
  cursor: pointer;
`;

const StyledModal = styled(Modal)`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 500px;
  margin: 40px auto;
  outline: none;
`;

const CalendarView = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchEvents = async () => {
    try {
      const response = await axios.get('https://evallo-1.onrender.com');
      setEvents(response.data);
    } catch (err) {
      console.error('Error fetching events', err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleDateClick = (date) => {
    setSelectedDate(date);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleDelete = async (eventId) => {
    try {
      await axios.delete(`https://evallo-1.onrender.com/${eventId}`);
      fetchEvents();
    } catch (err) {
      console.error('Error deleting event', err);
    }
  };

  const eventsForSelectedDate = events.filter(event =>
    new Date(event.date).toDateString() === selectedDate.toDateString()
  );

  return (
    <CalendarContainer>
      <StyledCalendar
        onClickDay={handleDateClick}
        value={selectedDate}
        tileContent={({ date, view }) => {
          const eventsForDay = events.filter(event => new Date(event.date).toDateString() === date.toDateString());
          return view === 'month' && eventsForDay.length ? (
            <div className="react-calendar__tile--hasEvents"></div>
          ) : null;
        }}
        tileClassName={({ date }) =>
          selectedDate.toDateString() === date.toDateString() ? 'react-calendar__tile--active' : ''
        }
      />
      
      <EventList>
        
        {eventsForSelectedDate.map(event => (
          <EventItem key={event._id}>
            <h3>{event.title}</h3>
            <p>{event.description}</p>
            <p><strong>Participants:</strong> {event.participants}</p>
            <p><strong>Time:</strong> {event.time}</p>
            <p><strong>Duration:</strong> {event.duration} hrs</p>
            <p><strong>Notes:</strong> {event.sessionNotes}</p>
            <DeleteButton onClick={() => handleDelete(event._id)}>Delete</DeleteButton>
          </EventItem>
        ))}
      </EventList>
      <StyledModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        contentLabel="Create Event"
      >
        <EventForm date={selectedDate} closeModal={closeModal} fetchEvents={fetchEvents} />
      </StyledModal>
    </CalendarContainer>
  );
};

export default CalendarView;
