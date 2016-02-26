	$(document).ready(function() {
	
	
	/*if (localStorage.getItem('backbuttonpressed') == 'true') {
			console.log('bckbtn')
	        localStorage.setItem('backbuttonpressed', 'false');
	        favproducts = ''
			favproducts = JSON.parse(localStorage["favlocalpro"]);
		

	    }
	*/
	
	       $(document).bind("deviceready", function() {
				document.addEventListener("backbutton", function() {
							console.log("Disabled Back button");
				});
				});
	
	$('.add-itemsfav').html('');
	favproducts = new Array();
	if (localStorage["favlocalpro"]) {
	   favproducts = ''
       favproducts = JSON.parse(localStorage["favlocalpro"]);
  
        }
		//hasnext=false;
		if(favproducts.length!=0)
		{
              for(i=0;i<favproducts.length;i+=2)
			  {
		  
		     if(favproducts[i]&&favproducts[i+1])
			 {
				 
			 var img10=favproducts[i].itemThumbURL
			 var img11=favproducts[i+1].itemThumbURL
			 $('.add-itemsfav').append('<div class="pro-list-container"><div class="pro-list">' + renderItemfav(i, favproducts[i], img10) +
	            '</div>\
								<div class="pro-list">' + renderItemfav(i + 1, favproducts[i + 1], img11) +
			  '</div></div>');} 
			  else{
				  
				    var img10=favproducts[i].itemThumbURL
				  $('.add-itemsfav').append('<div class="pro-list-container"><div class="pro-list">' + renderItemfav(i, favproducts[i], img10) +
	            '</div>');
				  
			  }
			  }
		}
		else{
			var mwid =$(window).width() * .90;
			$('.add-itemsfav').html('<img src="img/no_fav.png" style="width:100%;height:auto">');
			
		}
	
	// onclick like button 
	
	
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
						 var brandid=proid +'brand'
	                     var brandimg = $("#" + brandid).html();
	                    console.warn(brandimg);
	                    console.warn(srcimg);
	                    var removefavid = response.pk;
	                    var favObject = {
	                        itemThumbURL: srcimg,
	                        itemStoreLink: purchaseurl,
	                        pk: removefavid,
	                        likebtnid: propicid,
							productname:brandimg,
							productid:proid
							
	                    };
					 var present=false;
							for(var i=0;i<favproducts.length;i++)
							{   if(favproducts[i].pk==response.pk)
							present=true 
						    }
							if(present)	 
							{console.log('product already present');}
						else
							favproducts.push(favObject);
						
						
						//fav new design 23 feb
	                    //$('.scrollable-menu-favourite').append(getFavoritesHTML(favObject));
	                    console.log("Successss - adding " + removefavid);
	                    if ($('.scrollable-menu-favourite li').length > 0) {
	                        $("#favoritedropdown .dropdown-toggle").removeClass("disabled");
	                    }

	                },
	                error: function() {
	                    console.log("No JSON data returned");
	                }
	            });
	        } else {

	            $(this).attr("src", "img/like.png");
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

	                    if ($('.scrollable-menu-favourite li').length < 1) {
	                        $("#favoritedropdown .dropdown-toggle").addClass("disabled");
	                    }
	                },
	                error: function() {
	                    console.log("No JSON data returned");
	                }
	            });
				 //removeItem from favproducts array 24-feb
				
     favproducts=favproducts
                .filter(function (el) {
                      return el.pk !== proid;
                 }
);
	        }

	    });

	
	
	
	
	});//end of doc
	
	function renderItemfav(uniqueId, product, imgUrl) {
	    if (typeof product == 'undefined') {
	        return "";
	    } else {
	        var productHtml = '<div class="product-list">'; // productlist start
	        productHtml += '<img style="height:169px" src="' + imgUrl + '" class="img-responsive items" data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.productid + '" alt=' + uniqueId + ' data-toggle="modal" data-target="#myModal' + uniqueId + '">'; // Product image
	       //productHtml += getModalHTML(uniqueId, product, imgUrl); // Modal html maker call
	        productHtml += '<div class="product-title">'; // product title start
	        productHtml += '<p class="favorite"><img src="img/liked.png" class="like" data-favorite="liked" data-purchaseurl="' + product.itemStoreLink + '" id="' + product.pk + 'like"></p>'
	        productHtml += '<h5 data-carid="myModal' + uniqueId + '" onclick="setSelectedProduct(this)" id="' + product.pk + 'brand" data-toggle="modal" data-target="#myModal' + uniqueId + '">' + product.productname + '</h5>'; // product name start & end
	        productHtml += '</div>'; // product title end
	        productHtml += '</div>'; // productlist end
	        return productHtml;
	    }
	    
	}
	function goback() {
      localStorage["favlocalpro"] = JSON.stringify(favproducts);
	    localStorage.setItem('backbuttonpressed', 'true')
	    parent.history.back()

	}
	
	
	
		function setSelectedProduct(selectedPro) {
	    var selectedProId = $(selectedPro).attr("id");
		 localStorage.setItem('productClickedId' ,selectedProId);
		 localStorage.setItem('productClickedId' ,selectedProId);
		// localStorage.setItem('productcat',cat);
	    // localStorage.setItem('page',page_no);
		 localStorage["favlocalpro"] = JSON.stringify(favproducts);
		 window.location='product_Details.html'
		 
		

		
	}//end of function 
