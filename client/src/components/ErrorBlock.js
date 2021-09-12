import React from 'react'

const ErrorBlock = ({errorMessage}) => {
  return (
    <div className="error text-red-600 text-center">
      <span>Something went wrong</span>
      <h2 className="text-5xl ">{errorMessage}</h2>
    </div>
  )
}

export default ErrorBlock
