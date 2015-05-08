module.exports = function (app) {

app.get('/', function(req, res){
	// res.send('Hello Worlds');
	res.render('index');
})
}