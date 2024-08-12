import React from 'react'
import { Link } from 'react-router-dom'
import Footer from './Footer'
const Home = () => {
    return (
        <>
            <div className="m-auto mb-5 px-6 sm:w-5/6 sm:py-2 sm:shadow-lg">
                <p className='py-2'>
                    Arcade Calc is a platform to provide latest updates regarding the <span className='font-bold'>Google Cloud Arcade Program.</span>
                </p>

                <p className='pt-3 pb-2'>
                    <strong className=''>What is Google Cloud Arcade Program?</strong>
                </p>
                <p className='indent-8 sm:indent-13'>
                    The Arcade with Google Cloud is a gamified learning experience designed to boost your cloud skills. Each month, it features two games: an introductory “Level 1” and a more advanced “Level 2.” By completing hands-on labs, you earn digital badges that award points. These points can be redeemed for Google Cloud swag like backpacks, t-shirts, and mugs, or even charitable donations. The games cover various topics related to Google Cloud products and technology, allowing you to showcase your skills. Additionally, there are Trivia Challenges with associated trivia questions. <Link target='_blank' rel="noreferrer" className='text-blue-500 hover:underline' to="https://go.cloudskillsboost.google/arcade">No quarters needed—participate for free!</Link>
                </p>

                <div className='my-3 py-3 bg-gray-400 rounded-md'>
                    <strong className='flex mb-3 justify-center underline text-lg sm:text-xl md:text-2xl'>Previous Arcade Prizes</strong>


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

            <Footer />
        </>
    )
}

export default Home
