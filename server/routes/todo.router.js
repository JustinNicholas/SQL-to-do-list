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
    // console.log('in router items');

    //need order by id to keep list from shifting around when completing items.
    let queryText = `
    SELECT * FROM "weekend-to-do-app"
    ORDER BY id;`;

    pool.query(queryText)
        .then( (result) => {
            // console.log(result);
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

router.delete('/:id', (req, res) => {
    const id = req.params.id;
    let queryText = `
    DELETE FROM "weekend-to-do-app"
    WHERE "id" = $1`;
    
    pool.query(queryText, [id])
        .then( (result) => {
            res.sendStatus(204);
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let queryText = `
    UPDATE "weekend-to-do-app"
    SET "status" = true
    WHERE "id" = $1`;

    pool.query(queryText, [id])
        .then( (result) => {
            res.sendStatus(200);
        }).catch( (err) => {
            console.log(err);
            res.sendStatus(500);
        });
});

module.exports = router;