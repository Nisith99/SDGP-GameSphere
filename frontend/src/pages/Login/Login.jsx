import React, {useState} from 'react'
import { axiosInstance } from '../../lib/axios';
import "./login.css"
const Login = () => {

    const [formData, setFormData] = useState({
      userName: '',
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
        const response = await axiosInstance.post('/auth/login', formData);
  
        if (response.status === 200) {
          console.log('Login successful:', response.data);
          alert('Login successful!');
          // Redirect to the home page
          window.location.href = '/home';
        }
      } catch (error) {
        if (error.response) {
          // The server responded with an error
          console.error('Login failed:', error.response.data.message);
          alert(`Login failed: ${error.response.data.message}`);
        } else {
          // Something wrong with in setting up the request
          console.error('Error during login:', error.message);
          alert('An error occurred during login.');
        }
      }
    };
  
    return (
      <div className="loginPage">
        <div className="logoSection">
            <div className="logo">
              <img src="gameSphere_logo.png" alt="GameSphere Logo" />
            </div>
          </div>
        <div className="loginForm">
          <h2 className="form-title">Login</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputs">
              <input
                type="text"
                name="userName"
                placeholder="Username"
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
              Login
            </button>
          </form>

          <div className="signup-link">
            <p>
              Don't have an account?{' '}
              <a href="/" className="signup-text">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    )
}

export default Login