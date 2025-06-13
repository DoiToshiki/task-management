import React, { useState, useEffect } from 'react';
import StatsSummary from '../components/StatsSummary';
import TaskModal from '../components/TaskModal';
import CalendarView from '../components/CalendarView';

function CalendarStatsPage() {
  const [tasks, setTasks] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [modalDate, setModalDate] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  const goToPrevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  const goToNextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  const handleDateClick = (date) => {
    setModalDate(date);
    setEditingTask(null); // 新規作成モード
    setIsModalOpen(true);
  };



  // 初回読み込み
  useEffect(() => {
    const stored = localStorage.getItem('deadlineTasks');
    if (stored) setTasks(JSON.parse(stored));
  }, []);

  // 保存
  useEffect(() => {
    localStorage.setItem('deadlineTasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    setTasks([...tasks, task]);
  };

  const updateTask = (updatedTask) => {
    const updated = tasks.map((task) =>
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updated);
  };

  const deleteTask = (id) => {
    const filtered = tasks.filter((task) => task.id !== id);
    setTasks(filtered);
  };
  const filteredTasks = tasks.filter((task) => {
    if (!task.dueDate) return false;

    const taskDate = new Date(task.dueDate);
    return (
      taskDate.getFullYear() === currentDate.getFullYear() &&
      taskDate.getMonth() === currentDate.getMonth()
    );
  });

  return (
    <div className="page">
      <h2>統計ページ</h2>

      <CalendarView
        tasks={tasks}
        currentDate={currentDate}
        onDateClick={handleDateClick}
        goToPrevMonth={goToPrevMonth}
        goToNextMonth={goToNextMonth}
      />



      <StatsSummary tasks={tasks} />

      {(selectedTask || selectedDate) && (
        <TaskModal
          task={selectedTask}
          date={selectedDate}
          onClose={() => {
            setSelectedDate(null);
            setSelectedTask(null);
          }}
          onAdd={addTask}
          onUpdate={updateTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}

export default CalendarStatsPage;
