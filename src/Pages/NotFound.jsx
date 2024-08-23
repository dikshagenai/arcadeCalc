import React from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'

const NotFound = () => {
    return (
        <>


            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <title>404 - Arcade Calc</title>
                <link rel="canonical" href="/404" />

                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="404 - Arcade Calc" />
            </Helmet>




            {/* Main element */}
            <div className="flex flex-col justify-center items-center my-auto select-none bg-black text-white py-[20vh] mx-[5%] sm:mx-[20%] rounded-lg">
                <div className=' flex items-center p-1 justify-center mb-3 sm:mb-5'>
                    <strong className='press-start-2p-regular sm:text-3xl text-xl '>404</strong>
                </div>

                <div className='font-serif flex text-base sm:text-2xl p-1 mb-2 sm:mb-3 justify-center mx-5'>
                    This page could not be found.
                </div>



                <div className="font-serif text-lg p-1 hidden sm:block">
                    <Link className='text-red-300 font-bold' to={"/"}>Go to site home</Link>
                </div>

            </div>







        </>
    )
}

export default NotFound
