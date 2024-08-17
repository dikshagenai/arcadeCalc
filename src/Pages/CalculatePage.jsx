import React from 'react'
import { Helmet } from 'react-helmet-async'
import Calculate from '../Components/Calculate'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const CalculatePage = () => {
    return (
        <>
            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <meta name="keywords"
                    content="Google Cloud Arcade, Arcade Facilitator, Arcade Calc, Arcade Calculator, Arcade Helper, Arcade Points, Arcade Points Calculator, Facilitator Calculator, Google Cloud Arcade 2024, Free Google Swag" />
                <meta name="description"
                    content="Track your Google Cloud Arcade Facilitator Points with our detailed progress reports. Discover the badges you've earned and milestones you're eligible for. Enjoy free Google swag! Join the Google Cloud Arcade 2024 program now." />
                <meta name="author" content="Deepanshu Prajapati" />
                <title>Calculate - Arcade Calc</title>
                <link rel="canonical" href="/calculate" />


                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="Calculate - Arcade Calc" />
                <meta property="og:description"
                    content="Track your Google Cloud Arcade Facilitator Points with our detailed progress reports. Discover the badges you've earned and milestones you're eligible for. Enjoy free Google swag! Join the Google Cloud Arcade 2024 program now." />
                <meta property="og:url" content="https://arcadecalc.netlify.app/calculate" />
                <meta property="og:type" content="website" />
            </Helmet>


            {/* Main Component */}
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <Calculate />
                <Footer />
            </div>
        </>
    )
}

export default CalculatePage
