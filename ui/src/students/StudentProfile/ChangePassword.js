import React, { useState } from 'react';
import axios from 'axios';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import { API_URL } from '../../components/Constants/Url';
function ChangePassword() {
  const { getGlobal } = useGlobalState();
  const user_id = getGlobal(); // Assuming globalState is the user_id

  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    renewPassword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { currentPassword, newPassword, renewPassword } = formData;

    if (newPassword !== renewPassword) {
      alert('New passwords do not match');
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/auth/educator/change-password/${user_id}`, {
        currentPassword,
        newPassword,
      });
      alert('Password changed successfully');
    } catch (error) {
      console.error('There was an error changing the password!', error);
      alert('There was an error changing the password!');
    }
  };

  return (
    <div>
      {/* Change Password Form */}
      <form onSubmit={handleSubmit}>
        <div className="row mb-3">
          <label
            htmlFor="currentPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Current Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="currentPassword"
              type="password"
              className="form-control"
              id="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="newPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="newPassword"
              type="password"
              className="form-control"
              id="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="row mb-3">
          <label
            htmlFor="renewPassword"
            className="col-md-4 col-lg-3 col-form-label"
          >
            Re-enter New Password
          </label>
          <div className="col-md-8 col-lg-9">
            <input
              name="renewPassword"
              type="password"
              className="form-control"
              id="renewPassword"
              value={formData.renewPassword}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Change Password
          </button>
        </div>
      </form>
      {/* End Change Password Form */}
    </div>
  );
}

export default ChangePassword;
