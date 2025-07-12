import React, { useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import SubTaskForm from '../components/SubTaskForm';
import { useLocation, useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';

function ParentTaskPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const { parentTask, onUpdateParent, onDeleteParent } = location.state || {};
  const [subTaskModal, setSubTaskModal] = useState(null);

  if (!parentTask) {
    return <div>親タスクが見つかりません。</div>;
  }

  // サブタスク追加
  const handleAddSubTask = (title) => {
    if (onUpdateParent) {
      const updatedParent = {
        ...parentTask,
        subTasks: [
          ...(parentTask.subTasks || []),
          { id: uuidv4(), title, status: '未着手', priority: '中' }
        ]
      };
      onUpdateParent(updatedParent);
    }
  };

  // サブタスククリック
  const handleSubTaskClick = (parentId, subTask) => {
    setSubTaskModal(subTask);
  };

  // サブタスク更新
  const handleSubTaskUpdate = (updatedSubTask) => {
    if (onUpdateParent) {
      const updatedParent = {
        ...parentTask,
        subTasks: (parentTask.subTasks || []).map(st =>
          st.id === updatedSubTask.id ? updatedSubTask : st
        )
      };
      onUpdateParent(updatedParent);
    }
    setSubTaskModal(null);
  };

  // サブタスク削除
  const handleDeleteSubTask = (parentId, subTaskId) => {
    if (onUpdateParent) {
      const updatedParent = {
        ...parentTask,
        subTasks: (parentTask.subTasks || []).filter(st => st.id !== subTaskId)
      };
      onUpdateParent(updatedParent);
    }
  };

  return (
    <div className="page">
      <h2>親タスク: {parentTask.title}</h2>
      <div style={{ marginBottom: '1.5rem' }}>
        <button onClick={() => navigate(-1)}>← 戻る</button>
        <button onClick={() => onDeleteParent && onDeleteParent(parentTask.id)} style={{ marginLeft: 8 }}>親タスク削除</button>
      </div>
      <SubTaskForm onAdd={handleAddSubTask} />
      <TaskCard
        task={parentTask}
        onAddSubTask={null}
        onSubTaskClick={handleSubTaskClick}
        onDeleteSubTask={handleDeleteSubTask}
        onDelete={() => onDeleteParent && onDeleteParent(parentTask.id)}
        onClick={() => { }}
      />
      {subTaskModal && (
        <TaskDetailModal
          task={subTaskModal}
          onClose={() => setSubTaskModal(null)}
          onUpdate={handleSubTaskUpdate}
        />
      )}
    </div>
  );
}

export default ParentTaskPage;
