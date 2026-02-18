import React, { useEffect } from 'react';
import { Content, Project } from '../types.ts';
import ProjectCard from '../components/ProjectCard.tsx';
import Contact from '../components/Contact.tsx';
import FadeIn from '../components/FadeIn.tsx';

interface ProjectsProps {
  content: Content;
  projects: Project[];
}

const Projects: React.FC<ProjectsProps> = ({ content, projects }) => {
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen pt-32">
      <div className="max-w-7xl mx-auto px-6 mb-20 text-center">
        <FadeIn direction="up">
          <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">{content.projects.title}</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">{content.projects.subtitle}</p>
        </FadeIn>
      </div>

      <div className="max-w-5xl mx-auto px-6 mb-32">
        {projects.map((project) => (
          <FadeIn key={project.id} delay={100} direction="up">
            <ProjectCard project={project} />
          </FadeIn>
        ))}
      </div>

      <Contact content={content.contact} />
    </div>
  );
};

export default Projects;