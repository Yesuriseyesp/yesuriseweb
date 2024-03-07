// App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './components/Home';
import About from './components/About';
// import Contact from './components/contact';
import ContactForm from './components/contactform';
import Navbar from './components/Navbar';
import Service from './components/services';
// import Footer from './components/Footer';
import Admin from './components/Admin'
import Career from './components/career'
import BlogCreator from './components/blog';
import BlogsPage from './components/blogview';
import CookieConsentBanner from './components/Cookie';

function App() {
  return (
    <Router>
      <div>
        <Navbar />
        <CookieConsentBanner />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<ContactWithForm />} />
          <Route path="/contact" element={<ContactWithForm />} />
          <Route path="/services" element={<Service />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/careers" element={<Career />} />
          <Route path="/create-blog" element={<BlogCreator />} />
          <Route path="/blogs" element={<BlogsPage />} />

         
        </Routes>
        {/* <Footer />  */}
      </div>
    </Router>
  );
}

function ContactWithForm() {
  return (
    <div>
      {/* <Contact /> */}
      <ContactForm />
      

    </div>
  );
}

export default App;
