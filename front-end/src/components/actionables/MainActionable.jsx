import React from 'react';

export const MainActionable = ({ as: Tag = 'button', children, style, ...props }) => {
  return (
    <Tag className={`main-actionable main-actionable--${style}`} {...props}>
      {children}
    </Tag>
  );
}
