const express = require("express");
const app = express();
const crypto = require('crypto');
const multer = require('multer');
const path = require("path");
const nodemailer=require('nodemailer')
// let formidable = require('formidable');
let fs = require('fs');
const bodyParser = require("body-parser");
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
const mysql = require("mysql");


app.use(bodyParser.json());
app.use(express.static('public'))



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
    destination: 'public/uploads/',
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    },
  });
  

  const Albumstorage = multer.diskStorage({
    destination: 'public/albums/',
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    },
  });

  const trackstorage = multer.diskStorage({
    destination: 'public/tracks/',
    filename: (req, file, callback) => {
      callback(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.').pop());
    },
  });
  const upload = multer({ storage: storage });
  const albumupload = multer({ storage: Albumstorage });
  const trackupload = multer({ storage: trackstorage });


const handleError = (err, res) => {
  res
    .status(500)
    .contentType("text/plain")
    .end("Oops! Something went wrong!");
};
const getRandomNumber = () => {
    return Math.floor(Math.random() * (999999 - 100000 + 1)) + 100000;
  };
  
  
const secretKey = '99809933334455667788990099887766'; 
const iv = '9980993333445566';

async function encrypt(text=getRandomNumber()){
    const randomSixDigitNumber = text;
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey,'utf-8'),iv);
    let encryptedData = cipher.update(randomSixDigitNumber.toString(), 'utf-8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;

}

async function decrypt(encryptedData){
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey,'utf-8'), iv);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf-8');
    decryptedData += decipher.final('utf-8');
    return decryptedData;

}
//register
app.post("/signup", async (req,  res) => {
    var id=await encrypt();
    var pid=await encrypt(req.body.Pass);
    let data = { aid : id,artist_name: req.body.Artist,artist_email:req.body.Email,artist_pass:pid};
	let sql = "INSERT INTO artists SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) {
            res.send(JSON.stringify({ status: 500, error: null, response: result }));
            throw err
        
	}
	else{
		res.send(JSON.stringify({ status: 200, error: null, response: id }));

	}
	})

	})

//login
    app.post("/signin", (req, res) => {
        let sql = `SELECT * FROM artists where artist_email="${req.body.Artist}"`;

        let query = conn.query(sql, async (err, result) => {
            if (result.length!=0) {
               var pid= await decrypt(result[0].artist_pass)
               console.log(pid);
                if(pid==req.body.Pass){
                    res.send(JSON.stringify({ status: 200, error: null, response: result }));
                }
                else{
                    res.send(JSON.stringify({ status: 500, error: null, response: result }));

                }
            
                
            
          
        }
        else{
            res.send(JSON.stringify({ status: 700, error: null, response: result }));
    
        }
        })
    
        })



//cover insert
// ...
// Handle form submission via AJAX
app.post('/coverinsert', upload.array('images', 5), (req, res) => {
    const {'val-bname': title,  'val-bname': tag,'val-suggestions': description,'val-insta':insta,'val-youtube':youtube ,'artist':aid} = req.body;
    const images = req.files.map((file) => file.filename);
    console.log(images)
    console.log(aid)
    let msql=`select * from cover_info where aid="${aid}"`;
    let mquery = conn.query(msql, async (err, mresult) => {
        if (mresult.length!=0) {
            let sqlm = `UPDATE cover_info SET title='${title}' ,tag='${tag}', description='${description}' ,youtube='${youtube}' ,
            insta='${insta}' where aid="${aid}"`;
 let querym= conn.query(sqlm, (err, resultm) => {
    if (err) {
        res.send({ status: 500, error: null, response: resultm });
        throw err
    
}
else{
    res.send({ status: 200, error: null, response: resultm});

}
 });
       

    }
    else{
        let data={aid:aid,title:title,tag:tag,description:description,youtube:youtube,insta:insta,images:images.join(',')}
    let sql = "INSERT INTO cover_info SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) {
            res.send({ status: 500, error: null, response: result });
            throw err
        
	}
	else{
		res.send({ status: 200, error: null, response: result});

	}
	})

    }
    
});
})


app.post('/albuminsert', albumupload.array('images', 1), (req, res) => {
    const {'val-album': name,  'val-genere': genere,'artist': aid} = req.body;
    const images = req.files.map((file) => file.filename);
    console.log(images)
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    console.log(aid)
    let data={artist_id:aid,album_id:randomNumber,album_name:name,album_genere:genere,cover:images.join("")}
    let sql = "INSERT INTO album SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) {
            res.send({ status: 500, error: null, response: result });
            throw err
        
	}
	else{
		res.send({ status: 200, error: null, response: result});

	}
	})
});




app.post('/trackinsert', trackupload.fields([{ name: 'Timages', maxCount: 1 }, { name: 'audio', maxCount: 1 }]), (req, res) => {
    // const { name, email, description } = req.body;
    const {'albumcat': albumcat,  'val-audio': audioname,'val-songartist':artist,'artist':aid} = req.body;
     const images = req.files['Timages'].map((file) => file.filename);
    console.log(images)
    console.log(aid)
    const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min
    const audio = req.files['audio'][0].filename;
    let data={album_id:albumcat,track_id:randomNumber,audio_name:audioname,artist_name:artist,cover_path:images.join(''),audio_path:audio}
  


    let sql = "INSERT INTO track SET ?";
	let query = conn.query(sql, data, (err, result) => {
		if (err) {
            res.send({ status: 500, error: null, response: result });
            throw err
        
	}
	else{
		res.send({ status: 200, error: null, response: result});

	}
	})
});

app.post("/getalbum", (req, res) => {
    let sql = `SELECT * FROM album`;

    let query = conn.query(sql, async (err, result) => {
        if (result.length!=0) {
         
        res.send(JSON.stringify({ status: 200, error: null, response: result }));

    }
    else{
        res.send(JSON.stringify({ status: 700, error: null, response: result }));

    }
    })

    })

    app.post("/getcover", (req, res) => {
        let sql = `SELECT * FROM cover_info`;
    
        let query = conn.query(sql, async (err, result) => {
            if (result.length!=0) {
             
            res.send(JSON.stringify({ status: 200, error: null, response: result }));
    
        }
        else{
            res.send(JSON.stringify({ status: 500, error: null, response: result }));
    
        }
        })
    
        })
        app.post("/getalbumtrack", (req, res) => {
            let arr1=[];
            let arr2=[];
            let sql = `SELECT * FROM album where artist_id="${req.body.aid}";
            select * from track`;
        
            let query = conn.query(sql, [1,2],(err, result) => {
                if (result.length!=0) {
                    console.log(result)
                 
                res.send({ status: 200, error: null, response: result });
        
            }
            else{
                res.send({ status: 500, error: null, response: result });
        
            }
            })
        
            })



const PORT = process.env.PORT || 1233;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});