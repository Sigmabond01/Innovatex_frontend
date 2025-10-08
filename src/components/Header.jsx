import React from 'react';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <nav className="fixed top-0 w-full bg-white/70 dark:bg-black/70 backdrop-blur-xl z-50 border-b border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 py-5 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-8 h-8 rounded-lg bg-black dark:bg-white flex items-center justify-center group-hover:scale-105 transition-transform">
            <span className="text-white dark:text-black text-xs font-medium">P</span>
          </div>
          <div className="text-xl font-light tracking-tight text-black dark:text-white">
            Portfolio
          </div>
        </div>
        
        {/* Navigation */}
        <div className="flex items-center gap-8">
          <a href="#profile" className="text-sm font-light text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors relative group">
            Home
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-black dark:bg-white transition-all duration-300"></span>
          </a>
          <a href="#projects" className="text-sm font-light text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors relative group">
            Projects
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-black dark:bg-white transition-all duration-300"></span>
          </a>
          <a href="#certificates" className="text-sm font-light text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors relative group">
            Certificates
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-black dark:bg-white transition-all duration-300"></span>
          </a>
          <a href="#contact" className="text-sm font-light text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white transition-colors relative group">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-black dark:bg-white transition-all duration-300"></span>
          </a>
          
          {/* Divider */}
          <div className="w-px h-4 bg-black/10 dark:bg-white/30"></div>
          
          {/* Theme Toggle */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full bg-gray-700 dark:bg-gray-700 hover:bg-gray-600 dark:hover:bg-white/30 transition-all border border-black/10 dark:border-white/30 hover:scale-110 active:scale-95"
            aria-label="Toggle theme"
          >
            {isDarkMode ? (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
              </svg>
            ) : (
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Header;