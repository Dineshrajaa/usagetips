	$(document).ready(function(e) {
	    imageArray = new Array(5);
	    console.log(localStorage.getItem('productClickedId'));
	    var selectedProId = localStorage.getItem('productClickedId');
	    $(document).on('click', '.logodet', function() {
	        localStorage.setItem('backbuttonpressed', 'true')
	        parent.history.back()
	    });

	    $.fn.extend({
	        animateCss: function(animationName) {

	            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
	            $(this).addClass('animated ' + animationName).one(animationEnd, function() {
	                $(this).removeClass('animated ' + animationName);

	            });

	        }
	    });

	    var modalc = $(document).find(".carousel");
	    var hammerobj = new Hammer(modalc[0]);
	    // modalc.carousel({
	    //  pause: true,
	    //  interval: false
	    // });
	    // modalc.carousel('pause');

	    hammerobj.on('swipeleft', function(e) {
	        console.log("touch left");
	        modalc.carousel('next');
	    })
	    hammerobj.on('swiperight', function() {
	        console.log("touch right");
	        modalc.carousel('prev');
	    })

	    $.ajax({
	        type: 'GET',
	        url: 'http://staging12.getpriceapp.com/item-details/' + selectedProId + '/',
	        beforeSend: function() {

	            // $body.addClass("loading");
	        },
	        complete: function() {

	            // $body.removeClass("loading");
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

	            imageArray = new Array(5);
	            imageArray.length = 0; // Empties array
	            console.log(selectedProId);
	            var modalTitle = data.title.toUpperCase();
	            var modalprice = data.price;
	            localStorage.retailPrice=modalprice || 0;
	            var modalprice_sold = data.price_sold;
	            localStorage.sellingPrice=modalprice_sold || 0;
	            var modalamount_saved = data.amount_saved;
	            var plength = data.photo_set.length
	            var productImages = data.photo_set;
	            var moda_purchaseURL = data.purchase_url;
	            localStorage.finalStoreName = data.store_name || "Amazon";
	            if (typeof productImages[1]== undefined)
	                productImages[1].url_large == "./assets/img/no_img.png"

	            if (typeof productImages[0]== undefined)
	                productImages[0].url_large == "./assets/img/no_img.png"
	            if (typeof productImages[2]== undefined)
	                productImages[2].url_large == "./assets/img/no_img.png"
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
	            if (modalTitle.length > 27) {
	                console.log("20:  " + modalTitle.replace(/^(.{27}[^\s]*).*/, "$1") + "\n");
	                var shortText = modalTitle.replace(/^(.{27}[^\s]*).*/, "$1");
	                $(".product-name").text(shortText);
	            } else
	                $(".product-name").text(modalTitle);
	            $(".retail-price-in-popup").text(parseFloat(modalprice).toFixed(2));

	            //' + parseFloat(modalprice).toFixed(2) + '
	            $(".retail_price_item").text(parseFloat(modalprice).toFixed(2));
	            //+ parseFloat(product.fields.price_sold).toFixed(2) + '
	            $(".odometer").text(parseFloat(modalprice_sold).toFixed(2));

	            //$' + parseFloat(product.fields.price - product.fields.price_sold).toFixed(2) + '
	            if (modalprice_sold < modalprice) {
	                localStorage.savedPrice = parseFloat(modalprice - modalprice_sold).toFixed(2);
	                $(".saved-amount_price_item").text(parseFloat(modalprice - modalprice_sold).toFixed(2));
	            } else {
	                localStorage.savedPrice = 0.00;
	                $(".saved-amount_price_item").text('0.00');

	            }
	            $(".buy-button-amazon").attr('data-purchaseurl', moda_purchaseURL);


	            
	            
	            setProductDetailsPage();

	        },

	        error: function(xhr, status, error) {
	            console.log(xhr.responseText);
	            //alert(xhr.status);	
	        }


	    }); //end of ajax call



	});

	function setProductDetailsPage() {
	    $('.carousel-inner').append('<div class="item active"> <img id="img1myModal" src="' + imageArray[0] + '"  class="slider-img carimage cover"> </div>\
		<div class="item"><img id="img2myModal" src="' + imageArray[1] + '" class="slider-img carimage cover"> </div>\
	   <div class="item"> <img id="img3myModal" src="' + imageArray[2] + '" class="slider-img carimage cover"> </div>\
	    <div class="item"> <img id="img4myModal" src="' + imageArray[3] + '" class="slider-img carimage cover"> </div>');
	    var el=document.querySelector('.odometer');
	            
	    var realValue = parseFloat(localStorage.sellingPrice).toFixed(2);
	    var retailVal = parseFloat(localStorage.retailPrice).toFixed(2);
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
	            changeText(od, realValue, retailVal);
	}

	function changeText(od, realValue, retailVal) {
	    realValue = parseFloat(localStorage.sellingPrice).toFixed(2);
	    retailVal = parseFloat(localStorage.retailPrice).toFixed(2);
	    $(".shopname").text("Rei.com");
	    /*setTimeout(function() {
	                    $(".shopname").text("Rei.com");
	                    $(".shopname").animateCss("flipOutX");
	                }, 500);*/
	    setTimeout(function() {
	        var tempPrice = parseFloat((realValue - 0.15)).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        $(".shopname").text("Tradsey.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1100);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.25).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        $(".shopname").text("Oodle.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1400);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.35).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.35));
	        $(".shopname").text("Nordtroms.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1600);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.45).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.45));
	        $(".shopname").text("Cabelas.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 1800);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.55).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.55));
	        $(".shopname").text("Sportsauthority.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2000);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.65).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.65));
	        $(".shopname").text("Ebay.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2300);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.75).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.75));
	        $(".shopname").text("TheRealReal.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2600);
	    setTimeout(function() {
	        var tempPrice = (realValue - 0.85).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 0.85));
	        $(".shopname").text("Etsy.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 2900);
	    setTimeout(function() {
	        var tempPrice = (realValue - 1).toFixed(2);
	        var tempSaved = (retailVal - tempPrice).toFixed(2);
	        od.update(tempPrice);
	        $(".saved-amount_price_item").text(tempSaved);
	        //od.update((realValue - 1));
	        $(".shopname").text("Overstock.com");
	        $(".shopname").animateCss("flipOutX");
	    }, 3200);
	    setTimeout(function() {

	        od.update(localStorage.sellingPrice);

	        $(".shopname").text(localStorage.finalStoreName);
	        $(".saved-amount_price_item").text(localStorage.savedPrice);
	        $(".searching-best-price-text").hide("slow");
	    }, 3500);

	    return false;
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

	function goback() {

	    localStorage.setItem('backbuttonpressed', 'true')
	    parent.history.back()

	}
