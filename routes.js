const express = require('express');
const router = express.Router();
const records = require("./records");

function asyncHandler(cb) {
    return async (req, res, next) => {
      try {
        await cb(req, res, next);
      } catch (err) {
        next(err);
      }
    };
  }
  
  //set route
router.get("/quotes", async (req, res) => {
    // res.json({greeting: "hello world"})
    //res.json(data);
    const quotes = await records.getQuotes();
    res.json(quotes);
  });
  
  //set route
  router.get("/quotes/:id", async (req, res) => {
    // res.json({greeting: "hello world"})
    //res.json(data);
  
    //test to make sure it localost:3000/quotes/1 responds
    //console.log(req.params.id);
  
    //now lets get the value
    //const quote = records.quotes.find(quote=> quote.id == req.params.id);
    try {
      const quote = await records.getQuote(req.params.id);
      if (quote) {
        //send as json
        res.json(quote);
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Quote not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.put("/quotes/:id", async (req, res) => {
    try {
      const quote = await records.getQuote(req.params.id);
      if (quote) {
        (quote.quote = req.body.quote),
          (quote.author = req.body.author),
          //quote.year= req.body.year
          await records.updateQuote(quote);
        res.status(204).end();
      } else {
        res.status(404).json({ message: "Quote not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  router.delete("/quotes/:id", async (req, res) => {
    console.log("start");
  
    try {
      const quote = await records.getQuote(req.params.id);
      if (quote) {
        console.log("inside");
        await records.deleteQuote(quote);
        res.status(204).end({ message: "done" });
      } else {
        res.status(404).json({ message: "Quote not found" });
      }
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });
  
  //using global asyncHandler to take care of try catch block
  router.post(
    "/quotes/",
    asyncHandler(async (req, res) => {
      if (req.body.author && req.body.quote) {
        const quote = await records.createQuote({
          quote: req.body.quote,
          author: req.body.author
        });
        res.json(quote);
      } else {
        res.status(400).json({ message: "quote and author required" });
      }
    })
  );
  
  module.exports = router;