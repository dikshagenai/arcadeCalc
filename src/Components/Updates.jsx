import React from 'react'

const Updates = () => {

    return (
        <>
            <div className="w-full px-5 mx-auto mb-5 sm:w-5/6 sm:py-2 sm:shadow-lg sm:rounded-lg">

                <div className='flex mb-4 space-x-3 sm:items-center sm:justify-center sm:mb-8'>
                    <strong className='p-2 font-sans text-lg text-white truncate bg-blue-500 rounded-lg sm:text-2xl sm:px-4 sm:py-2'> &gt; Important Updates</strong>
                </div>

                <div className='flex flex-col mb-4 gap-y-1'>
                    <strong className='py-1 '> &#8627; Program deadline has been extended till 27th September</strong>
                    <strong className='py-1 '> &#8627; The 15 lab limit per day per user!</strong>
                    <strong className='py-1 '> &#8627; Arcade Games and Trivia are NOW available</strong>
                </div>










                {/* <div className='mb-2'>
                    <strong className='flex justify-center italic font-extrabold'>Monsoon Season has been officially ended!</strong>
                </div> */}


            </div >
        </>
    )
}

export default Updates
