// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));


var filterInt = function(value) {
  if (/^(\-|\+)?([0-9]+|Infinity)$/.test(value))
    return Number(value);
  return NaN;
}




// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.redirect("/api/timestamp/1")
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});

app.get("/api/timestamp/:timestamp", (req, res) => {
  const input = req.params.timestamp;
  const inputInt = filterInt(input);
  let date = null;
  
  if(isNaN(inputInt)) {
    date = new Date(input);
  } else {
    date = new Date(inputInt)  
  }
  
  
  let naturalDateStr;
  try {
      naturalDateStr = date.toUTCString();
  } catch(e) {
    naturalDateStr = "Not a valid date"
  }

  
  res.json({ "unix": date.getTime(), "natural": naturalDateStr });
})



// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

