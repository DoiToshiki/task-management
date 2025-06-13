import { openDB } from 'idb';

export async function openTaskDB() {
  return openDB('taskDB', 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains('deadlineTasks')) {
        db.createObjectStore('deadlineTasks', { keyPath: 'id' });
      }
      if (!db.objectStoreNames.contains('persistentTasks')) {
        db.createObjectStore('persistentTasks', { keyPath: 'id' });
      }
    },
  });
}

export async function saveTaskToDB(storeName, task) {
  const db = await openTaskDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.put(task);
  await tx.done;
}

export async function deleteTaskFromDB(storeName, id) {
  const db = await openTaskDB();
  const tx = db.transaction(storeName, 'readwrite');
  await tx.store.delete(id);
  await tx.done;
}

export async function getAllTasksFromDB(storeName) {
  const db = await openTaskDB();
  return db.getAll(storeName);
}
