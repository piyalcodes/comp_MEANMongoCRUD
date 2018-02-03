
$(document).ready(function() {
    
    $("button[name='insert']").bind('click', function() {

        var name = $("form[name='insert'] input[name='name']").val();
        var telephone = $("form[name='insert'] input[name='telephone']").val();
        var query = $("form[name='insert'] textarea[name='query']").val();

        $.ajax({
            url : '/query',
            type : 'put',
            //dataType: "jsonp", 
            contentType: 'application/json',
            data: JSON.stringify( { 'name': name, 'telephone': telephone, 'query' : query  }),            
            sucsess : function(data) {
           },
            error: function (request, status, error) {
               console.log("no")
           }, 
           complete : function(data) {
            loadSelect();
           }

           
        });
     });     
        
     $("button[name='update']").bind('click', function() {
                var id = $("form[name='update'] input[name='id']").val();
                var name = $("form[name='update'] input[name='name']").val();
                var telephone = $("form[name='update'] input[name='telephone']").val();
                var query = $("form[name='update'] textarea[name='query']").val();
        
                $.ajax({
                    url : '/query',
                    type : 'post',
                    timeout: 10000,
                    data: JSON.stringify( { 'id': id, 'name': name, 'telephone': telephone, 'query' : query  }), 
                    sucsess : function(data) {
                        console.log("done");                    
                    }, 
                    complete : function(data) {
                     loadSelect();
                    } 
                })
        
        });

       

    function loadSelect() {

        $(".list-group").html('');
 
        $.ajax({
            url : 'http://localhost:7000/query',
            type : 'get',
            contentType: 'application/json',
            timeout: 10000,
            sucsess : function(data) {
                 
               
                //<li class="list-group-item">Cras justo odio</li>
            },
             error: function (request, status, error) {
                console.log("no")
            }, 
            complete : function(data) {
                $.each(data.responseJSON, function(i, item) {
                    console.log(item);
                    $(".list-group").append('<li class="list-group-item">'+item._id+' <br /> '+item.name+' <br /> '+item.query+' <br> 	<button data-id="'+item._id+'" type="button" name="delete" class="btn btn-warning">Delete</button> </li>');
                });
                data = '';  
                
                        $("button[name='delete']").on('click', function() {
                  
                                var delete_id = $(this).attr("data-id");
                                 
                                $.ajax({
                                    url : '/query',
                                    type : 'delete',
                                    contentType: 'application/json',
                                    data: JSON.stringify( {'id': delete_id}),            
                                    sucsess : function(data) {
                                   },
                                    error: function (request, status, error) {
                                       
                                   }, 
                                   complete : function(data) {
                                    loadSelect();
                                   }    
                                   
                                });
                    
                            });
            }
        })
    }

    loadSelect();
	
});