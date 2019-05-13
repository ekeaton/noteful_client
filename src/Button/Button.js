import React from 'react'
import './button.css';

export default function Button(props) {
  const { tag, className, childrenm, ...otherProps } = props

  return React.createElement(
    props.tag,
    {
      className: ['button',props.className].join(' '),
      ...otherProps
    },
    props.children
  )
}

Button.defaultProps ={
  tag: 'a',
}