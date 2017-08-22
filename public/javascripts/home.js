// start execute a fucntions after document ends loading
$(document).ready(function () {
	// functions to show to fform to post a new ctegory of products
	$(".productCategory").focus(function () {
		$(".btn-add-category").fadeIn(200, function () {
			$(this).on("click", function () {
				$(".add-category-overlay").slideDown(200, function () {
					$(".fa-times").on("click", function () {
						$(".add-category-overlay").slideUp(200);
					});
				});
			});
		});
	});
	//end
	// function to slide the container of edit the product
	$(".product .edite-product-icon").on("click", function () {
		$(this).siblings(".container-edit-product").slideDown(200, function () {
			$(".container-edit-product .fa-times").on("click", function () {
				$(this).parent(".container-edit-product").slideUp(200);
			});
		});
	});
	// function to delte the product
	$(".product .delete-prodcut-icon").on("click", function () {
		$(this).siblings(".container-delete-product").children('form').children('.delete').click();
		alert();
	});
});