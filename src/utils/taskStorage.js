import {
  saveTaskToDB,
  deleteTaskFromDB,
  getAllTasksFromDB,
} from './idb';

export const saveTasks = async (key, tasks) => {
  // LocalStorage保存
  localStorage.setItem(key, JSON.stringify(tasks));

  // IndexedDB全削除（keyに該当する全タスク）
  const existing = await getAllTasksFromDB(key);
  for (const task of existing) {
    await deleteTaskFromDB(key, task.id);
  }

  // IndexedDB再保存
  for (const task of tasks) {
    await saveTaskToDB(key, task);
  }
};

/**
 * タスクを一括取得（IndexedDB→localStorage同期）
 */
export const getTasks = async (key) => {
  const tasks = await getAllTasksFromDB(key);
  if (tasks?.length) {
    localStorage.setItem(key, JSON.stringify(tasks));
  }
  return tasks;
};

/**
 * 特定タスクを削除（localStorage + IndexedDB）
 */
export const deleteTask = async (key, id) => {
  const stored = JSON.parse(localStorage.getItem(key) || '[]');
  const filtered = stored.filter((t) => t.id !== id);
  localStorage.setItem(key, JSON.stringify(filtered));
  await deleteTaskFromDB(key, id);
};
