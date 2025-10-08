import React, { useState } from 'react';
import apiClient from '../services/api';
import { motion } from 'framer-motion';

const Modal = ({ currentProfile, onClose, onUpdate }) => {
  const [name, setName] = useState(currentProfile.name);
  const [title, setTitle] = useState(currentProfile.title);
  const [bio, setBio] = useState(currentProfile.bio);
  const [profilePhoto, setProfilePhoto] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('title', title);
    formData.append('bio', bio);
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto);
    }

    try {
      const response = await apiClient.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onUpdate(response.data);
    } catch (error) {
      console.error('Failed to update profile:', error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.9, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", duration: 0.5 }}
        className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-2xl w-full max-w-lg shadow-2xl border border-gray-700"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-teal-500 to-cyan-500 flex items-center justify-center">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-teal-400 to-cyan-400 bg-clip-text text-transparent">
              Edit Profile
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white transition-colors hover:rotate-90 duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Name Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Full Name
            </label>
            <input 
              type="text" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-white placeholder-gray-500"
              placeholder="Enter your name"
            />
          </div>

          {/* Title Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Professional Title
            </label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-white placeholder-gray-500"
              placeholder="e.g. Full Stack Developer"
            />
          </div>

          {/* Bio Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              Bio
            </label>
            <textarea 
              value={bio} 
              onChange={(e) => setBio(e.target.value)} 
              className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-white placeholder-gray-500 resize-none h-32"
              placeholder="Tell us about yourself..."
            />
          </div>

          {/* File Input */}
          <div>
            <label className="flex items-center gap-2 text-sm font-medium text-gray-300 mb-2">
              <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Profile Photo
            </label>
            <div className="relative">
              <input 
                type="file" 
                onChange={(e) => setProfilePhoto(e.target.files[0])} 
                className="w-full p-3 rounded-lg bg-gray-700/50 border border-gray-600 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 outline-none transition-all text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-teal-500 file:text-white file:cursor-pointer hover:file:bg-teal-600 file:transition-colors"
                accept="image/*"
              />
            </div>
            {profilePhoto && (
              <motion.p 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-2 text-sm text-teal-400 flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {profilePhoto.name}
              </motion.p>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-gray-700">
            <button 
              type="button" 
              onClick={onClose} 
              className="py-2.5 px-6 rounded-lg bg-gray-700 hover:bg-gray-600 transition-all font-medium text-white hover:scale-105"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="py-2.5 px-6 rounded-lg bg-gradient-to-r from-teal-500 to-cyan-500 hover:from-teal-600 hover:to-cyan-600 transition-all font-medium text-white shadow-lg shadow-teal-500/30 hover:shadow-xl hover:shadow-teal-500/50 hover:scale-105"
            >
              Save Changes
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default Modal;