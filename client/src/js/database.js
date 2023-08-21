import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

export const putDb = async (content) => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');

  const entry = {
    id: 0,
    value: content,
    timestamp: Date.now(),
  };

  try {
    await store.put(entry);
    console.log('added content to the jate database');
  } catch (error) {
    console.error('error adding content to the jate database', error);
  }
};

export const getDb = async () => {
  const db = await initdb();
  const tx = db.transaction('jate', 'readonly');
  const store = tx.objectStore('jate');

  try {
    const content = await store.getAll();
    return content.value;
  } catch (error) {
    console.error('error getting content from the jate database', error);
  }
};

initdb();
