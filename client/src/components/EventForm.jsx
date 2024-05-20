import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const FormContainer = styled.div`
  background: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  max-width: 400px;
  margin: 20px auto;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
`;

const Textarea = styled.textarea`
  margin-bottom: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 16px;
  resize: vertical;
`;

const Button = styled.button`
  padding: 10px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background: #0056b3;
  }
`;

const EventForm = ({ date, closeModal, fetchEvents }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    participants: '',
    time: '',
    duration: '',
    sessionNotes: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newEvent = { ...formData, date };
    try {
      await axios.post('https://evallo-1.onrender.com/events', newEvent);
      fetchEvents();  
      closeModal();   
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <FormContainer>
      <h2>Create Event</h2>
      <StyledForm onSubmit={handleSubmit}>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          required
        />
        <Textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
        <Input
          type="text"
          name="participants"
          value={formData.participants}
          onChange={handleChange}
          placeholder="Participants"
          required
        />
        <Input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          required
        />
        <Input
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
          placeholder="Duration (hrs)"
          required
        />
        <Textarea
          name="sessionNotes"
          value={formData.sessionNotes}
          onChange={handleChange}
          placeholder="Session Notes"
        />
        <Button type="submit">Create Event</Button>
      </StyledForm>
    </FormContainer>
  );
};

export default EventForm;
