// here is where we require all the files we need and set up pool
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
// This get request will retrieve data from the SQL database and send back the rows to the client.js file
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
// This post request will send new entries for the database 
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

// This delete request will delete one item from the database at a time by the id of the item that was deleted
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

// This put request will only change the status from false to true of the item with the id that was clicked on
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

// this exports this page to be used on the server.js file
module.exports = router;