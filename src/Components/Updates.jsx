import React from 'react'
import Footer from './Footer'
import links from '../assets/SkillBadgesWithLink.json'


const Updates = () => {

    return (
        <>
            <div className="m-auto px-6 mb-5 sm:w-5/6 sm:py-2 sm:shadow-lg">

                <div className='flex space-x-3 mb-4 justify-center sm:mb-8'>
                    <strong className='text-2xl underline underline-offset-4'> Important Updates:  </strong>
                </div>


                <div className='mb-2'>
                    <strong># Program deadline has been extended till 27th September</strong>
                </div>


                <div className='mb-2'>
                    <strong># The 15 lab limit per day per user!</strong>
                </div>

                <div className='mb-2'>
                    <strong># Arcade Games and Trivia are NOW available</strong>
                </div>



                <div className='mb-2'>
                    <strong># Arcade Cloud Digital Leader Challenge (1 to 5 August): </strong>
                    <a className='text-blue-500 hover:underline' href="https://github.com/CloudHustlers/Digital_Leader/tree/main" target="_blank" rel="noreferrer">Solution here</a>
                </div>

                <div className="mb-2">
                    <strong># List of all skill badges:  </strong>
                    <ul className='my-2 ml-9'>
                        {Object.entries(links).map(([key, value]) => {
                            return (
                                <li key={key} className='list-disc'><a className="hover:underline" target='_blank' rel="noreferrer" href={value}>{key}</a></li>
                            )
                        })}
                    </ul>
                </div>


                <div className='mb-2'>
                    <strong className='flex justify-center font-extrabold italic'>Monsoon Season has been officially ended!</strong>
                </div>


            </div>
        </>
    )
}

export default Updates
