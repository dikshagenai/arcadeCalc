import React from 'react'
import { Link } from 'react-router-dom'
const Navbar = () => {
    return (
        <>

            <nav className='bg-blue-500 p-3 text-white flex justify-between mb-5'>
                <span className='text-2xl font-bold'>Arcade Helper</span>
                <ul className='flex text-xl mt-1'>
                    <li className='mr-9 cursor-pointer hover:underline'><Link to="/">Home</Link></li>
                    <li className='mr-9 cursor-pointer hover:underline'><Link to="/calculate">Calculate Points</Link></li>
                    <li className='mr-9 cursor-pointer hover:underline'><Link to="/contact">Contact Me</Link></li>
                    <li></li>
                </ul>
            </nav>

        </>
    )
}

export default Navbar
