import React from 'react';

// Import all the main components you build
import Header from './components/Header'; // Assuming you create a Header component
import Profile from './components/Profile';
import Projects from './components/Projects'; // You'll build this similar to Profile
import ContactForm from './components/ContactForm'; // And this one too
import Footer from './components/Footer'; // And a Footer
import Certificates from './components/Certificates';

function App() {
  return (
    // This is the main container for the whole app.
    // We use Tailwind CSS classes to set a dark background and white text globally.
    <div className="bg-gray-900 text-white min-h-screen font-sans">
      
      {/* 1. Header with navigation or your name */}
      <Header />

      {/* 2. The main content of your page */}
      <main>
        <Profile />
        <Projects />
        <Certificates />
        <ContactForm />
      </main>

      {/* 3. Footer with social links or copyright */}
      <Footer />

    </div>
  );
}

export default App;