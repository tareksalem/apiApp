// the model file to define a product document to save it in database

// requiring mongoose module and connect to db
var mongoose = require("mongoose");
mongoose.connect("mongodb://tarek:tarek1@ds153413.mlab.com:53413/api");
// end
// save mongoose schema in variable
var Schema = mongoose.Schema;
// define the product schema and set the configuration of objects
var productSchema = new Schema({
	productName: {
		type: String,
		required: true,
	},
	productNumber: {
		type: String,
		required: true,
	},
	productDescription: {
		type: String,
		required: true,
	},
	productCategory: {
		required: true,
		type: String
	},
	productPrice: {
		required: true,
		type: String
	}
});
// save the objects into db and defining the name of document and the name of collection
var Product = module.exports = mongoose.model("Product", productSchema, "products");