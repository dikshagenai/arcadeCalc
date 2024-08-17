import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className="mx-auto mb-5 px-6 sm:w-5/6 sm:py-2 sm:shadow-lg">
                <p className='py-2'>
                    <span className='font-bold'>Arcade Calc</span> is a platform to provide latest updates regarding the <span className='font-bold font-serif'>Google Cloud Arcade Program.</span>
                </p>

                <p className='pt-3 pb-2'>
                    <strong className='font-serif'>What is Google Cloud Arcade Program?</strong>
                </p>
                <p className='indent-8 sm:indent-13'>
                    The Arcade with Google Cloud is a gamified learning experience designed to boost your cloud skills. Each month, it features various games: an introductory
                    <span className='font-semibold'> Level 1,</span>
                    <span className='font-semibold'> Level 2,</span> and
                    <span className='font-semibold'> Level 3, </span>
                    and weekly trivia badges:
                    <span className='font-semibold'> Week 1,</span>
                    <span className='font-semibold'> Week 2,</span>
                    <span className='font-semibold'> Week 3,</span> and
                    <span className='font-semibold'> Week 4.</span>
                </p>

                <p>
                    By completing hands-on labs, you earn digital badges that award points. These points can be redeemed for Google Cloud swag like backpacks, t-shirts, and mugs, etc. The games cover various topics related to Google Cloud products and technology, allowing you to showcase your skills. <Link target='_blank' rel="noreferrer" className='text-blue-500 hover:underline' to="https://go.cloudskillsboost.google/arcade">No quarters needed—participate for free!</Link>
                </p>

                <p className='mt-3 py-2'>
                    If you want to track your points of <span className='font-semibold '>Google Cloud Arcade Facilitator Program </span><Link className='text-blue-500' to={'/calculate'}>click here.</Link>
                </p>

                <div className='my-3 py-3 bg-gray-400 rounded-md'>
                    <strong className='sm:press-start-2p-regular font-sans flex mb-3 justify-center underline text-lg sm:text-xl md:text-2xl '>Previous Arcade Prizes</strong>


                    <div className="flex justify-center flex-wrap  py-3">
                        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-2 lg:mr-4 text-center">
                            <img src="https://i.ibb.co/NjNhZcd/hgsdjbfnnkjdfnjkndfjkn.png" width={2000} height={1800} alt="Tier 1" />
                            <p className="text-xl font-bold">Standard Tier</p>
                            <p className="text-xl">(10 Points)</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-2 lg:mr-4 text-center">
                            <img src="https://i.ibb.co/RT4X6hT/sdfnmjxbjsbchjbd.png" width={2000} height={1800} alt="Tier 2" />
                            <p className="text-xl font-bold">Advance Tier</p>
                            <p className="text-xl">(25 Points)</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-2 lg:mr-4 text-center">
                            <img src="https://i.ibb.co/qkyP1Z3/shgbdjnjnxc.png" width={2000} height={1800} alt="Tier 3" />
                            <p className="text-xl font-bold">Premium Tier</p>
                            <p className="text-xl">(40 Points)</p>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/4 mb-4 md:mb-2 lg:mr-4 text-center">
                            <img src="https://i.ibb.co/1Z3dmCC/ejrnkm.png" width={2000} height={1800} alt="Tier 4" />
                            <p className="text-xl font-bold">Premium plus Tier</p>
                            <p className="text-xl">(60 Points)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
