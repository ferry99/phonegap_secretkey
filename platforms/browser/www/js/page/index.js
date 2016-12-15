$(document).on('pageshow', '[data-role="page"]', function(){  
    setTimeout(function(){
        $('#loading').hide();
    },300);      
});

$( document ).ready(function() {
    console.log( "ready!" );

        $(document)
        .ajaxStart(function(){
            setTimeout(function(){
                $('#loading').show();
            },300); 
        })

        .ajaxStop(function(){
            setTimeout(function(){
                $('#loading').hide();
            },300); 
        })

        .ajaxError(function( event, jqxhr, settings, exception ) {
            if ( jqxhr.status == 401 ) {
                alert('Unauthorized');
                window.location.href = 'index.html';
            }
        });


    $("#btn-login").click(function(){
       var username = $('#username').val();
       var key = $('#key').val();
        var js_obj = {username : username , password : key};
        var encoded = JSON.stringify( js_obj );
          $.ajax({
              type: 'post',
              url: 'http://myinsight.pe.hu/auth.php',
              dataType: "json",
              data : encoded,
              success: function(data){
                //console.log(data.jwt);
                setJwt(data.jwt);
                window.location.href = "data.html";
              },
              error: function(e) {
                console.log(e);
                alert('not authorized');
              }
          });
    });

    function setJwt(jwt){
        window.localStorage.setItem('jwt' , jwt)
    };

    function getJwt(){
        return window.localStorage.getItem('jwt')
    }

});
