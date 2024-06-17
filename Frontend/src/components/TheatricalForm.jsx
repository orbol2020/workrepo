import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './TheatricalForm.css';

const TheatricalForm = ({ formType, setFormType, resetForm }) => {
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [malls, setMalls] = useState([]);
  const [selectedState, setSelectedState] = useState('');
  const [selectedCity, setSelectedCity] = useState('');
  const [selectedMall, setSelectedMall] = useState('');
  const [formData, setFormData] = useState({
    state: '',
    city: '',
    mall: '',
    mallArea: '',
    pincode: '',
    image: ''
  });

  useEffect(() => {
    if (formType === 'update' || formType === 'delete') {
      fetchStates();
    }
  }, [formType]);

  useEffect(() => {
    if (selectedState) {
      fetchCities(selectedState);
    }
  }, [selectedState]);

  useEffect(() => {
    if (selectedCity) {
      fetchMalls(selectedCity);
    }
  }, [selectedCity]);

  useEffect(() => {
    if (selectedMall) {
      fetchMallDetails(selectedMall);
    }
  }, [selectedMall]);

  const fetchStates = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/theatrical/states');
      setStates(response.data);
    } catch (error) {
      console.error('Error fetching states:', error);
    }
  };

  const fetchCities = async (state) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/theatrical/cities/${state}`);
      setCities(response.data);
    } catch (error) {
      console.error('Error fetching cities:', error);
    }
  };

  const fetchMalls = async (city) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/theatrical/malls/${city}`);
      setMalls(response.data);
    } catch (error) {
      console.error('Error fetching malls:', error);
    }
  };

  const fetchMallDetails = async (mall) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/theatrical/mall/${mall}`);
      const { mallArea, pincode } = response.data;
      setFormData(prevData => ({
        ...prevData,
        mallArea,
        pincode
      }));
    } catch (error) {
      console.error('Error fetching mall details:', error);
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
        await axios.post('http://localhost:5000/api/theatrical/add', formData);
        alert('Theatrical entry added successfully');
      } else if (formType === 'update') {
        if (selectedMall) {
          await axios.put(`http://localhost:5000/api/theatrical/update/mall/${selectedMall}`, formData);
          alert('Theatrical entry updated successfully');
        } else if (selectedCity) {
          await axios.put(`http://localhost:5000/api/theatrical/update/city/${selectedCity}`, formData);
          alert('Theatrical entry updated successfully');
        } else if (selectedState) {
          await axios.put(`http://localhost:5000/api/theatrical/update/state/${selectedState}`, formData);
          alert('Theatrical entry updated successfully');
        }
      } else if (formType === 'delete') {
        if (selectedMall) {
          await axios.delete(`http://localhost:5000/api/theatrical/delete/mall/${selectedMall}`);
          alert('Theatrical entry deleted successfully');
        } else if (selectedCity) {
          await axios.delete(`http://localhost:5000/api/theatrical/delete/city/${selectedCity}`);
          alert('Theatrical entry deleted successfully');
        } else if (selectedState) {
          await axios.delete(`http://localhost:5000/api/theatrical/delete/state/${selectedState}`);
          alert('Theatrical entry deleted successfully');
        }
      }
      resetForm();
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  return (
    <div className="theatrical-form-container">
      <div className="button-group">
        <button onClick={() => setFormType('add')}>Add</button>
        <button onClick={() => setFormType('update')}>Update</button>
        <button onClick={() => setFormType('delete')}>Delete</button>
      </div>

      <form onSubmit={handleFormSubmit} className="theatrical-form">
        {(formType === 'update' || formType === 'delete') && (
          <>
            <div className="form-group">
              <label htmlFor="selectedState">Select State:</label>
              <select
                id="selectedState"
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
              >
                <option value="">Select a state</option>
                {states.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            {selectedState && (
              <div className="form-group">
                <label htmlFor="selectedCity">Select City:</label>
                <select
                  id="selectedCity"
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                >
                  <option value="">Select a city</option>
                  {cities.map(city => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
            )}
            {selectedCity && (
              <div className="form-group">
                <label htmlFor="selectedMall">Select Mall:</label>
                <select
                  id="selectedMall"
                  value={selectedMall}
                  onChange={(e) => setSelectedMall(e.target.value)}
                >
                  <option value="">Select a mall</option>
                  {malls.map(mall => (
                    <option key={mall} value={mall}>{mall}</option>
                  ))}
                </select>
              </div>
            )}
          </>
        )}
        {(formType === 'add' || formType === 'update') && (
          <>
            <div className="form-group">
              <label htmlFor="state">State:</label>
              <input
                type="text"
                id="state"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="city">City:</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mall">Mall:</label>
              <input
                type="text"
                id="mall"
                name="mall"
                value={formData.mall}
                onChange={handleInputChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="mallArea">Mall Area:</label>
              <input
                type="text"
                id="mallArea"
                name="mallArea"
                value={formData.mallArea}
                onChange={handleInputChange}
                />
                </div>
                <div className="form-group">
                  <label htmlFor="pincode">Pincode:</label>
                  <input
                    type="text"
                    id="pincode"
                    name="pincode"
                    value={formData.pincode}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="image">Image URL:</label>
                  <input
                    type="text"
                    id="image"
                    name="image"
                    value={formData.image}
                    onChange={handleInputChange}
                  />
                </div>
              </>
            )}
            <div className="form-buttons">
              <button type="submit">
                {formType === 'add' ? 'Add Entry' : formType === 'update' ? 'Update Entry' : 'Delete Entry'}
              </button>
              <button type="button" onClick={resetForm}>Close</button>
            </div>
          </form>
        </div>
      );
    };
    
    export default TheatricalForm;
