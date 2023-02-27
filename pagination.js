// Pagnation is the ability to return just a subset of the results
// from the api to your users so that they can go page forward and page back
// just the same as how google search works

// 1. Create a simple api and paginate it
// 2. Create a middleware and apply it to any of the resources
// 3. Connect it with our database

const express = require("express");
const app = express();
const port = process.env.PORT || 5000;

const users = [
  { id: 1, name: "User 1" },
  { id: 2, name: "User 2" },
  { id: 3, name: "User 3" },
  { id: 4, name: "User 4" },
  { id: 5, name: "User 5" },
  { id: 6, name: "User 6" },
  { id: 7, name: "User 7" },
  { id: 8, name: "User 8" },
  { id: 9, name: "User 9" },
  { id: 10, name: "User 10" },
  { id: 11, name: "User 11" },
  { id: 12, name: "User 12" },
  { id: 13, name: "User 13" },
  { id: 14, name: "User 14" },
  { id: 15, name: "User 15" },
  { id: 16, name: "User 16" },
  { id: 17, name: "User 17" },
  { id: 18, name: "User 18" },
];

app.get("/users", paginatedResults(users), (req, res) => {
  res.json(res.paginatedResults)
});

function paginatedResults(model) {
  return (req, res, next) => {
    const page = parseInt(req.query.page);
    const limit = parseInt(req.query.limit);

    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    // const resultModel = model.slice(startIndex, endIndex)

    const results = {};

    if (startIndex > 0) {
      results.previous = {
        page: page - 1,
        limit: limit,
      };
    }

    results.resultModel = model.slice(startIndex, endIndex);

    if (endIndex < model.length) {
      results.next = {
        page: page + 1,
        limit: limit,
      };
    }

    res.paginatedResults = results;
    next();
  };
}

app.listen(5000, () => console.log(`Listening at port ${port}...`));
