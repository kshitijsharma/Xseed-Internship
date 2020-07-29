const bodyParser = require('body-parser');
const express = require('express');
const path=require('path');
const app = express();
const port=process.env.PORT||3000
app.use(bodyParser.json())
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);

const fileRoute = require('./routes/file');
app.use('/files',express.static(path.join(__dirname,'./uploads')));
app.get('/files/:name', function (req, res, next) {
    var options = {
      root: path.join(__dirname, './uploads'),
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    }
  
    var fileName = req.params.name
    res.sendFile(fileName, options, function (err) {
      if (err) {
        next(err)
      } else {
        console.log('Sent:', fileName)
      }
    })
  })
app.use('/file', fileRoute);

app.listen(port, () => {
    console.log('Server started on port : ' + port);
});