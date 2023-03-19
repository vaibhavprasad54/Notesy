import React from 'react'

const SuccessMessage = ({ children }) => {
  return (
    <>
      <div
        className="mb-3 inline-flex w-full items-center rounded-md bg-green-500 py-2 px-6 text-base text-danger-700"
        role="alert"
      >
        <span className="mr-2">
          
        </span>
        {children}
      </div>
    </>
  )
}

export default SuccessMessage