import React from 'react'
import { Link } from 'react-router-dom'
const Home = () => {
    return (
        <>
            <div className="mx-auto mb-5 px-6 sm:w-5/6 sm:py-2 sm:shadow-lg font-mono">
                <p className='py-2'>
                    <strong className='font-serif'>Arcade Calc</strong> is a platform to provide latest updates regarding the <span className='font-bold font-serif'>Google Cloud Arcade Program.</span>
                </p>

                <p className='pt-3 pb-2'>
                    <strong className='font-serif'>What is Google Cloud Arcade Program?</strong>
                </p>
                <p className='indent-8 sm:indent-13'>
                    The Arcade with Google Cloud is a gamified learning experience designed to boost your cloud skills. Each month, it features various games: an introductory
                    <strong className='font-serif'> Level 1,</strong>
                    <strong className='font-serif'> Level 2,</strong> and
                    <strong className='font-serif'> Level 3, </strong>
                    and weekly trivia badges:
                    <strong className='font-serif'> Week 1,</strong>
                    <strong className='font-serif'> Week 2,</strong>
                    <strong className='font-serif'> Week 3,</strong> and
                    <strong className='font-serif'> Week 4.</strong>
                </p>

                <p>
                    By completing hands-on labs, you earn digital badges that award points. These points can be redeemed for Google Cloud swag like backpacks, t-shirts, and mugs, etc. The games cover various topics related to Google Cloud products and technology, allowing you to showcase your skills. <Link target='_blank' rel="noreferrer" className='text-blue-500 hover:underline' to="https://go.cloudskillsboost.google/arcade" tabIndex={-1}>No quarters needed—participate for free!</Link>
                </p>

                <p className='mt-3 py-2'>
                    If you want to track your points of <span className='font-semibold '>Google Cloud Arcade Facilitator Program </span><Link className='text-blue-500' to={'/calculate'} tabIndex={-1}>click here.</Link>
                </p>

                <div className='my-3 py-3 bg-gray-400 rounded-md select-none '>
                    <strong className='sm:font-mono font-serif flex mb-3 justify-center text-lg sm:text-xl md:text-2xl '>Previous Arcade Prizes</strong>


                    <div className="flex justify-center flex-wrap py-3 font-sans">
                        <div className="w-1/2 lg:w-1/4 mb-6 md:mb-4 text-center">
                            <img src="https://i.ibb.co/NjNhZcd/hgsdjbfnnkjdfnjkndfjkn.png" width={2000} height={1800} alt="Tier 1" />
                            <strong className="text-sm sm:text-xl">Standard Tier</strong>
                            <p className="text-sm sm:text-xl">(10 Points)</p>
                        </div>
                        <div className="w-1/2 lg:w-1/4 mb-6 md:mb-4 text-center">
                            <img src="https://i.ibb.co/RT4X6hT/sdfnmjxbjsbchjbd.png" width={2000} height={1800} alt="Tier 2" />
                            <strong className="text-sm sm:text-xl">Advance Tier</strong>
                            <p className="text-sm sm:text-xl">(25 Points)</p>
                        </div>
                        <div className="w-1/2 lg:w-1/4 mb-6 md:mb-4 text-center">
                            <img src="https://i.ibb.co/qkyP1Z3/shgbdjnjnxc.png" width={2000} height={1800} alt="Tier 3" />
                            <strong className="text-sm sm:text-xl">Premium Tier</strong>
                            <p className="text-sm sm:text-xl">(40 Points)</p>
                        </div>
                        <div className="w-1/2 lg:w-1/4 mb-6 md:mb-4 text-center">
                            <img src="https://i.ibb.co/1Z3dmCC/ejrnkm.png" width={2000} height={1800} alt="Tier 4" />
                            <strong className="text-sm sm:text-xl">Premium plus Tier</strong>
                            <p className="text-sm sm:text-xl">(60 Points)</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Home
