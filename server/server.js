const express = require('express');

const app = express();

app.use(express.urlencoded({ extended: true}));

app.use(express.static('server/public'));

let toDoRouter = require('./routes/todo.router');
app.use('toDo', toDoRouter);

const PORT = 5000;
app.listen(PORT, () => {
        console.log('listening on port', PORT);
});