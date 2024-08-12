import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>

            <header className='bg-blue-500 p-2 sm:p-3 text-white flex justify-center w-screen'>
                <span className='font-bold text-xl md:text-2xl lg:text-3xl'><Link to="/">Arcade Calc</Link></span></header>
            <nav className='bg-black p-2 sm:p-3 text-white flex justify-center mb-5'>
                <ul className='flex w-auto space-x-6 sm:text-sm md:text-xl md:space-x-24 lg:space-x-36'>
                    <li className='text-wrap text-center cursor-pointer hover:underline hover:underline-offset-4'><Link to="/calculate">Calculate Points</Link></li>
                    <li className='text-wrap text-center cursor-pointer hover:underline hover:underline-offset-4'><Link to="/updates">Updates</Link></li>
                    <li className='text-wrap text-center cursor-pointer hover:underline hover:underline-offset-4'><Link to="/contact">Contact Me</Link></li>
                </ul>
            </nav >

        </>
    )
}

export default Navbar
