const express = require('express');
const app = express();

const data = {
    quotes: [
      {
        id: 8721,
        quote: "We must accept finite disappointment, but we must never lose infinite hope.",
        author: "Martin Luther King"
      },
      {
        id: 5779,
        quote: "Use what you’ve been through as fuel, believe in yourself and be unstoppable!",
        author: "Yvonne Pierre"
      },
      {
        id: 3406,
        quote: "To succeed, you have to do something and be very bad at it for a while. You have to look bad before you can look really good.",
        author: "Barbara DeAngelis"
      }
    ]
  }


//set route
app.get('/quotes', (req, res)=>{
   // res.json({greeting: "hello world"})
   res.json(data);
});

//set route
app.get('/quotes/:id', (req, res)=>{
    // res.json({greeting: "hello world"})
    //res.json(data);

    //test to make sure it localost:3000/quotes/1 responds
    //console.log(req.params.id);

    //now lets get the value
    const quote = data.quotes.find(quote=> quote.id == req.params.id);
    //send as json
    res.json(quote);
//    console.log(quote);

 });
 
 

//send get request to /quotes read a list of quotes
//get reques to /quotes/:id read(view) quote
//send post /quotes to create
// send a put to request /quotes/:id to update
//send delete request to /quotes/:id delete
//send a get request to /quotes/quotes/random read a random quote


app.listen(3000, () => console.log('Quote API listening on port 3000!'));
