import React from 'react'
import { Link } from 'react-router-dom'
import { BookIcon, EditIcon, LogOutIcon, UserIcon } from '../../../icons'
import { API_BASE_URL } from '../../../lib/utils/constants';

export const UserDropdownMenu = () => {
  const handleLogout = () => {
    window.open(`${API_BASE_URL}/auth/logout`, '_self');
  };
  return (
    <ul className='user-name__menu'>
      <li>
        <Link to='/profile' className="user-name__menu-action">
          <UserIcon size='18px' />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link to='/profile' className="user-name__menu-action">
          <BookIcon size='18px' />
          <span>My Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/write-blog' className="user-name__menu-action">
          <EditIcon size='18px' />
          <span>Write</span>
        </Link>
      </li>
      <li>
        <button className='user-name__menu-action' onClick={handleLogout}>
          <LogOutIcon size='18px' />
          <span>Sign Out</span>
        </button>
      </li>
    </ul>
  )
}
