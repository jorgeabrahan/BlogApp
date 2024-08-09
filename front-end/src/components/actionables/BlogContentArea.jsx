import React from 'react';

export const BlogContentArea = ({
  id = '',
  placeholder = "",
  rows = '10',
  className = '',
  ...props
}) => {
  return (
    <textarea
      className={`input-blog-content ${className}`}
      id={id}
      name={id}
      rows={rows}
      placeholder={placeholder}
      {...props}
    ></textarea>
  );
}
