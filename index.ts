import Database from "better-sqlite3";
import express from "express";

import cors from "cors";

const db = new Database("./data.db", {
  verbose: console.log,
});
const app = express();
app.use(cors());
app.use(express.json());
const getAllMuseums = db.prepare(`
SELECT * FROM museums;
`);

const getAllWorks = db.prepare(`
SELECT * FROM works;
`);

const getMuseumById = db.prepare(`
SELECT * FROM museums WHERE id=?;
`);

const getWorkById = db.prepare(`
SELECT * FROM works WHERE id=?;
`);

const deleteMuseumById = db.prepare(`
DELETE FROM museums WHERE id =?;
`);

const deleteWorkById = db.prepare(`
DELETE FROM works WHERE id =?;
`);

app.get(`/museums`, (req, res) => {
  const result = getAllMuseums.all();
  res.send(result);
});

app.get(`/works`, (req, res) => {
  const result = getAllWorks.all();
  res.send(result);
});
app.get(`/museums/:id`, (req, res) => {
  const id = req.params.id;
  const result = getMuseumById.all(id);
  res.send(result);
});

app.get(`/works/:id`, (req, res) => {
  const id = req.params.id;
  const result = getWorkById.all(id);
  res.send(result);
});

app.listen(4001, () => {
  console.log(`Server up on:http://localhost:4001
    `);
});
