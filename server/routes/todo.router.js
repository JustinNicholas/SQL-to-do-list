const express = require('express');
const router = express.Router();

const pg = require('pg');

const Pool = pg.Pool;
const pool = new Pool({
    database: 'weekend-to-do-app',
    host: 'localhost',
    PORT: 5432,
    max: 10,
    idleTimeoutMillis: 30000
});

router.get('/', (req, res) => {
    console.log('in router items');
    // const id = req.params.id;
    let queryText = 'SELECT * FROM "weekend-to-do-app";';

    pool.query(queryText)
        .then( (result) => {
            console.log(result);
            res.send(result.rows);
        }).catch( (err) => {
            res.sendStatus(500);
        })
})

router.post('/', (req, res) => {
    let newItem = req.body;

    let queryText = `INSERT INTO "weekend-to-do-app" ("item")
    VALUES ($1);`;

    pool.query(queryText, [newItem.item])
        .then( (result) => {
            res.sendStatus(201);
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;