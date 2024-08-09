import React, { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { MainActionable } from '../actionables/MainActionable'
import { MAIN_ACTIONABLE_STYLES } from '../../lib/utils/constants'
import { SphereIcon } from '../../icons'
import { UserDropdown } from './UserDropdown'
import { AuthenticationModal } from '../../modals'

export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated)
  const [showAuthenticationModal, setShowAuthenticationModal] = useState(false)
  return (
    <section>
      <nav className='navbar layout-delimiter'>
        <NavLink to='/' exact className='navbar-logo'>
          <SphereIcon size='32px' />
          <p className='navbar-logo__title'>BlogShpere</p>
        </NavLink>

        {isAuthenticated ? (
          <UserDropdown />
        ) : (
          <MainActionable
            onClick={() => {
              setShowAuthenticationModal(true)
            }}
            style={MAIN_ACTIONABLE_STYLES.FLAT}
          >
            Sign In
          </MainActionable>
        )}
      </nav>
      <AuthenticationModal
        isOpen={showAuthenticationModal}
        setIsOpen={setShowAuthenticationModal}
      />
    </section>
  )
}
