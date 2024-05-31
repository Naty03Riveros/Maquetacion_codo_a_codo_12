const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());

// Conexión a la base de datos
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'codoacodo2024*',
    database: 'vinos_lombardi'
});

db.connect((err) => {
    if (err) throw err;
    console.log('Conectado a la base de datos');
});

// Endpoint para obtener productos
app.get('/api/vinos', (req, res) => {
    let sql = 'SELECT * FROM vinos';
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.send(result);
    });
});

// Endpoint para agregar un pedido
app.post('/api/pedidos', (req, res) => {
    const pedido = req.body;
    let sql = 'INSERT INTO pedidos SET ?';
    db.query(sql, pedido, (err, result) => {
        if (err) throw err;
        res.send({ id: result.insertId, ...pedido });
    });
});

// Iniciar el servidor
app.listen(3000, () => {
    console.log('Servidor iniciado en el puerto 3000');
});
