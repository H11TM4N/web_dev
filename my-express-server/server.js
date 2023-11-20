const express = require("express");

const app = express(3000);

app.get("/", function (req, res) {
    res.send("<h1>Yooooo</h1>");
});

app.listen(3000, function () {
    console.log("server started at port: 3000");
});