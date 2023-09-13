$(document).ready(function () {



//album
        $('#albumform').submit(function (e) {
           $("#Aaid").val(`${localStorage.getItem("artistid")}`) // alert(1);
            e.preventDefault(); // Prevent the default form submission
    
            const formData = new FormData(this);
            const imageFile = $('#images')[0].files[0];
            if (
                formData.get('val-album').trim() === '' ||
                formData.get('val-genere').trim() === '' ||
               !(imageFile)
            ) {
                swal("Invalid ",'Please fill in all fields',"error");
                return;
            }
    
            $.ajax({
                type: 'POST',
                url: 'http://localhost:1233/albuminsert', // The URL to your server-side route
                data: formData,
                processData: false,
                contentType: false,
                success: function (res) {
                    // Handle the success response from the server
                    if(res.status==200){
                        swal("Album Added Successfully")
                        albload();
                    }
                    else if(res.status==500){
                        swal("Insertion Failed","Error","error")
    
                    }
                    console.log(res);
                 
                    // You can update the UI here if needed
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
                    
                    // Read the file as a data URL (base64) to display the image preview
                    reader.readAsDataURL(file);
                }
            }
        });
    
    



//track
$('#trackform').submit(function (e) {
    $("#Taid").val(`${localStorage.getItem("artistid")}`) // alert(1);
     e.preventDefault(); // Prevent the default form submission

     const formData = new FormData(this);
     const imageFile = $('#Timages')[0].files[0];
     const audioFile = $('#audio')[0].files[0];
    //  const selectedCategory = $('#category').val();
     if (
         formData.get('albumcat').trim() === '' ||
         formData.get('val-audio').trim() === '' ||
         formData.get('val-songartist').trim() === '' ||
        !(imageFile) ||!(audioFile)
     ) {
         swal("Invalid ",'Please fill in all fields',"error");
         return;
     }

     $.ajax({
         type: 'POST',
         url: 'http://localhost:1233/trackinsert', // The URL to your server-side route
         data: formData,
         processData: false,
         contentType: false,
         success: function (res) {
             // Handle the success response from the server
             if(res.status==200){
                 swal("Track Added Successfully")

             }
             else if(res.status==500){
                 swal("Insertion Failed","Error","error")

             }
             console.log(res);
          
             // You can update the UI here if needed
         },
         error: function (error) {
             swal("Error","Try Later","error")

             // Handle any errors that occur during the AJAX request
             console.error(error);
         }
     });
 });

 $('#audio').on('change', function (e) {
    const audioPreview = $('#audio-preview')[0];

    if (this.files.length > 0) {
        audioPreview.src = URL.createObjectURL(this.files[0]);
        audioPreview.style.display = 'block';
    } else {
        audioPreview.style.display = 'none';
    }
});

$('#Timages').on('change', function (e) {
    const previewContainer = $('#Timgcontainer');
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
                        
                                        <img src="${event.target.result}"..."  id="imageprofile">
    
                       `);
                    };
                    
                    // Read the file as a data URL (base64) to display the image preview
                    reader.readAsDataURL(file);
                }
            }


})



//load filled templete 
function load(){
    var aid=localStorage.getItem("artistid");
    $.ajax({
        url:"http://localhost:1233/getalbumtrack",
        type:"post",
        data:{aid:aid},
        // dataType: "json",
        success: function(res){
            if(res.status==200){
                console.log(res.response)

                for(let item of res.response[0]){
                    console.log(item)
                    $("#accordion-two").append(`<div class="card">
                    <div class="card-header">
                        <h5 class="mb-0 collapsed" data-toggle="collapse" data-target="#collapseOne1" aria-expanded="false" aria-controls="collapseOne1"><i class="fa" aria-hidden="true"></i>${item.album_name}</h5>
                    </div>`)
                    for(let inneritem of res.response[1]){
                       

                      
                        $("#accordion-two").append(`
                        ${inneritem.album_id == item.album_id ? `
                            <div id="collapseOne1" class="collapse" data-parent="#accordion-two">
                                <div class="card-body">
                                    <div class="table-responsive">
                                        <table class="table table-bordered table-striped verticle-middle">
                                            <thead>
                                                <tr>
                                                    <th scope="col">Audio</th>
                                                    <th scope="col">Artist</th>
                                                    <th scope="col">Audio</th>
                                                    <th scope="col">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>${inneritem.audio_name}</td>
                                                    <td>${inneritem.audio_name}</td>
                                                    <td>  <audio id="audio-play" src="./tracks/${inneritem.audio_path}" controls></audio></td>
                                                    <td>
                                                        <div class="act">
                                                            <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Edit"><i class="fa fa-pencil color-muted m-r-5"  data-id="${inneritem.track_id}"></i></a>
                                                            <a href="#" data-toggle="tooltip" data-placement="top" title="" data-original-title="Close"><i class="fa fa-close color-danger" data-id="${inneritem.track_id}"></i></a>
                                                        </div>
                                                    </td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                        ` : '' }
                    </div>`);
                    
                    // $("#albumcat").append(`<option value="${item.album_id}">${item.album_name}</option>`);
                    
                }
                }
                

                
              
            }
            else if(res.status==500){
                alert('Error')
            }
            else{
                alert('Error')
                console.log(res)
            }
        }
    })

}
load()



//load albums in select box dynamically
function albload(){
    $.ajax({
        url:"http://localhost:1233/getalbum",
        type:"post",
        dataType: "json",
        success: function(res){
            if(res.status==200){
                $("#albumcat").html("")
                for(let item of res.response){
                    $("#albumcat").append(`<option value="${item.album_id}">${item.album_name}</option>`);
                }
                

                console.log(res.response)
                // toastr.success("Check Your Mail Inbox","OTP SENT",{positionClass:"toast-bottom-right",timeOut:5e3,closeButton:!0,debug:!1,newestOnTop:!0,progressBar:!0,preventDuplicates:!0,onclick:null,showDuration:"300",hideDuration:"1000",extendedTimeOut:"1000",showEasing:"swing",hideEasing:"linear",showMethod:"fadeIn",hideMethod:"fadeOut",tapToDismiss:!1})
                // $("#otpbutton").css({"display":"none"})
                // $("#validate_section").slideDown();
            }
            else if(res.status==500){
                alert('Please create Album First')
            }
        }
    })
}
albload();

// $("#albumcat").click(albload());

});
    

