// the model file to define a category document to save it in database

// requiring mongoose module and connect to db
var mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek1@ds153413.mlab.com:53413/api");

// save mongoose schema in variable
var Schema = mongoose.Schema;
// define the category schema and set the configuration of objects
var categorySchema = new Schema({
	categoryName: {
		required: true,
		type: String
	}
});
// save the objects into db and defining the name of document and the name of collection
var Category = module.exports = mongoose.model("Category", categorySchema, "categories");