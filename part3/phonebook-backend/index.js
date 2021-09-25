const { response } = require("express");
const express = require("express");
const app = express();
app.use(express.json());

let notes = [
  {
    id: 1,
    content: "HTML is easy",
    date: "2019-05-30T17:30:31.098Z",
    important: true,
  },
  {
    id: 2,
    content: "Browser can execute only Javascript",
    date: "2019-05-30T18:39:34.091Z",
    important: false,
  },
  {
    id: 3,
    content: "GET and POST are the most important methods of HTTP protocol",
    date: "2019-05-30T19:20:14.298Z",
    important: true,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Hello World!</h1>");
});

app.get("/api/notes", (req, res) => {
  res.json(notes);
});

app.get("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  const note = notes.find((notes) => notes.id === id);
  if (note) {
    res.json(note);
  } else {
    throw Error("No such id in the data!");
  }
});

app.delete("/api/notes/:id", (req, res) => {
  const id = Number(req.params.id);
  notes = notes.filter((note) => note.id !== id);
  res.status(204).end();
});

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((note) => note.id)) : 0;
  return maxId + 1;
};

app.post("/api/notes", (req, res) => {
  const data = req.body;
  if (!data.content) {
    res.status(204).json({
      error: "content missing",
    });
  }
  const note = {
    content: data.content,
    important: data.important || false,
    date: new Date(),
    id: generateId(),
  };
  notes = notes.concat(note);
  res.json(notes);
});

const port = 4000;
app.listen(port, () => {
  console.log(`listening to port ${port}`);
});
