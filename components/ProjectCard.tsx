import React from 'react';
import { Project } from '../types.ts';
import { Download, ExternalLink, Github, Gamepad2 } from 'lucide-react';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case 'download': return <Download size={20} />;
      case 'github': return <Github size={20} />;
      case 'itch': return <Gamepad2 size={20} />;
      default: return <ExternalLink size={20} />;
    }
  };

  return (
    <div className="glass-panel rounded-3xl overflow-hidden p-1 group hover:border-nova-primary/30 transition-colors duration-500">
      <div className="relative rounded-[20px] overflow-hidden aspect-[16/9] mb-6">
         <img 
            src={project.imageUrl} 
            alt={project.title} 
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
          
          <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
            {project.tags.map(tag => (
              <span key={tag} className="text-xs font-semibold px-3 py-1.5 rounded-full bg-black/50 text-white backdrop-blur-md border border-white/10">
                {tag}
              </span>
            ))}
          </div>
      </div>

      <div className="px-5 pb-6">
        <h3 className="text-3xl font-display font-bold text-white mb-3">{project.title}</h3>
        <p className="text-gray-400 text-base mb-8 leading-relaxed">
          {project.description}
        </p>

        <div className="flex flex-col sm:flex-row gap-3">
          {project.links.map((link, idx) => (
            <a 
              key={idx}
              href={link.url}
              className={`flex items-center justify-center space-x-2 px-6 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                idx === 0 
                  ? 'bg-gradient-to-r from-nova-primary to-nova-secondary text-white hover:shadow-lg hover:shadow-nova-primary/25 hover:-translate-y-0.5' 
                  : 'bg-white/5 text-gray-300 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {getIcon(link.icon)}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;