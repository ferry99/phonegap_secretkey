$( document ).ready(function() {
    console.log( "ready!" );

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
