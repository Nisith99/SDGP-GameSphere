import React from 'react'
import "./login.css"
const Login = () => {
  return (
    <div className='regUser'>
      <h3>Login</h3>
      <form className='regUserForm'>
      <div className='inputGrp'>
        <label htmlFor="email">Email</label>
        <input
        type='email'
        id='email'
        autoComplete='off'
        placeholder='Enter your email'
        />

        <label htmlFor="password">Password</label>
        <input
        type='password'
        id='password'
        autoComplete='off'
        placeholder='Enter your password'
        />
        
        <button type="submit" class="btn btn-success">
          Sign Up
        </button>
      </div>
      </form>
    </div>
  )
}

export default Login