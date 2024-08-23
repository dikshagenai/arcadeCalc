import React, { useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { RxHamburgerMenu } from "react-icons/rx";
import { MdOutlineClose } from "react-icons/md";
import { useEffect } from 'react';


const Navbar = () => {
    const navbarRef = useRef(null);
    const location = useLocation();
    const [IsMenuExpanded, setIsMenuExpanded] = useState(false)

    const toggleHamburger = (event) => {
        event.stopPropagation()
        setIsMenuExpanded(prevState => !prevState);
    };

    const removeExpandedMenu = () => {
        setIsMenuExpanded(false)
    }





    useEffect(() => {
        const handleClickOutside = (event) => {
            if (IsMenuExpanded && navbarRef.current && !navbarRef.current.contains(event.target)) {
                setIsMenuExpanded(false);
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
            <header className='w-full mb-5 select-none'>
                <nav className='flex items-center w-full py-5 bg-black sm:px-3 justify-evenly'>
                    {/* elem -1 */}
                    <div className='flex flex-1 ml-6 text-white sm:ml-3'>
                        <Link to="/">
                            <img width={32} height={32} className='font-bold text-white ' src="/favicon_io/favicon-32x32.png" alt="Arcade Calc" />
                        </Link>
                    </div>

                    {/* elem -2  */}
                    <div className='flex items-center justify-end flex-1'>

                        <div className='flex-1 mr-6  flex items-center justify-end sm:mr-3'>
                            <ul className='hidden sm:flex items-center justify-end space-x-0 space-y-2 text-white sm:space-y-0 sm:space-x-2'>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/" tabIndex={2}>Home</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/calculate' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/calculate" tabIndex={3}>Calculate Points</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/updates' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/updates" tabIndex={4}>Updates</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/contact' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/contact" tabIndex={5}>Contact Me</Link></li>
                                <li className={` sm:px-3 text-nowrap text-center cursor-pointer ${location.pathname === '/skillBadges' && 'text-blue-500 font-bold'} hover:text-blue-300  `} tabIndex={-1}><Link to="/skillBadges" tabIndex={6}>Skill Badges</Link></li>
                            </ul>



                            <RxHamburgerMenu className='flex-shrink-0 text-white text-2xl sm:hidden cursor-pointer' onClick={toggleHamburger} />
                        </div>

                        {/* Toggled Navbar */}
                        <div className={`z-30 top-4 right-4 w-full max-w-xs bg-white rounded-lg shadow-lg p-6 text-base font-semibold text-slate-900 ${IsMenuExpanded ? 'fixed' : 'hidden'}`} ref={navbarRef}>
                            <button type="button" className="absolute top-5 right-5 w-8 h-8 flex items-center justify-center text-slate-500 hover:text-slate-600 " onClick={toggleHamburger}>
                                <span className="sr-only">
                                    Close navigation
                                </span>
                                <MdOutlineClose className='flex-shrink-0 text-2xl sm:hidden cursor-pointer' onClick={toggleHamburger} />
                            </button>

                            <div className="space-y-7 flex flex-col">
                                <Link className={`w-full p-2 flex justify-center items-center  ${location.pathname === '/' ? 'text-blue-500' : 'text-black'} `} to="/" tabIndex={2}><span>Home</span></Link>
                                <Link className={`w-full p-2 flex justify-center items-center  ${location.pathname === '/calculate' ? 'text-blue-500' : 'text-black'} `} to="/calculate" tabIndex={3}><span>Calculate Points</span></Link>
                                <Link className={`w-full p-2 flex justify-center items-center  ${location.pathname === '/updates' ? 'text-blue-500' : 'text-black'} `} to="/updates" tabIndex={4}><span>Updates</span></Link>
                                <Link className={`w-full p-2 flex justify-center items-center  ${location.pathname === '/contact' ? 'text-blue-500' : 'text-black'} `} to="/contact" tabIndex={5}><span>Contact Me</span></Link>
                                <Link className={`w-full p-2 flex justify-center items-center  ${location.pathname === '/skillBadges' ? 'text-blue-500' : 'text-black'} `} to="/skillBadges" tabIndex={6}><span>Skill Badges</span></Link>
                            </div>

                        </div>
                    </div>



                </nav>
            </header >
        </>
    )
}

export default Navbar
