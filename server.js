// Packages
const express = require("express")
const bodyParser = require("body-parser")
var path = require("path")

var routeIndex = require('./routes/index');
var routeApi = require('./routes/api');

const app = express()

// This is needed for SSL Certificate issue
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

// Body Parser
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'public')))
// Port
var port = process.env.PORT || 2525;



app.use('/', routeIndex);
app.use("/api", routeApi);

module.exports = app;

app.listen(port, function () {
    console.log("Example app listening on port " + port)
})
