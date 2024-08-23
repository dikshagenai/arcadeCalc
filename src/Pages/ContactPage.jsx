import React from 'react'
import { Helmet } from 'react-helmet-async'
import Contact from '../Components/Contact'


const ContactPage = () => {
    return (
        <>
            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <meta name="keywords" content="Arcade helper, google cloud, free swags, arcade 2024, points calculator" />
                <meta name="description"
                    content="Get in touch with the Arcade Calc team. Whether you have questions, feedback, or need support, we're here to help. Contact us today to learn more about the Google Cloud Arcade Facilitator Program 2024." />
                <meta name="author" content="Deepanshu Prajapati" />
                <title>Contact - Arcade Calc</title>
                <link rel="canonical" href="/contact" />


                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="Contact - Arcade Calc" />
                <meta property="og:description"
                    content="Get in touch with the Arcade Calc team. Whether you have questions, feedback, or need support, we're here to help. Contact us today to learn more about the Google Cloud Arcade Facilitator Program 2024." />
                <meta property="og:url" content="https://arcadecalc.netlify.app/contact" />
                <meta property="og:type" content="website" />
            </Helmet>


            {/* Main Component */}
                <Contact />
        </>
    )
}

export default ContactPage
