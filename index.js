const express = require("express");
const app = express();
const crypto = require("crypto");
const multer = require("multer");
const path = require("path");
const nodemailer = require("nodemailer");
// let formidable = require('formidable');
let fs = require("fs");
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");

app.use(bodyParser.json());
app.use(express.static("public"));

const conn = mysql.createConnection({
  multipleStatements: true,
  host: "localhost",
  user: "root",
  password: "",
  database: "music_band",
});

// connect to database
conn.connect((err) => {
  if (err) throw err;
  console.log("MySQL connected");
});

const storage = multer.diskStorage({
  destination: "public/uploads/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const Albumstorage = multer.diskStorage({
  destination: "public/albums/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});

const trackstorage = multer.diskStorage({
  destination: "public/tracks/",
  filename: (req, file, callback) => {
    callback(
      null,
      file.fieldname +
        "-" +
        Date.now() +
        "." +
        file.originalname.split(".").pop()
    );
  },
});
const upload = multer({ storage: storage });
const albumupload = multer({ storage: Albumstorage });
const trackupload = multer({ storage: trackstorage });

const handleError = (err, res) => {
  res.status(500).contentType("text/plain").end("Oops! Something went wrong!");
};
const getRandomNumber = () => {
  return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
};

const secretKey = "99809933334455667788990099887766";
const iv = "9980993333445566";

async function encrypt(text = getRandomNumber()) {
  const randomSixDigitNumber = text;
  const cipher = crypto.createCipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "utf-8"),
    iv
  );
  let encryptedData = cipher.update(
    randomSixDigitNumber.toString(),
    "utf-8",
    "hex"
  );
  encryptedData += cipher.final("hex");
  return encryptedData;
}

async function decrypt(encryptedData) {
  const decipher = crypto.createDecipheriv(
    "aes-256-cbc",
    Buffer.from(secretKey, "utf-8"),
    iv
  );
  let decryptedData = decipher.update(encryptedData, "hex", "utf-8");
  decryptedData += decipher.final("utf-8");
  return decryptedData;
}
//register
app.post("/signup", async (req, res) => {
  var id = await encrypt();
  var pid = await encrypt(req.body.Pass);
  let data = {
    aid: id,
    artist_name: req.body.Artist,
    artist_email: req.body.Email,
    artist_pass: pid,
  };
  let sql = "INSERT INTO artists SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 500, error: null, response: result }));
      throw err;
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: id }));
    }
  });
});

//login
app.post("/signin", (req, res) => {
  let sql = `SELECT * FROM artists where artist_email="${req.body.Artist}"`;

  let query = conn.query(sql, async (err, result) => {
    if (result.length != 0) {
      var pid = await decrypt(result[0].artist_pass);
      // console.log(pid);
      if (pid == req.body.Pass) {
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
      } else {
        res.send(
          JSON.stringify({ status: 500, error: null, response: result })
        );
      }
    } else {
      res.send(JSON.stringify({ status: 700, error: null, response: result }));
    }
  });
});






//loginuser
app.post("/signinuser", (req, res) => {
  let sql = `SELECT * FROM user where user_email="${req.body.Artist}"`;

  let query = conn.query(sql, async (err, result) => {
    if (result.length != 0) {
      var pid = await decrypt(result[0].user_pass);
      // console.log(pid);
      if (pid == req.body.Pass) {
        res.send(
          JSON.stringify({ status: 200, error: null, response: result })
        );
      } else {
        res.send(
          JSON.stringify({ status: 500, error: null, response: result })
        );
      }
    } else {
      res.send(JSON.stringify({ status: 700, error: null, response: result }));
    }
  });
});

app.post("/signupuser", async (req, res) => {
  var id = await encrypt();
  var pid = await encrypt(req.body.Pass);
  let data = {
    user_id: id,
    user_name: req.body.Artist,
    user_email: req.body.Email,
    user_pass: pid,
  };
  let sql = "INSERT INTO user SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) {
      res.send(JSON.stringify({ status: 500, error: null, response: result }));
      throw err;
    } else {
      res.send(JSON.stringify({ status: 200, error: null, response: id }));
    }
  });
});

