data = [
	{
    "size": "S",
		"clothing": "Skirt",
		"accessibility": "None",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/s23_02_a07_98686_18891_off_a.jpg"
	},
  {
		"size": "S",
		"clothing": "Shorts",
		"accessibility": "None",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/f22_04_a26_105228_2198_off_a?wid=900"
	},
  {
		"size": "L",
		"clothing": "Tops",
		"accessibility": "Wheelchair-friendly",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/f22_03_a01_104576_19180_off_a.jpg"
	},
   {
		"size": "XL",
		"clothing": "Pants",
		"accessibility": "Wheelchair-friendly",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/f22_04_a06_96000_19572_off_a.jpg"
	},
   {
		"size": "XS",
		"clothing": "Pants",
		"accessibility": "None",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/f22_04_a06_81518_18891_off_a.jpg"
	},
	{
		"size": "M",
		"clothing": "Skirt",
		"accessibility": "Wheelchair-friendly",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/f22_04_a07_61851_28707_off_a.jpg"
	},
	{
		"size": "L",
		"clothing": "Jacket",
		"accessibility": "Wheelchair-friendly",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/f22_04_a04_105127_18891_off_a?wid=900"
	},
	{
		"size": "XL",
		"clothing": "Jacket",
		"accessibility": "None",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/f22_07_a04_100452_10250_off_a?wid=900"
	},
	{
		"size": "XS",
		"clothing": "Shorts",
		"accessibility": "Wheelchair-friendly",
		"image": "https://aritzia.scene7.com/is/image/Aritzia/large/s23_03_a26_109938_18108_off_a.jpg"
	}
];

var products = "",
	sizes = "",
	clothings = "",
	accessibilitys = "";

for (var i = 0; i < data.length; i++) {
	var size = data[i].size,
		clothing = data[i].clothing,
		accessibility = data[i].accessibility,
		image = data[i].image;
	
	//create product cards
	products += "<div class='col-sm-4 product' data-size='" + size + "' data-clothing='" + clothing + "' data-accessibility='" + accessibility + "'<div class='product-inner text-center'><img src='" + image + "'><br />size: " + size + "<br />clothing: " + clothing + "<br />accessibility: " + accessibility + "</div></div>";
	
	//create dropdown of sizes
	if (sizes.indexOf("<option value='" + size + "'>" + size + "</option>") == -1) {
		sizes += "<option value='" + size + "'>" + size + "</option>";
	}
	
	//create dropdown of clothings
	if (clothings.indexOf("<option value='" + clothing+"'>" + clothing + "</option>") == -1) {
		clothings += "<option value='" + clothing + "'>" + clothing + "</option>";
	}
	
	//create dropdown of accessibilitys
	if (accessibilitys.indexOf("<option value='" + accessibility + "'>" + accessibility + "</option>") == -1) {
		accessibilitys += "<option value='" + accessibility + "'>" + accessibility + "</option>";
	}
}

$("#products").html(products);
$(".filter-size").append(sizes);
$(".filter-clothing").append(clothings);
$(".filter-accessibility").append(accessibilitys);

var filtersObject = {};

//on filter change
$(".filter").on("change",function() {
	var filterName = $(this).data("filter"),
		filterVal = $(this).val();
	
	if (filterVal == "") {
		delete filtersObject[filterName];
	} else {
		filtersObject[filterName] = filterVal;
	}
	
	var filters = "";
	
	for (var key in filtersObject) {
	  	if (filtersObject.hasOwnProperty(key)) {
			filters += "[data-"+key+"='"+filtersObject[key]+"']";
	 	}
	}
	
	if (filters == "") {
		$(".product").show();
	} else {
		$(".product").hide();
		$(".product").hide().filter(filters).show();
	}
});

//on search form submit
$("#search-form").submit(function(e) {
	e.preventDefault();
	var query = $("#search-form input").val().toLowerCase();

	$(".product").hide();
	$(".product").each(function() {
		var size = $(this).data("size").toLowerCase(),
			clothing = $(this).data("clothing").toLowerCase(),
			accessibility = $(this).data("accessibility").toLowerCase();

		if (size.indexOf(query) > -1 || clothing.indexOf(query) > -1 || accessibility.indexOf(query) > -1) {
			$(this).show();
		}
	});
});