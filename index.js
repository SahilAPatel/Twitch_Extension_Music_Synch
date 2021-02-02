const express = require("express");
const bodyParser = require("body-parser");
const https = require("https");

const app = express();
app.use(bodyParser.json());

https
  .get("https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY", (resp) => {
    let data = "";

    // A chunk of data has been received.
    resp.on("data", (chunk) => {
      data += chunk;
    });

    // The whole response has been received. Print out the result.
    resp.on("end", () => {
      console.log(JSON.parse(data).explanation);
    });
  })
  .on("error", (err) => {
    console.log("Error: " + err.message);
  });

app.post("/add", (req, res) => {
  const { a, b } = req.body;
  res.send({
    result: parseInt(a) + parseInt(b),
  });
});

app.get("/", (req, res) => {
  res.send("Working");
  console.log("hahahhaha stupid");
});

app.listen(3000, () => {
  console.log(`Server is running on port 3000.`);
});
