import React from 'react'

const Button = (
    {
        children,
        type='button',
        bgcolor='bg-blue-500',
        textcolor='white',
        classname='',
        ...props
    }
) => {
  return (
    <button className={`text-[18px]   ${textcolor} ${classname}`}  {...props}> 
      {children}
    </button>
  )
}

export default Button
