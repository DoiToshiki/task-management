import React from 'react';
import ProjectRoleManager from '../components/ProjectRoleManager';
import { useNavigate } from 'react-router-dom';
import './DeadLineTasksPage.css';

function DeadlineTasksPage() {
  const navigate = useNavigate();
  // ProjectRoleManagerの選択時に遷移
  const handleSelect = (type, name) => {
    navigate(`/tasks/${type}/${encodeURIComponent(name)}`);
  };
  return (
    <div className="page deadline-tasks-layout">
      <aside className="project-role-manager-fixed">
        <h2>案件・役職の管理</h2>
        <ProjectRoleManager onSelect={handleSelect} hideTitle />
      </aside>
      {/* タスクカード部分はこのページでは表示しない。/tasks/:type/:nameで表示 */}
    </div>
  );
}

export default DeadlineTasksPage;
