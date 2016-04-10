

var app = app || {};
app.requester.config('kid_bJSOnKZf1W','ce83cd66b81546b79ccdd001bf8e161c');

var userRequester = new app.UserRequester();
userRequester.login('Ivanchu', "1222");

var countriesRequester = new app.CountriesRequester();
countriesRequester.getCountries();

$('#add').click(function(e){
    countriesRequester.addCountry($('#addinput').val());
});