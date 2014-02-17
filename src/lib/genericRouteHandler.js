'use strict';

(function () {

    var  genericRouteHandler =  {};

    genericRouteHandler.createError = function(title, detail, code) {
        return {
            errorTitle: title,
            errorDetail: detail,
            errorCode: code || 500
        }
    };

    genericRouteHandler.success = function(request, response, data){
        'use strict';
        response.writeHead(200, {"Content-Type": "application/json"});
        var output = { 'error': null, 'data': data };
        response.end(JSON.stringify(output) + "\n");
    };

    genericRouteHandler.failure = function(request, response, error) {
        'use strict';
        var e = error;
        if(error instanceof Error){
            e = this.createError(error.message, error.message, error.code)
        }
        response.writeHead(e.code, { "Content-Type" : "application/json" });
        response.end(JSON.stringify(e + "\n"));
        ;}

    genericRouteHandler.notFound = function(request, response) {
        'use strict';
        var error = this.createError('page not found', 'could not find the resource you requested', 404);
        response.writeHead(error.errorCode, { "Content-Type" : "application/json" });
        response.end(JSON.stringify(error + "\n"));
    };


    module.exports = genericRouteHandler;
}());
