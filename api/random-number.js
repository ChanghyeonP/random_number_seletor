const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

// 남자와 여자의 번호 테이블 생성
db.serialize(() => {
    db.run("CREATE TABLE IF NOT EXISTS man (number INTEGER PRIMARY KEY)");
    db.run("CREATE TABLE IF NOT EXISTS woman (number INTEGER PRIMARY KEY)");
    db.run("CREATE TABLE IF NOT EXISTS ip_assignments (ip TEXT PRIMARY KEY, gender TEXT, number INTEGER)");
});

const insertNumber = (gender, number) => {
    return new Promise((resolve, reject) => {
        const table = gender === 'man' ? 'man' : 'woman';
        db.run(`INSERT INTO ${table} (number) VALUES (?)`, [number], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

const getAllNumbers = (gender) => {
    return new Promise((resolve, reject) => {
        const table = gender === 'man' ? 'man' : 'woman';
        db.all(`SELECT number FROM ${table}`, [], (err, rows) => {
            if (err) {
                return reject(err);
            }
            resolve(rows.map(row => row.number));
        });
    });
};

const assignNumberToIp = (ip, gender, number) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO ip_assignments (ip, gender, number) VALUES (?, ?, ?)`, [ip, gender, number], function(err) {
            if (err) {
                return reject(err);
            }
            resolve(this.lastID);
        });
    });
};

const getNumberByIp = (ip) => {
    return new Promise((resolve, reject) => {
        db.get(`SELECT * FROM ip_assignments WHERE ip = ?`, [ip], (err, row) => {
            if (err) {
                return reject(err);
            }
            resolve(row);
        });
    });
};

const clearDatabase = () => {
    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.run("DELETE FROM man", (err) => {
                if (err) {
                    return reject(err);
                }
            });
            db.run("DELETE FROM woman", (err) => {
                if (err) {
                    return reject(err);
                }
            });
            db.run("DELETE FROM ip_assignments", (err) => {
                if (err) {
                    return reject(err);
                }
            });
            resolve();
        });
    });
};

module.exports = {
    insertNumber,
    getAllNumbers,
    assignNumberToIp,
    getNumberByIp,
    clearDatabase
};
