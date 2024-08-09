import React from 'react'

export const BlogTextArea = ({
  id = '',
  placeholder = 'What is this blog about?',
  rows = '2',
  className = '',
  ...props
}) => {
  return (
    <textarea
      className={`input-blog-textarea ${className}`}
      id={id}
      name={id}
      rows={rows}
      placeholder={placeholder}
      {...props}
    ></textarea>
  )
}
