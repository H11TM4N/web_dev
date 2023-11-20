
const express = require('express');

const app = express(3000);

app.get("/", function (req, res) {
    res.send("Hello, world");
});

app.listen(3000, function () {
    console.log("Server started at port 3000");
});
