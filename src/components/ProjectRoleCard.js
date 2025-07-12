import React from 'react';
import './ProjectRoleCard.css';

function ProjectRoleCard({ name, type, onClick }) {
  return (
    <div className={`project-role-card ${type}`} onClick={onClick}>
      <span className="project-role-card-title">{name}</span>
    </div>
  );
}

export default ProjectRoleCard;
