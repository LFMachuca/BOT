import Database from "better-sqlite3";

const db = new Database('bot.db');

db.exec(`
    CREATE TABLE IF NOT EXISTS TTS (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        msg_id TEXT UNIQUE,
        numero TEXT,
        titular TEXT,
        monto REAL,
        cliente TEXT,
        provider TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )
    `)

const createTTS = (msgId, tt) =>{
    const stm = db.prepare(`
        INSERT OR IGNORE INTO TTS (msg_id, numero, titular, monto, cliente)
        VALUES (@msgId, @numero, @titular, @monto, @cliente)
        `);
        stm.run({msgId, ...tt})
}

const asignProvider = (msgId, provider) =>{
    const stm = db.prepare(`
        UPDATE TTS SET provider = ? WHERE msg_id = ?
        `);
        stm.run(provider, msgId);
}

const getTT = msgId =>{
    const stm = db.prepare(`
        SELECT * FROM TTS WHERE msg_id = ?
        `);
        return stm.get(msgId);
}

export { createTTS, asignProvider, getTT}