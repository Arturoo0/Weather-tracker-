
const express = require("express");
const ejs = require("ejs");
const fetch = require("node-fetch");
const config = require("./config");

const app = express();

app.use(express.static("public"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/test", async (req, res) => {
  const requestURL = `https://api.openweathermap.org/data/2.5/weather?q=Hialeah,Florida,US&appid=${config.apikey}`
  let response = await fetch(requestURL);

  let js = await response.json();

  console.log(js);

  res.render("test", {
    name : js.name,
    temp : js.main.temp
  });
});

app.listen(3000, () => {
  console.log("Server started at port 3000!");
});