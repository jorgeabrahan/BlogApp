import React from 'react'
import { ServiceActionable } from '../../actionables/ServiceActionable'
import { FacebookIcon, GoogleCircleIcon } from '../../../icons'

export const SignUp = ({ showSignInTab = () => {} }) => {
  return (
    <>
      <h2 className='authentication-modal__title'>Join BlogShpere</h2>
      <section className='authentication-modal__actions'>
        <ServiceActionable>
          <GoogleCircleIcon />
          <span>Sign up with Google</span>
        </ServiceActionable>
        <ServiceActionable>
          <FacebookIcon size='22px' />
          <span>Sign up with Facebook</span>
        </ServiceActionable>
      </section>
      <p className='authentication-modal__action--switch-tabs'>
        Already joined? <button onClick={showSignInTab}>Sign in</button>
      </p>
    </>
  )
}
