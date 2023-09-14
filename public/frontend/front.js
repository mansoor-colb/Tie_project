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
                    // alert('Error')
                }
                else{
                    alert('Error')
                    console.log(res)
                }
            }
        })

      }
loadband()

    
})