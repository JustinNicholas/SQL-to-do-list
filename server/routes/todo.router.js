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

module.exports = router;