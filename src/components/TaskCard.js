import React from 'react';
import './TaskCard.css';

function TaskCard({ task, onClick, onDelete }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case '高': return 'red';
      case '中': return 'orange';
      case '低': return 'gray';
      default: return 'black';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case '未着手': return '#bbbbbb';
      case '進行中': return '#00aaff';
      case '連絡済み': return '#40e0d0';
      case '待ち': return '#ffcc66';
      case 'レビュー中': return '#ff9800';
      case '完了': return '#99ff99';
      case '遅延': return '#ff6666';
      default: return '#ffffff';
    }
  };

  return (
    <div
      className="task-card"
      onClick={onClick}
      style={{ borderLeft: `6px solid ${getPriorityColor(task.priority)}` }}
      tabIndex={0}
    >
      {task.tags?.urgent && (
        <img src="/urgent-icon.png" alt="urgent" className="urgent-icon" />
      )}

      <div className="task-status-top" style={{ color: getStatusColor(task.status) }}>
        {task.status}
      </div>

      <button
        className="delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          onDelete();
        }}
        title="削除"
      >
        🗑
      </button>

      <div className="task-main">
        {task.dueDate && (
          <div className="task-due">
            <span className="due-label">📅{task.dueDate}</span>
          </div>
        )}

        <h4 className="task-title">{task.title}</h4>

        <div className="task-meta">
          <span className="badge">{task.priority}</span>
          {task.tags?.role && <span className="badge">{task.tags.role}</span>}
          {task.tags?.category && (
            <span className="badge">{task.tags.category}</span>
          )}
        </div>
      </div>
    </div>
  );
}

export default TaskCard;
