
$(document).on('pagebeforechange', '[data-role="page"]', function(){     
    setTimeout(function(){
        $('#loading').show();
    },1);    
});

$(document).on('pagebeforecreate', '[data-role="page"]', function(){     
    setTimeout(function(){
        $('#loading').show();
    },1);    
});

$(document).on('pageshow', '[data-role="page"]', function(){  
    setTimeout(function(){
        $('#loading').hide();
    },300);      
});


$(document).on('pagebeforeshow', function() {   
    setTimeout(function(){
        $('#loading').show();
    },1);    
});


$(document).on('pageshow', function() {

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

    var req_url = "http://localhost/webservice1/index.php";

    $('body').on("click" , "#a-refresh" , function(){
        window.location.reload(true);
    })
    
    $('.a-refresh-page').click(function(){
        window.location.reload(true);
    })

    var js_obj = {operation : 'getAll' , data : {plugin: 'jquery-json', version: 2.3}};
    var encoded = JSON.stringify( js_obj );
    localJWT = window.localStorage.getItem('jwt');
           
    $.ajax({
        method: "POST",
        url: req_url,
        data: encoded, 
        async : false,
        beforeSend: function(request){
            request.setRequestHeader('authorization', 'Bearer ' + localJWT);
        },
        success: function(data){
          if(data == ""){
                $('<p>').text('NO DATA').appendTo('#main-data');
            }else{
                listingObj(data);
            }
        }
    });



    var setIn = setInterval(function () {

        $.ajax({
            url: "http://myinsight.pe.hu/",
            dataType: "json",
            timeout: 4000,
            global : false,
            success: function(data){
            },
            statusCode: {
                200: function (response) {
                  console.log('from data');
                },
                404: function (response) {
                },
                0 : function (response){
                    console.log('from data')
                    $('.pop-content').empty();
                        text = 'You are not connected to network'
                        bindAlertPopup('#pop-alert' , 400 , 999999 , text);
                        $centerDiv = $('<div class=center-group-one>').appendTo('.pop-content');
                        $btnRefresh = $('<a href=# data-role=button id=a-refresh>')
                          .addClass('clr-refresh ui-btn ui-btn-inline ui-mini ui-btn-raised waves-effect waves-button waves-effect waves-button')
                          .text('refresh').appendTo($centerDiv);
                }
           
            },
              error : function(xhr, status)
            {
                //console.log(xhr);
            }                      
        });
    }, 4000); 

    $('#pop_save').hide();


    $.event.special.tap.emitTapOnTaphold = false;
    document.addEventListener("offline", function(){ alert("You're offline") }, false);
    document.addEventListener("online", function(){ console.log('assd') }, false);

    $('.cat')
        .on('tap' , function(){
            clearInterval(setIn);
            idCategory = $(this).data('id');   
            nameCategory = $(this).text();

            localStorage.nameCategory = nameCategory;
            localStorage.category = idCategory;
            $('#loading').show();
            setTimeout(function () {
                $.mobile.changePage( "data_accounts.html", {
                    transition: "pop"
                }); 
            },1000)
        }).on('taphold' , function(){
            idCategory = $(this).data('id');
            nameCategory = $(this).text();
            $('#pop_info :input').attr("placeholder", nameCategory);
            $('#pop_info').popup('open');
        })

    $('#a-edit').click(function(){
        $('#pop_info h1').text('Update Category');
        $('.action-content').css('visibility','hidden');
        $('#pop_close').hide();
        $('#pop_save').show().css("position" , "relative");
        $('#pop_info :input').val($('#pop_info :input').attr("placeholder"));
        $('#pop_info :input').each(function(){
            $divParent = $(this).parent().removeClass('ui-state-disabled');
            $(this).prop("disabled" , false);
            $(this).focus(function(){
                $(this).parent().addClass('ui-focus');
            })
            $(this).focusout(function(){
                $(this).parent().removeClass('ui-focus');
            })
        });
    })

    $('#a-delete').click(function(){
        setTimeout(function(){$('#pop_dialog').popup("open"); }, 300);
        $('#pop_info').popup("close");
    })

    $('#a-delete-true1').click(function(){
        $('#pop_dialog').popup("close");
        var js_obj = {operation : 'deleteCategory' , data : {'id_category' : idCategory}};
        var encoded = JSON.stringify( js_obj );
        localJWT = window.localStorage.getItem('jwt');

        $.ajax({
            method: "POST",
            url: req_url,
            data: encoded, 
            async : false,
            beforeSend: function(request){
                request.setRequestHeader('authorization', 'Bearer ' + localJWT);
            },
            success: function(data){
                obj = JSON.parse(data);
                if(obj["result"] == "Success"){
                   text = "Category Has Been Deleted";
                }else{
                   text = "Error delete Or U May Have Active Account";
                }
               bindAlertPopup('#pop-alert' , 500 , 2500 , text);  
            }
        });
    })

    $('#pop_save').click(function(){
        console.log('saving...');
        objList = {};
        $("#pop_info :input").each(function(){
            name = $(this).attr('name');
            value = $(this).val();
            objList[name] = value;
        })
        var js_obj = {operation : 'updateCategory' , data : {'id_category' : idCategory , 'new_category' : objList}};
        var encoded = JSON.stringify( js_obj );
        localJWT = window.localStorage.getItem('jwt');

        $.ajax({
            method: "POST",
            url: req_url,
            data: encoded, 
            async : false,
            beforeSend: function(request){
                request.setRequestHeader('authorization', 'Bearer ' + localJWT);
            },
            success: function(data){
                obj = JSON.parse(data);
                console.log(obj);
                setTimeout(function(){$('#pop_info').popup("close"); }, 100);
                if(obj["result"] == "Success"){
                   text = "Category Has Been Updated";                   
                }else{
                   text = "Error update";
                }
                bindAlertPopup('#pop-alert' , 400 , 100000000 , text);
            }
        });
    })

    $( "#pop_info" ).on( "popupafterclose", function( event, ui ) {
        $('#pop_info h1').text('Category Info');
        $('.action-content').css('visibility','visible');
        $('#pop_close').show();
        $('#pop_save').hide().css("position" , "absolute");
        $('#pop_info :input').each(function(){
            $divParent = $(this).parent().addClass('ui-state-disabled');
            $(this).prop("disabled" , false);
            $(this).focus(function(){
                $(this).parent().addClass('ui-focus');
            })
            $(this).focusout(function(){
                $(this).parent().removeClass('ui-focus');
            })
        });
    });

    $( "body" ).on( "click", "#a-exit", function() {
        $("[data-role=panel]").panel("close");
        setTimeout(function(){$('#pop_dialog_exit').popup("open"); }, 500);
        $('#a-exit-true').off("click").on( "click", function(){
            console.log('exit');
             navigator.app.exitApp();
        })
    });


    $('#a-categories').click(function(){
        window.location.href = "data.html";
    })

    $('#a-create').click(function(){
        setTimeout(function(){$('#pop-creator').popup("open"); }, 500);
    });

    $( "#pop-creator" ).on( "popupafterclose", function( event, ui ) {
         window.location.replace("#");
    });

    $('#btn-create').click(function(){
        nameCategory = $('#name-category').val();
        var js_obj = {operation : 'createCategory' , data : {'new_category': nameCategory, version: 2.3}};
        var encoded = JSON.stringify( js_obj );
        localJWT = window.localStorage.getItem('jwt');

        $.ajax({
            method : "POST",
            url: req_url,
            data: encoded, 
            async : false,
            beforeSend: function(request){
                request.setRequestHeader('authorization', 'Bearer ' + localJWT);
            },
            success : function(data){
                $('#name-category').val("");
                obj = JSON.parse(data);
                if(obj["message"] == "name category already exist"){
                    text = "Name Category Already Exist";
                }else{
                    text = "Category Has Been Created";                    
                }
                $('#pop-creator').popup("close");
                bindAlertPopup('#pop-alert' , 400 , 100000000 , text);
                setTimeout(function(){
                    window.location.reload();
                },100); 

            }
        });
    })

    $(document).off('pageinit').on('pageinit', '#page-accounts', function (event, ui) {      
         (function () {
            console.log('load accounts');
            var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
            script.src = 'js/page/data_accounts.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

        })();
    });

    $(document).off('pageshow').on('pageshow', '#data', function (event, ui) {      
         (function () {
            console.log('load');
            var script = document.createElement('script'); script.type = 'text/javascript'; script.async = true;
            script.src = 'js/page/data.js';
            var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(script, s);

        })();
    });

    $(document).off('pagehide').on("pagehide", "div[data-role=page]", function(event){
        console.log('hide');
        $(event.target).remove();
    });




    function refreshPage()
    {
        $.mobile.changePage(window.location.href, {
            allowSamePageTransition: true,
            transition: 'none',
            reloadPage: true
        });
    }

});