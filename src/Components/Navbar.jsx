// components/Navbar.jsx
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUserShield, FaBars, FaTimes } from 'react-icons/fa';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Organization Name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 via-blue-600 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-xl">M</span>
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full border-2 border-white"></div>
              </div>
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-800 leading-tight">
                  Midowga Dhalinyarada
                </span>
                <span className="text-sm font-semibold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                  CALAS
                </span>
              </div>
            </Link>
          </div>

          {/* Desktop Admin Button */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              onClick={() => navigate('/admin')}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg flex items-center space-x-2"
            >
              <FaUserShield className="text-lg" />
              <span>Admin Panel</span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-700 hover:text-emerald-600 focus:outline-none"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <button
              onClick={() => {
                navigate('/admin');
                setIsOpen(false);
              }}
              className="w-full px-6 py-3 bg-gradient-to-r from-emerald-600 to-blue-600 text-white rounded-lg hover:from-emerald-700 hover:to-blue-700 transition-all duration-300 flex items-center justify-center space-x-2"
            >
              <FaUserShield className="text-lg" />
              <span>Admin Panel</span>
            </button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;