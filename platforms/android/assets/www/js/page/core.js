function bindAlertPopup(idElm , openDelay , closeDelay , text){
    $this = $(idElm);
    $('#p-alert').remove();
    $('<p id="p-alert">').text(text).appendTo('.pop-content');

    setTimeout(function(){
        $this.popup("open", {
            transition: "fade",
            overlayTheme: "a",
            positionTo: "window",
            theme: "a"
            }); 
    }, openDelay);

    setTimeout(function(){
        $this.popup("close" , {
            transition: "fade",
        }); 
    }, closeDelay);
}


function listingObj(obj){
    obj = JSON.parse(obj);
    id = [];
    $('#list-categories').empty(); 
    $.each(obj , function(idx ,row){
        $.each(row , function(key , value){
            $('#list-categories').append('<li>' + '<a href="#" class="cat">' + '<p>' + value.name_category + '</p>' + '</a>' + '</li>').listview('refresh');
            id.push(value.id_category);
        })          
    }) 

    $('#list-categories li a').each(function(idx , val){
        $(this).data('id' , id[idx]);
    })
}

//==================================DATA ACCOUNTS=========================================

function listingObj2(objJson){
    obj = JSON.parse(objJson);
    $('#list-accounts').empty();

    $.each(obj , function(idx ,row){
        $.each(row , function(key , value){
            $li = $('<li>').appendTo('#list-accounts');
            $a = $('<a href="#pop_checker" class="account ui-btn waves-effect waves-button account">').appendTo($li);
            $a.attr({"data-rel" : "popup" , "data-position-to" : "window"});
            $h2 = $('<h2>').text(value.username).appendTo($a);
            $p = $('<p>').text(value.email).appendTo($a);
            $a.data('id' , value.id_account);
        })          
    })       
}

function renderPopinfo(objJson){
    obj = JSON.parse(objJson);
    $.each(obj , function(idx ,row){
        $.each(row , function(key , value){
            $('.head').text(value.name_account);
            $('#username').val(value.username);
            $('#password').val(value.password);
            $('#email').val(value.email);
            $('#resetkey').val(value.reset_key);
            $('#note').val(value.note);
            $('#website').val(value.website);

        })
    })
}