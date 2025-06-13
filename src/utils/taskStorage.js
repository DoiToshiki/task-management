import {
  saveTaskToDB,
  deleteTaskFromDB,
  getAllTasksFromDB,
} from './idb';

/**
 * タスク全体を保存（localStorage + IndexedDB）
 */
export const saveTasks = async (key, tasks) => {
  // LocalStorage保存
  localStorage.setItem(key, JSON.stringify(tasks));

  // IndexedDB保存（全上書き）
  for (const task of tasks) {
    await saveTaskToDB(key, task); // key: "persistentTasks" など
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
