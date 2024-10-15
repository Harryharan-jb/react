// InputForm.js
import React, { useState } from 'react';

const InputForm = ({ onSearch }) => {
  const [city, setCity] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!city.trim()) {
      setError('Please enter a city');
      return;
    }
    onSearch(city);
    setCity('');
    setError('');
  };

  return (
    <form onSubmit={handleSubmit} className="form-inline center">
      <div className="form-group mx-sm-3 mb-4 center">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="form-control w-25 text-center"
          placeholder="Enter city name..."
          Style="border: 2px solid #4f84a3;color: #0c6c73;"
        />
        {error && <p className="text-danger">{error}</p>}
      </div>
      <button type="submit" className="btn btn-clr mb-5" Style="width:10%;"><strong><i>Search</i></strong></button>
    </form>
  );
};

export default InputForm;
