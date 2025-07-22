import React from 'react';
import { DivideIcon as LucideIcon } from 'lucide-react';

interface FeatureCardProps {
  icon: LucideIcon;
  title: string;
  description: string;
  iconColor: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({ 
  icon: Icon, 
  title, 
  description, 
  iconColor 
}) => {
  return (
    <div className="group p-6 rounded-2xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm hover:bg-gray-800/50 hover:border-gray-700 transition-all duration-300 hover:transform hover:scale-105">
      <div className={`w-12 h-12 ${iconColor} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
        <Icon size={24} className="text-white" />
      </div>
      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
    </div>
  );
};