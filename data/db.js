const sqlite3 = require('sqlite3').verbose()

const DBSOURCE = "./data/db.sqlite"

let db = new sqlite3.Database(DBSOURCE, (err) => {
    if (err) {
        console.error(err.message);
        throw err;
    } else {
        console.log('Conexão com o banco de dados estabelecida.')
        db.run(`CREATE TABLE IF NOT EXISTS tbl_msg (
                id_msg INTEGER PRIMARY KEY,
                msg text)`,
        (err) => {
            if (err) {
                console.log('Erro ao criar tbl_msg:', err.message);
            } else {
                console.log('A tbl_msg foi criada com sucesso.');
            } 
        });
    };
});

module.exports = db;
