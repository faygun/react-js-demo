
$(document).ready(function(){
    var product = $(".btn-product");
    var provider = $(".btn-provider");

    product.click(function(){
        ServiceHelper.getProducts(prepare);
    });

    provider.click(function(){
        ServiceHelper.getProviders(prepare);
    });
});
var item = function(container, data, type){
    var html = "<div style='border:1px solid red;' data-id='"+ data.id +"'><span>" + data.title + "</span></div>"
    if(type == 2){
        html = "<div style='border:1px solid red;' data-id='"+ data.id +"'><span>" + data.name + " " + data.username + "</span></div>"
    }
    container.append(html);

};
function prepare(response){
    var container = $("div.response");
    container.html("");
    if(response){
        response.data.forEach(element => {
            item(container, element, response.type);
        });
    }
}

var ServiceHelper = {
    getProducts : function(callback){
        var request = {
            "url":"/api/service?methodName=GetProducts",
            "method" : "POST"
        }

        $.ajax(request).done(function(response){
            callback(response);
        })
    },
    getProviders : function(callback){
        var request = {
            "url":"/api/service?methodName=GetProviders",
            "method" : "POST"
        }

        $.ajax(request).done(function(response){
            response.type = 2
            callback(response);
        })
    }
}