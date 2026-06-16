const { error } = require("console");
const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;
const filePath = path.join(__dirname, "textfile.txt");
console.log("file path", filePath);

// middleware to parse JSON body
app.use(express.json());

// route to write to a file
app.post("/write", (req, res) => {
  const { content } = req.body;

  if (!content) {
    return res.status(400).json({ error: "Content is required" });
  }
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      return res.status(500).json({ error: "Failed to write file" });
    }
    res.json({ message: "File written successfully" });
  });
});

// route to read from a file
app.get("/read", (req, res) => {
  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Failed to read file" });
    }
    res.json({ content: data });
  });
});

app.listen(PORT, () => {
  console.log(`Server running at http://192.168.12.28:${PORT}`);
});