import React from 'react';

export const ServiceActionable = ({ as: Tag = 'button', children, ...props }) => {
  return (
    <Tag className="service-actionable" {...props}>
      {children}
    </Tag>
  );
}
