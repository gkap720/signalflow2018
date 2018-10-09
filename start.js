var express = require("express");
var app = express();
var server = require("http").createServer(app);
var port = process.env.PORT || 3000;
server.listen(port, function(){
    console.log("server is running on port " + port);
});

app.use(express.static(__dirname + "/public"));
app.get("/", function(req, res) {
    res.sendFile(__dirname + '/index.html');
});