var express = require("express");
var bodyParser = require("body-parser");
var app = express();
var fs = require("fs");
var router = express.Router();

app.set('dir', '/assets/formJSON/');


router.use(bodyParser.urlencoded({
    extended: true
}));
router.use(bodyParser.json());

router.route("/save-form")
	.post(function (req, res, next) {
		var form = {
			date: new Date().toISOString().slice(0, 19).replace(/:/g, '-'),
			dateShort: new Date().toISOString().slice(0, 10),
			form: req.body.json,
			name: req.body.name
		};
		var name = "form_"+form.name+"_"+form.date+".json";
		fs.writeFile(__dirname + app.get("dir") + name, JSON.stringify(form), function (err) {
			var formList = [];
			if (err) {
				console.log(err);
			} else {
				fs.readdir(__dirname + app.get("dir"), function (err, items) {
					items.forEach(function (fileName) {
				    	var fileContent = fs.readFileSync(__dirname + app.get("dir") + fileName);
				   		var obj = JSON.parse(fileContent);
				    	formList.push({name: obj.name, date: obj.dateShort, form: obj.form});
			    	})
					res.json({
						formList: formList
					});
				});

			}
		});
	});
router.route("/get-list")
	.get(function (req, res, next) {
		var formList = [];
		fs.readdir(__dirname + app.get("dir"), function (err, items) {
			items.forEach(function (fileName) {
		    	var fileContent = fs.readFileSync(__dirname + app.get("dir") + fileName);
		   		var obj = JSON.parse(fileContent);
		    	formList.push({name: obj.name, date: obj.dateShort, form: obj.form});
	    	})
			res.json({
				formList: formList
			});
		});
	})
app.use('/', router);
app.set("port", (process.env.PORT || 3000));
app.use('/', express.static(__dirname + "/assets"));

app.listen(app.get("port"), function () {
	console.log("Server is running: http://localhost:" + app.get("port")+"/");
})