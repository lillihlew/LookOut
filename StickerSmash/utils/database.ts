import * as SQLite from 'expo-sqlite';
import { Platform } from 'react-native';

let db: any = null;


if (Platform.OS !== 'web') {
  db = SQLite.openDatabase('events.db');
}

export const initDB = () => {
  if (!db) return;

  db.transaction((tx: { executeSql: (arg0: string) => void; }) => {
    tx.executeSql(
      `CREATE TABLE IF NOT EXISTS events (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        title TEXT,
        description TEXT,
        image TEXT,
        date TEXT,
        privacy INTEGER
      );`
    );
  });
};

export const getEventsFromSQLite = (callback: (events: any[]) => void) => {
    if (!db) {
      console.warn("SQLite not available on web.");
      callback([]);
      return;
    }
  
    db.transaction((tx: { executeSql: (arg0: string, arg1: never[], arg2: (_: any, { rows }: { rows: any; }) => void, arg3: (_: any, error: any) => boolean) => void; }) => {
      tx.executeSql(
        `SELECT * FROM events`,
        [],
        (_: any, { rows }: any) => {
          const eventArray = rows._array.map((item: { id: any; title: any; date: string | number | Date; }) => ({
            id: item.id,
            title: item.title,
            date: new Date(item.date).toLocaleString(), // format for display
          }));
          callback(eventArray);
        },
        (_: any, error: any) => {
          console.error("Error fetching events:", error);
          callback([]);
          return true;
        }
      );
    });
  };
  

export const saveEventToSQLite = (
  title: string,
  description: string,
  image: string,
  date: string,
  privacy: boolean
) => {
  if (!db) {
    alert("SQLite is not supported on web.");
    return;
  }

  db.transaction((tx: { executeSql: (arg0: string, arg1: (string | number)[], arg2: () => void, arg3: (_: any, error: any) => boolean) => void; }) => {
    tx.executeSql(
      `INSERT INTO events (title, description, image, date, privacy)
       VALUES (?, ?, ?, ?, ?)`,
      [title, description, image, date, privacy ? 1 : 0],
      () => alert("Event saved locally!"),
      (_, error) => {
        console.error("Error saving event:", error);
        alert("Failed to save event.");
        return true;
      }
    );
  });
};
