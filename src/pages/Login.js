/* eslint no-useless-escape: 0 */
/* eslint jsx-a11y/anchor-is-valid: 0 */

import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications'
import { useForm } from 'react-hook-form'
import { login } from '../actions'

const Login = () => {
  const [redirect, setRedirect] = useState(false)
  const { register, handleSubmit, errors } = useForm()
  const { addToast } = useToasts()

  const onLogin = (loginData) => {
    login(loginData).then(
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
          <h3 className='title has-text-grey'>Login</h3>
          <p className='subtitle has-text-grey'>Please login to proceed.</p>
          <div className='box'>
            <figure className='avatar'>
              <img src='https://placehold.it/128x128' alt='avatar' />
            </figure>
            <form onSubmit={handleSubmit(onLogin)}>
              <div className='field'>
                <div className='control'>
                  <input
                    ref={register({
                      required: true,
                      pattern: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                    name='email'
                    className='input is-large'
                    type='email'
                    placeholder='Your Email'
                    autoComplete='email'
                  />
                  {errors.email && (
                    <div className='form-error'>
                      {errors.email.type === 'required' && (
                        <span className='help is-danger'>
                          Email is required
                        </span>
                      )}
                      {errors.email.type === 'pattern' && (
                        <span className='help is-danger'>
                          Email address is not valid
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <div className='field'>
                <div className='control'>
                  <input
                    ref={register({ required: true, minLength: 6 })}
                    name='password'
                    className='input is-large'
                    type='password'
                    placeholder='Your Password'
                    autoComplete='current-password'
                  />
                  {errors.password && (
                    <div className='form-error'>
                      {errors.password.type === 'required' && (
                        <span className='help is-danger'>
                          Password is required
                        </span>
                      )}
                      {errors.password.type === 'minLength' && (
                        <span className='help is-danger'>
                          Minimum lenght is 6 characters
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>
              <button
                type='submit'
                className='button is-block is-info is-large is-fullwidth'
              >
                Sign In
              </button>
            </form>
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

export default Login
