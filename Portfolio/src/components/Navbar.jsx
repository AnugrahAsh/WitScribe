import React from 'react'
import { NavLink } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='flex items-center justify-between m-4 bg-transparent'>
        <NavLink to='/' className="w-20 h-10 rounded-lg bg-white items-center justify-center flex font-bold shadow-md">
            <p className='text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-blue-600 '>Anugrah</p>
        </NavLink>
        <nav className='flex text-lg gap-7 font-medium'>
            <NavLink to="/about" className={({isActive}) => isActive? 'text-blue-500' : 'text-slate-500'}>
                About
            </NavLink>
            <NavLink to="/projects" className={({isActive}) => isActive? 'text-blue-500' : 'text-slate-500'}>
                Projects
            </NavLink>
            <NavLink to="/contact" className={({isActive}) => isActive? 'text-blue-500' : 'text-slate-500'}>
                Contact
            </NavLink>
        </nav>
    </header>
  )
}

export default Navbar
