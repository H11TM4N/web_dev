import express from "express";
import axios from "axios";

const app = express();
const port = 3000;
const API_URL = "https://secrets-api.appbrewery.com";

const myUsername = "Jeremiah";
const myPassword = "jeremiah-flies";
const myAPIKey = "4696474e-f833-479e-9e40-db2d7adcf1c6";
const myBearerToken = "55874a99-7e4a-46b0-a15c-bfc8928a6360";


app.get("/", (req, res) => {
  res.render("index.ejs", { content: "API Response." });
});

app.get("/noAuth", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/random`);
    const jsonString = JSON.stringify(response.data);
    const data = JSON.parse(jsonString);
    console.log(data);
    res.render("index.ejs", { content: data.secret });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/basicAuth", async (req, res) => {
  console.log(`${API_URL}/all?page=1`);
  try {
    const response = await axios.get(`${API_URL}/all?page=1`, {
      auth: {
        username: myUsername,
        password: myPassword,
      },
    });
    console.log(response);
    const jsonString = JSON.stringify(response.data);
    const data = JSON.parse(jsonString);
    console.log(data);
    res.render("index.ejs", { content: data[0].secret });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/apiKey", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/filter?score=5&apiKey=${myAPIKey}`);
    const jsonString = JSON.stringify(response.data);
    const data = JSON.parse(jsonString);
    console.log(data);
    res.render("index.ejs", { content: data[getRandomInt(data.length)].secret });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

app.get("/bearerToken", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/secrets/49`, {
      headers: {
        Authorization: `Bearer ${myBearerToken}`
      },
    });
    const jsonString = JSON.stringify(response.data);
    const data = JSON.parse(jsonString);
    console.log(data);
    res.render("index.ejs", { content: data.secret });
  } catch (error) {
    res.render("index.ejs", {
      content: error.message,
    });
  }
});

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

