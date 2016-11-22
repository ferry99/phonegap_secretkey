$(document).ready(function(){
	 category = localStorage.category;
	 nameCategory = localStorage.nameCategory;

	$('#h1-cat').text(nameCategory);

    $('#a-categories').on('click' , function(){
	    	console.log('asd');
       	 	window.location.href = "data.html";
	})


	$('#btn-create-category').on('click' , function(){

		objList = {};
		$('input').each(function(){
			name = $(this).attr('name');
			value = $(this).val();
			objList[name] = value;
		})


		var nameAccount = $('#name-category').val();
		var js_obj = {operation : 'createAccount' , data : {'new_account': objList, 'id_category' : category}};

	    var encoded = JSON.stringify( js_obj );

		$.ajax({
			method : "POST",
			url: "http://localhost/webservice1/index.php",
			data: encoded, 
	        async : false,
	        success : function(data){
                console.log(data);
                obj = JSON.parse(data);
                if(obj["message"] == "name account already exist"){
                    text = "name account already exist";
                    bindAlertPopup('#pop-alert' , 400 , 2500 , text);
                }else{
                    text = "account has been created";  
                    bindAlertPopup('#pop-alert' , 400 , 2500 , text);  

                    setTimeout(function(){
	                    window.location.href = 'data.html';
                    },3000)
                }
	        }
		})




	    function bindAlertPopup(idElm , openDelay , closeDelay , text){
	        $this = $(idElm);
	        console.log($this);
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
	})
})