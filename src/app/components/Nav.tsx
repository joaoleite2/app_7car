import React from 'react';
import logo from '../pages/imgs/logowhite.svg';
import { Search } from './Search';
import { HamburgerMenu } from './HamburgerMenu';
import { Link } from 'react-router-dom';

interface NavProps {
  onSearch?: (query: string) => void;  // tornando onSearch opcional
}

export const Nav: React.FC<NavProps> = ({ onSearch }) => {
  return (
    <>
      <nav className="bg-red-800 border-gray-200">
        <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
          <Link to="/">
            <img src={logo} className="sm:h-10 h-8" alt="7Car Logo" />
          </Link>
          <div className="flex space-x-10">
            {onSearch && <Search onSearch={onSearch} />} {/* Renderizar Search apenas se onSearch estiver definido */}
            <HamburgerMenu />
          </div>
        </div>
      </nav>
    </>
  );
};
  