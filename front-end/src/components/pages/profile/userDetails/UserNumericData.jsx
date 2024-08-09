import React from 'react'

export const UserNumericData = ({ value = 0, label = '' }) => {
  return (
    <div className='user__numeric'>
      <span className='user__numeric-value'>{value}</span>
      <p className='user__numeric-label'>
        {label}
      </p>
    </div>
  );
}
