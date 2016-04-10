var app = app || {};

app.CountriesRequester = (function () {
    function CountriesRequester(){
        this.serviceUrl = app.requester.baseUrl + "appdata/" + app.requester.appId + '/countries/';
    }
    CountriesRequester.prototype.getCountries = function(){
        var that = this;
        app.requester.makeRequest('GET',this.serviceUrl,null,true).then(function (success) {
            var ul = $('#countriesUl');

            success.forEach(function(e){
                var currentLi = $('<li>').html(e.name);
                currentLi.attr('id', e._id);
                ul.append(currentLi);
                var input = $('<input>')
                var btn = $('<button>Edit</button>')
                btn.attr('id', e._id);
                btn.click(function(e){
                    that.editCountry(this.id,input.val());
                    $('li#'+this.id).html(input.val())
                });
                var delBtn = $('<button>Delete</button>');
                delBtn.attr('id', e._id);
                delBtn.click(function(e){
                    that.deleteCountry(this.id);
                });

                ul.append(input);
                ul.append(btn);
                ul.append(delBtn);

            })
        },function(error){
            console.log(error);
        }).done();
    };
    CountriesRequester.prototype.getCountry = function(country){
        var currentUrl = this.serviceUrl + '?query={"name":"' + country + '"}';
        app.requester.makeRequest('GET',currentUrl,null,true).then(function (success) {
            return success[0]._id;
        },function(error){
            console.log(error);
        }).done();

    };
    CountriesRequester.prototype.addCountry = function(country){
        var data = {
            name:country
        };
        return app.requester.makeRequest('POST',this.serviceUrl,data,true).then(function (success) {
            console.log(success);
        },function(error){
            console.log(error);
        }).done();
    };
    CountriesRequester.prototype.editCountry = function(id,edited){

        var data = {
            name:edited
        };
        app.requester.makeRequest('PUT',this.serviceUrl+id,data,true).then(function (success) {
            console.log(success);
        },function(error){
            console.log(error);
        }).done();
    };
    CountriesRequester.prototype.deleteCountry = function(id){
        var url = this.serviceUrl+""+id;
        console.log(url)
        app.requester.makeRequest('DELETE',url,null,true).then(function (success) {
            console.log(success);
        },function(error){
            console.log(error);
        }).done();
    };

    return CountriesRequester;
})();