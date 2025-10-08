import React from 'react';
import { motion } from 'framer-motion';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    { name: 'GitHub', icon: 'M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z', url: '#' },
    { name: 'LinkedIn', icon: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z', url: '#' },
    { name: 'Twitter', icon: 'M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z', url: '#' },
    { name: 'Email', icon: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z', url: 'mailto:contact@example.com' }
  ];

  const quickLinks = [
    { name: 'About', href: '#profile' },
    { name: 'Projects', href: '#projects' },
    { name: 'Certificates', href: '#certificates' },
    { name: 'Contact', href: '#contact' }
  ];

  return (
    <footer className="bg-white dark:bg-black border-t border-black/5 dark:border-white/5">
      <div className="container mx-auto px-6 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-light tracking-tight text-black dark:text-white">
              Prompt Pulse
            </h3>
            <p className="text-black/50 dark:text-white/50 text-sm font-light leading-relaxed max-w-xs">
              Crafting digital experiences with precision and creativity. Building the future, one project at a time.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-xs font-light text-black/40 dark:text-white/40 tracking-widest uppercase mb-4">
              Quick Links
            </h4>
            <nav className="flex flex-col space-y-3">
              {quickLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white text-sm font-light transition-colors inline-flex items-center gap-2 group"
                >
                  <span className="w-0 group-hover:w-4 h-px bg-black dark:bg-white transition-all duration-300"></span>
                  {link.name}
                </motion.a>
              ))}
            </nav>
          </div>

          {/* Connect Section */}
          <div className="space-y-4">
            <h4 className="text-xs font-light text-black/40 dark:text-white/40 tracking-widest uppercase mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              {socialLinks.map((social, index) => (
                <motion.a
                  key={social.name}
                  href={social.url}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -2 }}
                  className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/30 dark:hover:border-white/30 flex items-center justify-center transition-all group"
                  aria-label={social.name}
                >
                  <svg 
                    className="w-4 h-4 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors" 
                    viewBox="0 0 24 24" 
                    fill="currentColor"
                  >
                    <path d={social.icon} />
                  </svg>
                </motion.a>
              ))}
            </div>
            <p className="text-black/40 dark:text-white/40 text-xs font-light mt-6">
              Available for freelance opportunities
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-black/5 dark:border-white/5 mb-8"></div>

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="space-y-1 text-center md:text-left">
            <p className="text-black/40 dark:text-white/40 text-sm font-light tracking-wide">
              © {currentYear} Prompt Pulse. All rights reserved.
            </p>
            <p className="text-black/30 dark:text-white/30 text-xs font-light">
              Designed & Built with care
            </p>
          </div>

          {/* Legal Links */}
          <div className="flex gap-6">
            <a href="#" className="text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 text-xs font-light transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-black/30 dark:text-white/30 hover:text-black/60 dark:hover:text-white/60 text-xs font-light transition-colors">
              Terms of Use
            </a>
          </div>
        </div>

        {/* Decorative Elements */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-1 mt-8"
        >
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;