const cors = require('cors');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();
var request = require('request');
app.use(cors());
app.use(bodyParser.json());
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Example app listening on port' + port)
});

app.get('/', (req, res) => {
  res.send('Hello Test!')
});

app.post('/TriggerQualtrics', (req, res) => {

  var options = {
    method: 'POST',
    url: 'https://sapdemo.eu.qualtrics.com/oauth2/token',
    headers:
    {
      'content-type': 'application/x-www-form-urlencoded',
      authorization: 'Basic VVJfOUdsVnlUOE1nSHRDVGp2fDVHZ0VEajQ3S3JJSjpyUzZiemJsbmluYzJLSk5zSVU4SnVBaTk='
    },
    form: { grant_type: 'client_credentials' }
  };

  request(options, function (error, response, body) {
    if (error) throw new Error(error);
    else {
      var json = JSON.parse(body);
      var options = {
        method: 'POST',
        url: 'https://sapdemo.eu.qualtrics.com/API/v3/surveys/SV_835pLEC04N4W1et/responses',
        headers:
        {
          'x-api-key': 'ulJBR2bWEd0YhoLrr2AvCcwb495b6H6adoC6Zed1',
          'content-type': 'application/json',
          'authorization': 'Bearer' + " " + json.access_token
        },
        body: { values: req.body },
        json: true
      };

      request(options, function (error, response, body) {
        if (error) throw new Error(error);
        else
        {
          res.send(body)
        }  
      
      });
    }
  });
  
});