//cover insert
// ...
// Handle form submission via AJAX
app.post("/coverinsert", upload.array("images", 5), (req, res) => {
  const {
    "val-bname": title,
    "val-tag": tag,
    "val-suggestions": description,
    "val-insta": insta,
    "val-youtube": youtube,
    artist: aid,
  } = req.body;
  const images = req.files.map((file) => file.filename);
  // console.log(images);
  // console.log(aid);
  let msql = `select * from cover_info where aid="${aid}"`;
  let mquery = conn.query(msql, async (err, mresult) => {
    console.log(mresult)
    if (mresult.length != 0) {
      let im=""
      if(images.length!=0){
        // console.log(mresult)
         im=mresult[0].images+","+images.join(",");
      }
    
      let sqlm = `UPDATE cover_info SET title='${title}' ,tag='${tag}', description='${description}' ,youtube='${youtube}' ,
            insta='${insta}',images='${im}' where aid="${aid}"`;
      let querym = conn.query(sqlm, (err, resultm) => {
        console.log("resul",resultm)
        if (err) {
          res.send({ status: 500, error: null, response: resultm });
          throw err;
        } else {
          res.send({ status: 200, error: null, response: resultm });
        }
      });
    } else {
      let data = {
        aid: aid,
        title: title,
        tag: tag,
        description: description,
        youtube: youtube,
        insta: insta,
        images: images.length!=0?images.join(","):"",
      };
      let sql = "INSERT INTO cover_info SET ?";
      let query = conn.query(sql, data, (err, result) => {
        if (err) {
          res.send({ status: 500, error: null, response: result });
          throw err;
        } else {
          res.send({ status: 200, error: null, response: result });
        }
      });
    }
  });
});

app.post("/albuminsert", albumupload.array("images", 1), (req, res) => {
  const { "val-album": name, "val-genere": genere, artist: aid } = req.body;
  const images = req.files.map((file) => file.filename);
  // console.log(images);
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(aid);
  let data = {
    artist_id: aid,
    album_id: randomNumber,
    album_name: name,
    album_genere: genere,
    cover: images.join(""),
  };
  let sql = "INSERT INTO album SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
      throw err;
    } else {
      res.send({ status: 200, error: null, response: result });
    }
  });
});

app.post(
  "/trackinsert",
  trackupload.fields([
    { name: "Timages", maxCount: 1 },
    { name: "audio", maxCount: 1 },
  ]),
  (req, res) => {
    // const { name, email, description } = req.body;
    const {
      albumcat: albumcat,
      "val-audio": audioname,
      "val-songartist": artist,
      artist: aid,
    } = req.body;
    const images = req.files["Timages"].map((file) => file.filename);
    // console.log(images);
    // console.log(aid);
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    const audio = req.files["audio"][0].filename;
    let data = {
      album_id: albumcat,
      track_id: randomNumber,
      audio_name: audioname,
      artist_name: artist,
      cover_path: images.join(""),
      audio_path: audio,
    };

    let sql = "INSERT INTO track SET ?";
    let query = conn.query(sql, data, (err, result) => {
      if (err) {
        res.send({ status: 500, error: null, response: result });
        throw err;
      } else {
        res.send({ status: 200, error: null, response: result });
      }
    });
  }
);

app.post("/getalbum", (req, res) => {
  let sql = `SELECT * FROM album`;

  let query = conn.query(sql, async (err, result) => {
    if (result.length != 0) {
      res.send(JSON.stringify({ status: 200, error: null, response: result }));
    } else {
      res.send(JSON.stringify({ status: 700, error: null, response: result }));
    }
  });
});

app.post("/getcover", (req, res) => {
  console.log(req.body.aid)
  let sql = `SELECT * FROM cover_info where aid="${req.body.aid}"`;

  let query = conn.query(sql, async (err, result) => {
    try{
    if (result?.length != 0) {
      res.send(JSON.stringify({ status: 200, error: null, response: result }));
    } else {
      res.send(JSON.stringify({ status: 500, error: null, response: result }));
    }
  }
  catch(err){
    console.log("err",err)

  }
  });
});
app.post("/getalbumtrack", (req, res) => {
  let arr1 = [];
  let arr2 = [];
  let sql = `SELECT * FROM album where artist_id="${req.body.aid}";
            select * from track`;

  let query = conn.query(sql, [1, 2], (err, result) => {
    if (result.length != 0) {
      // console.log(result);

      res.send({ status: 200, error: null, response: result });
    } else {
      res.send({ status: 500, error: null, response: result });
    }
  });
});

app.post("/edittrack", (req, res) => {
  let sql = `UPDATE track SET audio_name="${req.body.name}" ,artist_name="${req.body.artist}" where track_id="${req.body.id}"`;

  let query = conn.query(sql, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
    } else {
      res.send(JSON.stringify({ status: 200, error: err, response: result }));
    }
  });
});

