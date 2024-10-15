import React, { useState } from 'react';
import './MyForm.css';

function MyForm() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });

  const [submittedEntries, setSubmittedEntries] = useState([]);
  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    email: ''
  });
  const [editingIndex, setEditingIndex] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate the form
    const formErrors = validateForm(formData);
    setErrors(formErrors);

    // If there are no errors, submit the form
    if (Object.values(formErrors).every(error => !error)) {
      // Store the submitted entries
      if (editingIndex !== null) {
        const updatedEntries = [...submittedEntries];
        updatedEntries[editingIndex] = formData;
        setSubmittedEntries(updatedEntries);
        setEditingIndex(null);
      } else {
        setSubmittedEntries([...submittedEntries, formData]);
      }
      // Clear the form after submission
      setFormData({
        firstName: '',
        lastName: '',
        email: ''
      });
    }
  };

  const validateForm = (data) => {
    let errors = {};
    if (data.firstName.trim() === '') {
      errors.firstName = 'First name is required';
    }
    if (data.lastName.trim() === '') {
      errors.lastName = 'Last name is required';
    }
    if (data.email.trim() === '') {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(data.email)) {
      errors.email = 'Invalid email address';
    }
    return errors;
  };

  const handleEdit = (index) => {
    const entryToEdit = submittedEntries[index];
    setFormData(entryToEdit);
    setEditingIndex(index);
  };

  const handleClear = (index) => {
    const updatedEntries = [...submittedEntries];
    updatedEntries.splice(index, 1); // Remove the entry at the given index
    setSubmittedEntries(updatedEntries);
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">First Name:</label>
              <input
                type="text"
                className={`form-control ${errors.firstName && 'is-invalid'}`}
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
              />
              {errors.firstName && <div className="invalid-feedback">{errors.firstName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">Last Name:</label>
              <input
                type="text"
                className={`form-control ${errors.lastName && 'is-invalid'}`}
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
              />
              {errors.lastName && <div className="invalid-feedback">{errors.lastName}</div>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email:</label>
              <input
                type="email"
                className={`form-control ${errors.email && 'is-invalid'}`}
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
              {errors.email && <div className="invalid-feedback">{errors.email}</div>}
            </div>
            <button type="submit" className="btn btn-primary">{editingIndex !== null ? 'Update' : 'Submit'}</button>
          </form>
        </div>
      </div>
      {submittedEntries.length > 0 && (
        <div className="row justify-content-center mt-5">
          <div className="col-md-6">
            <div>
              <h2>Submitted Entries:</h2>
              <ul className="list-group no-bullets">
                {submittedEntries.map((entry, index) => (
                  <li key={index} className="list-group-item">
                    <strong>First Name:</strong> {entry.firstName}, &nbsp;
                    <strong>Last Name:</strong> {entry.lastName}, &nbsp;
                    <strong>Email:</strong> {entry.email}
                    <button className="btn btn-secondary btn-sm ms-2" onClick={() => handleEdit(index)}>Edit</button>
                    <button className="btn btn-danger btn-sm ms-2" onClick={() => handleClear(index)}>Clear</button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyForm;
