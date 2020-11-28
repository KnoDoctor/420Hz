const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const clientSession = require("client-sessions");
const helmet = require("helmet");

const { SESSION_SECRET } = require("./config");
const api = require("./src/api");

const app = express();

app.use(cors());

app.get("/", (request, response) => response.sendStatus(200));
app.get("/health", (request, response) => response.sendStatus(200));

app.use(morgan("short"));
app.use(express.json());
app.use(
    clientSession({
        cookieName: "session",
        secret: SESSION_SECRET,
        duration: 24 * 60 * 60 * 1000,
    })
);
app.use(helmet());

app.use(api);

// Error Handling - Promise rejection
app.use((err, req, res, next) => {
    res.set("Content-Type", "application/json");
    res.set("Cache-Control", "no-store");
    res.set("Access-Control-Allow-Origin", "*");
    res.set("Access-Control-Request-Method", "*");
    res.set(
        "Access-Control-Allow-Headers",
        "DNT,X-CustomHeader,Keep-Alive,User-Agent,X-Requested-With,If-Modified-Since,Cache-Control,Content-Type"
    );

    let errorObj = {
        status: err.status || 500,
        message: err.message || "Internal Server Error",
        stacktrace: err.stack,
        route: req.originalUrl,
    };

    res.status(err.status || 500);
    res.json({ error: errorObj });
});

let server;
module.exports = {
    start(port) {
        server = app.listen(port, () => {
            console.log(`App started on port ${port}`);
        });
        return app;
    },
    stop() {
        server.close();
    },
};
