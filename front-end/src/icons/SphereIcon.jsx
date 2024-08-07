import React from 'react';

export const SphereIcon = ({ id = '', className = '', size = '24px' }) => {
  return (
    <svg
      id={id}
      className={className}
      width={size}
      height={size}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      color='currentColor'
    >
      <path
        d='M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
      <path
        d='M12 22C8.68629 22 6 17.5228 6 12C6 6.47715 8.68629 2 12 2'
        stroke='currentColor'
        strokeWidth='1.5'
        strokeLinecap='round'
        strokeLinejoin='round'
      ></path>
    </svg>
  )
}
