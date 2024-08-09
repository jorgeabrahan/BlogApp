import React from 'react'

export const TextArea = ({ id = '', label = '', cols = 30, rows = 5, ...props }) => {
  return (
    <div className='input-wrapper'>
      <label htmlFor={id}>{label}</label>
      <textarea name='description' id='description' cols={cols} rows={rows} {...props}></textarea>
    </div>
  )
}
