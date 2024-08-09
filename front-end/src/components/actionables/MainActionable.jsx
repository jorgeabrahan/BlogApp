import React from 'react'

export const MainActionable = ({
  as: Tag = 'button',
  children,
  style,
  isRound = false,
  className = '',
  ...props
}) => {
  return (
    <Tag
      className={`actionable main-actionable main-actionable--${style} ${
        isRound && 'actionable-round'
      } ${className}`}
      {...props}
    >
      {children}
    </Tag>
  )
}
