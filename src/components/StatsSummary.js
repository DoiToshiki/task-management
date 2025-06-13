import React from 'react';

const StatsSummary = ({ tasks }) => {
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.status === '完了').length;
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const tasksCompletedThisMonth = tasks.filter(task => {
    const completedDate = new Date(task.completedAt);
    return (
      completedDate.getMonth() === currentMonth &&
      completedDate.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="stats-summary">
      <h3>進捗統計</h3>
      <ul>
        <li>総タスク数: {totalTasks}</li>
        <li>今月完了タスク数: {tasksCompletedThisMonth}</li>
        <li>進捗: {completedTasks} / {totalTasks}</li>
      </ul>
    </div>
  );
};

export default StatsSummary;
