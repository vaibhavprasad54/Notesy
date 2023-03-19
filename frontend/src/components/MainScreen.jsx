import React from 'react'
import "./MainScreen.css";

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
                            <div className="mainScreenContent">
                            <h1 className='text-3xl font-medium pb-1'>
                                {title}
                            </h1> 
                            
                            <hr />
                            </div>
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