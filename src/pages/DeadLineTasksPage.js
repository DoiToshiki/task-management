import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterBar from '../components/FilterBar';
import { getTasks, saveTasks } from '../utils/taskStorage';

function DeadlineTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'すべて', priority: 'すべて' });
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filter.status === 'すべて' || task.status === filter.status;
    const matchPriority = filter.priority === 'すべて' || task.priority === filter.priority;
    const matchRole = selectedRole === '' || task.tags?.role === selectedRole;
    const matchCategory = selectedCategory === '' || task.tags?.category === selectedCategory;
    return matchStatus && matchPriority && matchRole && matchCategory;
  });

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dueDate || '9999-12-31');
    const dateB = new Date(b.dueDate || '9999-12-31');
    return dateA - dateB;
  });

  useEffect(() => {
    getTasks('deadlineTasks').then((storedTasks) => {
      if (storedTasks) setTasks(storedTasks);
    });
  }, []);

  useEffect(() => {
    saveTasks('deadlineTasks', tasks);
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
  };

  const closeModal = () => {
    setSelectedTask(null);
  };

  return (
    <div className="page">
      <h2>期限付きタスク</h2>
      <TaskForm onAdd={addTask} type="期限付き" />
      <FilterBar
        filter={filter}
        setFilter={setFilter}
        selectedRole={selectedRole}
        setSelectedRole={setSelectedRole}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <div className="task-list">
        {sortedTasks.map((task) => (
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

export default DeadlineTasksPage;
