$(document).ready(function () {

    $('#memberform').submit(function (e) {
        $("#Aaid").val(`${localStorage.getItem("artistid")}`) // alert(1);
         e.preventDefault(); // Prevent the default form submission
 
         const formData = new FormData(this);
         const imageFile = $('#images')[0].files[0];
         if (
             formData.get('val-artist').trim() === '' ||
             formData.get('val-role').trim() === '' ||
            !(imageFile)
         ) {
             swal("Invalid ",'Please fill in all fields',"error");
             return;
         }
 
         $.ajax({
             type: 'POST',
             url: 'http://localhost:1233/memberinsert', // The URL to your server-side route
             data: formData,
             processData: false,
             contentType: false,
             success: function (res) {
               
                 if(res.status==200){
                     swal("Member Added Successfully")
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
         const previewContainer = $('#photopreview');
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
                    
                        
                                 <div id="imgcontainer">
                                     <img src="${event.target.result}"..."  id="imageprofile">
 
                            
                        
                     </div>`);
                 };
                 
                 reader.readAsDataURL(file);
             }
         }
     });


     function load(){
        var aid=localStorage.getItem("artistid");
        $.ajax({
            url:"http://localhost:1233/getmember",
            type:"post",
            data:{aid:aid},
            // dataType: "json",
            success: function(res){
                if(res.status==200){
                    $("#memdata").html("");
                    // $("#memdata").append(`<h4 class="card-title">Member List</h4>`);
                    console.log(res.response)
                    for(let item of res.response){
                        $("#memdata").append(`
                        <div class="bootstrap-media" id="grid-item">
                                    <div class="media">
                                        <img class="mr-3 img-fluid" id="fluid" src="uploads/${item.img_path}" alt="Generic placeholder image">
                                        <div class="media-body">
                                            <h5 class="mt-0">${item.name}</h5>
                                            <p>${item.role}</p>
            
                                        </div>
                                        <div>
                                        <a  href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i data-toggle="modal" data-target="#exampleModalCenter" id="tedit" class="fa fa-pencil color-muted m-r-5"  data-id="${item.id}" data-name="${item.name}" data-role="${item.role}" ></i></a>
                                                            <a  href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"><i  id="tdel"  class="fa fa-close color-danger" data-id="${item.id}" ></i></a>
                                        </div>
                                    </div>
                                </div>`);
                    }
                    
                  
                    
                  
                }
                else if(res.status==500){
                    $("#memdata").html("");
                    // alert('Error')
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
        let artist=$(this).data("role");
        $("#val-ename").val(`${name}`);
        $("#val-erole").val(`${artist}`)
        $("#saveedit").attr("tid",trackid);
     })

     $("#saveedit").click(function(){
        let id=$(this).attr("tid");
        let aud=$("#val-ename").val();
    let art=$("#val-erole").val();
    
    $.ajax({
        url:"http://localhost:1233/editmember",
        type:"post",
        dataType: "json",
        data:{name:aud,role:art,id:id},
        success: function(res){
            if(res.status==200){
                swal("Members Updated");
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
         url:"http://localhost:1233/delmember",
         type:"post",
         dataType: "json",
         data:{id:trackid},
         success: function(res){
             if(res.status==200){
                 swal("Memeber Deleted");
                 load();
                
     
             }
             else if(res.status==500){
                 alert('Please try Later')
             }
         }
     })
     })

})