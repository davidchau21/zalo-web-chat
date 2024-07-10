const express = require("express");

const routes = require("./routes/index");

const morgan = require("morgan");

const rateLimit = require("express-rate-limit");

const helmet = require("helmet");

const mongoSanitize = require("express-mongo-sanitize");

const xss = require("xss-clean");

const bodyParser = require("body-parser");

// const xss = require("xss");

const cors = require("cors");

const cookieParser = require("cookie-parser");
const session = require("cookie-session");

const app = express();

app.use(mongoSanitize());

// app.use(xss());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "PHTCH", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cookieParser());

app.use(express.json());

app.use(
  session({
    secret: "keyboard cat",
    proxy: true,
    resave: true,
    saveUninitialized: true,
    cookie: { secure: true },
  })
);

app.use(helmet());

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
const limiter = rateLimit({
  max: 3000,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour",
});

app.use("/tawk", limiter);

// app.use(express.urlencoded({ extended: true }));

app.use(xss());

app.use(routes);

module.exports = app;
