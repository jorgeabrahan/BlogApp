import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { getNameInitials } from '../../lib/utils/userUtils'
import { UserDropdownMenu } from './userDropdown/'

export const UserDropdown = () => {
  const user = useSelector((state) => state.auth.user)
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false)
  return (
    <div className='user-name'>
      <button
        className='user-name-bubble'
        onClick={() => setIsUserDropdownOpen((prevIsUserDropdownOpen) => !prevIsUserDropdownOpen)}
      >
        {getNameInitials(user?.name ?? '')}
      </button>
      {isUserDropdownOpen && (
        <UserDropdownMenu />
      )}
    </div>
  )
}
