var app = app || {};

app.UserRequester = (function () {
    function UserRequester(){
        this.serviceUrl = app.requester.baseUrl + "user/" + app.requester.appId;
    }
    UserRequester.prototype.signUp = function(username,password){
        var data = {
            username:username,
            password:password
        };
        app.requester.makeRequest('POST',this.serviceUrl,data).then(function(success){
            sessionStorage['sessionAuth'] = success._kmd.authtoken;
            sessionStorage['userId'] = success._id;
            sessionStorage['userName'] = success.username;
        },function(error){
            console.log(error);
        }).done()
    };

    UserRequester.prototype.login = function(username,password){
        var requestUrl = this.serviceUrl + '/login';
        var data = {
            username:username,
            password:password
        };
        app.requester.makeRequest('POST',requestUrl,data).then(function(success){
            sessionStorage['sessionAuth'] = success._kmd.authtoken;
            sessionStorage['userId'] = success._id;
            sessionStorage['userName'] = success.username;
        },function(error){
            console.log(error);
        }).done()
    };
    return UserRequester;
})();