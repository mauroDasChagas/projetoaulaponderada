// Importing node modules and configuring they;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('frontend'));

// Importing built-in modules;
const db = require('../data/db.js');

// Main endpoint
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '..' + '/frontend/index.html'));
});

app.post('/enviaDados', (req, res) => {
    const { msg } = req.body;

    db.run('INSERT INTO tbl_msg (msg) VALUES (?)', [msg], (err) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao criar msg');
        } else {
            res.redirect('/');
        }
    });
});

app.get('/puxaDados', (req, res) => {
    db.all('SELECT * from tbl_msg', (err, rows) => {
        if (err) {
            console.error(err);
            res.status(500).send('Erro ao pegar mensagens');
            return;
        }

        const msgData = rows.map(row => ({
            id: row.id_msg,
            msg: row.msg,
        }));

        res.json(msgData);
    });
});

// Server listening
app.listen(8081, function(){
    console.log("Servidor rodando na URL: http://localhost:8081");
});
