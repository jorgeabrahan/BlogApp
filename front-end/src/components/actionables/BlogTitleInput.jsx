import React from 'react'

export const BlogTitleInput = ({ id = '', placeholder = 'Title', ...props }) => {
  return (
    <input
      className='input-blog-title'
      type='text'
      id={id}
      name={id}
      placeholder={placeholder}
      {...props}
    />
  )
}
