const express = require('express')
const bodyParser = require('body-parser');
const analyzer = require("./analyzer/index")
const generate = require('./generator/index.js')
const app = express()
const port = 9009

app.use(bodyParser.json());

app.all("*", function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "*")
  next();
})

app.get('/vue/loader', (req, res) => {
  res.send(analyzer.analyzer())
})

app.post('/create/app', (req, res) => {
  if (req.body) {
    res.send(generate.generateApp(req.body))
  } else {
    res.send('Hello World!')
  }
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
