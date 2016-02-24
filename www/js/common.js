    $(document).ready(function() {
        //alert('common');
        $(document).bind("deviceready", function() {
            //alert('commondevice');
            document.addEventListener("pause", onPause, false);
            document.addEventListener("resume", onResume, false);
            document.addEventListener("backbutton", function() {
                console.log("Disabled Back button");
            });

        });
    });


    function onPause() {
        // alert('pause');
        mixpanel.track("minimized", {
            "id": '123min'
        });
    }


    function onResume() {
        //alert('resume');
        mixpanel.track("open", {
            "id": '123open'
        });

    }
