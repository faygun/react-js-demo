var express = require("express");
var router = express.Router();
const axios = require("axios");

router.post("/service", function(req, res){
    var url = "";
    if(req.query.methodName === "GetProducts")
    {
        url = "https://api.myjson.com/bins/10ms55";
    }
    else if(req.query.methodName === "GetProviders") {
        url = "https://jsonplaceholder.typicode.com/users";
    }

    axios({
        method:"get",
        url:url
    }).then(response => {
        data = response.data
        res.json({data: data})
    }).catch(error => {
        console.log(error);
    });
});

module.exports = router;