import { useState } from 'react'
import apiClient from '../services/api'
import { motion } from 'framer-motion'

const EditProfileModal = ({ currentProfile, onClose, onUpdate }) => {
  const [name, setName] = useState(currentProfile.name)
  const [title, setTitle] = useState(currentProfile.title)
  const [bio, setBio] = useState(currentProfile.bio)
  const [profilePhoto, setProfilePhoto] = useState(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData()
    formData.append('name', name)
    formData.append('title', title)
    formData.append('bio', bio)
    if (profilePhoto) {
      formData.append('profilePhoto', profilePhoto)
    }

    try {
      const response = await apiClient.put('/api/profile', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      onUpdate(response.data)
    } catch (error) {
      console.error('Failed to update profile:', error)
      alert('Failed to update profile. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/40 dark:bg-black/60 backdrop-blur-md flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="bg-white dark:bg-neutral-900 p-8 rounded-3xl w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-light text-black dark:text-white">Edit Profile</h2>
          <button 
            onClick={onClose} 
            disabled={isSubmitting}
            className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors disabled:opacity-50"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label htmlFor="name" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white font-light"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="title" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">
              Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white font-light"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label htmlFor="bio" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">
              Bio
            </label>
            <textarea
              id="bio"
              rows="4"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white resize-none font-light"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">
              Profile Photo
            </label>
            <input
              type="file"
              onChange={(e) => setProfilePhoto(e.target.files[0])}
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 outline-none transition-all text-black dark:text-white font-light text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-black dark:file:bg-white file:text-white dark:file:text-black file:cursor-pointer file:text-xs file:font-light hover:file:bg-black/80 dark:hover:file:bg-white/80"
              disabled={isSubmitting}
            />
          </div>

          <div className="flex justify-end gap-3 mt-8 pt-6">
            <button
              type="button"
              onClick={onClose}
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors font-light text-sm disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="py-2.5 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all font-light text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default EditProfileModal