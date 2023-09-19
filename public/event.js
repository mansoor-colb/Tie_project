$(document).ready(function () {
    if(!(localStorage.getItem("artistid"))){
        window.location.href="login.html"
    }
    $('#eventform').submit(function (e) {
        $("#Aaid").val(`${localStorage.getItem("artistid")}`) // alert(1);
         e.preventDefault(); // Prevent the default form submission
 
         const formData = new FormData(this);
         const imageFile = $('#images')[0].files[0];
         if (
             formData.get('val-event').trim() === '' ||
             formData.get('val-date').trim() === '' ||
             formData.get('val-location').trim() === '' ||
             formData.get('val-price').trim() === '' ||
             formData.get('val-desp').trim() === '' ||
            !(imageFile)
         ) {
             swal("Invalid ",'Please fill in all fields',"error");
             return;
         }
 
         $.ajax({
             type: 'POST',
             url: 'http://localhost:1233/eventinsert', // The URL to your server-side route
             data: formData,
             processData: false,
             contentType: false,
             success: function (res) {
               
                 if(res.status==200){
                     swal("Event Added Successfully")
                     load()
                 }
                 else if(res.status==500){
                     swal("Insertion Failed","Error","error")
 
                 }
                 console.log(res);
              
                
             },
             error: function (error) {
                 swal("Error","Try Later","error")
 
                 // Handle any errors that occur during the AJAX request
                 console.error(error);
             }
         });
     });
 
 
     // Handle file input change event for image preview
     $('#images').on('change', function (e) {
        const previewContainer = $('#photopreview-row');
        previewContainer.empty(); // Clear previous previews
        
        // Loop through selected files and create previews
        for (let i = 0; i < this.files.length; i++) {
            const file = this.files[i];
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                
                reader.onload = function (event) {
                    // Create an image element for the preview
                    // const img = $('<img>', { class: 'image-preview', src: event.target.result });
                    
                    // Append the image preview to the container
                    previewContainer.append(` 
                    <div class="col" id ="photopreview">
                        <div class="card" > 
                            <div class="card-body"  >
                                <div id="imgcontainer">
                                    <img src="${event.target.result}"..."  id="imageprofile">

                                </div>
                            </div>
                        </div>
                    </div>`);
                };
                
                // Read the file as a data URL (base64) to display the image preview
                reader.readAsDataURL(file);
            }
        }
    });



    function load(){
        // alert(8)
        var aid=localStorage.getItem("artistid");
        $.ajax({
            url:"http://localhost:1233/getevent",
            type:"post",
            data:{aid:aid},
            // dataType: "json",
            success: function(res){
                console.log(res)
                if(res.status==200){
                    $("#memdata").html("");
                    // $("#memdata").append(`<h4 class="card-title">Member List</h4>`);
                    console.log(res.response)
                    for(let item of res.response){
                        var cont=`<div class="bootstrap-media" id="grid-item">
                        <div class="media">`
                      
                        let arr=item.images.split(",");
                        for(let i =0;i<arr.length;i++){
                            if(!arr[i].includes("mp4")){
                          

                           cont+= `<img class="mr-3 img-fluid" id="fluid" src="uploads/${arr[i]}" alt="Generic placeholder image">`;
                           break;
                            }
                        }

              
                       cont+=`<div class="media-body">
                                            <h5 class="mt-0">${item.event}</h5>
                                            <p>${item.loc}</p>
                                            <p>${item.date}</p>
            
                                        </div>
                                        <div>
                                        <a  href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i data-toggle="modal" data-target="#exampleModalCenter" id="tedit" class="fa fa-pencil color-muted m-r-5"  data-id="${item.event_id}" data-name="${item.event}" data-price="${item.price}" 
                                        data-date="${item.date}" data-desp="${item.desp}" data-loc="${item.loc}" ></i></a>
                                                            <a  href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"><i  id="tdel"  class="fa fa-close color-danger" data-id="${item.event_id}" ></i></a>
                                        </div>
                                    </div>
                                </div>`
                                $("#memdata").append(`${cont}`);
                    }
                    
                  
                    
                  
                }
                else if(res.status==500){
                    alert(res.status)
                    $("#memdata").html("");
                }
                else{
                    alert('Error')
                    console.log(res)
                }
            }
        })
        
       
    }
    load();



    $(document).on('click', '#tedit', function() {
        let trackid= $(this).data("id");
        let name=$(this).data("name");
        let loc=$(this).data("loc");
        let desp=$(this).data("desp");
        let dt=$(this).data("date");
        let price=$(this).data("price");
        $("#val-eevent").val(`${name}`);
        $("#val-eloc").val(`${loc}`);
        $("#val-edesp").val(`${desp}`);
        $("#val-eprice").val(`${price}`);
        // $(".edate-format").val(`${dt}`);
        $("#saveedit").attr("tid",trackid);
     })



     $("#saveedit").click(function(){
        let id=$(this).attr("tid");
     
    alert($(".edate-format").val())
    $.ajax({
        url:"http://localhost:1233/editevent",
        type:"post",
        dataType: "json",
        data:{event: $("#val-eevent").val(),
        loc:$("#val-eloc").val(),
        desp:$("#val-edesp").val(),
        price:$("#val-eprice").val(),
        date:$(".edate-format").val(),
        id:id},
        success: function(res){
            if(res.status==200){
                swal("Event Updated");
                load();
               
    
            }
            else if(res.status==500){
                alert('Please try Later')
            }
        }
    })
     })

     $(document).on('click', '#tdel', function() {
        let trackid= $(this).data("id");
        $.ajax({
         url:"http://localhost:1233/delevent",
         type:"post",
         dataType: "json",
         data:{id:trackid},
         success: function(res){
             if(res.status==200){
                 swal("Event Deleted");
                 load();
                
     
             }
             else if(res.status==500){
                 alert('Please try Later')
             }
         }
     })
     })

})