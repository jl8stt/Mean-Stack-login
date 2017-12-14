const express = require('express');
const app = express();
const path = require('path');

const config = require('./config/database');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

mongoose.connect(config.uri, {useMongoClient: true});
mongoose.connection.once('open', () => {
  console.log('connecting to database!')
}).on('error', (err) => {
  console.log('connect error ', err)
})


const port = process.env.PORT || 8080;
app.use(express.static(__dirname + '/client/dist/'))


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/dist/index.html'))
})

app.listen(port, () =>{
  console.log(config.secret)
  console.log('listening on port ' + port)
})
