const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const hpp = require("hpp");
const cors = require('cors');
const rateLimit = require("express-rate-limit");
const connectDB = require("./config/db");
const cookieParser = require("cookie-parser");

dotenv.config({ path: "./config/.env" });

connectDB();

const customer = require("./routes/customer");
const tariff = require("./routes/tariff");
const payment = require("./routes/payment");
const auth = require("./routes/auth");

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use(mongoSanitize());
app.use(helmet());
app.use(xss());
app.use(hpp());
app.use(cors());

app.use(express.json());
app.use(cookieParser());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100
});

app.use(limiter);

app.use(express.static(path.join(__dirname, "public")));

app.use("/api/v1/customer", customer);
app.use("/api/v1/tariff", tariff);
app.use("/api/v1/payment", payment);
app.use("/api/v1/auth", auth);

const PORT = process.env.PORT || 7000;
const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} node no port ${PORT}`)
);

process.on("handleRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);

  server.close(() => process.exit(1));
});
