import React, { useState, useEffect } from 'react';
import apiClient, { getImageUrl } from '../services/api';
import { motion } from 'framer-motion';

const AddProjectModal = ({ onClose, onProjectAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [projectUrl, setProjectUrl] = useState('');
  const [imageUrl, setImageUrl] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('projectUrl', projectUrl);
    if (imageUrl) {
      formData.append('imageUrl', imageUrl);
    }

    try {
      const response = await apiClient.post('/api/projects', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onProjectAdded(response.data);
    } catch (error) {
      console.error('Failed to add project:', error);
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
        className="bg-white dark:bg-neutral-900 p-8 rounded-3xl w-full max-w-md shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-8">

          <h2 className="text-2xl font-light text-black dark:text-white">Add Project</h2>
          <button onClick={onClose} className="text-black/40 dark:text-white/40 hover:text-black dark:hover:text-white transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Title</label>
            <input 
              type="text" 
              placeholder="Project name" 
              value={title} 
              onChange={e => setTitle(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Description</label>
            <textarea 
              placeholder="Brief overview" 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 resize-none h-28 font-light" 
              required 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">URL</label>
            <input 
              type="text" 
              placeholder="https://example.com" 
              value={projectUrl} 
              onChange={e => setProjectUrl(e.target.value)} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
            />
          </div>
          
          <div>
            <label className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Image</label>
            <input 
              type="file" 
              onChange={e => setImageUrl(e.target.files[0])} 
              className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 outline-none transition-all text-black dark:text-white font-light text-sm file:mr-4 file:py-1.5 file:px-4 file:rounded-full file:border-0 file:bg-black dark:file:bg-white file:text-white dark:file:text-black file:cursor-pointer file:text-xs file:font-light hover:file:bg-black/80 dark:hover:file:bg-white/80" 
            />
          </div>
          
          <div className="flex justify-end gap-3 mt-2 pt-2">
            <button 
              type="button" 
              onClick={onClose} 
              className="py-2.5 px-6 rounded-full text-black/50 dark:text-white/50 hover:text-black dark:hover:text-white transition-colors font-light text-sm"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="py-2.5 px-6 rounded-full bg-black dark:bg-white text-white dark:text-black hover:bg-black/80 dark:hover:bg-white/80 transition-all font-light text-sm"
            >
              Add Project
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  );
};

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    apiClient.get('/api/projects')
      .then(response => {
        setProjects(response.data);
        setIsLoading(false);
      })
      .catch(error => {
        console.error("Error fetching projects:", error);
        setIsLoading(false);
      });
  }, []);

  const handleProjectAdded = (newProject) => {
    setProjects(prevProjects => [...prevProjects, newProject]);
    setIsModalOpen(false);
  };

  return (
    <section id="projects" className="py-32 px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Subtle background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/[0.02] dark:via-white/[0.02] to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto max-w-7xl relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-3xl mb-20"
        >
          <div className="inline-block px-4 py-1.5 rounded-full border border-black/10 dark:border-white/10 bg-black/5 dark:bg-white/5 mb-6">
            <span className="text-xs font-light text-black/50 dark:text-white/50 tracking-widest uppercase">Work</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-light tracking-tight text-black dark:text-white mb-6 leading-tight">
            Selected Projects
          </h2>
          <p className="text-black/50 dark:text-white/50 text-lg font-light leading-relaxed">
            A collection of work that showcases design thinking, technical execution, and creative problem-solving.
          </p>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="mb-16"
        >
          <button 
            onClick={() => setIsModalOpen(true)} 
            className="inline-flex items-center gap-2 bg-black dark:bg-white text-white dark:text-black font-light py-3 px-8 rounded-full hover:bg-black/80 dark:hover:bg-white/80 transition-all duration-300 text-sm"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
            </svg>
            New Project
          </button>
        </motion.div>

        {isModalOpen && <AddProjectModal onClose={() => setIsModalOpen(false)} onProjectAdded={handleProjectAdded} />}

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-black/10 dark:border-white/10 border-t-black dark:border-t-white rounded-full animate-spin mb-4"></div>
            <p className="text-black/40 dark:text-white/40 text-sm font-light">Loading</p>
          </div>
        ) : projects.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-32"
          >
            <div className="w-16 h-16 rounded-full bg-black/5 dark:bg-white/5 flex items-center justify-center mx-auto mb-6">
              <svg className="w-8 h-8 text-black/20 dark:text-white/20" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 00.75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 00-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0112 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 01-.673-.38m0 0A2.18 2.18 0 013 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 013.413-.387m7.5 0V5.25A2.25 2.25 0 0013.5 3h-3a2.25 2.25 0 00-2.25 2.25v.894m7.5 0a48.667 48.667 0 00-7.5 0M12 12.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-black/40 dark:text-white/40 text-sm font-light">No projects yet</p>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <motion.div
                key={project._id}
                className="group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
              >
                <a 
                  href={project.projectUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block"
                >
                  <div className="relative overflow-hidden rounded-2xl aspect-[4/3] mb-4 bg-black/5 dark:bg-white/5">
                    <img 
                      src={getImageUrl(project.imageUrl)} 
                      alt={project.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-xl font-light text-black dark:text-white tracking-tight group-hover:text-black/70 dark:group-hover:text-white/70 transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-black/40 dark:text-white/40 text-sm font-light leading-relaxed line-clamp-2">
                      {project.description}
                    </p>
                    <div className="flex items-center gap-1 text-black/50 dark:text-white/50 group-hover:text-black dark:group-hover:text-white font-light text-sm pt-2 transition-colors">
                      View project
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                      </svg>
                    </div>
                  </div>
                </a>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;