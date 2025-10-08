import React, { useState, useEffect } from 'react';
import apiClient, { getImageUrl } from '../services/api';
import EditProfileModal from './EditProfileModal';
import { motion } from 'framer-motion';

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProfileUpdate = (updatedProfile) => {
    setProfile(updatedProfile);
    setIsModalOpen(false);
  };

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await apiClient.get('/api/profile');
        setProfile(response.data);
      } catch (err) {
        setError('Failed to load profile data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  if (loading) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-white dark:bg-black">
        
        <div className="flex flex-col items-center gap-3">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
      </div>
          <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin"></div>
          <p className="text-sm text-black/40 dark:text-white/40 tracking-wide">Loading</p>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="flex items-center justify-center min-h-screen bg-white dark:bg-black px-4">
        <div className="border border-black/10 dark:border-white/10 rounded-2xl p-6 max-w-md">
          <p className="text-sm text-black/60 dark:text-white/60">{error}</p>
        </div>
      </section>
    );
  }

  if (!profile) return null;

  return (
    <section className="relative min-h-screen flex items-center justify-center bg-white dark:bg-black overflow-hidden">
      {/* Subtle background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/[0.02] dark:bg-white/[0.02] rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-[500px] h-[500px] bg-black/[0.015] dark:bg-white/[0.015] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 py-20">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-16 lg:gap-24">
          {/* Profile Photo Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative flex-shrink-0"
          >
            {profile.profilePhoto && (
              <div className="relative">
                {/* Decorative ring */}
                <div className="absolute -inset-4 border border-black/5 dark:border-white/5 rounded-full"></div>
                
                <img
                  src={getImageUrl(profile.profilePhoto)}
                  alt={profile.name}
                  className="relative w-56 h-56 md:w-64 md:h-64 lg:w-72 lg:h-72 rounded-full object-cover border-2 border-black/10 dark:border-white/10"
                />
                
                {/* Floating accent */}
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5, duration: 0.6 }}
                  className="absolute -bottom-2 -right-2 w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center"
                >
                  <svg className="w-7 h-7 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
                  </svg>
                </motion.div>
              </div>
            )}
          </motion.div>

          {/* Profile Info Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="flex-1 text-center lg:text-left space-y-8 max-w-2xl"
          >
            {/* Name */}
            <div className="space-y-3">
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.6 }}
                className="inline-block px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5"
              >
                <span className="text-xs font-light text-black/50 dark:text-white/50 tracking-widest uppercase">Portfolio</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-light tracking-tight text-black dark:text-white leading-tight">
                {profile.name}
              </h1>
            </div>

            {/* Title */}
            <h2 className="text-xl md:text-2xl font-light text-black/60 dark:text-white/60 tracking-wide leading-relaxed">
              {profile.title}
            </h2>

            {/* Divider */}
            <div className="w-16 h-px bg-black/20 dark:bg-white/20 mx-auto lg:mx-0"></div>

            {/* Bio */}
            <p className="text-base md:text-lg text-black/50 dark:text-white/50 leading-relaxed font-light max-w-xl">
              {profile.bio}
            </p>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
              <motion.button
                onClick={() => setIsModalOpen(true)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-light text-sm py-3.5 px-8 rounded-full transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
                Edit Profile
              </motion.button>

              <motion.a
                href="#projects"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="inline-flex items-center gap-2 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white font-light text-sm py-3.5 px-8 rounded-full border border-black/10 dark:border-white/10 transition-all duration-300"
              >
                View Work
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 13.5l-7.5 7.5-7.5-7.5m15-6l-7.5 7.5-7.5-7.5" />
                </svg>
              </motion.a>
            </div>

            {/* Stats or badges */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex items-center justify-center lg:justify-start gap-8 pt-6"
            >
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-xs font-light text-black/40 dark:text-white/40">Available for work</span>
              </div>
              <div className="w-px h-4 bg-black/10 dark:bg-white/10"></div>
              <span className="text-xs font-light text-black/40 dark:text-white/40">Based worldwide</span>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-xs font-light text-black/30 dark:text-white/30 tracking-widest uppercase">Scroll</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-px h-12 bg-gradient-to-b from-transparent via-black/20 dark:via-white/20 to-transparent"
          ></motion.div>
        </motion.div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <EditProfileModal
          currentProfile={profile}
          onClose={() => setIsModalOpen(false)}
          onUpdate={handleProfileUpdate}
        />
      )}
    </section>
  );
};

export default Profile;