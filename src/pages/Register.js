/* eslint jsx-a11y/anchor-is-valid: 0 */
import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import RegisterForm from '../component/auth/RegisterForm'
import { register } from '../actions'

const Register = (props) => {
  const [redirect, setRedirect] = useState(false)
  const { addToast } = useToasts()

  const registerUser = (userData) => {
    register(userData).then(
      (_) => setRedirect(true),
      (errorMessage) =>
        addToast(errorMessage, {
          appearance: 'error',
          autoDismiss: true,
        })
    )
  }

  if (redirect) return <Redirect to='/' />

  return (
    <div className='auth-page'>
      <div className='container has-text-centered'>
        <div className='column is-4 is-offset-4'>
          <h3 className='title has-text-grey'>Register</h3>
          <p className='subtitle has-text-grey'>Please Register to proceed.</p>
          <div className='box'>
            <figure className='avatar'>
              <img src='https://placehold.it/128x128' alt='avatar' />
            </figure>
            <RegisterForm onRegister={registerUser} />
          </div>
          <p className='has-text-grey'>
            <a>Sign In With Google</a>&nbsp;
            <a href='/'>Sign Up</a> &nbsp;·&nbsp;
            <a href='../'>Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Register
