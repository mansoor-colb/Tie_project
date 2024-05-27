$(document).ready(function(){
    // alert("hell")
    // if(!(localStorage.getItem("userid"))){
    //     window.location.href="http://localhost:1233/loginuser.html"
    // }
    let query = window.location.search;
    let url = new URLSearchParams(query);
    let val = url.get("aid");
    if(val==null || val==undefined){
        val=localStorage.getItem("artistid")
    }
    // alert(val)
    function loadcover(){
        $.ajax({
            type: "post",
            url: "http://localhost:1233/frontcover",
            data:{aid:val},
            dataType: "json",
            success: function (res) {
                console.log(res.response)
              $("#title").html(`${res.response[0].title}`)
              $("#title1").html(`${res.response[0].title}`)
              $("#tag").html(`${res.response[0].tag}`)
              $("#you").attr("href",`${res.response[0].youtube}`)
              $("#insta").attr("href",`${res.response[0].insta}`)
              $("#description").html(`${res.response[0].description}`)
              $('#setcover').attr('data-setbg', `../uploads/${res.response[0].images.split(",")[2]}`)
              $('#setcover').css('background-image', `url(../uploads/${res.response[0].images.split(",")[2]})`);
            
                
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
                        if(inc==4){
                            break;
                        }
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
                $("#discg").html("No albums added");
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
                    let img="";
                    for(let p of arr){
                        if(!p.includes("mp4")){
                            img=p;
                        }
                    }
                   $("#events").append(`
                   <div class="row tour_details"> 
        <div class="tour-date">
        <img id="eveimg" src="../uploads/${img}">
           
        </div>
        <div>
        <div><h2>${item.event}</h2>
        <p> 📅 ${item.date}</p>
        <p> 📍${item.loc}</p>
        </div>
       
       
     
            <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desp}" pr="${item.price}" loc="${item.loc}" img="${item.images} ">View Details</button>
       
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
               
               
             
                    <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desp} pr="${item.price}" loc="${item.loc}">Coming soon</button>
               
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
               
               
             
                    <button id="ticket" dt="${item.date}" name="${item.event}" desc="${item.desp} pr="${item.price}" loc="${item.loc}" img="${item.images}">Coming soon</button>
               
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
    let arr=$(this).attr("img")
    arr=arr.split(",")
   
    
    
    $("#swiper-wrapper").html("")
    for(let i of arr){
        if(i.includes("mp4")){
        $(".swiper-wrapper").append(`
        <div class="swiper-slide">
        <video controls>
  <source src="../uploads/${i}" type="video/mp4">
  <source src="../uploads/${i}" type="video/ogg">
 
</video>

        `)}
        else{
            $(".swiper-wrapper").append(`
            <div class="swiper-slide">
            <img src="../uploads/${i}" alt="">
          </div>
       `)
        }
        
    }
    $(".details").html("")
    $(".details").append(`
    <h4>${$(this).attr("name")}</h4>
    <p> 📅 ${$(this).attr("dt")}</p>
    <p>📍 ${$(this).attr("loc")}</p>
    <p>About the event:<br> ${$(this).attr("desc")}</p>
    <p> Tickets:${$(this).attr("pr")}</p>
    <button style="padding:15px;border-radius:14px;letter-spacing:1px;background:#0056b3;border:0px solid black;color:white">Book</button>`)




   
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
 if(!localStorage.getItem("userid")){
    if(confirm("Please login to make Comment")){
        window.location.href="http://localhost:1233/loginuser.html"
    }
 }
 else{
let v=$("#txtcomment").val();
if(v=="" ||v==null){
    alert("Please enter a valid comment");
    return;
}
else{
$.ajax({
    type: "Post",
    url:"http://localhost:1233/putcomment",
    data: {txt:v,uid:localStorage.getItem("userid"),aid:localStorage.getItem("artistid")},
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
 }
})



$("#newsletter").click(function(){
    let em=$("#nemail").val();
    $.ajax({
        type: "post",
        url: "http://localhost:1233/newzletter",
        data: {email:em,band_id:val,uid:localStorage.getItem("userid")},
        dataType: "json",
        beforeSend:function(){
            $("#nemail").val("Please Wait...")
        },
        success: function (response) {
        if(response.status==200){
            $("#nemail").val(em)
            alert("Subscription successfull 🎉🎉")
        }
        else{
            alert("some error occured")
        }
            
        }
    });
})
// Select the :root element
// const root = document.documentElement;

// // Change the values of the CSS variables
// root.style.setProperty('--black11', '#000000');
// root.style.setProperty('--brown44', '#663300');
// root.style.setProperty('--white', '#e5e5e5');
// root.style.setProperty('--white2', '#ffcccb');
// root.style.setProperty('--navyBlue', '#00008b');
// root.style.setProperty('--black', '#222222');
// root.style.setProperty('--red', '#ff0000');
// root.style.setProperty('--purple', '#800080');
// root.style.setProperty('--darkBlue', '#0d004c');
// root.style.setProperty('--grey', '#777777');
// root.style.setProperty('--border', '#dddddd');
// root.style.setProperty('--white3', '#fdfdfd');
// root.style.setProperty('--purple2', '#a700cc');
// root.style.setProperty('--blue3', '#3700ff');
// root.style.setProperty('--grey2', '#444444');
// root.style.setProperty('--grey9', '#999999');

})