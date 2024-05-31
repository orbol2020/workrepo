// CardForm.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CardForm.css';

const CardForm = ({ formType, setFormType, selectedCardId, setSelectedCardId, resetForm }) => {
  const [cards, setCards] = useState([]);
  const [formData, setFormData] = useState({
    card_id: '',
    title: '',
    short_description: '',
    background_image_url: '',
    logo_image_url: ''
  });

  useEffect(() => {
    if (formType === 'update' || formType === 'delete') {
      fetchCardIds();
    }
  }, [formType]);

  useEffect(() => {
    if (selectedCardId) {
      fetchCardData(selectedCardId);
    }
  }, [selectedCardId]);

  const fetchCardIds = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/details/ids');
      setCards(response.data);
    } catch (error) {
      console.error('Error fetching card IDs:', error);
    }
  };

  const fetchCardData = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/details/${id}`);
      setFormData(response.data);
    } catch (error) {
      console.error('Error fetching card data:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formType === 'add') {
        await axios.post('http://localhost:5000/api/details', formData);
        alert('Card added successfully');
      } else if (formType === 'update') {
        await axios.put(`http://localhost:5000/api/details/${selectedCardId}`, formData);
        alert('Card updated successfully');
      } else if (formType === 'delete') {
        await axios.delete(`http://localhost:5000/api/details/${selectedCardId}`);
        alert('Card deleted successfully');
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="card-form-container">
      <div className="button-group">
        <button onClick={() => setFormType('add')}>Add</button>
        <button onClick={() => setFormType('update')}>Update</button>
        <button onClick={() => setFormType('delete')}>Delete</button>
      </div>

      {(formType === 'add' || formType === 'update') && (
        <form onSubmit={handleFormSubmit} className="card-form">
          {formType === 'update' && (
            <div className="form-group">
              <label htmlFor="selectedCardId">Select Card ID:</label>
              <select
                id="selectedCardId"
                value={selectedCardId}
                onChange={(e) => setSelectedCardId(e.target.value)}
              >
                <option value="">Select a card</option>
                {cards.map(card => (
                  <option key={card} value={card}>{card}</option>
                ))}
              </select>
            </div>
          )}
          <div className="form-group">
            <label htmlFor="card_id">Card ID:</label>
            <input
              type="text"
              id="card_id"
              name="card_id"
              value={formData.card_id}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="title">Title:</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="short_description">Short Description:</label>
            <input
              id="short_description"
              name="short_description"
              value={formData.short_description}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="background_image_url">Background Image URL:</label>
            <input
              type="text"
              id="background_image_url"
              name="background_image_url"
              value={formData.background_image_url}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="logo_image_url">Logo Image URL:</label>
            <input
              type="text"
              id="logo_image_url"
              name="logo_image_url"
              value={formData.logo_image_url}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-buttons">
            <button type="submit">{formType === 'add' ? 'Add Card' : 'Update Card'}</button>
            <button type="button" onClick={resetForm}>Close</button>
          </div>
        </form>
      )}

      {formType === 'delete' && (
        <form onSubmit={handleFormSubmit} className="card-form">
          <div className="form-group">
            <label htmlFor="selectedCardId">Select Card ID:</label>
            <select
              id="selectedCardId"
              value={selectedCardId}
              onChange={(e) => setSelectedCardId(e.target.value)}
            >
              <option value="">Select a card</option>
              {cards.map(card => (
                <option key={card} value={card}>{card}</option>
              ))}
            </select>
          </div>
          <div className="form-buttons">
            <button type="submit">Delete Card</button>
            <button type="button" onClick={resetForm}>Close</button>
          </div>
        </form>
      )}
    </div>
  );
};

export default CardForm;
