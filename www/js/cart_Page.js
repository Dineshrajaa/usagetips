	$(document).ready(function() {
	    /*Jquery custom method for animating texts*/
	    $.fn.extend({
	        animateCss: function(animationName) {

	            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
	                $(this).removeClass('animated ' + animationName);

	            });

	        }
	    });
	    var scrollPos = 0; // variable for enabling & disabling scroll
	    console.log('doc ready');
	    localStorage.setItem('productid', ' ');
	    $(".bottom-search-bg").hide();
	    var userdata = loginMethods.getUserInfo();
	    var category = ''
	    categoryitemclicked = false
	    var pk = '';
	    page_no = 1;
	    $body = $("body");
	    cat = ""
	    type = ''
	    color = ''
	    hasnext = false
	        //to position popup(left/right)
	    index = ''

	    var userdata = loginMethods.getUserInfo();

	    if (localStorage.getItem('backbuttonpressed') == 'true') {
	        localStorage.setItem('backbuttonpressed', 'false');
	        cat = localStorage.getItem('productcat');
	        console.log(localStorage.getItem('productcat'));
	        page = localStorage.getItem('page');
	        console.log(localStorage.getItem('page'));
	        type = localStorage.getItem('type');
	        console.log(localStorage.getItem('type'));
	        color = localStorage.getItem('color');
	        console.log(localStorage.getItem('color'));
	        if (color) {
	            console.log('localStorage.getItem()');
	            //make ajax color based on color filter
	            //loadprofcolr();
	        } else
	            console.log('lodng');
	        //without color filter
	        makeAjaxcall();

	    }

	    if (userdata.fbGender == 'female') {
	        cat = "";
	        //cat = 'bags';
	        type = 'female'
	            //ajax call without color filter
	        makeAjaxcall();

	    } else {
	        cat = "";
	        type = 'male'
	        makeAjaxcall();
	    }



	    //for hiding search-bar
	    /*$(window).scroll({
	    		previousTop: 0
	    	},
	    	function() {
	    		console.log('scrolled');

	    		var currentTop = $(window).scrollTop();
	    		if (currentTop == '0') {
	    			$(".bottom-search-bg").hide();
	    		} else {
	    			$(".bottom-search-bg").show();
	    		}
	    		this.previousTop = currentTop;

	    		if ($(window).scrollTop() + $(window).height() == $(document).height()) {
	    			//alert("bottom!");
	    			//if(hasnext)
	    			  loadmore();
	    			// else 
	    			  //alert('No more products available'); 					 
	    		}

	    	});*/

	    $(window).on('scroll load', function() { // adding load event to handle it in case of default scroll done on page load
	        var scrolled = $(this).scrollTop(),
	            docHeight = $(document).height(),
	            windHeight = $(this).height();
	        var scrollPercent = ((scrolled / (docHeight - windHeight)) * 100).toFixed(2);
	        if (scrollPercent >= 50) {
	            if (hasnext)
	                loadmore();
	            else
	                console.log('No more products available');
	        }
	    });


	    //View Item Details event
	    $(document).on('click', '.items', function(e) {
	        mixpanel.track("view_item_details", {
	            "id": '123'
	        });

	        console.log(e.target.id);
	        index = $(this).attr("alt");

	        var var1 = jQuery(this).data('target');
	        $("#img1myModal" + index).attr('src', '')
	        $("#img2myModal" + index).attr('src', '')
	        $("#img3myModal" + index).attr('src', '')
	        $("#img4myModal" + index).attr('src', '')
	        $("#myModal" + index).find(".product-name-in-popup").text('');
	        $("#myModal" + index).find(".retail_price_item").text('')
	        $("#myModal" + index).find(".odometer").text('')
	        $("#myModal" + index).find(".saved-amount_price_item").text('')
	        $("#myModal" + index).find(".buy-button-amazon").attr('data-purchaseurl', '');
	        jQuery(var1).modal('show');


	    });
	    //preview event
	    $(document).on('click', '.items', function() {
	        localStorage.viewProduct = $(this).attr("id"); // Store the id/pk value for viewing the product
	        mixpanel.track("preview", {
	            "id": '1234'
	        });

	    });

	    //color--picker
	    /*$(document).on('click', '.border-colorpicker div', function(e) {

	    	var id = e.target.id;
	    	if (id == 'c19' || id == 'c20')
	    		color = 'red'
	    	else if (id == 'c1' || id == 'c2' || id == 'c3')
	    		color = 'orange'
	    	else if (id == 'c17')
	    		color = 'pink,blue'
	    	else if (id == 'c10' || id == 'c11' || id == 'c12' || id == 'c13' || id == 'c14' || id == 'c15' || id == 'c16')
	    		color = 'blue'
	    	else
	    		console.log('not at backend');

	    	callforcolorfilter();

	    });*/
	    //add to cart 
	    $(document).on('click', '.app-logo-in-popup', function() {
	        cat = ""
	        $('.add-items').html('');
	        makeAjaxcall()


	    });
	    $(document).on('click', '.add-to-cart', function() {
	        mixpanel.track("add_to_cart", {
	            "id": '12345'
	        });

	    });
	    $(document).on('click', '.app-logo-in-popup', function() {
	        cat = ""
	        $('.add-items').html('');
	        makeAjaxcall()


	    });
	    //remove from cart 
	    $(document).on('click', '.remove', function() {
	        mixpanel.track("remove_from_cart", {
	            "id": '123remove'
	        });
	    });
	    //hide div if no fav list

	    /*	$('#favoritedropdown').find('ul').each(function(){
	    	   var txt = $("li", this).text();
	    	   if(txt.length <= 0){
	    		  $(this).hide();
	    	   }
	    	}); */
	    //$('#colord').on('click' ,'#colord')
	    //disable favorite if no favorite
	    if ($('.scrollable-menu-favourite div').length < 1) {
	        $("#favoritedropdown .dropdown-toggle").addClass("disabled");
	    }

	    //filter by category
	    /*$(".scrollable-menu-filter li:not(:first-child)").click(function(){
	    alert('hello');
	       mixpanel.track("filter_by_category", {
	      "id": '123category'
	    });
	    });*/


	    //display on basis of category 

	    /* $(".scrollable-menu-color").on("click", "li", function(event) { 
	    					 var colorValue = $(event.target).attr('class')
	    					 if(colorValue=='black-color')
	    					 {
	    					 colorRange='black'
	    					 console.log(colorRange)
	    					 }
	    					 else if(colorValue=='pink-color') {
	    					 colorRange='lightpink'
	    					 console.log(colorRange)
	    					 }
	    					 else if(colorValue=='cream-color') {
	    					 colorRange='cream'
	    					 console.log(colorRange)
	    					 }
	    					 else{
	    					 colorRange=='ALL'
	    					 console.log(colorRange)
	    					 }
	    					 
	    					 callforcolorfilter(colorRange)
	    				
	    				   });*/



	    $(".dropdown-menu").on("click", "li", function(event) {
	        console.log("dropdown-menu id:" + event.target.id)
	        var id = event.target.id;


	        categoryitemclicked = true
	        page_no = 1;
	        if (userdata.fbGender == 'female') {
	            type = 'female'
	            if (id == 'clothingimg') {
	                cat = 'clothing' //req
	                console.log(cat);

	            } else if (id == 'necklaceimg') {
	                cat = 'accessories' //changed


	            } else if (id == 'purseimg') {
	                cat = 'bags' // req
	                console.log(cat);

	            } else if (id == 'sandleimg') {
	                cat = 'flowers' //change
	                console.log(cat);

	            } else {
	                cat = "";





	            }
	        } else {
	            type = 'male'
	                //alert('else')
	            if (id == 'clothingimg') {
	                cat = 'fashion' //changed
	                console.log(cat);

	            } else if (id == 'watchimg') {
	                cat = 'flowers' //changed
	                console.log(cat);

	            } else if (id == 'gadgetimg') {
	                cat = 'electronics' //old
	                console.log(cat);


	            } else if (id == 'cycleimg') {
	                cat = 'outdoor' //old
	                console.log(cat);

	            } else {

	                cat = ""; //old

	            }



	        }
	        $.ajax({
	            type: 'GET',
	            url: "http://staging12.getpriceapp.com/item/list/",
	            beforeSend: function() {
	                console.log('ajaxstart');
	                $body.addClass("loading");
	            },
	            complete: function() {
	                //alert('ajaxstopp')
	                $body.removeClass("loading");

	            },
	            contentType: "application/json",
	            dataType: "json",
	            data: {
	                "category": cat,
	                "page": page_no,
	                "show_by": 10,
	                'type': type

	            },
	            success: function(data) {
	                //alert(JSON.stringify(data));

	                console.log('insidesucees');
	                var getitemdata = JSON.stringify(data);
	                console.log(JSON.stringify(data));
	                localStorage.setItem('itemdata', '');
	                localStorage.setItem('itemdata', getitemdata);
	                var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	                console.log(JSON.stringify(parsedata[0].paginator))
	                console.log('329')
	                if (parsedata[0].paginator.has_next)
	                    hasnext = true;

	                if (parsedata[0].products.length) {
	                    console.log('calling load prof from windows ');
	                    loadprofNew("false");
	                    fetchFavorites(); //Load the favorites
	                } else {
	                    $('.add-items').html('');
	                    mwidth = $(window).width();
	                    mheight = $('body').height()

	                    //$('.add-items').css({"height":mheight });
	                    //$('.add-items').css({"width":mwidth });
	                    $('.add-items').append('<div class="jumbotron">\
			<h1>No Data Available</h1> </div>')


	                }

	            },

	            error: function(xhr, status, error) {
	                console.log(xhr);
	            }


	        }); //end of ajax call 






	    });

	    //add to fav on click of like button 


	    $(document).on('click', '.like', function(e) {

	        console.log('inside like:' + $(this).data("favorite"));
	        var proid = parseInt(e.target.id);
	        var propicid = e.target.id;
	        if ($(this).data("favorite") == "like") {
	            var purchaseurl = $(this).data("purchaseurl");
	            $(this).data("favorite", "liked");
	            $(this).attr("src", "img/liked.png");
	            $.ajax({
	                url: "http://staging12.getpriceapp.com/favourites/add",
	                data: {
	                    'item': proid,
	                    'user': localStorage.getItem('tokenid')
	                },
	                type: "POST",
	                dataType: "json",
	                success: function(response) {
	                    console.log(response);
	                    console.log(JSON.stringify(response));
	                    console.log(proid);
	                    var srcimg = $("#" + proid).attr('src')
	                    console.warn(srcimg);
	                    var removefavid = response.pk;
	                    var favObject = {
	                        itemThumbURL: srcimg,
	                        itemStoreLink: purchaseurl,
	                        pk: removefavid,
	                        likebtnid: propicid
	                    };
	                    $('.scrollable-menu-favourite').append(getFavoritesHTML(favObject));
	                    console.log("Successss - adding " + removefavid);
	                    if ($('.scrollable-menu-favourite div').length > 0) {
	                        $("#favoritedropdown .dropdown-toggle").removeClass("disabled");
	                    }

	                },
	                error: function() {
	                    console.log("No JSON data returned");
	                }
	            });
	        } else {
	            /*console.log("Already Liked");
	            window.plugins.toast.showLongBottom('Already in your favorites list', function(a) {
	            	console.log('toast success: ' + a)
	            }, function(b) {
	            	alert('toast error: ' + b)
	            })*/
	            $(this).attr("src", "./assets/img/like.png");
	            $(this).data("favorite", "like");
	            $.ajax({
	                url: "http://staging12.getpriceapp.com/favourites/delete",
	                data: {
	                    'id': proid,
	                    'user': localStorage.getItem('tokenid')
	                },
	                type: "POST",
	                dataType: "json",
	                success: function() {
	                    var rmdivid = propicid + 'div';
	                    console.log("Successss " + rmdivid);
	                    $("#" + rmdivid).remove();

	                    if ($('.scrollable-menu-favourite div').length < 1) {
	                        $("#favoritedropdown .dropdown-toggle").addClass("disabled");
	                    }
	                },
	                error: function() {
	                    console.log("No JSON data returned");
	                }
	            });
	        }

	    });


	    //removefromfav
	    /* $(".dropdown-menu").on("click", "img", function(e) {
	    	console.log(e.target.id);

	    	var pkid = parseInt(e.target.id)
	    	console.log(pkid);
	    	$.ajax({
	    		url: "http://staging12.getpriceapp.com/favourites/delete",
	    		data: {
	    			'id': pkid
	    		},
	    		type: "POST",
	    		dataType: "json",
	    		success: function() {
	    			console.log("Successss");
	    			var rmdivid = pkid + 'div'
	    			$("#" + rmdivid).remove();
	    		},
	    		error: function() {
	    			console.log("No JSON data returned");
	    		}
	    	});


	    });*/
	});

	function changeText(od, realValue) {
	    $(".shopname").text("Rei.com");
	    /*setTimeout(function() {
	                    $(".shopname").text("Rei.com");
	                    $(".shopname").animateCss("flipOutX");
	                }, 500);*/
	    setTimeout(function() {
	        od.update(realValue - 1);
	        $(".shopname").text("Tradsey.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1100);
	    setTimeout(function() {
	        od.update(realValue - 2);
	        $(".shopname").text("Oodle.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1400);
	    setTimeout(function() {
	        od.update(realValue - 3);
	        $(".shopname").text("Nordtroms.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1600);
	    setTimeout(function() {
	        od.update(realValue - 4);
	        $(".shopname").text("Cabelas.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1800);
	    setTimeout(function() {
	        od.update(realValue - 5);
	        $(".shopname").text("Sportsauthority.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2000);
	    setTimeout(function() {
	        od.update(realValue - 6);
	        $(".shopname").text("Ebay.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2300);
	    setTimeout(function() {
	        od.update(realValue - 7);
	        $(".shopname").text("TheRealReal.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2600);
	    setTimeout(function() {
	        od.update(realValue - 8);
	        $(".shopname").text("Etsy.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2900);
	    setTimeout(function() {
	        od.update(realValue - 9);
	        $(".shopname").text("Overstock.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 3200);
	    setTimeout(function() {

	        od.update(realValue);
	        $(".shopname").text(localStorage.finalStoreName);
	    }, 3500);
	    return false;
	}


	function setSelectedProduct(selectedPro) {
	    var selectedProId = $(selectedPro).attr("id");
	    var carId = $(selectedPro).data("carid");
	    // Stop Auto carousel
	    $("#" + carId).carousel('pause');
	    $("#" + carId).carousel(0);
	    $("#" + carId).carousel('pause');
	    $("#" + carId).carousel({
	        interval: false
	    });
	    /*$("#" + carId).on('show.bs.modal', function() {
	    	//alert('The modal is about to be shown.');
	    	changeText();

	    });*/
	    $.ajax({
	        type: 'GET',
	        url: 'http://staging12.getpriceapp.com/item-details/' + selectedProId + '/',
	        beforeSend: function() {

	            $body.addClass("loading");
	        },
	        complete: function() {

	            $body.removeClass("loading");
	        },
	        contentType: "application/json",
	        dataType: "json",
	        data: {

	        },
	        success: function(data) {

	            var getitemdetails = JSON.stringify(data);
	            console.log(getitemdetails)
	            localStorage.selectedProDetails = getitemdetails;
	            var productDetail = localStorage.selectedProDetails;

	            var imageArray = new Array(5);
	            imageArray.length = 0; // Empties array
	            console.log(selectedProId);
	            var modalTitle = data.title;
	            var modalprice = data.price;
	            var modalprice_sold = data.price_sold;
	            var modalamount_saved = data.amount_saved;
	            var plength = data.photo_set.length
	            var productImages = data.photo_set;
	            var moda_purchaseURL = data.purchase_url;
	            localStorage.finalStoreName = data.store_name || "Amazon";
	            if (plength == 5) {
	                imageArray[0] = productImages[0].url_large
	                imageArray[1] = productImages[1].url_large
	                imageArray[2] = productImages[2].url_large
	                imageArray[3] = productImages[3].url_large
	                imageArray[4] = productImages[4].url_large
	            } else if (plength == 4) {
	                imageArray[0] = productImages[0].url_large
	                imageArray[1] = productImages[1].url_large
	                imageArray[2] = productImages[2].url_large
	                imageArray[3] = productImages[3].url_large
	                imageArray[4] = productImages[1].url_large

	            } else if (plength == 3) {
	                imageArray[0] = productImages[0].url_large
	                imageArray[1] = productImages[1].url_large
	                imageArray[2] = productImages[2].url_large
	                imageArray[3] = productImages[0].url_large
	                imageArray[4] = productImages[1].url_large
	            } else if (plength == 2) {
	                imageArray[0] = productImages[0].url_large
	                imageArray[1] = productImages[1].url_large
	                imageArray[2] = productImages[0].url_large
	                imageArray[3] = productImages[1].url_large
	                imageArray[4] = productImages[0].url_large
	            } else if (plength == 1) {
	                imageArray[0] = productImages[0].url_large
	                imageArray[1] = productImages[0].url_large
	                imageArray[2] = productImages[0].url_large
	                imageArray[3] = productImages[0].url_large
	                imageArray[4] = productImages[0].url_large
	            } else {
	                imageArray[0] = "./assets/img/no_img.png"
	                imageArray[1] = "./assets/img/no_img.png"
	                imageArray[2] = "./assets/img/no_img.png"
	                imageArray[3] = "./assets/img/no_img.png"
	                imageArray[4] = "./assets/img/no_img.png"

	            }

	            $("#" + carId).find("img.carimage").each(function(i, e) {

	                console.log(i);

	                if (typeof imageArray[i] !== undefined) {
	                    $(e).attr('src', imageArray[i])
	                }


	            });

	            $("#" + carId).find("img.carimage").each(function(i, e) {

	                console.log(i);


	                console.log($(e).attr('src'));


	            });
	            if (modalTitle.length > 40) {
	                var shortText = jQuery.trim(modalTitle).substring(0, 39);
	                shortText = shortText + "..."
	                $("#" + carId).find(".product-name-in-popup").text(shortText);
	            } else
	                $("#" + carId).find(".product-name-in-popup").text(modalTitle);
	            //' + parseFloat(modalprice).toFixed(2) + '
	            $("#" + carId).find(".retail_price_item").text(parseFloat(modalprice).toFixed(2));
	            //+ parseFloat(product.fields.price_sold).toFixed(2) + '
	            $("#" + carId).find(".odometer").text(parseFloat(modalprice_sold).toFixed(2));

	            //$' + parseFloat(product.fields.price - product.fields.price_sold).toFixed(2) + '
	            if (modalprice_sold < modalprice)
	                $("#" + carId).find(".saved-amount_price_item").text(parseFloat(modalprice - modalprice_sold).toFixed(2));
	            else {

	                $("#" + carId).find(".saved-amount_price_item").text('0.00');

	            }
	            $("#" + carId).find(".buy-button-amazon").attr('data-purchaseurl', moda_purchaseURL);


	        },

	        error: function(xhr, status, error) {
	            console.log(xhr.responseText);
	            //alert(xhr.status);	
	        }


	    }); //end of ajax call
	}

	function loadprofNew(clear) {
	    var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	    if (clear == "true") {
	        console.warn("Clearing product list");
	        $('.add-items').html(' '); // if clear==true empty the products list(To avoid problems with Load more have used it)
	    }
	    if (categoryitemclicked) {
	        $('.add-items').html(' ');
	        categoryitemclicked = false;
	    }
	    for (var i = 0; i < parsedata[0].products.length; i++) {
	        var img10, img11;
	        if (parsedata[0].products[i].fields.photo_set.length)
	            img10 = parsedata[0].products[i].fields.photo_set[0].url_large;
	        else
	            img10 = "img/no_img.png";
	        //checking for long text
	        if (parsedata[0].products[i].fields.description != null && parsedata[0].products[i].fields.description.length > 10) {
	            var shorttext = trimLong(parsedata[0].products[i].fields.description);
	            parsedata[0].products[i].fields.description = shorttext;
	        }

	        if (parsedata[0].products[i].fields.brand != null && parsedata[0].products[i].fields.brand.length > 10) {
	            var shorttext = trimLong(parsedata[0].products[i].fields.brand);
	            parsedata[0].products[i].fields.brand = shorttext;
	        }
	        if (parsedata[0].products[i].fields.brand)
	            console.log("Brand available");
	        else parsedata[0].products[i].fields.brand = 'N/A';
	        if (parsedata[0].products[i].fields.description)
	            console.log("Description available");
	        else parsedata[0].products[i].fields.description = 'N/A'
	        $(".add-items").append('<div class="col-md-3 col-sm-6 col-xs-6">' + renderItemNew(i, parsedata[0].products[i], img10) + '</div>');
	    }
	}

	function renderItemNew(uniqueId, product, imgUrl) {
	    if (typeof product == 'undefined')
	        return "";
	    else {
	        var productHtml = '<div class="product-list">'; // productlist start
	        productHtml += '<img src="' + imgUrl + '" class="img-responsive items" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" alt=' + uniqueId + ' data-toggle="modal" data-target="#myModal' + uniqueId + '">'; // Product image
	        productHtml += getModalHTML(uniqueId, product, imgUrl); // Modal html maker call
	        productHtml += '<div class="product-title">'; // product title start
	        productHtml += '<span class="favorite"><img src="img/icons/fav_gray.png" class="like" data-favorite="like" data-purchaseurl="' + product.fields.purchase_url + '" id="' + product.fields.id + 'like"></span>'
	        productHtml += '<h5 data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" data-toggle="modal" data-target="#myModal' + uniqueId + '">'+product.fields.brand+'</h5>'; // product name start & end
	        productHtml += '</div>'; // product title end
	        productHtml += '</div>'; // productlist end
	        return productHtml;
	    }
	    /*return '<img src="' + imgUrl + '" class="img-responsive items" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" alt=' + uniqueId + ' data-toggle="modal" data-target="#myModal' + uniqueId + '">\
									' + getModalHTML(uniqueId, product, imgUrl) +
	        '<div class="row border-outline">\
										<div class="col-xs-12 pic" >\
											<p ><img src="./assets/img/like.png"  class="like" data-favorite="like" data-purchaseurl="' + product.fields.purchase_url + '" id="' + product.fields.id + 'like"><span style="text-decoration: none!important;" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" data-toggle="modal" data-target="#myModal' + uniqueId + '">' + product.fields.brand + '</span>\
												<br> <span style="display:none" class="strike" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" data-toggle="modal" data-target="#myModal' + uniqueId + '">$' + product.fields.price + '</span></p>\
										</div>\
									</div>';*/
	}

	function loadprof(clear) {
	    var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	    //  alert(JSON.stringify(parsedata));
	    console.log(clear);
	    if (clear == "true") {
	        console.warn("Clearing product list");
	        $('.add-items').html(' '); // if clear==true empty the products list(To avoid problems with Load more have used it)
	    }
	    if (categoryitemclicked) {
	        $('.add-items').html(' ');
	        categoryitemclicked = false;
	    }

	    for (i = 0; i < parsedata[0].products.length; i += 2) {

	        var v = 0;
	        console.log("vbefore:" + v);
	        var img10, img11;
	        v = i + 1
	        console.log("v:" + v);
	        //price animation 
	        /*	if (parsedata[0].products[i].fields.price_sold != null && Math.floor(parsedata[0].products[i].fields.price_sold) != parsedata[0].products[i].fields.price_sold) { //console.log(parsedata[0].products[i].fields.price);
	        		//var substr = parsedata[0].products[i].fields.price.split('.');
	        		parsedata[0].products[i].fields.price_sold = Math.floor(parsedata[0].products[i].fields.price_sold)
	        	} else
	        		parsedata[0].products[i].fields.price_sold = 000


	        	if (parsedata[0].products[i + 1].fields.price_sold != null && Math.floor(parsedata[0].products[i + 1].fields.price_sold) != parsedata[0].products[i + 1].fields.price_sold) {
	        		//var substr = parsedata[0].products[i+1].fields.price.split('.');
	        		parsedata[0].products[i + 1].fields.price_sold = Math.floor(parsedata[0].products[i + 1].fields.price_sold)
	        	} else
	        		parsedata[0].products[i + 1].fields.price_sold = 000 */

	        console.log(parsedata[0].products[i].fields.id)
	        if (parsedata[0].products[i].fields.photo_set.length)
	            img10 = parsedata[0].products[i].fields.photo_set[0].url_large;
	        else {
	            console.log('else')
	            console.log(parsedata[0].products[i].fields.id)
	            img10 = "./assets/img/no_img.png"
	        }
	        //console.log(parsedata[0].products[i + 1].fields.id)
	        if (parsedata[0].products[v]) {
	            if (parsedata[0].products[v].fields.photo_set.length)
	                img11 = parsedata[0].products[i + 1].fields.photo_set[0].url_large;
	            else {
	                console.log('else')
	                console.log(parsedata[0].products[v].fields.id)
	                img11 = "./assets/img/no_img.png"


	            }
	        }
	        //checking for long text
	        if (parsedata[0].products[i].fields.description != null && parsedata[0].products[i].fields.description.length > 10) {
	            var shorttext = trimLong(parsedata[0].products[i].fields.description);
	            parsedata[0].products[i].fields.description = shorttext;
	        }




	        if (parsedata[0].products[i].fields.brand != null && parsedata[0].products[i].fields.brand.length > 10) {
	            var shorttext = trimLong(parsedata[0].products[i].fields.brand);
	            parsedata[0].products[i].fields.brand = shorttext;
	        }
	        if (parsedata[0].products[v]) {
	            if (parsedata[0].products[i + 1].fields.description != null && parsedata[0].products[i + 1].fields.description.length > 15) {
	                var shorttext = trimLong(parsedata[0].products[i].fields.description);
	                parsedata[0].products[i + 1].fields.description = shorttext;
	            }
	        }
	        if (parsedata[0].products[i].fields.description != null && parsedata[0].products[i].fields.description.length > 15) {
	            var shorttext = trimLong(parsedata[0].products[i].fields.description);
	            parsedata[0].products[i].fields.description = shorttext;
	        }
	        if (parsedata[0].products[v]) {
	            if (parsedata[0].products[i + 1].fields.brand != null && parsedata[0].products[i + 1].fields.brand.length > 10) {
	                var shorttext = trimLong(parsedata[0].products[i].fields.brand);
	                parsedata[0].products[i + 1].fields.brand = shorttext;
	            }

	        }




	        // if (parsedata[0].products[i].fields.price != null) {} else parsedata[0].products[i].fields.price = 'N/A'

	        if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A';
	        if (parsedata[0].products[v]) {
	            if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[0].products[i + 1].fields.brand = 'N/A'
	            if (parsedata[0].products[i + 1].fields.description) {} else parsedata[0].products[+1].fields.description = 'N/A'
	        }

	        if (parsedata[0].products[i].fields.description) {} else parsedata[0].products[i].fields.description = 'N/A'





	        //modal code for loadpfrof
	        $('.add-items').append('<div class="row ">\
								<div class="col-xs-6 right-padding ">' + renderItem(i, parsedata[0].products[i], img10) +
	            '</div>\
								<div class="col-xs-6 left-padding ">' + renderItem(i + 1, parsedata[0].products[i + 1], img11) +
	            '</div>');


	    }
	}


	function renderItem(uniqueId, product, imgUrl) {
	    console.log(product);
	    if (typeof product == 'undefined') {
	        return "";
	    }
	    console.warn(product);
	    return '<img src="' + imgUrl + '" class="img-responsive items" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" alt=' + uniqueId + ' data-toggle="modal" data-target="#myModal' + uniqueId + '">\
									' + getModalHTML(uniqueId, product, imgUrl) +
	        '<div class="row border-outline">\
										<div class="col-xs-12 pic" >\
											<p ><img src="./assets/img/like.png"  class="like" data-favorite="like" data-purchaseurl="' + product.fields.purchase_url + '" id="' + product.fields.id + 'like"><span style="text-decoration: none!important;" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" data-toggle="modal" data-target="#myModal' + uniqueId + '">' + product.fields.brand + '</span>\
												<br> <span style="display:none" class="strike" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.fields.id + '" data-toggle="modal" data-target="#myModal' + uniqueId + '">$' + product.fields.price + '</span></p>\
										</div>\
									</div>';
	}
	/**/


	function getModalHTML(uniqueId, product, imgUrl) {

	    //not using product array 
	    //data is set after calling setSelectedProduct

	    console.warn(product);
	    console.log("myModal")
	    console.log(uniqueId)
	    return '<div class="modal modalview" id="myModal' + uniqueId + '" role="dialog">\
								<div class="modal-dialog modal-sm">\
									<div class="modal-content  ">\
										<div class="modal-body">\
											<img src="./assets/img/pop-up-close.png" class="pop-up-close-icon " id="' + uniqueId + '"  onclick=" clearData(this) ;$(\'#myModal' + uniqueId + '\').modal(\'hide\')">\
											<div id="myCarousel' + uniqueId + '" class="carousel slide" data-ride="carousel" data-pause="true" data-interval="false">\
												<ol class="carousel-indicators top-margin-indicators">\
													<li data-target="#myCarousel' + uniqueId + '" data-slide-to="0" class="active"></li>\
													<li data-target="#myCarousel' + uniqueId + '" data-slide-to="1"></li>\
													<li data-target="#myCarousel' + uniqueId + '" data-slide-to="2"></li>\
													<li data-target="#myCarousel' + uniqueId + '" data-slide-to="3"></li>\
												</ol>\
		\
												<div class="carousel-inner" role="listbox">\
													<div class="item active">\
														<div class="row">\
															<div class="col-md-12" >\
																<img id="img1myModal' + uniqueId + '" src=""  class="slider-img carimage">\
															</div>\
														</div>\
													</div>\
													<div class="item">\
														<div class="row">\
															<div class="col-md-12">\
																<img id="img2myModal' + uniqueId + '" src="" class="slider-img carimage">\
															</div>\
														</div>\
													</div>\
													<div class="item">\
														<div class="row">\
															<div class="col-md-12">\
																<img id="img3myModal' + uniqueId + '" src="" class="slider-img carimage">\
															</div>\
														</div>\
													</div>\
													<div class="item">\
														<div class="row">\
															<div class="col-md-12">\
																<img id="img4myModal' + uniqueId + '" src="" class="slider-img carimage">\
															</div>\
														</div>\
													</div>\
												</div>\
												</div>\
											\
											<div class="row">\
												<div class="col-xs-12">\
													<p class="product-name-in-popup"></p>\
												</div>\
											</div>\
							\
											<div class="row product-detail-top-margin-in-popup">\
												<div class="col-xs-3">\
													<p class="retail-text-in-popup">RETAIL </p>\
													<p class="retail-price-in-popup"><span>$</span><span class="retail_price_item"></span></p>\
											</div>\
											<div class="col-xs-6 ">\
												<p class="discounted-price-in-pop-up"><span>$</span><span class="odometer"></span><span class="hidden hidden_real_price">' + parseFloat(product.fields.price_sold).toFixed(2) + '</span></p>\
												</div>\
												<div class="col-xs-3"> \
													<p class="saved-text-in-popup">SAVED </p>\
													<p class="saved-amount-in-popup"><span>$</span><span class="saved-amount_price_item"></span></p>\
												</div>\
											</div>\
											\
											<div class="row" style="padding-right:10px; padding-left:10px">\
												<div class="col-xs-12" >\
													<button onclick="showPurchasePage(this)" class="btn btn-block buy-button-amazon" data-purchaseurl="" type="button">BUY <span class="shopname"></span></button>\
\
												</div>\
											</div>\
						\
										</div>\
							\
									</div>\
								</div>\
							</div>';
	}

	function showPurchasePage(selectedProduct) {
	    var url = $(selectedProduct).data("purchaseurl");
	    console.log("url:" + url);
	    if (url != "" || url !== null) {
	        console.log($(selectedProduct).data("purchaseurl"));
	        var browserOptions = {
	            // Inappbrowser options for customization
	            toolbar: {
	                height: 44,
	                color: '#000000'
	            },
	            title: {
	                color: '#ffffff',
	                staticText: 'BACK TO BROWSING'
	            },
	            closeButton: {
	                wwwImage: 'img/back.png',
	                wwwImageDensity: 1,

	                imagePressed: 'close_pressed',
	                align: 'left',
	                event: 'closePressed'
	            }
	            /*,
	            						menu: {
	            							wwwImage: 'img/menu.png',
	            							//imagePressed: 'menu_pressed',
	            							title: 'Price Options',
	            							cancel: 'Cancel',
	            							align: 'right',
	            							items: [{
	            								event: 'takeMeHome',
	            								label: 'Back to home'
	            							}]
	            						}*/
	            ,
	            backButtonCanClose: true

	        };
	        //var ref = cordova.InAppBrowser.open(url, '_blank', 'location=yes');
	        var ref = cordova.ThemeableBrowser.open(url, '_blank', browserOptions);
	        ref.addEventListener('loadstart', function(event) {
	            //console.log("loadstart" + event.url);
	        });
	        ref.addEventListener('loadstop', function(event) {
	            //console.log("loadstart" + event.url);
	            if ((event.url).indexOf('http://www.amazon.com/gp/buy/thankyou') === 0) {
	                setTimeout(function() {
	                    ref.close(); // close inappbrowser 3seconds after purchase
	                }, 3000);

	            }
	        });
	        ref.addEventListener('closePressed', function(event) {
	            // Fix for back button in iOS
	            ref.close();
	        });


	    }
	}
	//hide x before modal is shown
	$(document).on('show.bs.modal', function(e) {
	    //$(e.target).find("img.pop-up-close-icon").hide();
	    var modalContent = $(e.target).find(".modal-content");
	    modalContent.css({
	        "left": function() {
	            return $(e.target).parent().hasClass('left-padding') ? "-15%" : "15%";
	        }
	    });
	    //var blue = document.getElementById("blue");



	});
	/*To disable scroll when color picker is shown*/
	$('#colorDropDown,#favoritedropdown').on('hidden.bs.dropdown', function() {
	    scrollPos = 0;
	    $('body').css({
	        overflow: '',
	        position: '',
	        top: ''
	    }).scrollTop(scrollPos);
	});
	/*To enable scroll when color picker is hided*/
	$('#colorDropDown,#favoritedropdown').on('shown.bs.dropdown', function() {
	    // var scrollPos = 0;
	    scrollPos = $('body').scrollTop();
	    $('body').css({
	        /*
	        						overflow: 'hidden',
	        						position: 'fixed',
	        						top: -scrollPos*/
	    });
	});
	//show x after modal is shown and then reposition it
	//hack because bootstrap and variable device size
	$(document).on('shown.bs.modal', function(e) {
	    //alert(e.target.id);
	    /*var productDetail= localStorage.selectedProDetails;
	    debugger;
	    var productImages = productDetail.photo_set;
	    $(e.target).find("img.carimage").each(function(i,e){
	    	if(typeof productImages[i] !== undefined){
	    		$(e).attr('src', productImages[i].url_small)	
	    	} 
	    });*/


	    /* $('.shopname').textillate({ in : {
				effect: 'bounceInUp',
				sync:true,
				reverse:false,
				callback:function(){
					$('.shopname').text("AMAZON.COM");
				}
			},
			loop: false
		});
		$('.shopname').textillate('start');*/
	    var modalBody = $(e.target).find(".modal-body");
	    var modalContent = $(e.target).find(".modal-content");
	    var imagex = $(e.target).find("img.pop-up-close-icon");
	    var modalPosition = modalBody.position();
	    console.warn(modalPosition);
	    //$('.carousel-inner .item:first').addClass('active');
	    imagex.css({
	        "position": "absolute",
	        "left": function() {
	            if ($(e.target).parent().hasClass('left-padding')) {
	                return (55 + modalPosition.left + modalBody.width()) + "px"
	            } else {
	                return (modalPosition.left - 55) + "px"
	            }
	        },
	        "top": function() {
	            return (modalPosition.top + 20) + "px"
	        }
	    });

	    imagex.fadeIn("fast");
	    console.log(index);

	    //HAMMER CODE 

	    //var modalc =$("#myCarousel"+index)
	    var modalc = $(e.target).find(".carousel");
	    var hammerobj = new Hammer(modalc[0]);
	    modalc.carousel({
	        pause: true,
	        interval: false
	    });
	    modalc.carousel('pause');

	    hammerobj.on('swipeleft', function(e) {
	        console.log("touch left");
	        modalc.carousel('next');
	    })
	    hammerobj.on('swiperight', function() {
	        console.log("touch right");
	        modalc.carousel('prev');
	    })

	    console.log('setTimeout');
	    var el = e.target.querySelector('.odometer');
	    var retailNode = e.target.querySelector('.retail_price_item');
	    var realNode = e.target.querySelector('.hidden_real_price');

	    //var el = $(e.target).find(".odometer");
	    //debugger;
	    console.warn(retailNode);
	    console.warn(realNode);
	    var realValue = realNode.innerHTML;
	    var retailVal = retailNode.innerHTML;
	    console.warn(realValue);
	    console.warn(retailVal);


	    od = new Odometer({
	        el: el,
	        value: retailVal,
	        // Any option (other than auto and selector) can be passed in here
	        format: '(,ddd).dd',
	        theme: 'default'
	    });

	    //so it animates everytime
	    od.value = retailVal;

	    //od.update(realValue);
	    changeText(od, realValue);

	});

	function loadmore() {
	    hasnext = false;
	    page_no++;
	    //alert(page_no);
	    $.ajax({
	        type: 'GET',
	        url: "http://staging12.getpriceapp.com/item/list/",
	        beforeSend: function() {
	            console.log('ajaxstart');
	            //$body.addClass("loading");
	        },
	        complete: function() {
	            //alert('ajaxstopp')
	            //$body.removeClass("loading");
	            //$('.carousel').carousel({
	            //	pause: 'true'
	            //})
	        },
	        contentType: "application/json",
	        dataType: "json",
	        data: {
	            "category": cat,
	            page: page_no,
	            "show_by": "10",
	            'type': type
	                //color : color

	        },
	        success: function(data) {

	            console.log('insidesucees');
	            var getitemdata = JSON.stringify(data);
	            //alert(JSON.stringify(data));
	            localStorage.setItem('itemdata', '');
	            localStorage.setItem('itemdata', getitemdata);

	            console.log('calling load 537 windows ');

	            loadprofNew("false");
	            fetchFavorites(); //Load the favorites
	            console.log(JSON.stringify(parsedata[0].paginator))
	            if (parsedata[0].paginator.has_next)
	                hasnext = true;
	        },

	        error: function(xhr, status, error) {
	            console.log(xhr);
	        }


	    }); //end of ajax call 



	}

	$("#colorSlider,#fColorSlider").on("slidestop", function(event, ui) {
	    var colorRange = "All"
	    if (ui.value > 0 && ui.value < 33)
	        colorRange = "lightpink";
	    else if (ui.value > 33 && ui.value < 66)
	        colorRange = "cream";
	    else if (ui.value > 66 && ui.value < 100)
	        colorRange = "black";
	    /*else if (ui.value > 20 && ui.value < 30)
	    	colorRange = "pink";
	    else if (ui.value > 30 && ui.value < 40)
	    	colorRange = "blue";
	    else if (ui.value > 30 && ui.value < 40)
	    	colorRange = "Violet";
	    else if (ui.value > 40 && ui.value < 50)
	    	colorRange = "Green";
	    else if (ui.value > 50 && ui.value < 60)
	    	colorRange = "almond";
	    else if (ui.value > 60 && ui.value < 70)
	    	colorRange = "orange";
	    else if (ui.value > 70 && ui.value < 80)
	    	colorRange = "gold";
	    else if (ui.value > 80 && ui.value < 99)
	    	colorRange = "red";
	    else if (ui.value == 0 || ui.value == 100)
	    	colorRange = "All";*/

	    callforcolorfilter(colorRange);
	});
	$('#clickforcolor').on('shown.bs.dropdown', function() {
	    alert('The dropdown is now fully shown.');
	});

	function callforcolorfilter(color) {

	    //alert('base on color ');
	    $.ajax({
	        type: 'GET',
	        url: "http://staging12.getpriceapp.com/item/list/",
	        beforeSend: function() {
	            console.log('ajaxstart');
	            $body.addClass("loading");
	        },
	        complete: function() {
	            //alert('ajaxstopp')
	            $body.removeClass("loading");
	            $('.carousel').carousel({
	                pause: 'true',
	                interval: false
	            })
	        },
	        contentType: "application/json",
	        dataType: "json",
	        data: {
	            "category": cat,
	            page: page_no,
	            "show_by": "10",
	            'type': type,
	            "color": color

	        },
	        success: function(data) {


	            var getitemdata = JSON.stringify(data);
	            //alert(JSON.stringify(data));
	            localStorage.setItem('itemdata', '');
	            localStorage.setItem('itemdata', getitemdata);
	            var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	            console.log('calling load prof from windows ');
	            //loadprofcolr();
	            loadprofNew("true");
	            fetchFavorites(); //Load the favorites
	            if (parsedata[0].paginator.has_next)
	                hasnext = true;
	        },

	        error: function(xhr, status, error) {
	            console.log(xhr);
	        }


	    }); //end of ajax call 



	}

	function makeAjaxcall() {
	    $('.add-items').html('')
	    $.ajax({
	        type: 'GET',
	        url: "http://staging12.getpriceapp.com/item/list/",
	        beforeSend: function() {
	            $body.addClass("loading");
	        },
	        complete: function() {
	            $body.removeClass("loading");
	        },
	        contentType: "application/json",
	        dataType: "json",
	        data: {
	            "category": cat,
	            "page": page_no,
	            "show_by": 10,
	            type: type
	                //"color" : color
	        },
	        success: function(data) {
	            var getitemdata = JSON.stringify(data);
	            localStorage.setItem('itemdata', '');
	            localStorage.setItem('itemdata', getitemdata);
	            var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	            //alert(parsedata[0].products.length);

	            if (parsedata[0].products.length == 0) {
	                $('.add-items').append('<div class="jumbotron">\
			<h1>No Data Available</h1> </div>')
	            } else {
	                console.log('category 641 sucees')

	                console.log(JSON.stringify(data));


	                loadprofNew("false");
	                fetchFavorites(); //Load the favorites
	            }
	            console.log(JSON.stringify(parsedata[0].paginator))
	            if (parsedata[0].paginator.has_next)
	                hasnext = true;
	        },

	        error: function(xhr, status, error) {
	            console.log(xhr);
	        }


	    }); //end of ajax call 


	}



	function loadprofcolr() {
	    var parsedata = JSON.parse(localStorage.getItem('itemdata'));
	    $('.add-items').html(' ');

	    color = ''
	        //var i1 =
	        //alert(parsedata[0].fields.photo_set[0].url_medium)
	    for (i = 0; i < parsedata[0].products.length; i += 2) {

	        var img10, img11
	        console.log("i:" + i);

	        if (parsedata[0].products[i].fields.photo_set.length)
	            img10 = parsedata[0].products[i].fields.photo_set[0].url_medium
	        else {
	            console.log('else')
	            console.log(parsedata[0].products[i].fields.id)
	            img10 = "./assets/img/no_img.png"
	        }
	        if (parsedata[0].products[i + 1].fields.photo_set.length)
	            img11 = parsedata[0].products[i + 1].fields.photo_set[0].url_medium
	        else {
	            console.log('else')
	            console.log(parsedata[0].products[i + 1].fields.id)
	            img11 = "./assets/img/no_img.png";

	        }

	        if (parsedata[0].products[i].fields.price) {

	        } else
	            parsedata[0].products[i].fields.price = 'N/A'

	        if (parsedata[0].products[i].fields.brand) {} else parsedata[0].products[i].fields.brand = 'N/A'

	        if (parsedata[0].products[i + 1].fields.brand) {} else parsedata[0].products[i + 1].fields.brand = 'N/A'

	        if (parsedata[0].products[i + 1].fields.price) {} else
	            parsedata[0].products[i + 1].fields.price = 'N/A'

	        if (parsedata[0].products[i + 1].fields.description) {} else
	            parsedata[0].products[i + 1].fields.description = 'N/A'
	        if (parsedata[0].products[i].fields.description) {} else
	            parsedata[0].products[i].fields.description = 'N/A'

	        $('.add-items').append('<div class="row ">\
								<div class="col-xs-6 right-padding ">\
								<img src="' + img10 + '" class="img-responsive items" id="' + parsedata[0].products[i].fields.id + '" data-toggle="modal" data-target="#myModal' + i + '">\
									<p class="item-price"></p>' + getModalHTML(i, parsedata[0].products[i], img10) + '<div class="row border-outline">\
								<div class="col-xs-12">\
									<p><img src="./assets/img/like.png">CHLO&Eacute <br> <span>DREW LEATHER BAG </span></p>\
								</div>\
							</div><div class="row border-outline">\
										<div class="col-xs-12 pic" >\
											<p ><img src="./assets/img/like.png">' + parsedata[0].products[i].fields.brand + '\
												<br> <span>' + parsedata[0].products[i].fields.description + '</span></p>\
										</div>\
									</div>\
								</div>\
								<div class="col-xs-6 left-padding ">\
								<img src="' + img11 + '" class="img-responsive items" id="' + parsedata[0].products[i + 1].fields.id + '" data-toggle="modal" data-target="#myModal' + i + 1 + '">\
									<p class="item-price"></p>' + getModalHTML(i + "" + 1, parsedata[0].products[i + 1], img11) + '<div class="row border-outline">\
								<div class="col-xs-12">\
									<p><img src="./assets/img/like.png">CHLO&Eacute <br> <span>DREW LEATHER BAG </span></p>\
								</div>\
									<div class="row border-outline">\
										<div class="col-xs-12 pic" >\
											<p ><img src="./assets/img/like.png">' + parsedata[0].products[i + 1].fields.brand + '\
												<br> <span>' + parsedata[0].products[i + 1].fields.description + '</span></p>\
										</div>\
									</div>\
								</div>\
							</div>');
	    }



	}

	function trimLong(text) {
	    var shortText = jQuery.trim(text).substring(0, 7);
	    //.split(" ").slice(0, -1).join(" ");

	    return shortText + "..."; // Appended ... based on client request
	}

	function getFavoritesHTML(favObj) {
	    //data-likebtnid="'+favObj.likebtnid+'" 
	    return '<div class="row favourite-dropdown-button-padding" id="' + favObj.likebtnid + 'div">\
							<img src="' + favObj.itemThumbURL + '" data-purchaseurl="' + favObj.itemStoreLink + '" class="favourite-item" style="width:100px;" onclick="showPurchasePage(this)">\
							<div class="col-xs-6 cart-btn-right-padding">\
								<button class="btn btn-block delete" type="button" class="removefav" data-likebtnid="' + favObj.likebtnid + '" data-prodid=' + favObj.pk + ' onclick="removeFromFavorite(this)"><img src="./assets/img/cross.png" id="' + favObj.pk + 'cross"></button>\
							</div>\
						</div>'
	}

	function fetchFavorites() {
	    $.ajax({
	        url: "http://staging12.getpriceapp.com/favourites/list",
	        data: {
	            'user': localStorage.getItem('tokenid')
	        },
	        type: "POST",
	        dataType: "json",
	        success: function(favorites) {
	            console.log("favourites list success");
	            console.log(favorites);
	            $('.scrollable-menu-favourite').html('');
	            for (var i = 0; i < favorites.length; i++) {
	                var itemIdProduct = favorites[i].itemID;
	                favorites[i].likebtnid = itemIdProduct + "like";
	                $('.scrollable-menu-favourite').append(getFavoritesHTML(favorites[i]));
	                //update heart image
	                $("#" + itemIdProduct + "like").attr("src", "img/liked.png");
	                $("#" + itemIdProduct + "like").data("favorite", "liked");
	                console.warn("#" + itemIdProduct + "like");
	                console.warn($("#" + itemIdProduct + "like"));
	            }

	            if ($('.scrollable-menu-favourite div').length > 0) {
	                $("#favoritedropdown .dropdown-toggle").removeClass("disabled");
	            }
	        },
	        error: function() {
	            console.log("No JSON data returned");
	        }
	    });
	}

	function removeFromFavorite(selectedPro) {
	    // Method to remove favorites
	    console.warn(selectedPro);
	    var pkid = $(selectedPro).data("prodid");
	    var likePicId = $(selectedPro).data("likebtnid");
	    $.ajax({
	        url: "http://staging12.getpriceapp.com/favourites/delete",
	        data: {
	            'id': pkid,
	            'user': localStorage.getItem('tokenid')
	        },
	        type: "POST",
	        dataType: "json",
	        success: function() {
	            var rmdivid = likePicId + 'div';
	            console.log("Successss " + rmdivid);
	            $("#" + rmdivid).remove();
	            console.warn($("#" + rmdivid));
	            $("#" + likePicId).attr("src", "./assets/img/like.png");
	            $("#" + likePicId).data("favorite", "like");
	            if ($('.scrollable-menu-favourite div').length < 1) {
	                $("#favoritedropdown .dropdown-toggle").addClass("disabled");
	            }
	        },
	        error: function() {
	            console.log("No JSON data returned");
	        }
	    });
	}

	//image glinches issue
	function clearData(cleardata) {
	    console.log('clearData');
	    var cleardataId = $(cleardata).attr("id");
	    console.log(cleardataId)

	    $("#myModal" + cleardataId).find("img.carimage").each(function(i, e) {
	        console.log(i);
	        $(e).attr('src', ' ');
	    });
	    $("#img1myModal" + index).attr('src', '')
	    $("#img2myModal" + index).attr('src', '')
	    $("#img3myModal" + index).attr('src', '')
	    $("#img4myModal" + index).attr('src', '')
	    $("#myModal" + cleardataId).find(".product-name-in-popup").text('');
	    $("#myModal" + cleardataId).find(".retail_price_item").text('');
	    $("#myModal" + cleardataId).find(".odometer").text('');
	    $("#myModal" + cleardataId).find(".saved-amount_price_item").text('');
	    $("#myModal" + cleardataId).find(".buy-button-amazon").attr('data-purchaseurl', '');
	}