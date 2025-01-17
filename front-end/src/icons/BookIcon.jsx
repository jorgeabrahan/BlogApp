import React from 'react'

export const BookIcon = ({ id = '', className = '', size = '24px' }) => {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      strokeWidth='1.5'
      viewBox='0 0 24 24'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'
    >
      <path
        d='M4 19V5C4 3.89543 4.89543 3 6 3H19.4C19.7314 3 20 3.26863 20 3.6V16.7143'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
      ></path>
      <path d='M6 17L20 17' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
      <path d='M6 21L20 21' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
      <path
        d='M6 21C4.89543 21 4 20.1046 4 19C4 17.8954 4.89543 17 6 17'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path d='M9 7L15 7' stroke='currentColor' strokeWidth='1.5' strokeLinecap='round'></path>
    </svg>
  )
}
