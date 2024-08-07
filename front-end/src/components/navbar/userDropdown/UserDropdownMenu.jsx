import React from 'react'
import { Link } from 'react-router-dom'
import { BookIcon, EditIcon, LogOutIcon, UserIcon } from '../../../icons'

export const UserDropdownMenu = () => {
  return (
    <ul className='navbar-user-name__menu'>
      <li>
        <Link to='/profile' className="user-name__menu-action">
          <UserIcon size='18px' />
          <span>Profile</span>
        </Link>
      </li>
      <li>
        <Link to='/' className="user-name__menu-action">
          <BookIcon size='18px' />
          <span>My Posts</span>
        </Link>
      </li>
      <li>
        <Link to='/' className="user-name__menu-action">
          <EditIcon size='18px' />
          <span>Write</span>
        </Link>
      </li>
      <li>
        <button className='user-name__menu-action'>
          <LogOutIcon size='18px' />
          <span>Sign Out</span>
        </button>
      </li>
    </ul>
  )
}
