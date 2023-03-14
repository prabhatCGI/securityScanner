import express from "express";
import mongoose, {ConnectOptions} from "mongoose";

// Database Connection
mongoose.connect("mongodb+srv://prabhattripathi:0pNqMGwwXPYkdQax@cluster0.fjtu2b3.mongodb.net/mongodb?retryWrites=true&w=majority",{ useNewUrlParser: true,useUnifiedTopology: true, autoIndex: true, family:4} as ConnectOptions).then((db) => {
    console.log("Database Connected Successfully.");
  })
  .catch((err) => {
    console.log("Error Connectiong to the Database. Reason -: ", err);
  })

require("../models/scanModel");