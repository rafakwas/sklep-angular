var express = require('express');
var app = express();
app.get('/', function (req, res) {
console.log("Otrzymano żądanie GET dla strony głównej");
res.send('Hello GET');
})
app.post('/', function (req, res) {
console.log("Otrzymano żądanie POST dla strony głównej");res.send('Hello POST');
})
app.delete('/usun', function (req, res) {
console.log("Otrzymano żądanie DELETE dla strony /usun");
res.send('Hello DELETE');
})
app.put('/user_list', function (req, res) {
console.log("Otrzymano żądanie PUT dla strony /user_list");
res.send('Lista użytkowników');
})
app.get('/ab*cd', function(req, res) { // wzorzec strony: abcd, abxcd, ab123cd, ...
console.log("Otrzymano żądanie GET dla strony /ab*cd");
res.send('Wzorzec strony dopasowany');
})
var server = app.listen(5000, function () {
var host = server.address().address
var port = server.address().port
console.log("Przykładowa aplikacja nasłuchuje na http://%s:%s", host, port)
});
