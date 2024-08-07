import React from 'react'
import { ServiceActionable } from '../../actionables/ServiceActionable'
import { FacebookIcon, GoogleCircleIcon } from '../../../icons'

export const SignIn = ({ showSignUpTab = () => {} }) => {
  return (
    <>
      <h2 className='authentication-modal__title'>Welcome back!</h2>
      <section className='authentication-modal__actions'>
        <ServiceActionable>
          <GoogleCircleIcon />
          <span>Sign in with Google</span>
        </ServiceActionable>
        <ServiceActionable>
          <FacebookIcon size='22px' />
          <span>Sign in with Facebook</span>
        </ServiceActionable>
      </section>
      <p className='authentication-modal__action--switch-tabs'>
        No account? <button onClick={showSignUpTab}>Create one</button>
      </p>
    </>
  )
}
