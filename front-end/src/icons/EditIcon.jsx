import React from 'react';

export const EditIcon = ({ id = '', className = '', size = '24px' }) => {
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
        d='M3 21L12 21H21'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path
        d='M12.2218 5.82839L15.0503 2.99996L20 7.94971L17.1716 10.7781M12.2218 5.82839L6.61522 11.435C6.42769 11.6225 6.32233 11.8769 6.32233 12.1421L6.32233 16.6776L10.8579 16.6776C11.1231 16.6776 11.3774 16.5723 11.565 16.3847L17.1716 10.7781M12.2218 5.82839L17.1716 10.7781'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}
