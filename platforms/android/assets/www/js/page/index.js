$( document ).ready(function() {
    console.log( "ready!" );

    $("#btn-login").click(function(){
       var username = $('#username').val();
       var key = $('#key').val();
       if(username == 'root' && key == 'toor'){
            window.location.href = "data.html";
            // $(":mobile-pagecontainer" ).pagecontainer( "change" , "data.html", {
            //    transition: "flip",
            // });
       }else{
            alert('Wrong identity');
            $('#username').val('');
            $('#key').val('');
       }
    });

});
