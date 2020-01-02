const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// a schema is a blueprint of collection (i.e. table)
const WishSchema = Schema({
  wish: String
});

mongoose.model("wishes", WishSchema); // wishes is collection name
