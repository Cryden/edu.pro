const models = require(__base + 'app/models/models');

module.exports = {

	index: function (req,res,next) {
	  	models.Person.find({}).limit().sort({ title: 1 }).exec().then((persons)=>{

	        res.render('index',{
	            persons
	        });
	        // Отправим рендер образа под именем index
	    }).catch(next);
	}
}