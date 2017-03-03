var path = require('path');
var formidable = require('formidable');
var fs = require('fs');

module.exports = {

	index: function (req,res) {
  		res.status(200).render ('import', {title: "import"});
	},

	import: function(req, res, next){

		var form = new formidable.IncomingForm();  // create an incoming form object
		form.multiples = true;  // specify that we want to allow the user to upload multiple files in a single request
		form.uploadDir = path.join(__base, '/public/uploads'); // store all uploads in the /uploads directory
		
		form.parse(req, function(err, fields, files) {
			if (err) throw error;
			//console.log(files);
		});

		// every time a file has been uploaded successfully, rename it to it's orignal name
		form.on('file', function(field, file) {
			fs.rename(file.path, path.join(form.uploadDir, file.name)); 
			convert_to_json(path.join(form.uploadDir, file.name), res);
		});

		// log any errors that occur
		form.on('error', function(err) {
			res.end('Ошибка');
		});

		// once all the files have been uploaded, send a response to the client
		form.on('end', function(data) {
			//console.log('file upload');
			//res.end(data);
		});
	}
}

// import to bd module

const parseString = require('xml2js').parseString;
const iconv = require('iconv-lite');
		
function convert_to_json (file, res) {
	let promise = new Promise((resolve, reject) => {
		fs.readFile(file, 'binary', function(err, data) {
			if (err) throw err;
			resolve(data);
		});
	});

	promise
		.then(data => {
			var obj = iconv.decode(data, '1251');
			console.log('Step 1 OK!');
			return obj
		}).then(obj => {
			result = parse_xml(obj);
			var json = JSON.stringify(result, null, ' ');
			console.log('Step 2 OK!')
			return json
		}).then(json => {
			data_base_json(json);
			return json
		})
		.then(json => {
			fs.writeFileSync(file + '_to.json', json)
			res.end('Импорт завершен!');
		})
};	

function parse_xml(obj) {
	var json;
	parseString(obj, function (err, result) {
		return json = result;
		console.dir(result);
	});
	return json;
};


// bd update module
const models = require(__base + 'app/models/models');

function data_base_json(obj) {

	var objects = JSON.parse(obj);		
	var array = objects.rez.itemperson;


	array.forEach(function(object) {

		var person = new models.Person({
	        title: object.VFAMILY[0]._ + ' ' + object.VNAME[0]._ + ' ' + object.VLASTNAME[0]._ ,
	        family: object.VFAMILY[0]._,
		    name: object.VNAME[0]._,
		    lastname: object.VLASTNAME[0]._,
		    sex: object.VPOL[0]._,
		    birthday: object.VDATAR[0]._,
		    nation: object.VNATION[0]._,
		    obrazov: object.VOBRAZOV[0]._,
		    nomotr: object.VNOMOTR[0]._
		});

		person.save(function (err) {
	        if (!err) {
	            console.info("person created");
	        } else {
	            console.log(err);
	        }

	    });
			
		console.log(object.VFAMILY[0]._ + ' ' + object.VNAME[0]._);
	});
}