import React, { useState } from 'react';
import { HashRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar.tsx';
import Footer from './components/Footer.tsx';
import Home from './pages/Home.tsx';
import Projects from './pages/Projects.tsx';
import BackgroundElements from './components/BackgroundElements.tsx';
import { Language } from './types.ts';
import { CONTENT, PROJECTS_DATA } from './constants.ts';

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