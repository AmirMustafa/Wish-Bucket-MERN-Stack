const express = require("express");
const app = express();

// let data = ["code", "sleep"]; // This data we will read in home.ejs

const mongoose = require("mongoose");
const { mongourl } = require("./config/keys");
const Wish = mongoose.model("wishes");

//const Wish = require("./model/wish");

mongoose.connect(mongourl, { useNewUrlParser: true, useUnifiedTopology: true }); // connect to mongoDB

module.exports = app => {
  // get routes - Read Operation
  /* app.get("/", (req, res) => {
    Wish.find({}).then(data => {
      // empty object means fetch all data
      console.log(data);
      res.render("home", { wish: data }); // passing data to home.ejs view page
    });
  }); */

  app.get("/data", (req, res) => {
    Wish.find({}).then(data => {
      // this will find all data from mongo db
      // empty object means fetch all data
      res.send(data); // passing data to home.ejs view page
    });
  });

  app.get("/about", (req, res) => {
    res.render("about");
    // res.send("this is about page");
  });

  // post routes - Create Operation
  app.post("/sent-data", (req, res) => {
    // this is for posting in database i.e. create operation
    // ========================= Save in Mongo DB: Start ========================
    const Item = new Wish({
      wish: req.body.item // this we are getting using body parser installed
    });

    Item.save()
      .then(data => {
        console.log(`${req.body.item} saved in mongo db`);
        res.send(data); // sending response just for reloading
      })
      .catch(err => {
        throw err;
      });
    // ========================= Save in Mongo DB: End ========================

    // ================= Earlier we were pushing into data array =======================
    // console.log(req.body.item);
    // data.push(req.body.item);
    // res.send(JSON.stringify(req.body.item));
  });

  // delete routes  - Delete Operation
  app.delete("/remove/:id", (req, res) => {
    res.send({ data: req.params.id });
    Wish.findOneAndRemove({ _id: req.params.id }).then(() => {
      console.log(`${req.params.id} is successfully deleted`);
      res.send({ post: "deleted" }); // sending response just for reloading
    });
  });

  app.put("/update/:id", (req, res) => {
    console.log(req.params.id);
  });
};
