import React, { useState, useEffect } from 'react';
import ProjectRoleCard from './ProjectRoleCard';
import './ProjectRoleCard.css';

const STORAGE_KEY = 'projectRoleList';

function ProjectRoleManager({ onSelect, hideTitle }) {
  const [projects, setProjects] = useState([]);
  const [roles, setRoles] = useState([]);
  const [inputProject, setInputProject] = useState('');
  const [inputRole, setInputRole] = useState('');

  // 初期ロード
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem(STORAGE_KEY) || '{}');
    setProjects(data.projects || []);
    setRoles(data.roles || []);
  }, []);

  // 保存
  const save = (newProjects, newRoles) => {
    setProjects(newProjects);
    setRoles(newRoles);
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ projects: newProjects, roles: newRoles }));
  };

  // 追加
  const addProject = () => {
    if (inputProject && !projects.includes(inputProject)) {
      const newProjects = [...projects, inputProject];
      save(newProjects, roles);
      setInputProject('');
    }
  };
  const addRole = () => {
    if (inputRole && !roles.includes(inputRole)) {
      const newRoles = [...roles, inputRole];
      save(projects, newRoles);
      setInputRole('');
    }
  };

  // 削除
  const deleteProject = (name) => {
    const newProjects = projects.filter(p => p !== name);
    save(newProjects, roles);
  };
  const deleteRole = (name) => {
    const newRoles = roles.filter(r => r !== name);
    save(projects, newRoles);
  };

  return (
    <div>
      {!hideTitle && <h2>案件・役職の管理</h2>}
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        {/* 案件追加フォーム */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', alignItems: 'flex-end' }}>
          <label style={{ fontWeight: 'bold' }}>案件追加</label>
          <input value={inputProject} onChange={e => setInputProject(e.target.value)} placeholder="新しい案件名" />
          <button onClick={addProject}>追加</button>
        </div>
        {/* 案件カード 横並び・wrap */}
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', marginBottom: '2rem', width: '100%' }}>
          {projects.map(name => (
            <div key={name} style={{ position: 'relative', minWidth: 0 }}>
              <ProjectRoleCard name={name} type="project" onClick={() => onSelect('project', name)} />
              <button onClick={() => deleteProject(name)} style={{ position: 'absolute', top: 2, right: 2, background: 'transparent', border: 'none', color: '#b3e5fc', fontSize: '1.1rem', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
        {/* 役職追加フォーム */}
        <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.2rem', alignItems: 'flex-end' }}>
          <label style={{ fontWeight: 'bold' }}>役職追加</label>
          <input value={inputRole} onChange={e => setInputRole(e.target.value)} placeholder="新しい役職名" />
          <button onClick={addRole}>追加</button>
        </div>
        {/* 役職カード 横並び・wrap */}
        <div style={{ display: 'flex', gap: '0.7rem', flexWrap: 'wrap', width: '100%' }}>
          {roles.map(name => (
            <div key={name} style={{ position: 'relative', minWidth: 0 }}>
              <ProjectRoleCard name={name} type="role" onClick={() => onSelect('role', name)} />
              <button onClick={() => deleteRole(name)} style={{ position: 'absolute', top: 2, right: 2, background: 'transparent', border: 'none', color: '#b3e5fc', fontSize: '1.1rem', cursor: 'pointer' }}>×</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ProjectRoleManager;
