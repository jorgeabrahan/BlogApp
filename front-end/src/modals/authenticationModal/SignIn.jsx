import React from 'react'
import { API_BASE_URL, MAIN_ACTIONABLE_STYLES } from '../../lib/utils/constants';
import { FacebookIcon, GoogleCircleIcon } from '../../icons';
import { MainActionable } from '../../components';

export const SignIn = () => {
  const handleGoogleAuth = () => {
    window.open(`${API_BASE_URL}/auth/google`, '_self');
  };
  const handleFacebookAuth = () => {
    window.open(`${API_BASE_URL}/auth/facebook`, '_self');
  };
  return (
    <>
      <h2 className='modal__title'>Welcome back!</h2>
      <section className='authentication-modal__actions'>
        <MainActionable onClick={handleGoogleAuth} style={MAIN_ACTIONABLE_STYLES.OUTLINE}>
          <GoogleCircleIcon />
          <span>Sign in with Google</span>
        </MainActionable>
        <MainActionable onClick={handleFacebookAuth} style={MAIN_ACTIONABLE_STYLES.OUTLINE}>
          <FacebookIcon size='22px' />
          <span>Sign in with Facebook</span>
        </MainActionable>
      </section>
    </>
  )
}
