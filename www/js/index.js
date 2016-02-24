//attach fastclick
var s = document.createElement("script");
s.type = "text/javascript";
s.src = "js/lib/fastclick/fastclick.js";
$("head").append(s);
$(function() {
    Origami.fastclick.FastClick.attach(document.body);
});

//disable double tap
(function($) {
    var IS_IOS = /iphone|ipad/i.test(navigator.userAgent);
    $.fn.nodoubletapzoom = function() {
        if (IS_IOS)
            $(this).bind('touchstart', function preventZoom(e) {
                var t2 = e.timeStamp,
                    t1 = $(this).data('lastTouch') || t2,
                    dt = t2 - t1,
                    fingers = e.originalEvent.touches.length;
                $(this).data('lastTouch', t2);
                if (!dt || dt > 500 || fingers > 1) return; // not double-tap

                e.preventDefault(); // double tap - prevent the zoom
                // also synthesize click events we just swallowed up
                $(this).trigger('click').trigger('click');
            });
    };
})(jQuery);

document.addEventListener("deviceready", function() {
    if (cordova.platformId == 'android') {
        StatusBar.backgroundColorByHexString("#000000"); // set the status bar color as black
    }
    
}, false);

var loginMethods = {
    /*Landing page methods*/
    getFacebookProfileInfo: function(authResponse) {
        console.log('getinfo');
        // To get the profile Info
        var fbInfo = $.Deferred();
        facebookConnectPlugin.api('/me?fields=email,gender,name,age_range,location&access_token=' + authResponse.accessToken, null,
            function(response) {
                console.log(response);
                fbInfo.resolve(response);
            },
            function(response) {
                console.log(response);
                fbInfo.reject(response);
            }
        );
        return fbInfo.promise();

    },
    signinViaFacebook: function() {
        if (commonMethods.checkConnection()) { // only allow to call Facebook login when Internet connected
            facebookConnectPlugin.getLoginStatus(function(success) {
                if (success.status === 'connected') {
                    // User has already Logged in
                    console.log('getLoginStatus', success.status);
                    var fbLocalData = loginMethods.getUserInfo();
                    if (!fbLocalData.fbUserID) {

                        loginMethods.getFacebookProfileInfo(success.authResponse).then(function(profileInfo) {
                            //var authResponse = response.authResponse;
                            loginMethods.setUserInfo({
                                authResponse: authResponse,
                                fbUserID: profileInfo.id,
                                fbName: profileInfo.name,
                                fbEmail: profileInfo.email,
                                fbPicture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
                                fbGender: profileInfo.gender,
                                fbLocation: profileInfo.location.name

                            });
                            //localStorage.setItem('auth',authResponse.accessToken);

                        }, function(fail) {
                            // Fail get profile info
                            console.log('profile info fail', fail);
                        })
                    } else {
                        //alert("You have already Logged in");
                        var userdata = loginMethods.getUserInfo();

                        if (userdata.fbGender == 'female') {
                            //female category code 
                            window.location = 'cart_Page.html' //Dinesh
                                // window.location = 'cart_page_male.html'
                        } else {
                            //window.location = 'cart_Page.html'
                            window.location = 'cart_page_male.html'
                        }
                    }
                } else {
                    // User has not Logged in already
                    facebookConnectPlugin.login(['email', 'public_profile', 'user_location'], loginMethods.fbLoginSuccess, loginMethods.fbLoginError);
                }
            }, function(error) {
                // Fail get profile info
                console.log('profile info fail', error);
            });
        } else {
            commonMethods.showAlert("Please Connect to Internet"); // No internet 
        }
    },
    setUserInfo: function(user_data) {
        // To save the User data in LocalStorage
        window.localStorage.fbUserData = JSON.stringify(user_data);
        //alert(JSON.stringify(user_data));
        //alert("Saved Profile information");
    },
    getUserInfo: function() {
        // To get the User data from LocalStorage //
        return JSON.parse(window.localStorage.fbUserData || '{}');
    },
    fbLoginSuccess: function(response) {

        if (!response.authResponse) {
            // No Auth response has come
            loginMethods.fbLoginError("Cannot find the authResponse");
            return;
        }


        var authResponse = response.authResponse; // Save the authResponse
        //alert(JSON.stringify(authResponse));
        localStorage.setItem('auth', authResponse.accessToken);
        //alert(localStorage.getItem('auth'));
        //alert(authResponse.accessToken);

        loginMethods.getFacebookProfileInfo(authResponse).then(function(profileInfo) {
            if (profileInfo.email) {
                var p = profileInfo.id + '@logic.com';
                console.log(p)
            } else {
                profileInfo.email = profileInfo.id + '@logic.com';
                console.log(profileInfo.email)
            }

            if (profileInfo.gender) {
                console.log('oki')
            } else {
                profileInfo.gender = 'female';
            }
            if (profileInfo.location) {
                console.log('oki')
            } else {
                profileInfo.location = 'unknown';
                console.log(profileInfo.email)
            }
            // Get the promise and save the response in LocalStorage
            loginMethods.setUserInfo({
                authResponse: authResponse,
                fbUserID: profileInfo.id,
                fbName: profileInfo.name,
                fbEmail: profileInfo.email,
                fbPicture: "http://graph.facebook.com/" + authResponse.userID + "/picture?type=large",
                fbGender: profileInfo.gender,
                fbLocation: profileInfo.location.name

            });
            //alert(profileInfo);
            localStorage.setItem('name', profileInfo.name);
            localStorage.setItem('email', profileInfo.email);
            localStorage.setItem('id', profileInfo.id);
            localStorage.setItem('type', profileInfo.gender);
            mixpanel.identify(profileInfo.email);

            mixpanel.people.set({
                "$email": profileInfo.email,
                "$last_login": new Date(),
                "$name": profileInfo.name

            });
            mixpanel.people.increment({
                "gender": profileInfo.gender
            });
        });
        console.log('fbapi')
        loginMethods.fbApiCall();

    },
    fbLoginError: function(error) {
        console.log('fbLoginError:' + error);
    },
    fbApiCall: function() {
        var userData = loginMethods.getUserInfo();
        console.log('fbapi');
        //alert(localStorage.getItem('email'))
        //alert(localStorage.getItem('name')) 
        //alert(localStorage.getItem('id'))

        var credentials = {
            "access_token": localStorage.getItem('auth'),
            "backend": 'facebook',
            "email": localStorage.getItem('email'),
            "name": localStorage.getItem('name'),
            "user_id": localStorage.getItem('id')
        }
        $.ajax({

            url: "http://staging12.getpriceapp.com/klutter/ajax-auth/facebook/",
            type: "POST",
            dataType: "json",
            data: credentials,
            success: function(data) {


                var getitemdata = JSON.stringify(data);
                //alert(JSON.stringify(data));
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    localStorage.setItem('tokenid', data.id);
                    /*window.tokenid =data.id; // Store it in the window to make it global
                    console.log("tokenid:"+tokenid);*/
                    if (localStorage.getItem('type') == 'female') {
                        //window.location = 'cart_page_male.html'
                        window.location = 'cart_Page.html'
                    } else {
                        //window.location = 'cart_Page.html'
                        window.location = 'cart_page_male.html'
                    }


                } else {
                    console.log('not logged at backend');
                }






            },

            error: function(xhr, status, error) {
                console.log(xhr);
                // alert(xhr.status);
                //alert(error);
                //alert(xhr.responseText);
            }


        }); //end of ajax call 
    }
};


var commonMethods = {
    showAlert: function(alertmessage, title) {
        title = title ? title : "Price";
        navigator.notification.alert(alertmessage, function() {}, title, 'OK');
    },
    checkConnection: function() {
        //callCount = 0;
        var networkState = navigator.connection.type;
        var states = {};
        states[Connection.UNKNOWN] = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI] = 'WiFi connection';
        states[Connection.CELL_2G] = 'Cell 2G connection';
        states[Connection.CELL_3G] = 'Cell 3G connection';
        states[Connection.CELL_4G] = 'Cell 4G connection';
        states[Connection.NONE] = 'No network connection';
        if (states[networkState] == 'No network connection') {
            return false;
        } else {
            return true;
        }
    }
}
