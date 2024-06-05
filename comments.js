// Create web server with express.js

// Require modules
const express = require("express");
const bodyParser = require("body-parser");
const fs = require("fs");

// Create express application
const app = express();

// Use the body-parser middleware
app.use(bodyParser.json());

// Read comments
app.get("/comments", (req, res) => {
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
      return;
    }
    res.send(data);
  });
});

// Create comment
app.post("/comments", (req, res) => {
  const comment = req.body;
  fs.readFile("comments.json", "utf8", (err, data) => {
    if (err) {
      res.status(500).send("Error reading comments file");
      return;
    }
    const comments = JSON.parse(data);
    comments.push(comment);
    fs.writeFile("comments.json", JSON.stringify(comments), (err) => {
      if (err) {
        res.status(500).send("Error writing comments file");
        return;
      }
      res.send("Comment added");
    });
  });
});

// Start server
app.listen(3000, () => {
  console.log("Server running on port 3000");
});
