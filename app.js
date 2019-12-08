const express = require("express");
const app = express();

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

app.use(express.json());

//set route
app.get("/quotes", async (req, res) => {
  // res.json({greeting: "hello world"})
  //res.json(data);
  const quotes = await records.getQuotes();
  res.json(quotes);
});

//set route
app.get("/quotes/:id", async (req, res) => {
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

app.put("/quotes/:id", async (req, res) => {
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

app.delete("/quotes/:id", async (req, res) => {
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
app.post(
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

//send get request to /quotes read a list of quotes
//get reques to /quotes/:id read(view) quote
//send post /quotes to create
// send a put to request /quotes/:id to update
//send delete request to /quotes/:id delete
//send a get request to /quotes/quotes/random read a random quote

app.use((req, res, next) => {
  const err = new Error("Not found");
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message
    }
  });
});

app.listen(3000, () => console.log("Quote API listening on port 3000!"));
