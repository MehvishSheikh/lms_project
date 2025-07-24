import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProfileEdit from './ProfileEdit';
import ProfileSettings from './ProfileSettings';
import ChangePassword from './ChangePassword';
import { useGlobalState } from '../../components/Constants/GlobalStateProvider';
import { API_URL } from '../../components/Constants/Url';
function ShowStudentProfile() {
  const { getGlobal } = useGlobalState();
  const globalState = getGlobal();
  const [profile, setProfile] = useState({
    student_name: '',
    role: '',
    institute: '',
    user_id: '',
    educator_phone: '',
    username: '',
    password: '',
  });

  useEffect(() => {
    axios.get(`${API_URL}/api/student/${globalState}`)
      .then(response => {
        setProfile(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the user data!', error);
      });
  }, [globalState]);

  return (
    <>
      <section className="section profile">
        <div className="row">
          <div className="col-xl-4">
            <div className="card">
              <div className="card-body profile-card pt-4 d-flex flex-column align-items-center">
                <img
                  src="assets/img/man-face.jpg"
                  alt="Profile"
                  className="rounded-circle"
                />
                <h2>{profile.educator_name}</h2>
                <h3>User Id {profile.user_id}</h3>
              </div>
            </div>
          </div>
          <div className="col-xl-8">
            <div className="card">
              <div className="card-body pt-3">
                <ul className="nav nav-tabs nav-tabs-bordered">
                  <li className="nav-item">
                    <button
                      className="nav-link active"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-overview"
                    >
                      Overview
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-edit"
                    >
                      Edit Profile
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-settings"
                    >
                      Settings
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link"
                      data-bs-toggle="tab"
                      data-bs-target="#profile-change-password"
                    >
                      Change Password
                    </button>
                  </li>
                </ul>
                <div className="tab-content pt-2">
                  <div
                    className="tab-pane fade show active profile-overview"
                    id="profile-overview"
                  >
                    <h5 className="card-title">Profile Details</h5>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Full Name</div>
                      <div className="col-lg-9 col-md-8">{profile.educator_name}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Role</div>
                      <div className="col-lg-9 col-md-8">{profile.role}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Institute</div>
                      <div className="col-lg-9 col-md-8">{profile.institute}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Phone</div>
                      <div className="col-lg-9 col-md-8">{profile.educator_phone}</div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3 col-md-4 label">Username</div>
                      <div className="col-lg-9 col-md-8">{profile.username}</div>
                    </div>
                  </div>
                  <div
                    className="tab-pane fade profile-edit pt-3"
                    id="profile-edit"
                  >
                    <ProfileEdit profile={profile} />
                  </div>
                  <div className="tab-pane fade pt-3" id="profile-settings">
                    <ProfileSettings />
                  </div>
                  <div
                    className="tab-pane fade pt-3"
                    id="profile-change-password"
                  >
                    <ChangePassword />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ShowStudentProfile;
