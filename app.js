
const express = require("express");
const app = express();
const routes = require('./routes');

const records = require("./records");


app.use(express.json());
app.use('/api',routes);

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
