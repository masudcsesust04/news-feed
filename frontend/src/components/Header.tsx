import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { token, logout } = useAuth();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-gray-800 text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <h1 className="text-xl sm:text-2xl font-bold text-red-500">News Feed</h1>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-1">
            {token ? (
              <>
                <Link
                  to="/articles"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Articles
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Profile
                </Link>
                <button
                  onClick={logout}
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="text-gray-300 hover:text-white hover:bg-gray-700 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200"
                >
                  Register
                </Link>
              </>
            )}
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-gray-300 hover:text-white hover:bg-gray-700 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white transition-colors duration-200"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-700 shadow-lg">
          {token ? (
            <>
              <Link
                to="/articles"
                onClick={() => {
                  closeMenu();
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Articles
              </Link>
              <Link
                to={"/profile"}
                onClick={() => {
                  closeMenu();
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  logout();
                  closeMenu();
                }}
                className="text-gray-300 hover:text-white hover:bg-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                onClick={closeMenu}
                className="text-gray-300 hover:text-white hover:bg-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Login
              </Link>
              <Link
                to="/register"
                onClick={closeMenu}
                className="text-gray-300 hover:text-white hover:bg-gray-600 block w-full text-left px-3 py-2 rounded-md text-base font-medium transition-colors duration-200"
              >
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
