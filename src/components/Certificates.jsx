import React, { useState, useEffect } from 'react';
import apiClient, { getImageUrl } from '../services/api';
import { motion } from 'framer-motion';

const AddCertificateModal = ({ onClose, onCertificateAdded }) => {
  const [title, setTitle] = useState('');
  const [issuer, setIssuer] = useState('');
  const [credentialUrl, setCredentialUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('issuer', issuer);
    formData.append('credentialUrl', credentialUrl);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }
    try {
      const response = await apiClient.post('/api/certificates', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onCertificateAdded(response.data);
    } catch (error) {
      console.error('Failed to add certificate:', error);
    }
  };
  
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
        className="bg-white dark:bg-neutral-900 p-8 rounded-3xl w-full max-w-md shadow-2xl border border-black/5 dark:border-white/5"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center">
              <svg className="w-5 h-5 text-black dark:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>
            </div>
            <h2 className="text-2xl font-light text-black dark:text-white">Add Certificate</h2>
          </div>
          <button onClick={onClose} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors p-2 hover:bg-black/5 dark:hover:bg-white/5 rounded-full">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <p className="text-black/40 dark:text-white/40 text-sm font-light mb-8">Add a new professional credential to your portfolio</p>
        
        <div className="space-y-5">
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Title</label>
            <input 
              type="text" 
              placeholder="Certificate name" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Issuer</label>
            <input 
              type="text" 
              placeholder="Organization" 
              value={issuer} 
              onChange={e => setIssuer(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Credential URL</label>
            <input 
              type="text" 
              placeholder="https://credential.com" 
              value={credentialUrl} 
              onChange={e => setCredentialUrl(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Image (Optional)</label>
            <input 
              type="file" 
              onChange={e => setImageUrl(e.target.files[0])} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 outline-none transition-all text-black dark:text-white font-light text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-black dark:file:bg-white file:text-white dark:file:text-black file:cursor-pointer file:text-xs file:font-light hover:file:bg-black/80 dark:hover:file:bg-white/80" 
              accept="image/*"
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-8 pt-6 border-t border-black/5 dark:border-white/5">
            <button 
              type="button" 
              onClick={onClose} 
              className="py-2.5 px-6 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5 transition-all font-light text-sm"
            >
              Cancel
            </button>
            <button 
              type="button"
              onClick={handleSubmit}
              className="py-2.5 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all font-light text-sm shadow-lg shadow-black/10 dark:shadow-white/10"
            >
              Add Certificate
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Certificates = () => {
  const [certificates, setCertificates] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    apiClient.get('/api/certificates')
      .then(response => {
        setCertificates(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching certificates:", error);
        setIsLoading(false);
      });
  }, []);

  const handleCertificateAdded = (newCertificate) => {
    setCertificates(prev => [newCertificate, ...prev]);
    setIsModalOpen(false);
  };

  return (
    <section id="certificates" className="py-2 px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6">
            <svg className="w-4 h-4 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
            </svg>
            <span className="text-xs font-light text-black/50 dark:text-white/50 tracking-wide">ACHIEVEMENTS</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black dark:text-white mb-4">
            Certificates & Credentials
          </h2>
          <p className="text-black/40 dark:text-white/40 text-base font-light max-w-xl mx-auto">
            Professional certifications and achievements that validate expertise and continuous learning
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16"
        >
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="bg-black dark:bg-white text-white dark:text-black font-light py-3 px-8 rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 text-sm inline-flex items-center gap-2 shadow-lg shadow-black/10 dark:shadow-white/10"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            Add Certificate
          </button>
          
          <div className="flex items-center gap-2 text-black/40 dark:text-white/40 text-sm font-light">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span>{certificates.length} Verified Credential{certificates.length !== 1 ? 's' : ''}</span>
          </div>
        </motion.div>

        {isModalOpen && <AddCertificateModal onClose={() => setIsModalOpen(false)} onCertificateAdded={handleCertificateAdded} />}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="w-12 h-12 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-black/40 dark:text-white/40 text-sm font-light">Loading certificates</p>
          </div>
        ) : certificates.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <div className="w-20 h-20 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-black/20 dark:text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <h3 className="text-xl font-light text-black dark:text-white mb-2">No certificates yet</h3>
            <p className="text-black/40 dark:text-white/40 text-sm font-light">Start adding your professional credentials</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certificates.map((cert, index) => (
              <motion.div 
                key={cert._id} 
                className="bg-white dark:bg-neutral-900 p-6 rounded-2xl border border-black/5 dark:border-white/5 hover:border-black/10 dark:hover:border-white/10 transition-all duration-300 group hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-white/5"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05, ease: [0.16, 1, 0.3, 1] }}
                whileHover={{ y: -4 }}
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-black dark:bg-white flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                    <svg className="w-5 h-5 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-light text-black dark:text-white mb-1 line-clamp-2 tracking-tight group-hover:text-black/80 dark:group-hover:text-white/80 transition-colors">
                      {cert.title}
                    </h3>
                    <p className="text-black/50 dark:text-white/50 text-sm font-light">{cert.issuer}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between mt-4 pt-4 border-t border-black/5 dark:border-white/5">
                  <a 
                    href={cert.credentialUrl} 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="inline-flex items-center gap-1 text-black/60 dark:text-white/60 hover:text-black dark:hover:text-white font-light text-sm transition-colors group/link"
                  >
                    View Credential
                    <svg className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
                    </svg>
                  </a>
                  
                  <div className="w-6 h-6 rounded-full bg-green-500/10 dark:bg-green-400/10 flex items-center justify-center">
                    <div className="w-2 h-2 rounded-full bg-green-500 dark:bg-green-400"></div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}

        {/* Bottom Decorative */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="flex justify-center gap-1 mt-16"
        >
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default Certificates;