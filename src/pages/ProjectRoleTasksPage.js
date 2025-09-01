import React, { useEffect, useState } from 'react';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import TaskForm from '../components/TaskForm';
import FilterBar from '../components/FilterBar';
import { getTasks, saveTasks } from '../utils/taskStorage';
import { useParams, useNavigate } from 'react-router-dom';

function ProjectRoleTasksPage() {
  const { type, name } = useParams(); // type: 'project' or 'role', name: project/role名
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'すべて', priority: 'すべて' });
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getTasks('deadlineTasks').then((storedTasks) => {
      if (storedTasks) setTasks(storedTasks);
    });
  }, []);

  // CRUD
  const addTask = (task) => {
    // 案件/役職情報を自動付与
    const newTask = {
      ...task,
      tags: {
        ...task.tags,
        [type]: name
      }
    };
    const updated = [...tasks, newTask];
    setTasks(updated);
    saveTasks('deadlineTasks', updated);
  };
  const deleteTask = (id) => {
    const updated = tasks.filter((task) => task.id !== id);
    setTasks(updated);
    saveTasks('deadlineTasks', updated);
  };
  const handleTaskUpdate = (updatedTask) => {
    // 編集時も必ず案件・役職名を維持
    const fixedTags = {
      ...updatedTask.tags,
      [type]: name
    };
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? { ...updatedTask, tags: fixedTags } : t
    );
    setTasks(newTasks);
    saveTasks('deadlineTasks', newTasks);
  };
  const closeModal = () => setSelectedTask(null);

  // フィルタ
  // 締め切り日超過タスクのステータスを自動で遅延に変更
  useEffect(() => {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const updated = tasks.map(task => {
      if (task.dueDate && task.status !== '完了') {
        const due = new Date(task.dueDate);
        const isOverdue = due < today;
        // 遅延自動化は「完了」以外全て対象、ただし手動変更は妨げない
        if (isOverdue && task.status !== '遅延') {
          return { ...task, status: '遅延' };
        }
      }
      return task;
    });
    if (JSON.stringify(updated) !== JSON.stringify(tasks)) {
      setTasks(updated);
      saveTasks('deadlineTasks', updated);
    }
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    if (type === 'project' && task.tags?.project !== name) return false;
    if (type === 'role' && task.tags?.role !== name) return false;
    const matchStatus = filter.status === 'すべて' || task.status === filter.status;
    const matchPriority = filter.priority === 'すべて' || task.priority === filter.priority;
    const matchRole = selectedRole === '' || task.tags?.role === selectedRole;
    const matchCategory = selectedCategory === '' || task.tags?.category === selectedCategory;
    return matchStatus && matchPriority && matchRole && matchCategory;
  });

  return (
    <div className="page">
      <button onClick={() => navigate(-1)} style={{ marginBottom: '1rem' }}>← 戻る</button>
      <h2>{type === 'project' ? `案件: ${name}` : `役職: ${name}`} のタスク</h2>
      <TaskForm onAdd={addTask} type="期限付き" />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />
      {/* ステータスごとにグループ化して表示 */}
      {['未着手', '進行中', 'レビュー中', '連絡済み', '待ち', '遅延', '完了'].map((status) => {
        const group = filteredTasks.filter(task => task.status === status);
        if (group.length === 0) return null;
        // 締め切り日で昇順ソート（未設定は一番下）
        const sorted = [...group].sort((a, b) => {
          if (!a.dueDate && !b.dueDate) return 0;
          if (!a.dueDate) return 1;
          if (!b.dueDate) return -1;
          return a.dueDate.localeCompare(b.dueDate);
        });
        return (
          <div key={status} style={{ marginBottom: '2.2rem' }}>
            <h3 style={{ color: '#1976d2', marginBottom: '0.7rem' }}>{status}</h3>
            <div className="task-list">
              {sorted.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onDelete={() => deleteTask(task.id)}
                  onClick={() => setSelectedTask(task)}
                />
              ))}
            </div>
          </div>
        );
      })}
      {selectedTask && (
        <TaskDetailModal
          task={selectedTask}
          onClose={closeModal}
          onUpdate={handleTaskUpdate}
        />
      )}
    </div>
  );
}

export default ProjectRoleTasksPage;
