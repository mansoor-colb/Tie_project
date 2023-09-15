$(document).ready(function(){
    // alert("hell")
    let query = window.location.search;
    let url = new URLSearchParams(query);
    let val = url.get("aid");
    // alert(val)
    function loadcover(){
        $.ajax({
            type: "post",
            url: "http://localhost:1233/frontcover",
            // data: "data",
            dataType: "json",
            success: function (res) {
                console.log(res.response)
              $("#title").html(`${res.response[0].title}`)
              $("#title1").html(`${res.response[0].title}`)
              $("#tag").html(`${res.response[0].tag}`)
              $("#you").attr("href",`${res.response[0].youtube}`)
              $("#insta").attr("href",`${res.response[0].insta}`)
              $("#description").html(`${res.response[0].description}`)
                
            }
        });

    }
    loadcover();

    function loadalbum(){
        $.ajax({
            type: "post",
            url: "http://localhost:1233/getalbumtrack",
            data: {aid:val},
            dataType: "json",
            success: function (res) {
                $("#tracks").html();
                let inc=1;
                for(let track of res.response[1]){
                    $("#tracks").append(`
                    <div class="single_player_container">
                    <div class="music-row">
                    <div class="track-info">
                        <img src="../tracks/${track.cover_path}" alt="Track Poster" class="track-poster">
                        <div>
                            <h2 class="track-name">${track.audio_name}</h2>
                            <p class="artist">${track.artist_name}</p>
                        </div>
                    </div>
                    <div id="parts">
                    <audio id="audio${inc}" class="audio-player" controls>
                        <source src="../tracks/${track.audio_path}" type="audio/mpeg">
                    </audio>
                    <a class="download-button" href="../tracks/${track.audio_path}" download>Download</a>
                    </div>
                </div>
                        </div>`)
                        inc++;
                }
                const rotatingWheel = document.getElementById('rotating-wheel');
                const audioElements = document.querySelectorAll('.audio-player');
                
                audioElements.forEach(function (audio) {
                    audio.addEventListener('play', function () {
                        // Pause any other playing audio elements
                        audioElements.forEach(function (otherAudio) {
                            if (otherAudio !== audio && !otherAudio.paused) {
                                otherAudio.pause();
                            }
                         
                        });
                        
                        // Rotate the wheel when audio is played
                        rotatingWheel.style.animation = 'rotate 6s linear infinite';
                        // rotatingWheel.style.animation = 'translate 6s linear infinite';
                    });
                
                    audio.addEventListener('pause', function () {
                        // Stop the wheel when audio is paused
                        rotatingWheel.style.animation = 'none';
                    });
                });
                console.log(res.response)


                //load album X track
         





                console.log(res.response)
                if(res.response[0].length!=0){
                    $("#discg").html("");
                }
                let incr=1;
                                for(let item of res.response[0]){
                                    $("#discg").append(`
                                    <div class="col-lg-4 col-md-6 col-sm-6">
                <div class="discography__item">
                    <a href="discography.html?alid=${item.album_id}&aid=${val}">      <div class="discography__item__pic">
                        <img src="../albums/${item.cover}" alt="">
                    </div>
                    <div class="discography__item__text">
                        <h4>Album: ${item.album_name}</h4>
                        <p>Genere: ${item.album_genere}</p>

                    </div></a>
              
                </div>
            </div>
                                    `)
                                }
             
                
            }
        });

    }
    loadalbum()



    function loadband() {
        $.ajax({
            url:"http://localhost:1233/getmember",
            type:"post",
            data:{aid:val},
            // dataType: "json",
            success: function(res){
                if(res.status==200){
                    $("#memdata").html("");
                    // $("#memdata").append(`<h4 class="card-title">Member List</h4>`);
                    console.log(res.response);
                    let inn=1;
                    for(let item of res.response){
                        // break;
                        $("#memdata").append(`
                        <div class="col-lg-4">
                        <div class="event__item">
                            <div class="event__item__pic set-bg" data-setbg="../uploads/${item.img_path}" style="background-image: url(&quot;../uploads/${item.img_path}&quot;);">
                                <div class="tag-date member-name">
                                    <span>${item.name}</span>
                                </div>
                            </div>
                            <div class="event__item__text">
                                <h4>${item.role}</h4>
                                <p><i class="fa fa-map-marker"></i> India</p>
                                <!-- Social Media Handles -->
                            
                            </div>
                            
                        </div>
                    </div>
                        `)
                        inn++;
                     
                    }
                    if(inn==1){
                        $("#memdata").html("<p style='position:relative;margin-left:25px'>No Memeber Added yet</p>")
                    }
                    
                  
                    
                  
                }
                else if(res.status==500){
                    $("#memdata").html("");
                    $("#memdata").html("<p style='position:relative;margin-left:25px'>No Memeber Added yet</p>")
                }
                else{
                    alert('Error')
                    console.log(res)
                }
            }
        })

      }
loadband()


 

 function loadevent(){
    $.ajax({
        url:"http://localhost:1233/getevent",
        type:"post",
        data:{aid:val},
        // dataType: "json",
        success: function(res){
            if(res.status==200){
                $("#events").html("")
                // $("#events").append(`  
                // `)
                let inc=1;
                
                for(let item of res.response){
                    let arr=item.images.split(",");

                   $("#events").append(`
                   <div class="row tour_details"> 
        <div class="tour-date">
        <img id="eveimg" src="../uploads/${arr[0]}">
           
        </div>
        <div>
        <div><h2>${item.event}</h2>
        <p> 📅 ${item.date}</p>
        <p> 📍${item.loc}</p>
        </div>
       
       
     
            <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desc} pr="${item.price}" loc="${item.loc}">View Details</button>
       
        </div>
    </div> `)
            
                 
                inc++;
              
                
              
            }
            if(inc==1){
                
                $("#events").append(`
                <div class="row tour_details"> 
                <div class="tour-date">
                <img id="eveimg" src="../uploads/coming.jpg">
                   
                </div>
                <div>
                <div><h2>Tremendous</h2>
                <p> 📅 --/--/---</p>
                <p> 📍.....</p>
                </div>
               
               
             
                    <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desc} pr="${item.price}" loc="${item.loc}">Coming soon</button>
               
                </div>
            </div> `);

            }
           
        }
            else if(res.status==500){
                $("#events").html("")
            
                $("#events").append(`
                <div class="row tour_details"> 
                <div class="tour-date">
                <img id="eveimg" src="../uploads/coming.jpg">
                   
                </div>
                <div>
                <div><h2>Tremendous</h2>
                <p> 📅 --/--/---</p>
                <p> 📍.....</p>
                </div>
               
               
             
                    <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desc} pr="${item.price}" loc="${item.loc}">Coming soon</button>
               
                </div>
            </div>`);
            }
            else{
                alert('Error')
                console.log(res)
            }
        }
    })
 }
loadevent()
$(document).on("click",".closee",function(){
    $("#myModal").css({"display":"none"});
})

    

  


window.onclick = function(event) {
    var modal = document.getElementById("myModal");
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
$(document).on("click","#ticket",function(){
    $("#myModal").css({"display":"block"});



   
//    alert( $(this).attr("loc"))
})


function loadcomments(){
    $.ajax({
        url:"http://localhost:1233/getcomment",
        type:"post",
        data:{aid:val},
        // dataType: "json",
        success: function(res){
            if(res.status==200){
                $("#comments").html("")
           
                let inc=1;
                
                for(let item of res.response){
                   let name=item.user_name;
                   if(item.user_id==localStorage.getItem("userid")){
                    name="you";
                   }

                   $("#comments").append(`
                   <div class="comment">
                <strong><h4>${name}</h4></strong>
                <p>-----: ${item.user_msg}</p>

            </div>`)
            
                 
                inc++;
              
                
              
            }
            if(inc==1){
                
                $("#comments").append(`<div class="comment">
                <strong><h4>No message</h4></strong>
                <p>.....</p>

            </div> `);

            }
           
        }
            else if(res.status==500){
                $("#comments").html("")
            
                $("#comments").append(`<div class="comment">
                <strong><h4>No message</h4></strong>
                <p>.....</p>

            </div>`);
            }
            else{
                alert('Error')
                console.log(res)
            }

            $("#comments").append(` <div class="blog__details__form col-lg-12">
            <div class="blog__details__form__title">
                <h4>Leave a comment</h4>
            </div>
            <div id="cmtbox">
                
                <textarea placeholder="Comment" id="txtcomment"></textarea>
                <button id="mkcomment"  class="site-btn">SEND MESSAGE</button>
           </div>
        </div>`)
        }
    })
}
loadcomments()
$(document).on("click","#mkcomment",function(){
 if(!localStorage.getItem(userid)){
    if(confirm("Please login to make Comment")){
        window.location.href="http://localhost:1233/frontend/index.html?aid=053e3aafdb577fa5aa0dfe1b3e639f4d"
    }
 }
let v=$("#txtcomment").val();
if(v=="" ||v==null){
    alert("Please enter a valid comment");
    return;
}
else{
$.ajax({
    type: "Post",
    url:"http://localhost:1233/putcomment",
    data: {txt:v,uid:localStorage.getItem("userid")},
    dataType: "json",
    success: function (response) {
        if(response.status==200){
            loadcomments();
        }

        else{
            alert("Please try later");
        }
        // alert(8)
    }
});
}
})

})