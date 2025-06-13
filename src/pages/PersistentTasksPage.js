import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterBar from '../components/FilterBar';

function PersistentTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'すべて', priority: 'すべて' });
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  // フィルタ処理（役割・カテゴリ含む）
  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filter.status === 'すべて' || task.status === filter.status;
    const matchPriority = filter.priority === 'すべて' || task.priority === filter.priority;
    const matchRole = selectedRole === '' || task.tags?.role === selectedRole;
    const matchCategory = selectedCategory === '' || task.tags?.category === selectedCategory;

    return matchStatus && matchPriority && matchRole && matchCategory;
  });

  useEffect(() => {
    const stored = localStorage.getItem('persistentTasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('persistentTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskUpdate = (updatedTask) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(newTasks);
    localStorage.setItem('persistentTasks', JSON.stringify(newTasks));
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="page">
      <h2>永続タスク</h2>
      <TaskForm onAdd={addTask} type="永続" />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />


      <div className="task-list">
        {filteredTasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onDelete={() => deleteTask(task.id)}
            onClick={() => setSelectedTask(task)}
          />
        ))}
      </div>

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
