import React from 'react'

const Container = ({className,children}) => {
  return (
    // className prop to add extra styles and uses children to render whatever you put inside the container
    <div className={`max-w-[1200px] mx-auto ${className}`}>
      {children}
    </div>
  )
}

export default Container
