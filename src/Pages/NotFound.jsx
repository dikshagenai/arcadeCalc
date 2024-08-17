import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
    return (
        <>
            <div className="flex justify-center items-center bg[#c7f8f8 h-[100vh] w-[100vw]">
                <div className="flex flex-col h-[40vh] sm:h-[80vh] w-5/6 sm:justify-center sm:items-center sm:bg-black sm:rounded-lg">
                    <div className="p-4 rounded-lg w-full bg-black flex flex-col text-white justify-center items-center ">

                        <div className=' flex items-center p-1 justify-center mb-3 sm:mb-5'>
                            <strong className='press-start-2p-regular sm:text-3xl text-xl '>Error - 404</strong>
                        </div>

                        <div className='font-serif flex text-2xl p-1 mb-2 sm:mb-3 '>
                            This page doesn't exist.
                        </div>



                        <div className="font-serif text-lg p-1">
                            Would you like return back to
                            <Link className='text-red-300 font-bold' to={"/"}> the homepage.</Link>

                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default NotFound
