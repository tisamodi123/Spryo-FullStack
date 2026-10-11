import React from 'react'

const Container = ({ className = '', children }) => {
  return (
    <div className={`max-w-[1240px] mx-auto px-4 sm:px-6 w-full ${className}`}>
      {children}
    </div>
  );
};

export default Container
