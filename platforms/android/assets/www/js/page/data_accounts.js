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



$(document).on('pageshow', '[data-role="page"]', function(){   


    setInterval(function () {
        $.ajax({
            url: "http://myinsight.pe.hu/",
            dataType: "json",
            timeout: 4000,
            global: false,
            statusCode: {
                200: function (response) {
                 console.log('from acc');
                },
                404: function (response) {
                },
                0 : function (response){
                    console.log('from acc')
                    $('.pop-content').empty();
                        text = 'You are not connected to network'
                        bindAlertPopup('#pop-alert' , 400 , 999999 , text);
                        $centerDiv = $('<div class=center-group-one>').appendTo('.pop-content');
                        $btnRefresh = $('<a href=# data-role=button id=a-refresh>')
                          .addClass('clr-refresh ui-btn ui-btn-inline ui-mini ui-btn-raised waves-effect waves-button waves-effect waves-button')
                          .text('refresh').appendTo($centerDiv);
                }
           
            }  ,
              error : function(xhr, status)
            {
                // console.log(xhr);
            }                      
        });
    }, 4000);


    $('body').on("click" , "#a-refresh" , function(){
        window.location.reload(true);
    })

    $('.a-refresh-page2').click(function(){
        window.location.reload(true);
    })

    // $(document)
    //     .ajaxStart(function(){
    //         setTimeout(function(){
    //             $('#loading').show();
    //         },300); 
    //     })

    //     .ajaxStop(function(){
    //         setTimeout(function(){
    //             $('#loading').hide();
    //         },300); 
    //     });

    var prop = {};
    category = localStorage.category;
    $('#pop_save2').hide();
    var js_obj = {operation : 'getAccounts' , data : {'name_category' : category}};
    var encoded = JSON.stringify( js_obj );

    $.ajax({
        method: "POST",
        url: 'http://myinsight.pe.hu/',
        data: encoded, 
        async : false,
        success: function(data){
            obj = JSON.parse(data);
            if(obj["result"] == "no data"){
            }else{
                listingObj2(data);
            }
        }
    });

    $('.account').click(function(){
        prop.id_account = $(this).data("id");
    })



    $('#a-create2').click(function(){
        setTimeout(function(){
            $('#pop_creator').popup("open"); 
        }, 500);
    })   


    $('#a-edit2').click(function(){
        $('#pop_info2 h1').text('Update Account');
        $('.action-content').css('visibility','hidden');
        $('#pop_close2').hide();
        $('#pop_save2').show().css("position" , "relative");
        $('#pop_info2 :input').each(function(){
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


    $('#pop_save2').click(function(){
        console.log('saving...');
        objList = {};
        $("#pop_info2 :input").each(function(){
            name = $(this).attr('name');
            value = $(this).val();
            objList[name] = value;
        })
        var js_obj = {operation : 'updateAccount' , data : {'id_account' : prop.id_account , 'new_account' : objList}};
        var encoded = JSON.stringify( js_obj );

        $.ajax({
            method: "POST",
            url: 'http://myinsight.pe.hu/',
            data: encoded, 
            async : false,
            success: function(data){
                obj = JSON.parse(data);
                setTimeout(function(){$('#pop_info2').popup("close"); }, 100);
                if(obj["result"] == "Success"){
                   text = "Data Has Been Updated";
                }else{
                   text = "Error update";
                }
               bindAlertPopup('#pop-alert' , 400 , 2500 , text); 
            }
        });
    })


    $( "#pop_info2" ).on( "popupafterclose", function( event, ui ) {
        $('#pop_info2 h1').text('Account Info');
        $('.action-content').css('visibility','visible');
        $('#pop_close2').show();
        $('#pop_save2').hide().css("position" , "absolute");
        $('#pop_info2 :input').each(function(){
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

    $('#a-delete2').click(function(){
        setTimeout(function(){$('#pop_dialog').popup("open"); }, 300);
        $('#pop_info2').popup("close");
    })

    $('#a-delete-true').click(function(){
        $('#pop_dialog').popup("close");
        var js_obj = {operation : 'deleteAccount' , data : {'id_account' : prop.id_account}};
        var encoded = JSON.stringify( js_obj );

        $.ajax({
            method: "POST",
            url: 'http://myinsight.pe.hu/',
            data: encoded, 
            async : false,
            success: function(data){
                obj = JSON.parse(data);
                if(obj["result"] == "Success"){
                   text = "Data Has Been Deleted";
                   bindAlertPopup('#pop-alert' , 500 , 2500 , text);  
                }else{
                   text = "Error delete";
                   bindAlertPopup('#pop-alert' , 500 , 2500 , text); 
                }
            }
        });
    })

    $( "body" ).on( "click", "#a-exit", function() {
        $("[data-role=panel]").panel("close");
        setTimeout(function(){$('#pop_dialog_exit').popup("open"); }, 500);
        $('#a-exit-true').off("click").on( "click", function(){
             navigator.app.exitApp();
        })
    });

    $('#pop_creator #btn-create').click(function(){
        objList = {};
        $("#pop_creator :input").each(function(){
            name = $(this).attr('name');
            value = $(this).val();
            objList[name] = value;
        })

        var nameAccount = $('#name-category').val();
        var js_obj = {operation : 'createAccount' , data : {'new_account': objList, 'id_category' : category}};

        var encoded = JSON.stringify( js_obj );

        $.ajax({
            method : "POST",
            url: "http://myinsight.pe.hu/",
            data: encoded, 
            async : false,
            success : function(data){
            setTimeout(function(){$('#pop_creator').popup("close"); }, 100);
                obj = JSON.parse(data);
                if(obj["message"] == "name account already exist"){
                    text = "name account already exist";
                    bindAlertPopup('#pop-alert' , 400 , 2500 , text);
                }else{
                    text = "account has been created";  
                    bindAlertPopup('#pop-alert' , 400 , 2500 , text);  
                }
            }
        })
    })



    $('#btn-pw').on("click", function(){
        keyphrase = $('#keyphrase').val();
        if(keyphrase == 'showme'){  
            var js_obj = {operation : 'getPassword' , data : {'id_account' : prop.id_account}};
            var encoded = JSON.stringify( js_obj );

            $.ajax({
                method: "POST",
                url: 'http://myinsight.pe.hu/',
                data: encoded, 
                async : false,
                success: function(data){

                    if(data !== ""){
                        renderPopinfo(data);
                    }else{
                        console.log('no account');
                    }
                }
            });

            $('#pop_checker').popup("close");
            setTimeout(function(){$('#pop_info2').popup("open"); }, 500);

            $('#pop_close2').click(function(){
                $('#pop_info2').popup("close");
            });
        }else{
            alert('wrong password');
            $('#pop_checker').popup("close");
            $('#keyphrase').val('');            
        }         
    })

});