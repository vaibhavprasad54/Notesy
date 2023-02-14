import React from 'react'

const MainScreen = ({title, children}) => {
  return (
    <>
    <div className="mainBg max-w-full flex items-center justify-start p-10">
        <div className="container">
            <div className="row">
                <div className="page">
                    {
                        title && (
                        <> 
                            <h1 className='text-3xl font-medium'>
                                {title}
                            </h1> 
                            <hr />
                        </>
                    )}
                    {children}
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default MainScreen