app.post("/deltrack", (req, res) => {
  let sql = `DELETE FROM track where track_id="${req.body.id}"`;

  let query = conn.query(sql, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
    } else {
      res.send(JSON.stringify({ status: 200, error: err, response: result }));
    }
  });
});
app.post("/memberinsert", upload.array("images", 1), (req, res) => {
  const { "val-artist": name, "val-role": role, artist: aid } = req.body;
  const images = req.files.map((file) => file.filename);
  // console.log(images);
  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  // console.log(aid);
  let data = {
    band_id: aid,
    name: name,
    role: role,
    img_path: images.join(""),
  };
  let sql = "INSERT INTO member SET ?";
  let query = conn.query(sql, data, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
      throw err;
    } else {
      res.send({ status: 200, error: null, response: result });
    }
  });
});

app.post("/getmember", (req, res) => {
  
  let sql = `SELECT * FROM member where band_id="${req.body.aid}"`;

  let query = conn.query(sql, (err, result) => {
    if (result.length != 0) {
      // console.log(result);

      res.send({ status: 200, error: null, response: result });
    } else {
      res.send({ status: 500, error: null, response: result });
    }
  });
});

app.post("/editmember", (req, res) => {
  let sql = `UPDATE member SET name="${req.body.name}" ,role="${req.body.role}" where id="${req.body.id}"`;

  let query = conn.query(sql, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
    } else {
      res.send(JSON.stringify({ status: 200, error: err, response: result }));
    }
  });
});

app.post("/delmember", (req, res) => {
  let sql = `DELETE FROM member where id="${req.body.id}"`;

  let query = conn.query(sql, (err, result) => {
    if (err) {
      res.send({ status: 500, error: null, response: result });
    } else {
      res.send(JSON.stringify({ status: 200, error: err, response: result }));
    }
  });
});

app.post("/eventinsert", upload.array("images", 5), (req, res) => {
  const{
    "val-event": event,
    "val-date": date,
    "val-desp":desp,
    "val-location": loc,
    "val-price": price,
    "artist": aid,
  } = req.body;
  const images = req.files.map((file) => file.filename);

  const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let data = {
    band_id:aid,
event_id:randomNumber,
    event: event,
    date: date,
   loc: loc,
   desp:desp,
    price: price,
    images: images.join(","),
  };
   
      
      let sql = "INSERT INTO event SET ?";
      let query = conn.query(sql, data, (err, result) => {
        if (err) {
          res.send({ status: 500, error: null, response: result });
          throw err;
        } else {
          res.send({ status: 200, error: null, response: result });
        }
      });
    

});
app.post("/getevent", (req, res) => {
  
    let sql = `SELECT * FROM event where band_id="${req.body.aid}"`;
  
    let query = conn.query(sql, (err, result) => {
      if (result.length != 0) {
        // console.log(result);
  
        res.send({ status: 200, error: null, response: result });
      } else {
        console.log(err)
        res.send({ status: 500, error: null, response: result });
      }
    });
  });


  app.post("/getcomment", (req, res) => {
  
    let sql = `SELECT * FROM comments where aid="${req.body.aid}"`;
  
    let query = conn.query(sql, (err, result) => {
      if (result.length != 0) {
        // console.log(result);
  
        res.send({ status: 200, error: null, response: result });
      } else {
        console.log(err)
        res.send({ status: 500, error: null, response: result });
      }
    });
  });



  app.post("/editevent", (req, res) => {
    let sql = `UPDATE event SET event="${req.body.event}" ,date="${req.body.date}",
    loc="${req.body.loc}",desp="${req.body.desp}",price="${req.body.price}" where event_id="${req.body.id}"`;
  
    let query = conn.query(sql, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ status: 500, error: null, response: result });
      } else {
        res.send(JSON.stringify({ status: 200, error: err, response: result }));
      }
    });
  });

  app.post("/putcomment", (req, res) => {
    const min = 1000;
  const max = 9999;
  const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  let sq=`select user_name from user where user_id="${req.body.uid}"`
  let q = conn.query(sq, (err, ress) => {
// console.log(ress)

  let data={
    user_id:req.body.uid,
    msg_id:randomNumber,
    user_name:ress[0].user_name,
    user_msg:req.body.txt,
    aid:req.body.aid
  }
    let sql = `INSERT INTO comments SET ? `;
  
    let query = conn.query(sql,data, (err, result) => {
      if (err) {
        console.log(err)
        res.send({ status: 500, error: null, response: 1});
      } else {
        res.send(JSON.stringify({ status: 200, error: err, response: 1}));
      }
    });
  })
  });

