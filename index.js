import express from "express";

const app = express();

app.listen(8080);

app.get("/", (req, res) => {
    res.status(200).json({
        message: "Get Endpoint Is Working Fine!"
    });
});

