import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Header: React.FC = () => {
  const { token, logout } = useAuth();

  return (
    <header className="bg-gray-800 text-white p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-red-500">NewsFeed</h1>
      <nav className="flex space-x-4">
        {token ? (
          <>
            <Link to="/articles" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">Articles</Link>
            <Link to="/profile" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">Profile</Link>
            <button onClick={logout} className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">Login</Link>
            <Link to="/register" className="text-gray-300 hover:text-white px-3 py-2 rounded-md font-medium">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
