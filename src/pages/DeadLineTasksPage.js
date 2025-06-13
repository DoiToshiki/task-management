import React, { useState, useEffect } from 'react';
import TaskForm from '../components/TaskForm';
import TaskCard from '../components/TaskCard';
import TaskDetailModal from '../components/TaskDetailModal';
import FilterBar from '../components/FilterBar';

function DeadlineTasksPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [filter, setFilter] = useState({ status: 'すべて', priority: 'すべて' });
  const [selectedUrgent, setSelectedUrgent] = useState('');
  const [selectedRole, setSelectedRole] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const filteredTasks = tasks.filter((task) => {
    const matchStatus = filter.status === 'すべて' || task.status === filter.status;
    const matchPriority = filter.priority === 'すべて' || task.priority === filter.priority;
    const matchRole = selectedRole === '' || task.tags?.role === selectedRole;
    const matchCategory = selectedCategory === '' || task.tags?.category === selectedCategory;

    return matchStatus && matchPriority && matchRole && matchCategory;
  });



  // 初回読み込み（localStorage）
  useEffect(() => {
    const stored = localStorage.getItem('deadlineTasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // 保存（変更があったとき）
  useEffect(() => {
    localStorage.setItem('deadlineTasks', JSON.stringify(tasks));
  }, [tasks]);

  // タスク追加
  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  // タスク削除
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const handleTaskUpdate = (updatedTask) => {
    const newTasks = tasks.map((t) =>
      t.id === updatedTask.id ? updatedTask : t
    );
    setTasks(newTasks);
    localStorage.setItem('deadlineTasks', JSON.stringify(newTasks));
  };



  const closeModal = () => {
    setSelectedTask(null); // ← モーダルを閉じるにはタスクを選択状態から外せばいい
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
        {filteredTasks.map((task) => {

          return (
            <TaskCard
              key={task.id}
              task={task}
              onDelete={() => deleteTask(task.id)}
              onClick={() => setSelectedTask(task)}
            />
          );
        })}

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
