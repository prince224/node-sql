var express = require ('express'),
	app = express(),
	server = require('http').createServer(app),
	bodyParser = require('body-parser'),

	db = require('./databaseconnect.js'),
	model = require('./modeles/myModele.js')
	;
	/*-------------------------------------------------------------------- */
	app.use(bodyParser());
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded());

/*------------------------------------------------------------------------ */
	var mydatabase = db.databaseconnect;
	var donnees = [];
/*------------------------------------------------------------------------ */
	app.get('/', function(req, res){
		res.setHeader('content-Type', 'text/html');
		res.render('index.twig')
		})

		.get('/contenu', function(req,res){

				res.setHeader('content-Type', 'text/html');

				mydatabase.query(model.SelectQuery, function (error, results, fields){
				    if (error) {
				      console.log(error);
				      return;
				    }
				 
				    if ( results.length > 0 )  
				    { 
				    	donnees = results;
				    	res.render('contenu.twig', { tableau : donnees })
				    } else {
				      console.log("Pas de données");
				    }
				});
				
			})

		.post('/ajouter', function(req, res){

			var post = { nom : req.body.nom, prenom : req.body.prenom };
			mydatabase.query(model.insertQuery, post, function (error, result) {
				if (error)
				{
					console.log(error);
				}
			res.redirect('/');
			});
		});

/*------------------------------------------------------------------------- */
server.listen(1338);