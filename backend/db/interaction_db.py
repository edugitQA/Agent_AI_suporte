import os
import sqlite3
from datetime import datetime
from typing import List, Tuple, Optional

DB_DIR = os.path.dirname(__file__)
DB_PATH = os.path.join(DB_DIR, 'interactions.db')
os.makedirs(DB_DIR, exist_ok=True)

class InteractionDB:
    def __init__(self, db_path: str = DB_PATH):
        self.conn = sqlite3.connect(db_path, check_same_thread=False)
        self.create_table()

    def create_table(self):
        with self.conn:
            self.conn.execute('''
                CREATE TABLE IF NOT EXISTS interactions (
                    id INTEGER PRIMARY KEY AUTOINCREMENT,
                    user TEXT,
                    message TEXT,
                    response TEXT,
                    timestamp TEXT
                )
            ''')

    def add_interaction(self, user: str, message: str, response: str):
        with self.conn:
            self.conn.execute(
                'INSERT INTO interactions (user, message, response, timestamp) VALUES (?, ?, ?, ?)',
                (user, message, response, datetime.now().isoformat())
            )

    def get_interactions(self, user: Optional[str] = None) -> List[Tuple]:
        cursor = self.conn.cursor()
        if user:
            cursor.execute('SELECT * FROM interactions WHERE user = ? ORDER BY timestamp', (user,))
        else:
            cursor.execute('SELECT * FROM interactions ORDER BY timestamp')
        return cursor.fetchall()

    def close(self):
        self.conn.close()