//newzletter
  app.post("/newzletter", (req, res) => {
  //   const min = 1000;
  // const max = 9999;
  // const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  // let sq=`select user_name from user where user_id="${req.body.uid}"`
  // let q = conn.query(sq, (err, ress) => {
// console.log(ress)

  let data={
    band_id:req.body.band_id,
    
    name:"Pulse Subscriber",
    email:req.body.email,
  }
    let sql = `INSERT INTO fan_data SET ? `;
  
    let query = conn.query(sql,data, async (err, result) => {
      if (err) {
        console.log(err)

        res.send({ status: 500, error: null, response: 1});
      } else {
        let ma= await mail(req.body.email,data.name,`We hope this message finds you well. We wanted to take a moment to express our heartfelt thanks for subscribing to Sukuun Pulse's newsletter. Your support means the world to us, and we're thrilled to have you as part of our musical journey.

        As a subscriber, you'll be among the first to receive exciting updates about our latest music releases, upcoming events, behind-the-scenes stories, and exclusive content that we're eager to share with you.
        
        Our mission is to bring the joy of music to your life, and we're excited to have you on board as we embark on this musical adventure together. Your subscription is a testament to your passion for music, and we're committed to delivering content that resonates with you.
        
        If you have any questions, suggestions, or feedback, please feel free to reach out to us anytime. We value your input and are always eager to hear from our fans and subscribers.
        
        Once again, thank you for subscribing to Sukuun Pulse's newsletter. We can't wait to share our music and experiences with you. Stay tuned for our upcoming releases and events!
        
        With musical regards,`,"✨✨Thank You for Subscribing to Sukuun Pulse's Newsletter!");
        res.send(JSON.stringify({ status: 200, error: err, response: 1}));
      }
    });
  // })
  });
  
  app.post("/delevent", (req, res) => {
    let sql = `DELETE FROM event where event_id="${req.body.id}"`;
  
    let query = conn.query(sql, (err, result) => {
      if (err) {
        res.send({ status: 500, error: null, response: result });
      } else {
        res.send(JSON.stringify({ status: 200, error: err, response: result }));
      }
    });
  });


  app.post("/sendmail", (req, res) => {
  
    let sql = `SELECT * FROM fan_data where band_id="${req.body.aid}"`;
  
    let query = conn.query(sql, async(err, result) => {
      if (result.length != 0) {   
        // console.log(result)
        for(let item of result){
            // console.log(item.name)

            let ma= await mail(item.email,item.name,req.body.txt,"✨✨🎉Exciting News! New Article and Upcoming Event");
        }
        
       
  
        res.send({ status: 200, error: null, response: result });
      } else {
        res.send({ status: 500, error: null, response: result });
      }
    });



    
  });

  async function mail(to,name,txt,sub){
  
    let transporter = nodemailer.createTransport({
    
        service: 'gmail', // true for 465, false for other ports
        auth: {
          user: 'webdearsproject@gmail.com', // generated ethereal user
          pass: 'iefrtrdbsudvpsyx', // generated ethereal password
        },
      });
    
    
      var mailoptions={
        from:'webdearsproject@gmail.com',
        to:to,
        subject:sub,
        html:`<h3>Dear ${name},</h3>
        <h5> We hope this email finds you well and in good spirits. We're thrilled to share some exciting updates  that we think you'll love!</h5>
        <p></p>
        <h5>
        ${txt}
        </h5>
        
        
       Warm regards,
        
        <p> Sukuun Pulse Team</p>
        
        
        
        <small>Mail AutoGenerated by Mansoor Ahmed (https://linktr.ee/mansoor.ahmed) </small>
        <small>for any queries please mail to mansoorahmed52002@gmail.com</small>`,
        
      //   attachments:arr,
    }
      
    
     return new Promise(resolve => {
      transporter.sendMail ( mailoptions, async function(err,info){

           
                // return true;
                if(err){
                    console.log(err)
                      resolve(false)
                  
                    }
                    else{
                      console.log("done")
                      resolve(true);
                 
                    
                    }

           
      
      
        })
    })
        // console.log("ooooooooukkk")
    }
  ///////front end requests
  app.post("/frontcover", (req, res) => {
    let sql = `SELECT * FROM cover_info where  aid="${req.body.aid}"`
  
    let query = conn.query(sql, (err, result) => {
      if (err) {
        res.send({ status: 500, error: null, response: result });
      } else {
        res.send(JSON.stringify({ status: 200, error: err, response: result }));
      }
    });
  });





const PORT = process.env.PORT || 1233;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
