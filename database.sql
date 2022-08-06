-- Database name = "weekend-to-do-app";

CREATE TABLE "weekend-to-do-app" (
"id" SERIAL PRIMARY KEY,
"item" VARCHAR(120) NOT NULL,
"status" BOOLEAN DEFAULT FALSE
);

INSERT INTO "weekend-to-do-app" ("item")
VALUES ('Mow the lawn'), ('Take out the trash'), ('Walk the dog'), ('Pay bills'), ('Write lots of code')