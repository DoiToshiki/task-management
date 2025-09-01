import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterBar from '../components/FilterBar';
import { getTasks, saveTasks } from '../utils/taskStorage';

function PersistentTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'すべて', priority: 'すべて' });
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

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
      saveTasks('persistentTasks', updated);
    }
  }, [tasks]);

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filter.status === 'すべて' || task.status === filter.status;
    const matchPriority = filter.priority === 'すべて' || task.priority === filter.priority;
    const matchRole = selectedRole === '' || task.tags?.role === selectedRole;
    const matchCategory = selectedCategory === '' || task.tags?.category === selectedCategory;
    return matchStatus && matchPriority && matchRole && matchCategory;
  });

  useEffect(() => {
    getTasks('persistentTasks').then((stored) => {
      if (stored) setTasks(stored);
    });
  }, []);

  useEffect(() => {
    saveTasks('persistentTasks', tasks);
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
    saveTasks('persistentTasks', updatedTasks); // ← saveTasksを直接呼び出す
  };

  const handleTaskUpdate = (updatedTask) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(newTasks);
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="page">
      <h2>継続タスク</h2>
      <TaskForm onAdd={addTask} type="継続" />
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

export default PersistentTasksPage;
