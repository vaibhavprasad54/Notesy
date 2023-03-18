import React from "react";

const ErrorMessage = ({children}) => {
  return (
    <>
      <div
        className="mb-3 inline-flex w-full items-center rounded-lg bg-red-300 py-5 px-6 text-base text-danger-700"
        role="alert"
      >
        <span className="mr-2">
          
        </span>
        {children}
      </div>
    </>
  );
};

export default ErrorMessage;
