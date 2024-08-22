import React from 'react'
import { Helmet } from 'react-helmet-async'
import Home from '../Components/Home'
import Footer from '../Components/Footer'
import Navbar from '../Components/Navbar'
// import TempBar from '../Components/TempBar'

const HomePage = () => {
    return (
        < >
            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <meta name="keywords"
                    content="Google Cloud Arcade, Arcade Facilitator, Arcade Calc, Arcade Calculator, Arcade Helper, Arcade Points, Arcade Points Calculator, Facilitator Calculator, Google Cloud Arcade 2024, Free Google Swag" />
                <meta name="description"
                    content="Arcade Calc - Calculate your Arcade Facilitator Points, track badge progress, and check eligibility for milestones. Never miss any update and stay up to date to the program." />
                <meta name="author" content="Deepanshu Prajapati" />
                <title>Arcade Calc</title>
                <link rel="canonical" href="/" />

                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="Arcade Calc" />
                <meta property="og:description"
                    content="Arcade Calc - Calculate your Arcade Facilitator Points, track badge progress, and check eligibility for milestones. Never miss any update and stay up to date to the program." />
                <meta property="og:url" content="https://arcadecalc.netlify.app/" />
                <meta property="og:type" content="website" />
            </Helmet>


            {/* Main Component */}
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                {/* <TempBar /> */}
                <Home />
                <Footer />
            </div>


        </>
    )
}

export default HomePage
