import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import BackgroundElements from './components/BackgroundElements';
import { Language } from './types';
import { CONTENT, PROJECTS_DATA } from './constants';

function App() {
  const [lang, setLang] = useState<Language>(Language.EN);

  const toggleLang = () => {
    setLang(prev => prev === Language.EN ? Language.RU : Language.EN);
  };

  const currentContent = CONTENT[lang];
  const currentProjects = PROJECTS_DATA[lang];

  return (
    <HashRouter>
      <div className="flex flex-col min-h-screen bg-nova-bg text-gray-100 font-sans selection:bg-nova-primary selection:text-white relative">
        <BackgroundElements />
        
        <Navbar 
          content={currentContent.nav} 
          currentLang={lang} 
          onToggleLang={toggleLang} 
        />
        
        <main className="flex-grow relative z-10">
          <Routes>
            <Route path="/" element={<Home content={currentContent} featuredProjects={currentProjects} />} />
            <Route path="/projects" element={<Projects content={currentContent} projects={currentProjects} />} />
          </Routes>
        </main>

        <Footer content={currentContent.footer} />
      </div>
    </HashRouter>
  );
}

export default App;