import { useState } from 'react'
import logo from '../pages/imgs/logowhite.svg'
import { Search } from './Search';
import { HamburgerMenu } from './HamburgerMenu';
import { Link } from 'react-router-dom';

export const Nav = ()=>{
  const [search, setSearch] = useState('');
  
  return(
    <>
      <nav className="bg-red-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/"><img src={logo} className="sm:h-10 h-8" alt="7Car Logo" /></Link>
          <div className="flex space-x-10">
            <Search />
            <HamburgerMenu />
          </div>
        </div>
      </nav>
    </>
  )
}