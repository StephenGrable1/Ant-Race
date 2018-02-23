const express = require('express');
require('dotenv').load();

const app = express();
const port = process.env.PORT || 5000;


//Ant Data Call
app.all("/api/get-ant-info/", function(req,res){
    var url = "https://antserver-blocjgjbpw.now.sh/graphql";
  
    req.get(url, function(error,response,body) {
      if (!error && response.statusCode == 200){
        res.send(body);
      } else {
        console.log("From Facebook: ", error);
      }
    })
  });

app.listen(port, () => console.log(`Listening on port ${port}`));
