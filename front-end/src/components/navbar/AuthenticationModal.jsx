import React, { useEffect, useRef, useState } from 'react'
import { SignIn } from './authenticationModal/SignIn'
import { SignUp } from './authenticationModal/SingUp'
import { XmarkIcon } from '../../icons'

const AUTHENTICATION_MODAL_TABS = {
  signIn: 'signin',
  signUp: 'signup'
}
export const AuthenticationModal = ({ isOpen = false, setIsOpen = () => {} }) => {
  const dialogRef = useRef(null)
  useEffect(() => {
    if (isOpen) {
      dialogRef.current.showModal()
      return
    }
    dialogRef.current.close()
  }, [isOpen])
  const [activeTab, setActiveTab] = useState(AUTHENTICATION_MODAL_TABS.signIn)
  const showSignUpTab = () => setActiveTab(AUTHENTICATION_MODAL_TABS.signUp)
  const showSignInTab = () => setActiveTab(AUTHENTICATION_MODAL_TABS.signIn)
  return (
    <dialog className='authentication-modal' ref={dialogRef}>
      <button className='authentication-modal__action--close' onClick={() => setIsOpen(false)}>
        <XmarkIcon size='28px' />
      </button>
      <div className='authentication-modal__content'>
        {activeTab === AUTHENTICATION_MODAL_TABS.signIn && <SignIn showSignUpTab={showSignUpTab} />}
        {activeTab === AUTHENTICATION_MODAL_TABS.signUp && <SignUp showSignInTab={showSignInTab} />}
      </div>
    </dialog>
  )
}
