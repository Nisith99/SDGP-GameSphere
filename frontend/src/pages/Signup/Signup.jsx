import React from 'react'
import "./signup.css"

const Signup = () => {
  return (
    <div className='regUser'>
      <h3>Sign Up</h3>
      <form className='regUserForm'>
      <div className='inputGrp'>
        <label htmlFor="firstName">First Name</label>
        <input
        type='text'
        id='firstName'
        autoComplete='off'
        placeholder='Enter your first name'
        />

        <label htmlFor="lastName">Last Name</label>
        <input
        type='text'
        id='lastName'
        autoComplete='off'
        placeholder='Enter your last name'
        />

        <label htmlFor="email">Email</label>
        <input
        type='email'
        id='lastName'
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

        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
        type='password'
        id='confirmPassword'
        autoComplete='off'
        placeholder='Confirm your password'
        />
        <button type="submit" class="btn btn-success">
          Sign Up
        </button>
      </div>
      </form>
    </div>
  )
}

export default Signup