require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connection = require("./db");
const userRoutes = require("./routes/users");
const loginRoutes = require("./routes/login");
const catagory = require("./routes/catagory");
const cars = require("./routes/cars");


// database connection
connection();

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/api/users", userRoutes);
app.use("/api/auth", loginRoutes);
app.use("/api/catagory", catagory);
app.use("/api/cars", cars);

const port = process.env.PORT || 8080;
app.listen(port, console.log(`Listening on port ${port}...`));
