import React, {useState} from "react";
import './signup.css';
import { axiosInstance } from "../../lib/axios";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      // Send data to the backend using the Axios instance
      const response = await axiosInstance.post('/auth/signup', formData);

      if (response.status === 201) {
        console.log('Signup successful:', response.data);
        alert('Signup successful!');
      }
    } catch (error) {
      if (error.response) {
        // The server responded with an error
        console.error('Signup failed:', error.response.data.message);
        alert(`Signup failed: ${error.response.data.message}`);
      } else {
        // Something wrong with in setting up the request
        console.error('Error during signup:', error.message);
        alert('An error occurred during signup.');
      }
    }
  };
  return (
    <div className="signupPage">
      <div className="logoSection">
        <div className="logo">
            <img src="/gameSphere_logo.png" alt="GameSphere Logo" />
        </div>
      </div>
      <div className="signupForm">
        <h2 className="formTitle">Sign Up</h2>

        <form onSubmit={handleSubmit}>
          <div className="inputs">
            <input
              type="text"
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="inputs">
            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn">
            Signup
          </button>
        </form>

        <div className="signin-link">
          <p>
            Already have an account?{' '}
            <a href="/login" className="signin-text">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
