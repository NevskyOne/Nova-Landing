import React from 'react';
import { Content, Project } from '../types';
import Hero from '../components/Hero';
import About from '../components/About';
import Contact from '../components/Contact';
import ProjectCard from '../components/ProjectCard';
import FadeIn from '../components/FadeIn';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface HomeProps {
  content: Content;
  featuredProjects: Project[];
}

const Home: React.FC<HomeProps> = ({ content, featuredProjects }) => {
  return (
    <div className="overflow-x-hidden">
      <Hero content={content.hero} />
      
      {/* Featured Section - Just Warmtail */}
      <section className="py-20 relative">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn direction="up">
             <div className="flex justify-between items-end mb-10 px-2">
                <h2 className="text-3xl font-display font-bold text-white">{content.projects.latestRelease}</h2>
                <Link to="/projects" className="flex items-center space-x-2 text-nova-primary hover:text-white transition-colors text-sm font-medium">
                  <span>{content.projects.viewAll}</span>
                  <ArrowRight size={16} />
                </Link>
             </div>
          </FadeIn>

          {featuredProjects.map((project) => (
             <FadeIn key={project.id} direction="up">
                <ProjectCard project={project} />
             </FadeIn>
          ))}
        </div>
      </section>
      
      <About content={content.about} />

      <Contact content={content.contact} />
    </div>
  );
};

export default Home;