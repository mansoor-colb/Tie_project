$(document).ready(function () {


    $('#coverform').submit(function (e) {
       $("#aid").val(`${localStorage.getItem("artistid")}`) // alert(1);
        e.preventDefault(); // Prevent the default form submission

        const formData = new FormData(this);

        $.ajax({
            type: 'POST',
            url: 'http://localhost:1233/coverinsert', // The URL to your server-side route
            data: formData,
            processData: false,
            contentType: false,
            success: function (res) {
                // Handle the success response from the server
                if(res.status==200){
                    swal("Updated In Successfully")

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


});
