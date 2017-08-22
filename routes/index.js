// this file for control in routes of app and save data in database
// require express module
var express = require('express');

// set express router variable to make the routes
var router = express.Router();

// import category model
var Category = require("../models/category");

// import product file
var Product = require("../models/product");

/* GET home page. */
router.get('/', function(req, res, next) {
	//function to fetch the categories from db
	Category.find().exec(function (err, category) {
		if (err) {
			console.log(err);
		}
		var success = req.flash("success");
		//function to fetch the products from database
		Product.find().exec(function (err, product) {
			if (err) {
				console.log(err);
			}
			res.render('index', { title: 'homepage', category: category, success: success, product:product});
		});
	});
});


// function to check if the category input field is empty or not with express validator
function checkCategory(req, res, next) {
	var categoryName = req.body.categoryName;
	req.checkBody("categoryName", "category name field is required").notEmpty();
	// save validation errors in variable
	var errors = req.validationErrors();

	// check if there are validqtion errors errors
	if (errors) {
		//function to fetch the categories from db
		Category.find().exec(function (err, category) {
			if (err) {
				console.log(err);
			}
			var success = req.flash("success");
			Product.find().exec(function (err, product) {
			if (err) {
				console.log(err);
			}
			res.render('index', { title: 'homepage', category: category, success: success, product:product});
		});
			
		});
	} else {
		// if not errors make a save process complete
		next();
	}
}
// router for post a new category
router.post("/add/category", checkCategory, function (req, res, next) {
	// use new instractor to save a category name in new object
	var newCategory = new Category();
	newCategory.categoryName = req.body.categoryName;
	// save the input file called category name into a category document in db
	newCategory.save(function (err) {
		if (err) {
			//throw err;
			console.log(err);
		} else {
			res.redirect("/");
		}
	});
});
// validation function to validate the post new product inputs
function productValidation(req, res, next) {
	var productName = req.body.productName;
	var productNumber = req.body.productNumber;
	var productDescription = req.body.productDescription;
	var productCategory = req.body.productCategory;
	var productPrice = req.body.productPrice;
	req.checkBody("productName", "the product name is required").notEmpty();
	req.checkBody("productNumber", "the product number is required").notEmpty();
	req.checkBody("productNumber", "the product number should be number").isInt();
	req.checkBody("productDescription", "product description is required").notEmpty();
	req.checkBody("productPrice", "the product price is required").notEmpty();
	req.checkBody("productPrice", "the product price should be number").isInt();
	var errors = req.validationErrors();
	if (errors) {
		Category.find().exec(function (err, category) {
			if (err) {
				console.log(err);
			}
			res.render('index', { title: 'homepage', category: category, errors: errors});
		});	
	} else {
		next();
	}
}
// router for post a new product
router.post("/add/product", productValidation, function (req, res, next) {
	// grap the product model and save data into it
	var newProduct = new Product();
	newProduct.productName = req.body.productName;
	newProduct.productNumber = req.body.productNumber;
	newProduct.productDescription = req.body.productDescription;
	newProduct.productCategory = req.body.productCategory;
	newProduct.productPrice = req.body.productPrice;
	newProduct.save(function (err) {
		if (err) {
			console.log(err);
		}
		req.flash("success", "the product posted successfully");
		res.redirect("/");
	});
});
// router for edit the product
router.post("/product/edit/:id", function (req, res, next) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			console.log(err);
		}
		product.productName = req.body.productName;
		product.productNumber = req.body.productNumber;
		product.productDescription = req.body.productDescription;
		productPrice = req.body.productPrice;
		product.save(function (err) {
			if (err) {
				console.log(err);
			}
			req.flash("success", "the product edited successfuly");
			res.redirect("/");
		});
	});
});
// router for delete the product
router.post("/product/delete/:id", function (req, res, next) {
	Product.findById(req.params.id, function (err, product) {
		if (err) {
			console.log(err);
		}
		product.remove(function (err) {
			if (err) {
				console.log(err);
			}
			req.flash("success", "the product deleted successfuly");
			res.redirect("/");
		});
	});
});
module.exports = router;
