import React from 'react'
import SkillBadges from '../Components/SkillBadges'
import { Helmet } from 'react-helmet-async'

const SkillBadgesPage = () => {
    return (
        <>
            {/* This part is used for better SEO | Meta Tags */}
            <Helmet>
                {/* <!-- Meta Tags --> */}
                <meta name="keywords" content="Arcade facilitator point system, google cloud, free swags, arcade 2024, points calculator, arcade helper" />
                <meta name="description"
                    content="Arcade Calc provides you the solutions of the skillBadges through which you can complete your lab as soon as possible, and enables you to score more arcade points." />
                <meta name="author" content="Deepanshu Prajapati" />
                <title>Skill Badges - Arcade Calc</title>
                <link rel="canonical" href="/skillBadges" />

                {/* <!-- Open Graph Meta Tags --> */}
                <meta property="og:title" content="Skill Badges - Arcade Calc" />
                <meta property="og:description"
                    content="Arcade Calc provides you the solutions of the skillBadges through which you can complete your lab as soon as possible, and enables you to score more arcade points." />
                <meta property="og:url" content="https://arcadecalc.netlify.app/skillBadges" />
                <meta property="og:type" content="website" />
            </Helmet>



            {/* Main Component */}
                <SkillBadges />
        </>
    )
}

export default SkillBadgesPage
