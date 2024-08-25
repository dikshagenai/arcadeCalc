import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from 'react';
import { FaInstagram } from "react-icons/fa";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { motion } from 'framer-motion';




const Navbar = () => {


    const timeLimit = 500
    const navbarRef = useRef(null);
    const location = useLocation();
    const [IsMenuExpanded, setIsMenuExpanded] = useState(false)

    const hideNavBar = async () => {
        setIsMenuExpanded(false)
        setTimeout(async () => {
            navbarRef.current.classList.remove('fixed')
            navbarRef.current.classList.add('hidden')
        }, timeLimit);
    }

    const showNavBar = () => {
        setIsMenuExpanded(true)
        navbarRef.current.classList.remove('hidden')
        navbarRef.current.classList.add('fixed')
    }


    const toggleHamburger = (event) => {
        event.stopPropagation()
        if (IsMenuExpanded === true) {
            // to hide the navbar
            hideNavBar();
        }

        else if (IsMenuExpanded === false) {
            // to show the navbar
            showNavBar();

        }
    };

    const updateNotificationRef = useRef(null)
    const updateNotificationRefMobile = useRef(null);
    // Extract the value from localStorage
    const lastUpdatedFromStorage = localStorage.getItem('updatePage');

    // Keeps track of the new notifications
    useEffect(() => {
        // Update Page highlight, if new updates added.
        const addNotificationSymbol = () => {
            updateNotificationRef.current.classList.remove('hidden')
            updateNotificationRef.current.classList.add('inline-flex')
            updateNotificationRefMobile.current.classList.remove('hidden')
            updateNotificationRefMobile.current.classList.add('inline-flex')
        }

        const removeNotificationSymbol = () => {
            updateNotificationRef.current.classList.remove('inline-flex')
            updateNotificationRef.current.classList.add('hidden')
            updateNotificationRefMobile.current.classList.remove('inline-flex')
            updateNotificationRefMobile.current.classList.add('hidden')
        }


        try {
            const lastUpdated = parseInt(localStorage.getItem('updatePage'))
            if (lastUpdated && lastUpdated < parseInt(process.env.REACT_APP_LAST_UPDATED)) {
                addNotificationSymbol()
            }
            else if (lastUpdated && lastUpdated === parseInt(process.env.REACT_APP_LAST_UPDATED)) {
                removeNotificationSymbol()
            }
            else {
                localStorage.setItem('updatePage', 0)
                addNotificationSymbol()
            }
        } catch (error) {
            console.error("Failed to get last modified status of Updates Page", error)
        }
    }, [lastUpdatedFromStorage]);




    useEffect(() => {
        const removeExpandedMenu = () => {
            hideNavBar();
        }

        const handleClickOutside = (event) => {
            if (IsMenuExpanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
                removeExpandedMenu()
            }
            else if (IsMenuExpanded && navbarRef.current) {
                // Below these 2 conditions check if the clicked item is span or the parentElement of span i.e Link
                if (event.target.classList.contains('nav-bar-link')) {
                    removeExpandedMenu()

                    return;
                } else {
                    if (event.target.parentElement.classList.contains('nav-bar-link')) {
                        removeExpandedMenu()

                        return;
                    }

                }
            }

        };


        document.addEventListener('click', handleClickOutside);
        window.addEventListener('resize', removeExpandedMenu);

        return () => {
            document.removeEventListener('click', handleClickOutside);
            window.removeEventListener('resize', removeExpandedMenu);
        };
    }, [IsMenuExpanded]);







    return (
        <>
            <header className='z-30 w-full mb-5 select-none font-serif fixed '>
                <nav className='flex items-center w-full py-5 bg-black sm:px-3 justify-evenly'>
                    {/* elem -1 */}
                    <div className='flex flex-1 ml-6 text-white sm:ml-3'>
                        <a href="/">
                            <img width={32} height={32} className='font-bold text-white ' src="/favicon_io/favicon-32x32.png" alt="Arcade Calc" />
                        </a>
                    </div>

                    {/* elem -2  */}
                    <div className='flex items-center justify-end flex-1'>

                        <div className='flex-1 mr-6  flex items-center justify-end sm:mr-3'>
                            <ul className='hidden sm:flex items-center justify-end space-x-0 space-y-2 text-white sm:space-y-0 sm:space-x-2'>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/" tabIndex={2}>Home</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/calculate' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/calculate" tabIndex={3}>Calculate Points</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/updates' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}>
                                    <Link to="/updates" tabIndex={4} className='flex'>
                                        Updates
                                        <span className='newNotification relative hidden rounded-full h-2 w-2 bg-sky-500' ref={updateNotificationRef} ></span>

                                    </Link>
                                </li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/contact' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/contact" tabIndex={5}>Contact Me</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/skillBadges' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/skillBadges" tabIndex={6}>Skill Badges</Link></li>
                            </ul>



                            <RxHamburgerMenu className='flex-shrink-0 text-white text-2xl sm:hidden cursor-pointer' onClick={toggleHamburger} />
                        </div>

                        {/* Toggled Navbar */}
                        <motion.div
                            initial={{ opacity: 0, right: '-10rem', top: '0' }}
                            animate={{
                                right: IsMenuExpanded ? '0' : '-10rem',
                                top: IsMenuExpanded ? '0' : '0',
                                opacity: IsMenuExpanded ? 1 : 0
                            }}
                            transition={{ duration: timeLimit / 1000 }}


                            id='mobile-navbar'
                            className={`z-30 top-4 right-4 w-full max-w-xs bg-gray-900 rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 hidden`} ref={navbarRef}>
                            <button type="button" className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 " onClick={toggleHamburger}>
                                <span className="sr-only">
                                    Close navigation
                                </span>
                                <MdOutlineClose className='flex-shrink-0 text-2xl sm:hidden cursor-pointer' onClick={toggleHamburger} />
                            </button>


                            {/* <Link to="/updates" tabIndex={4} className='flex'>
                                Updates
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>

                            </Link> */}


                            <div className="flex flex-col">
                                <Link className={`nav-bar-link w-full my-auto py-5 border-b border-gray-400 p-2 flex justify-center items-center  ${location.pathname === '/' ? 'text-blue-500' : 'text-white'} `} to="/" tabIndex={2}><span className='nav-bar-link'>Home</span></Link>
                                <Link className={`nav-bar-link w-full my-auto py-5 border-b border-gray-400 p-2 flex justify-center items-center  ${location.pathname === '/calculate' ? 'text-blue-500' : 'text-white'} `} to="/calculate" tabIndex={3}><span className='nav-bar-link'>Calculate Points</span></Link>
                                <Link className={`nav-bar-link w-full my-auto py-5 border-b border-gray-400 p-2 flex justify-center ${location.pathname === '/updates' ? 'text-blue-500' : 'text-white'} `} to="/updates" tabIndex={4}>
                                    <span className='nav-bar-link'>Updates</span>
                                    <span className='newNotification nav-bar-link relative rounded-full h-2 w-2 bg-sky-500' ref={updateNotificationRefMobile}></span></Link>
                                <Link className={`nav-bar-link w-full my-auto py-5 border-b border-gray-400 p-2 flex justify-center items-center  ${location.pathname === '/contact' ? 'text-blue-500' : 'text-white'} `} to="/contact" tabIndex={5}><span className='nav-bar-link'>Contact Me</span></Link>
                                <Link className={`nav-bar-link w-full my-auto py-5 border-b border-gray-400 p-2 flex justify-center items-center  ${location.pathname === '/skillBadges' ? 'text-blue-500' : 'text-white'} `} to="/skillBadges" tabIndex={6}><span className='nav-bar-link'>Skill Badges</span></Link>

                                <div className='flex justify-center items-center py-5 p-2 w-full my-auto'>
                                    <Link target='_blank' rel="noreferrer" className='bg-gray-300 p-2 rounded-lg mx-2 flex-1 flex justify-center items-center border-gray-400' to={"https://www.instagram.com/deepanshu_prajapati01/"}>
                                        <FaInstagram className='text-2xl' />
                                    </Link>
                                    <Link target='_blank' rel="noreferrer" className='bg-gray-300 p-2 rounded-lg mx-2 flex-1 flex justify-center items-center border-gray-400' to={"https://www.linkedin.com/in/deepanshu-prajapati01/"}>
                                        <FaLinkedin className='text-2xl' />
                                    </Link>
                                    <Link target='_blank' rel="noreferrer" className='bg-gray-300 p-2 rounded-lg mx-2 flex-1 flex justify-center items-center border-gray-400' to={"https://github.com/deepanshu-prajapati01"}>
                                        <FaGithub className='text-2xl' />
                                    </Link>
                                </div>
                            </div>

                        </motion.div>
                    </div>



                </nav>
            </header >
        </>
    )
}

export default Navbar
