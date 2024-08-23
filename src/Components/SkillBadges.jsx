import React from 'react'
import easySkillBadges from '../assets/skillBadges/easyBadges.json'
import lengthySkillBadges from '../assets/skillBadges/easyButLengthy.json'
import { Link } from 'react-router-dom'
import { FaYoutube } from "react-icons/fa";
import { TbCornerDownRight } from "react-icons/tb";
import { motion } from 'framer-motion';
    

const SkillBadges = () => {
    return (
        <>
            <div className="w-full px-5 mx-auto mb-5 sm:w-5/6 sm:py-2 sm:shadow-lg sm:rounded-lg font-mono">
                <div className='mt-3 mb-5' >
                    {/* <div className='flex my-3 sm:items-center sm:justify-center'>
                        <strong className='p-2 font-sans text-base text-white bg-yellow-500 rounded-lg sm:text-xl sm:px-4 sm:py-2 '> &gt; Skill Badges</strong>
                    </div> */}

                    {/* Below div will contain easy skill badges */}
                    <div className='flex flex-col items-center justify-center my-5'>


                        {/* EASY SKILL BADGES */}
                        <div className="w-full my-1">
                            <div className="flex items-center justify-center">
                                <div className='flex items-center justify-center w-full px-2 space-x-2 text-lg text-center text-white bg-pink-500 rounded-t-lg sm:text-xl sm:py-2 sm:px-4'>
                                    <strong className='py-1 text-sm sm:py-0 sm:text-lg md:text-xl font-serif'>Easy Skill Badges</strong>

                                </div>
                            </div>
                            <div className="w-full bg-white">
                                <div className='relative flex justify-between w-full text-white bg-blue-500 border border-black custom-column-line'>
                                    <span className='flex-1 py-1 text-center font-serif'>Badge Name</span>
                                    <span className='flex-1 py-1 text-center font-serif'>Solution</span>
                                </div>

                                <div className="overflow-x-hidden overflow-y-auto border border-black rounded-b-lg max-h-96 sm:max-h-svh scrollbar-hide">
                                    <div className='container'>
                                        {Object.entries(easySkillBadges).map(([badgeName, badgeLinkAndSolution]) => {
                                            return (
                                                <div className='relative flex w-full custom-column-line' key={badgeName}>

                                                    <motion.div
                                                        initial={{ scale: 0.90 }}
                                                        whileHover={{ scale: 0.98 }}
                                                        whileTap={{ scale: 0.90 }}

                                                        className='flex-1 w-1/2 px-3 py-2 my-1 text-xs text-center truncate border border-black rounded-md hover:text-blue-600 hover:cursor-pointer hover:bg-cyan-200'>

                                                        <Link className='flex items-center justify-start space-x-2 sm:text-sm' to={badgeLinkAndSolution[0]} target='_blank' rel="noreferrer" >
                                                            <TbCornerDownRight className='flex-shrink-0 react-icon-mobile sm:react-icon-sm md:react-icon-md lg:react-icon-lg xl:react-icon-xl' />
                                                            <span className='truncate '>{badgeName}</span>
                                                        </Link>
                                                    </motion.div>


                                                    <motion.div
                                                        initial={{ scale: 0.90 }}
                                                        whileHover={{ scale: 0.98 }}
                                                        whileTap={{ scale: 0.90 }}

                                                        className='flex-1 w-1/2 px-3 py-2 my-1 text-xs text-center truncate border border-black rounded-md hover:text-red-600 hover:cursor-pointer hover:bg-red-200'>

                                                        <Link className='flex items-center justify-start space-x-2 sm:text-sm' to={badgeLinkAndSolution[1]} target='_blank' rel="noreferrer" >
                                                            <FaYoutube className='flex-shrink-0 react-icon-mobile sm:react-icon-sm md:react-icon-md lg:react-icon-lg xl:react-icon-xl' />
                                                            <span className='truncate '>{badgeName}</span>
                                                        </Link>

                                                    </motion.div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>




                        <hr className='w-full my-5' />



                        {/* LENGTHY SKILL BADGES */}
                        <div className="w-full my-1 rounded-lg">
                            <div className="flex items-center justify-center">
                                <div className='flex items-center justify-center w-full px-2 space-x-2 text-lg text-center text-white bg-pink-500 rounded-t-lg sm:text-xl sm:py-2 sm:px-4'>
                                    <strong className='py-1 text-sm sm:py-0 sm:text-lg md:text-xl font-serif'>Lengthy Skill Badges</strong>
                                </div>
                            </div>
                            <div className="w-full bg-white">
                                <div className='relative flex justify-between w-full text-white bg-blue-500 border border-black custom-column-line'>
                                    <span className='flex-1 py-1 text-center font-serif'>Badge Name</span>
                                    <span className='flex-1 py-1 text-center font-serif'>Solution</span>
                                </div>

                                <div className="overflow-x-hidden overflow-y-auto border border-black rounded-b-lg max-h-96 sm:max-h-svh scrollbar-hide">
                                    <div className='container'>
                                        {Object.entries(lengthySkillBadges).map(([badgeName, badgeLinkAndSolution]) => {
                                            return (
                                                <div className='relative flex w-full custom-column-line' key={badgeName}>

                                                    <motion.div
                                                        initial={{ scale: 0.90 }}
                                                        whileHover={{ scale: 0.98 }}
                                                        whileTap={{ scale: 0.90 }}

                                                        className='flex-1 w-1/2 px-3 py-2 my-1 text-xs text-center truncate border border-black rounded-md hover:text-blue-600 hover:cursor-pointer hover:bg-cyan-200'>

                                                        <Link className='flex items-center justify-start space-x-2 sm:text-sm' to={badgeLinkAndSolution[0]} target='_blank' rel="noreferrer" >
                                                            <TbCornerDownRight className='flex-shrink-0 react-icon-mobile sm:react-icon-sm md:react-icon-md lg:react-icon-lg xl:react-icon-xl' />
                                                            <span className='truncate '>{badgeName}</span>
                                                        </Link>
                                                    </motion.div>


                                                    <motion.div
                                                        initial={{ scale: 0.90 }}
                                                        whileHover={{ scale: 0.98 }}
                                                        whileTap={{ scale: 0.90 }}

                                                        className='flex-1 w-1/2 px-3 py-2 my-1 text-xs text-center truncate border border-black rounded-md hover:text-red-600 hover:cursor-pointer hover:bg-red-200'>

                                                        <Link className='flex items-center justify-start space-x-2 sm:text-sm' to={badgeLinkAndSolution[1]} target='_blank' rel="noreferrer" >
                                                            <FaYoutube className='flex-shrink-0 react-icon-mobile sm:react-icon-sm md:react-icon-md lg:react-icon-lg xl:react-icon-xl' />
                                                            <span className='truncate '>{badgeName}</span>
                                                        </Link>

                                                    </motion.div>

                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                        </div>




                    </div>



                </div>
            </div >
        </>
    )
}

export default SkillBadges
