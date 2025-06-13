import { useEffect, useState } from 'react';
import {
  getAllTasksFromDB,
  saveTaskToDB,
  deleteTaskFromDB
} from '../utils/idb';

export const useTaskStorage = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    (async () => {
      const loaded = await getAllTasksFromDB();
      setTasks(loaded);
    })();
  }, []);

  const addTask = async (task) => {
    await saveTaskToDB(task);
    setTasks(prev => [...prev, task]);
  };

  const updateTask = async (updatedTask) => {
    await saveTaskToDB(updatedTask);
    setTasks(prev => prev.map(t => t.id === updatedTask.id ? updatedTask : t));
  };

  const deleteTask = async (id) => {
    await deleteTaskFromDB(id);
    setTasks(prev => prev.filter(t => t.id !== id));
  };

  return { tasks, addTask, updateTask, deleteTask };
};
