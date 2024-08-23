import React from 'react'
import { MdOutlineTipsAndUpdates } from "react-icons/md";
import augustUpdates from '../assets/updates/augustUpdates.json'


const Updates = () => {

    return (
        <>
            <div className="w-full px-5 mx-auto mb-5 sm:w-5/6 sm:py-2 sm:shadow-lg sm:rounded-lg">

                <div className='flex mb-4 space-x-3 sm:items-center sm:justify-center sm:mb-8'>
                    <strong className='p-2 font-serif text-lg text-white truncate bg-blue-500 rounded-lg sm:text-2xl sm:px-4 sm:py-2 flex justify-center items-center gap-x-2'> <MdOutlineTipsAndUpdates /> Important Updates</strong>
                </div>


                <div className='flex flex-col mb-4 gap-y-2 '>
                    {Object.entries(augustUpdates).map(([title, description]) => {
                        return (
                            <div key={title} className='border border-black gap-x-2 px-3 rounded-md sm:py-3 p-1'>
                                <strong className='mr-1 font-bold font-serif'>{title}: </strong>
                                <span className='font-mono'>{description}</span>
                            </div>
                        )
                    })}
                </div>


            </div >
        </>
    )
}

export default Updates
