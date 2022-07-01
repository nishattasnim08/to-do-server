const express = require("express");
const app = express();
require('dotenv').config()
var cors = require('cors')

app.use(cors())
app.use(express.json())


const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("ajke amar mon valo nei");
});

app.listen(port, () => {
  console.log("runing to do");
});
