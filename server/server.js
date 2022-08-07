// Here we require all the files that we need and have our computer listen on port 5000
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.static('server/public'));

const router = require('./routes/todo.router');
app.use('/items', router);

const PORT = 5000;
app.listen(PORT, () => {
        console.log('listening on port', PORT);
});