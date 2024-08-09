import React from 'react'
import { ModalLayout } from '../layouts'
import { SignIn } from './authenticationModal/SignIn'

export const AuthenticationModal = ({ isOpen = false, setIsOpen = () => {} }) => {
  return (
    <ModalLayout isOpen={isOpen} setIsOpen={setIsOpen}>
      <SignIn />
    </ModalLayout>
  )
}
