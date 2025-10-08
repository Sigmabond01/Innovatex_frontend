import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const ContactForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ name, email, message });
    
    setSubmitted(true);
    setTimeout(() => {
        setName('');
        setEmail('');
        setMessage('');
        setSubmitted(false);
    }, 3000);
  };

  return (
    <section id="contact" className="py-32 px-6 bg-white dark:bg-black relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-black/5 dark:bg-white/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto max-w-xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 mb-6">
            <svg className="w-4 h-4 text-black/40 dark:text-white/40" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <span className="text-xs font-light text-black/50 dark:text-white/50 tracking-wide">LET'S CONNECT</span>
          </div>

          <h2 className="text-4xl md:text-5xl font-light tracking-tight text-black dark:text-white mb-4">
            Get in Touch
          </h2>
          <p className="text-black/40 dark:text-white/40 text-base font-light">Let's start a conversation and bring your ideas to life</p>
        </motion.div>
        
        <AnimatePresence mode="wait">
          {submitted ? (
            <motion.div
              key="success"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 rounded-3xl p-12 text-center"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                className="w-16 h-16 bg-black dark:bg-white rounded-full flex items-center justify-center mx-auto mb-6"
              >
                <svg className="w-8 h-8 text-white dark:text-black" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
              <h3 className="text-xl font-light text-black dark:text-white mb-2">Message Sent Successfully!</h3>
              <p className="text-black/50 dark:text-white/50 text-sm font-light mb-4">Thank you for reaching out. I'll get back to you soon.</p>
              <div className="flex justify-center gap-1">
                <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div>
                <div className="w-1.5 h-1.5 rounded-full bg-black/20 dark:bg-white/20"></div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="space-y-6"
            >
              <div>
                <label htmlFor="name" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Full Name</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-black/30 dark:text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0zM4.501 20.118a7.5 7.5 0 0114.998 0A17.933 17.933 0 0112 21.75c-2.676 0-5.216-.584-7.499-1.632z" />
                    </svg>
                  </div>
                  <input 
                    type="text" 
                    id="name" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)} 
                    className="w-full p-3 pl-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
                    placeholder="John Doe"
                    required 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="email" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Email Address</label>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                    <svg className="w-4 h-4 text-black/30 dark:text-white/30" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input 
                    type="email" 
                    id="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    className="w-full p-3 pl-10 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 font-light" 
                    placeholder="john@example.com"
                    required 
                  />
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-xs font-light text-black/50 dark:text-white/50 mb-2 tracking-wide">Your Message</label>
                <textarea 
                  id="message" 
                  rows="6" 
                  value={message} 
                  onChange={(e) => setMessage(e.target.value)} 
                  className="w-full p-3 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 focus:border-black/30 dark:focus:border-white/30 focus:bg-white dark:focus:bg-black outline-none transition-all text-black dark:text-white placeholder-black/30 dark:placeholder-white/30 resize-none font-light" 
                  placeholder="Tell me about your project or inquiry..."
                  required 
                />
                <div className="flex justify-between items-center mt-2">
                  <p className="text-xs font-light text-black/30 dark:text-white/30">{message.length} characters</p>
                  <p className="text-xs font-light text-black/30 dark:text-white/30">Press Enter to send</p>
                </div>
              </div>

              <div className="pt-4">
                <motion.button 
                  type="button"
                  onClick={handleSubmit}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-black dark:bg-white text-white dark:text-black font-light py-3 rounded-full transition-all duration-300 hover:bg-black/80 dark:hover:bg-white/80 text-sm shadow-lg shadow-black/10 dark:shadow-white/10 inline-flex items-center justify-center gap-2"
                >
                  <span>Send Message</span>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Contact Info Cards */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-12"
        >
          <a href="mailto:hello@example.com" className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all text-center group">
            <svg className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
            </svg>
            <p className="text-xs font-light text-black/50 dark:text-white/50 mb-1">Email</p>
            <p className="text-xs font-light text-black dark:text-white">smdnoor4966@gmail.com</p>
          </a>

          <a href="tel:+15551234567" className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 hover:border-black/20 dark:hover:border-white/20 transition-all text-center group">
            <svg className="w-5 h-5 text-black/40 dark:text-white/40 group-hover:text-black dark:group-hover:text-white transition-colors mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
            </svg>
            <p className="text-xs font-light text-black/50 dark:text-white/50 mb-1">Phone</p>
            <p className="text-xs font-light text-black dark:text-white">+91 99631 94687</p>
          </a>

          <div className="p-4 rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-center">
            <svg className="w-5 h-5 text-black/40 dark:text-white/40 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
            </svg>
            <p className="text-xs font-light text-black/50 dark:text-white/50 mb-1">Location</p>
            <p className="text-xs font-light text-black dark:text-white">Kadapa, Andhra Pradesh</p>
          </div>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-1 mt-12"
        >
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
          <div className="w-1 h-1 rounded-full bg-black/20 dark:bg-white/20"></div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactForm;