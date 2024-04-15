require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const contactRoutes = require("./routes/Contacts");

// express app
const app = express();

// middleware
app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// connect db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    // listen for request
    app.listen(process.env.PORT, () => {
      console.log("connected to DB & listening on port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });

// routes
app.use("api/contacts", contactRoutes);
