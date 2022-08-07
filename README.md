# Project Name
SQL To-Do List

## Description

Duration: Weekend (Aug 5th - 7th)

The goal of this project was to make a intuitive to-do list with the a database so data could be store permanantly. One struggle I had was making the website responsive to all screen sizes with enough room for the tasks to be displayed nicely. I added bootstrap to achive this and I'm satisfied with the look and functionality. I found that the below the medium screen size, it was best to stack the elements on the DOM. If I had moer time for this project, I would have added a clear all button for each list. It may be cumbersome for users with a long list to delete and confirm each item. I would also like the completed modal to time out after one scond so users would not have to click ok on the current modal.

Screen Shot:
[Screenshot of completed site](SQLToDoList.png)

Prerequisites and Installation:
- Node.js
- Fork and Clone this repo
- "npm install" in the termianl of this project
- "npm start" to start the server.
- go to http://localhost:5000/ in your browser

- Create a database named `weekend-to-do-app`,
The queries in the database.sql file are set up to create all the necessary tables and populate the needed data to allow the application to run correctly. The project is built on Postgres, so you will need to make sure to have that installed. We recommend using Postico to run those queries as that was used to create the queries,
Open up your editor of choice and run an npm install

Usage of website:
- A user is able to type up to 120 characters in the input and submit a new entry to be added to their to-do list
- once a user completes a task they can click complete and they are greeted with an alert that congratulates them on the task completion.
- The task will then show in the completed tasks section.
- Users also have the ability to to delete and item as weel. If a user deletes an item, they are prompted with an message asking if they are sure they want to delete the item.
    - If the user hits cancel then they are back to the home screen with no changes
    - If the user hits okay then then item is removed from the database and the DOM.

Built With:
- HTML
- CSS
- JavaScript
- jQuery
- Node
- Express
- PG
- SQL

Support:
If you have suggestions or issues, please email me at nicholasj964@yahoo.com
