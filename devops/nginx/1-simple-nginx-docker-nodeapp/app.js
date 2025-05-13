import express from "express";
import os from "os"

const app = express();
const port = 4000;

app.get("/", (req, res) => {
    res.send(`Hello World from ${os.hostname()}`);
});


app.listen(port, () => {
    console.log(`app listening on port ${port} on ${os.hostname()}`);
});