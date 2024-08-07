import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getNameInitials } from '../../lib/utils/userUtils'
import { UserDropdownMenu } from './userDropdown/'

export const UserDropdown = () => {
  const user = useSelector((state) => state.auth.user)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  return (
    <div className='navbar-user-name'>
      <button
        className='navbar-user-name__bubble'
        onClick={() => setIsUserDropdownOpen((prevIsUserDropdownOpen) => !prevIsUserDropdownOpen)}
      >
        {getNameInitials(user?.displayName ?? 'Jorge Siguenza')}
      </button>
      {isUserDropdownOpen && (
        <UserDropdownMenu />
      )}
    </div>
  )
}
