import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion';


const Navbar = () => {

    // location.pathname will have the endpoint.
    const location = useLocation();

    return (
        <>

            <header className='bg-blue-500 p-2 sm:p-3 text-white flex justify-center '>
                <motion.span
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className='font-bold text-xl md:text-2xl lg:text-3xl' tabIndex={-1}>
                    <Link className='sm:press-start-2p-regular font-serif' to="/" tabIndex={1}>
                        Arcade Calc
                    </Link>
                </motion.span>
            </header>
            <nav className='bg-black p-2 sm:p-3 text-white flex justify-center mb-5'>
                <ul className='flex w-auto space-x-6 sm:text-sm md:text-xl md:space-x-24 lg:space-x-36'>
                    <motion.li
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-wrap text-center cursor-pointer ${location.pathname === '/calculate' && 'text-yellow-500 font-bold'} hover:text-yellow-500  `} tabIndex={-1}><Link to="/calculate" tabIndex={2}>Calculate Points</Link></motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-wrap text-center cursor-pointer ${location.pathname === '/updates' && 'text-yellow-500 font-bold'} hover:text-yellow-500  `} tabIndex={-1}><Link to="/updates" tabIndex={3}>Updates</Link></motion.li>
                    <motion.li
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className={`text-wrap text-center cursor-pointer ${location.pathname === '/contact' && 'text-yellow-500 font-bold'} hover:text-yellow-500  `} tabIndex={-1}><Link to="/contact" tabIndex={4}>Contact Me</Link></motion.li>
                </ul>
            </nav >

        </>
    )
}

export default Navbar
