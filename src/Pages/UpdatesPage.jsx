import React from 'react'
import { Helmet } from 'react-helmet-async'
import Updates from '../Components/Updates'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const UpdatesPage = () => {
    return (
        <>
            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <meta name="keywords" content="Arcade facilitator point system, google cloud, free swags, arcade 2024, points calculator, arcade helper" />
                <meta name="description"
                    content="Stay updated with the latest news on the Google Cloud Arcade Facilitator Program 2024. Never miss an update and keep track of your progress. Enjoy free Google swag! Join the Google Cloud Arcade 2024 program now." />
                <meta name="author" content="Deepanshu Prajapati" />
                <title>Updates - Arcade Calc</title>
                <link rel="canonical" href="/updates" />

                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="Updates - Arcade Calc" />
                <meta property="og:description"
                    content="Stay updated with the latest news on the Google Cloud Arcade Facilitator Program 2024. Never miss an update and keep track of your progress. Enjoy free Google swag! Join the Google Cloud Arcade 2024 program now." />
                <meta property="og:url" content="https://arcadecalc.netlify.app/updates" />
                <meta property="og:type" content="website" />
            </Helmet>


            {/* Main Component */}
            <div className='min-h-screen flex flex-col'>
                <Navbar />
                <Updates />
                <Footer />
            </div>
        </>
    )
}

export default UpdatesPage
