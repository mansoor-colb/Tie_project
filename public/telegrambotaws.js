// import Telegraf from 'telegraf'
// const { Composer,Context } = require('micro-bot')
let {Telegraf} = require('telegraf')
let axios = require('axios')
let cheerio = require('cheerio')
let express = require('express')

const { text } = require("body-parser");
const { Configuration, OpenAIApi } = require("openai");

let cron = require('node-cron')
const request = require('request');
let puppeteer = require('puppeteer')
let { response, json } = require('express')
// var fs = require('fs');
// const { pollRequest } = require('telegraf/typings/button')
let app=express()
const CurrentsAPI = require('currentsapi');
// const port= process.env.PORT || 9000;
// const http = require('http')
const fs = require('fs')

// let bot2 = new Telegraf('5434355576:AAHWcJEmMAI-Imqn-oQ8ZfWm2uCeAlVoC7I')
// let bot = new Telegraf('5434355576:AAFBJxlc4jJ5bZpmK9XxzvV2MdflDMq-yIo')
let bot = new Telegraf('5434355576:AAHWcJEmMAI-Imqn-oQ8ZfWm2uCeAlVoC7I')
let bot2 = new Telegraf('5639193234:AAGNAmWNSZSUJ2LoRRCo3y0-IB8c8drmklk')//admin
// const bot = new Composer()

// const configuration = new Configuration({
//     apiKey: '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'
// });
// const openai = new OpenAIApi(configuration);

async function GPTreq(text,ctxG3){
    try{




      

        const options = {
          method: 'POST',
          url: 'https://chatgpt-api8.p.rapidapi.com/',
          headers: {
            'content-type': 'application/json',
            'X-RapidAPI-Key': 'b38251f12dmsh1e354647d127793p1fe19ejsnd617ffc74cff',
            'X-RapidAPI-Host': 'chatgpt-api8.p.rapidapi.com'
          },
          data: [
            {
              content: text,
              role: 'user'
            }
          ]
        };
        
        try {
            const response = await axios.request(options);
            console.log(response.data);
            bot.telegram.sendMessage(ctxG3.chat.id,response.data,{parse_mode:"HTML"})
        } catch (error) {
            console.error(error);
        }






















//         const options = {
//             method: 'POST',
//             url: 'https://api.writesonic.com/v2/business/content/chatsonic?engine=premium',
//             headers: {
//               accept: 'application/json',
//               'content-type': 'application/json',
//               'X-API-KEY': 'b474fdbc-e5c9-4819-bb2b-e4d2d55d0389'
//             },
//             data: {
//               enable_google_results: true,
//               enable_memory: false,
//               input_text: `${text}`
//             }
//           };
          
//           axios
//             .request(options)
//             .then(function (response) {
//                let cont= `${response.data.message} \n\n Reference Images:\n`
//                if(response.data.image_urls.length !=0){
//                for(let i of response.data.image_urls){
//                 cont+=`${i}\n`
//                }
//             }
//         //    cont= cont.replace("<br>", "\n");
//         //   cont=cont.replace("<br/>","\n");
//        cont=cont.replace(/<\s*br[^>]?>/,'\n')
//             .replace("<br/>)", "\n")
//                 bot.telegram.sendMessage(ctxG3.chat.id,cont,{parse_mode:"HTML"})
//             //   console.log(response.data);
//             })
//             .catch(function (error) {
//               console.error(error);
//             });


// // const response = await openai.createCompletion({
// //   model: "text-davinci-003",
// //   prompt: text,
// //   temperature: 0.7,
// //   max_tokens: 4000,


// //   top_p: 1,
// //   frequency_penalty: 0,
// //   presence_penalty: 0,
// // //   stop: [" Human:", " AI:"],
// // })

// // console.log(response.data.choices[0].text)
// // bot.telegram.sendMessage(ctxG3.chat.id,response.data.choices[0].text)
}
catch(e){
    bot.telegram.sendMessage(ctxG3.chat.id,"Server overloaded ,try agian after owner\n(i.e Mansoor) updates API.")
}
}



bot.command('stu',function(cstu){
    if(cstu.message.from.id==1682939793){

    str=cstu.message.text;
    slcstr=str.substr(5)
    arr=slcstr.split(',')
    // console.log(arr)
    var options = {
        method: 'POST',
        url: 'http://localhost:9000/api/cred/put',
        data: {usn: `${arr[0]}`, name: `${arr[1]}`, logmail: `${arr[0]}`,pass: `${arr[2]}`}
      };
      
      axios.request(options).then(function (response) {
        // console.log(response.data);
        cstu.reply("Successfully added in database")
      }).catch(function (error) {
        console.error(error);
      });

    }

})


bot2.start((ctx)=>{
    bot2.telegram.sendMessage(ctx.chat.id,"Send the message to be Forwarded!!")
})

bot2.on('message',(ctxchk)=>{
    try{
    console.log("--------------------------------------------------------------------------------")
    console.log(ctxchk)
    console.log("--------------------------------------------------------------------------------")
    console.log(ctxchk.message)
    console.log("--------------------------------------------------------------------------------")
    console.log(ctxchk.message.poll)
    if(ctxchk.message.hasOwnProperty('poll')){
     
        let sendurl2= `http://localhost:9000/api/user`
        axios.get(sendurl2).then((res1)=>{
    
            if(res1.data.response.length==0){
                return
            }
            else{
                for(item of res1.data.response ){
                   try{
                    // ctxam.telegram.sendMessage(item.user_id,`${ui}`).catch(err=>{
                    //     console.log(errif()
                    var tags_string = [];
                    for (var i=0;i<ctxchk.message.poll.options.length;i++){
                        if (i!=0)
                        tags_string [i]= ctxchk.message.poll.options[i].text ;
                        else 
                        tags_string [i]= ctxchk.message.poll.options[i].text ;
                    }
                    if( ctxchk.message.poll.type=='regular'){
                     
                        
                        bot.telegram.sendPoll(item.user_id, ctxchk.message.poll.question, tags_string)
                    }
                    else{

                        bot.telegram.sendPoll(item.user_id, ctxchk.message.poll.question, tags_string,{type:'quiz',correct_option_id:ctxchk.message.poll.correct_option_id})
                    }
                    // bot.telegram.sendPoll(item.user_id, ctxchk.message.poll.question, [ctxchk.message.poll.options],{type:'regular'})
                    // })
                   }
                   catch(err){
                    console.log("error")
                   }
    
                }
            }
        })

    }
    else if(ctxchk.message.hasOwnProperty('document')){
        console.log(ctxchk.message.document.file_id)
        if(ctxchk.message.caption==undefined && !(ctxchk.message.from.id==1682939793)){
        let sendurl2= `http://localhost:9000/api/user`
        axios.get(sendurl2).then((res1)=>{
    
            if(res1.data.response.length==0){
                return
            }
            else{
                for(item of res1.data.response ){
                   try{
                
                    bot.telegram.sendDocument(item.user_id,`${ctxchk.message.document.file_id}`)
                   }
                   catch(err){
                    console.log("error")
                    bot2.reply("Error In telegram Servers")
                   }
    
                }
                bot2.reply("sent successfully")
            }
        })
    }
    else if(ctxchk.message.from.id==1682939793){
        var options = {
            method: 'POST',
            url: 'http://localhost:9000/api/notes/put',
            data: {title: `${ctxchk.message.document.file_name}`, desp: `${ctxchk.message.document.file_name}`, file_id: `${ctxchk.message.document.file_id}`}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            ctxchk.reply("Successfully added in database")
          }).catch(function (error) {
            console.error(error);
          });

    }
    else if(ctxchk.message.caption!=undefined){
        let sendurl2= `http://localhost:9000/api/user`
        axios.get(sendurl2).then((res1)=>{
    
            if(res1.data.response.length==0){
                return
            }
            else{
                for(item of res1.data.response ){
                   try{
                    // ctxam.telegram.sendMessage(item.user_id,`${ui}`).catch(err=>{
                    //     console.log(err)
                    // })
                    bot.telegram.sendDocument(item.user_id,`${ctxchk.message.document.file_id}`,{caption:`${ctxchk.message.caption}`})

                   }
                   
                   catch(err){
                    console.log("error")
                   }
    
                }
                bot2.reply("sent successfully")
            }
        })

        }
        
    }
    else if(ctxchk.message.hasOwnProperty('photo')){
        if(ctxchk.message.caption==undefined){
            let sendurl2= `http://localhost:9000/api/user`
            axios.get(sendurl2).then((res1)=>{
        
                if(res1.data.response.length==0){
                    return
                }
                else{
                    for(item of res1.data.response ){
                       try{
                       
                        bot.telegram.sendPhoto(item.user_id,ctxchk.message.photo[0].file_id)
                       }
                       catch(err){
                        console.log("error")
                        bot2.reply("Error in Telegram servers")
                       }
        
                    }
                    bot2.reply("sent successfully")
                }
            })
        }
           else{
            let sendurl2= `http://localhost:9000/api/user`
            axios.get(sendurl2).then((res1)=>{
        
                if(res1.data.response.length==0){
                    return
                }
                else{
                    for(item of res1.data.response ){
                       try{
                        // ctxam.telegram.sendMessage(item.user_id,`${ui}`).catch(err=>{
                        //     console.log(err)
                        // })
                        bot.telegram.sendPhoto(item.user_id,ctxchk.message.photo[0].file_id,{caption:ctxchk.message.caption})
                       }
                       catch(err){
                        console.log(err)
                        bot2.reply("Erroe in Telegram Servers")
                       }
        
                    }
                    bot2.reply("sent successfully")
                }
            })

           }
        
    }
    else{
        let sendurl2= `http://localhost:9000/api/user`
        axios.get(sendurl2).then((res1)=>{
    
            if(res1.data.response.length==0){
                return
            }
            else{
                for(item of res1.data.response ){
                   try{
                  
                    bot.telegram.sendMessage(item.user_id,ctxchk.message.text)
                   }
                   catch(err){
                    console.log("error")
                   }
    
                }
            }
        })
        
    }}catch(e){
        console.log(e)
    }
})
bot2.launch()

process.on('uncaughtException', function (error) {
	console.log("\x1b[31m", "Exception: ", error, "\x1b[0m");
});

process.on('unhandledRejection', function (error, p) {
	console.log("\x1b[31m","Error: ", error.message, "\x1b[0m");
})

var cook;
     
bot.help((ctxh)=>{

    ctxh.reply(" For Any Queries or Facing problem in Bot Access,\n Dm -> @Mans0orAhmed ")

   
    // var arri=[0]
//     scrapeProduct(`https://ums.mydsi.org/Login.aspx`)
// async function scrapeProduct(url){
//     let browser= await puppeteer.launch({
//         headless:true,
//         defaultViewport:null
//     })
//     let page= await browser.newPage()
// //     await page.setExtraHTTPHeaders({ 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' });
//     await page.goto(url,{waitUntil:'networkidle2'})

//     await page.type('#txtUsername','mansoorahmed52002@gmail.com')
//     await page.type('#txtPassword','Megha#123')
//     await page.click("#btnLogin")

//     const cook= await page.cookies();
//     await fs.writeFileSync('./cook.json',JSON.stringify(cook,null,2));
//     console.log(cook)
//     // scrapeProduct2(`https://ums.mydsi.org/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx`,cook)


// }
// scrapeProduct2(`https://ums.mydsi.org/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx`)
// async function scrapeProduct2(url2){
//     // let browser= await puppeteer.launch({
//     //     headless:true,
//     //     defaultViewport:null
//     console.log('tttytyty')
//     let browser2= await puppeteer.launch({
//         headless:true,
//         defaultViewport:null
//     })
//     // })
//     let page2= await browser2.newPage()
//     const cookstring =await fs.readFileSync("./cook.json")
//     const cookies=JSON.parse(cookstring)
// //     await page.setExtraHTTPHeaders({ 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' });
//     await page2.setCookie(...cookies);
//     await page2.goto(url2,{waitUntil:'networkidle2'})
//     let el= await page2.$$(`.gradeX`)
//     // await page2.screenshot({ path:'scree.png'})
//     // for(let i=0;i<el.length;i++){
//     //          const element =el[i]
//     //  const title = await page.evaluate(element => element.querySelectorAll('td').innerHTML,element)
//     // }
// let attendencearray=[];
//        for(const item of el){
//     const [si,subname,slot,totalclass,attendedclass,absentclass,percent] = await item.evaluate(
//       el => Array.from(el.querySelectorAll('td'), span => span.innerText)
//     );
//     attendencearray.push({
//         subject:subname,

//         total:totalclass,
//         attended:attendedclass,
//         absent:absentclass,
//         percentage:percent
//     })
//     // console.log(`Item Name: ${itemName} ${subname} ${slot} ${f}  ${attendedclass} ${absentclass} ${percent} `);
// }
// console.log(attendencearray)
// let attendmsg='';
// for ( let attitem of attendencearray){
//     attendmsg+=`<strong>${attitem.subject}</strong>\n Total classes :${attitem.total}\t Classes Attended : ${attitem.attended}\n<b>Classes Absent : ${attitem.absent}</b>\n<strong>Total Current : ${attitem.percentage} %</strong>\n----------------------------------------\n\n`


// }
// ctxh.telegram.sendMessage(ctxh.chat.id,attendmsg,{parse_mode:'HTML'})

//     // await page.type('#txtUsername','mansoorahmed52002@gmail.com')
//     // await page.type('#txtPassword','Megha#123')
//     // await page.click("#btnLogin")

// // }
// }





























    //     let [el]= await page.$x(`//*[@id="1554889506437-64c3b5d5-d21e"]/div[2]/div/div`)
    //     let srctxt= await el.each(function(item){
        //      item.getProperty('textContent')
        //     })
        //  let src =await srctxt.jsonValue()
        //     console.log({src})
        // let arrayresult=[]
    // await page.waitForSelector('.card-body')
    //     // await page.waitForTimeout(5000)
    //     let el=   await page.$$(`.card-text`)
        // await page.screenshot({ path:'scree.png'})
     
    
     //  const title = await page.evaluate(element => element.textContent,element)
     

    //  for(let i=0;i<el.length;i++){
    //      const element =el[i]
    //      let span1= await page.evaluate(element => element.nextElementSibling.getAttribute('href'),element)
    //     //  const span3= await page.evaluate(span1 => span1.querySelector('small').innerText,span1)
        //  const span2= await page.evaluate(element => element.querySelector('.chip').textContent,element)

       
    //     //  const sapn2 = await page.evaluate(element => element.querySelector(`${element} span:nth-child(2)`).innerHTML,element)
    //     //  const title = await page.evaluate(element => element.textContent,element)
    //     // arrayresult.push({
    //     //     title,
    //     //     link
    //     // })
        // console.log(span1)
        // console.log(span2)
      
    // }
    //  let msgo='';
    //  let i=1;
    // for(const it of el){
    //     const [itemName] = await it.evaluate( el => Array.from(el.querySelectorAll('.strong'), span => span.innerText));
    //     const [itemtwo] = await it.evaluate(el => Array.from(el.querySelectorAll('small'), span => span.innerText) );


       
    
    //     console.log(itemName)
    //     console.log(itemtwo)
    // }
//     let ar=[0]
//   for(var i = 1; i < arri.length; i += 2) {  // take every second element
//         await ar.push(arri[i]);
//     }
//     console.log(ar);
    // let out=arri.filter(num => num % 2)
  
    // for(const item of el){
    //     const [itemName,count] = await item.evaluate(
    //       el => Array.from(el.querySelectorAll('small span'), span => span.innerText)
    //     );
    //     console.log(`Item Name: ${itemName} Item c: ${count}`);
    // }
    // for(const item of el){
    //     const [itemName] = await item.evaluate(
    //       el => Array.from(el.querySelectorAll('small'), span => span.innerText)
    //     );
    //     console.log(`Item Name: ${itemName}`);
    // }
 
    //    let srctxt= await el.getProperty('textContent')
    //     item.
   
    // let src =await srctxt.jsonValue()
    //    console.log({src})
    //    ctx.reply({el})
    // await browser.close();
// }

// const urls='https://results.vtuconnect.in/1DT20CS075/view?ry=FEBRUARY%2FMARCH%202022&sem=3'
//  axios(urls)
// //     const link=[]
// .then((respos)=>{
// setTimeout(function(){
//         const html= respos.data
//         const $ =cheerio.load(html)
        
//     let link =$('mat-card-content').html()

//     console.log(link)
// },3000)
// //     $('#recent-posts-2 > div:nth-child(2)',html).each(function(){
// //        const t= $(this).text()
// //         const a=$(this).find('a').attr('href')
// //         link.push({
// //             a
// //         })
   

// }).catch((err)=>{
//     console.log(err)
// })

    // ctx.reply("got message ihh cool")
    // let u=`https://results.vtuconnect.in/1DT20CS075view?ry=FEBRUARY%2FMARCH%202022&sem=3`
    // axios(u)
    // .then(res=>{
    //     let html=res.data
    //     // console.log(html)
    //     let $ =cheerio.load(html)
    //     let arr=[]
    //     let el=$('/html/body/app-root/mat-drawer-container/mat-drawer-content/div/div[1]/div/app-results-main/app-result-page/div/div[2]/mat-card/mat-card-content/mat-grid-list[1]/div/mat-grid-tile[1]/figure/div/div[3]/small/span[3]',html).html()
        
    //     // .each(function(){
    //     //    let txt= $(this).html();
    //     //    arr.push({txt})
        
    //     // })
    //     console.log(el)
    //     // console.log("oo")
    // }).catch(err => console.log(err))
})
bot.command('session',(ctxsession)=>{
    ctxsession.reply('Hold on session being created')
    let urlm= `http://localhost:9000/api/cookie/view/${ctxsession.chat.id}`
    // let urlm= `​https://teledatabase.onrender.com/api/cookie/view/${ctxsession.chat.id}` //in case of heroku fail
    axios.get(urlm)
    .then((res)=>{  
        if(res.data.response.length!=0){

            scrapeProduct(`https://ums.mydsi.org/Login.aspx`,res)
        }
        else{
            ctx.reply("Please register to use our complete service")
        }

     }).catch(function (error) {
        ctxsession.reply("OPss Credentials didn't match")
    console.error(error);
    });
    async function scrapeProduct(url,res){
        try{
        let browser= await puppeteer.launch({
            headless:false,
            args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-features=site-per-process'],
            defaultViewport:null
        })
        let page= await browser.newPage()
    //     await page.setExtraHTTPHeaders({ 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' });
        await page.goto(url,{waitUntil:'networkidle2'})
     
            
             
                await page.type('#txtUsername',`${res.data.response[0].logmail}`)
                await page.type('#txtPassword',`${res.data.response[0].pass}`)
                await page.click("#btnLogin")

             const cook= await page.cookies();
             if(cook!='' || cook!=null){
                const jcookies=JSON.stringify(cook,null,2)

                var options = {
                method: 'PUT',
                url: 'http://localhost:9000/api/update/',
                // url: '​https://teledatabase.onrender.com/api/update/',
                data: {session: `${jcookies}`, usn:res.data.response[0].Usn}
                };

                axios.request(options).then(function (resi) {
                    if(resi.data.response.affectedRows==1){
                        ctxsession.reply("Session created successfully 😊")
                    }
                    else{
                        ctxsession.reply("You have not registered yet.Click How Bot works under the /start command ")

                    }
                // console.log(res.data);
                }).catch(function (error) {
                    ctxsession.reply("OPss Credientials didn't match")
                console.error(error);
                });
            //   console.log(cook)
             }
             else{
                ctxsession.reply('Opps something wrong in logging')
             }
            //   await fs.writeFileSync('./cook.json',JSON.stringify(cook,null,2));

            //   var axios = require("axios").default;
              
            // }

     
        }
        catch(err){
            ctxsession.reply('some error occured !try again later .you may still use the services excepy attendence')

        }
        await browser.close();
    }
    
})
bot.command('register',(ctxr)=>{


    let url1= `http://localhost:9000/api/reg/user?chat_id=${ctxr.chat.id}&username='${ctxr.message.chat.first_name}'`
    // let url1= `​https://teledatabase.onrender.com/api/reg/user?chat_id=${ctxr.chat.id}&username='${ctxr.message.chat.first_name}'`
    axios.get(url1)
    .then((res)=>{
    
        if(res.data.response.length==0 ){
            // if(res.data.response.username!=ctxr.message.chat.first_name ){

            
            var reg=/[0-9][A-Z]{2}[0-9]{2}[A-Z]{2}[0-9]{3}/
            if(ctxr.message.chat.first_name.length==10 && reg.test(ctxr.message.chat.first_name)){


        
            let url2= `http://localhost:9000/api/create/user`
            // let url2= `​https://teledatabase.onrender.com/api/create/user`
            axios.post(url2,{
                username:`${ctxr.message.chat.first_name}`,
                user_id:`${ctxr.message.chat.id}`
            }).then((res1)=>{
            //   globalctx=ctxr
               ctxr.reply("Succefully registered")

            }).catch((err)=>{
                console.log(err)
            })
        }else{
            ctxr.reply("Please for registration change your firstname in profile with your valid USN . Ex:1DT20CS000")
        }
    // }else{
    //     ctxr.reply("Already registered with this Usn (Can't register sorry)")
    // }
}
else{
    if(res.data.response[0].username!=ctxr.message.chat.first_name && res.data.response[0].user_id==ctxr.message.chat.id ){
     
        
        ctxr.reply(" Your Account is Already registered with Another Usn  ")
    }
    else if(res.data.response[0].username==ctxr.message.chat.first_name && res.data.response[0].user_id!=ctxr.message.chat.id ){

        ctxr.reply("Already registered with this Usn (Can't register sorry)")
    }
    else{
        ctxr.reply("Already registered 😊")
            }
      
    }     
                }).catch(err=>{
                    console.log(err)
                })
 })




bot.start((ctx)=>{


 
        
    // globalctx=ctx
    let buttonarry=[
        [{text:"how bot works",callback_data:`start_btn_wizard_Description`}],
        [{text:"Attendence",callback_data:`start_btn_wizard_Attendence`}],
        [{text:"Marks",callback_data:`start_btn_wizard_Marks`}],
        [{text:"Clubs",callback_data:`start_btn_wizard_Clubs`}],
        [{text:"Library Book Status",callback_data:`start_btn_wizard_Library Book Status`}],
        [{text:"Senior's Contact",callback_data:`start_btn_wizard_Seniors Contact`}],
        [{text:"Text Books",callback_data:`start_btn_wizard_Text Books`}],
        [{text:"My Documents",callback_data:`start_btn_wizard_My Documents`}],
        [{text:"Events Calender",callback_data:`start_btn_wizard_Events Calender`}],
        [{text:"Notes",switch_inline_query_current_chat:''}],
        [{text:"Calculate CGPA",callback_data:'start_btn_wizard_Calculate CGPA'}],
        [{text:"Vtu Notif",callback_data:'start_btn_wizard_Vtu_notif'}],
        [{text:"Bus Status",callback_data:'start_btn_wizard_bus_status'}],
        [{text:"Articles",callback_data:`start_btn_wizard_Articles`}],
        [{text:"GPT3(beta)",callback_data:`start_btn_wizard_GPT3(beta)`}],
    
    ]
    ctx.telegram.sendMessage(ctx.chat.id,`select option`, 
               {
                    reply_markup:{
                        inline_keyboard:
                            buttonarry,
                    InlineKeyboardButton:[[{text:"Notes",switch_inline_query_current_chat:''}]]
                        
                        // input_field_placeholder:"what is your name",
                        // force_reply:true,
                    }
                }
               )

})
bot.action(/start_btn_wizard_+/,(ctx)=>{
    let product_id = ctx.match.input.substring(17);
    switch(product_id){
        case 'Description':let desp=descrip(ctx);
        break;
        case 'Marks':let m=marks(ctx);
        break;
        case 'Attendence':let at= attend(ctx);
        break;
        case 'Clubs':let c=club(ctx);
        break;
        case 'Seniors Contact':let s=guide(ctx);
        break;
        case 'Library Book Status':let l=lib(ctx);
        break;
        case 'Text Books':let t=txtbook(ctx);
        break;
        case 'My Documents':let d=mydocuments(ctx);
        break;
        case 'Events Calender':let e=events(ctx);
        break;
        case 'Vtu_notif':let n=vtu(ctx);
        break;
        case 'Calculate CGPA':let cg=cgpa(ctx);
        break;
        case 'Articles':let a=article(ctx);
        break;
        case 'bus_status':let b=bus(ctx);
        break;
        case 'GPT3(beta)':let G=chatGpt(ctx);
        break;
        default:ctx.reply("Invalid")
    }
    // ctx.reply(product_id)
})


//inline query
bot.on('inline_query',(ctxI)=>{

    let query=ctxI.inlineQuery.query
    let url=`http://localhost:9000/api/notes/view/${query}`
    // let url=`​https://teledatabase.onrender.com/api/notes/view/${query}`
    axios.get(url)
        .then((res)=>{
            
         if(res.data.response.length==0){
            ctxI.reply("No data available")
         }
         else{
                    // for(let item of res.data.response){
                        let result=res.data.response.map((item,index)=>{
                            return{
                                type:'document',
                                id:String(index),
                                title:item.title,
                                description:`${item.desp}`,
                                document_file_id:item.file_id,
                                reply_markup:{
                                    inline_keyboard:[
                                        [
                                            {text:`Share ${item.title}`,switch_inline_query:`${item.title}`}
                                        ]
                                    ]
                                }
                            }
                        })
                     
                       
                  
                      
                        ctxI.answerInlineQuery(result)
                    } 
                }).catch((err)=>{
                    console.log(err)
                })
            
})


//description

function descrip(ctxdescrip){
    ctxdescrip.telegram.sendMessage(ctxdescrip.chat.id,`
The bot can provide following functionaliies:

Before using the services. 

You have to do <b>one-time registration</b> with your USN.
Process:

a) Replace your First name in the profile with your USN. For Demo purpose you can try using  -(1DT20CS077)(All caps). 
    
b) Then Open the bot, click - menu (available near text box) click /register. 
    
All set!! You have successfully registered and you may change you first name to what ever you wish. And with this you are all set to use the complete services of the bot. 
    
<b>Note* : without registration you will not be able to use all the service like Attendence, Marks, library status.</b> 
 
Services- 
<b> 1)Attendence :</b>
Real-time attendance is delivered from the ERP. 
This is session based service, you need to restart session(by clicking the session command that will be shown) for checking attendance if you are using bot after long time from the last use(i.e Session Expired ) . 
Once you have re-started the session you can use this service as many times needed without re-starting session everytime, unless session gets expired. 
    
    
<b>2) Marks: </b> 
You can check your official saved marks of appeared Sems till date from Vtu server directly in the bot.
     
<b>3) Clubs:</b>
Here you get info of various club that are running in the campus along with brief description and the co-ordinators telegram-id's and contact. So that you can enquire and be a part of interested club.

<b>4) Library Book Status :</b>
Get to know the book you have taken against your USN and there Respective Due dates.

<b>5)Seniors Contact:</b>
No more searching for seniors contact for various Guidance. Here you get list of selected Seniors who are Good at various skills and are ready to help you out. You have there  T-ids Select who suits best for your need and contact them.

<b>6)Text books :</b>
Here you get all  E-vtu prescribed Textbook copies (if available ) at one place.
Just click on it, select sem, slight hold on '/text' untill it gets pasted into text box or type in directly give space and write the Subject code. Like
'/textspace18cs56'


<b>7) Documents </b> 
No more digging into gallery for finding important docs, here you can save all your imp documents
such as Marks cards, pdfphotos,etc and access them any time right here.

Click on the documents - select upload new document and select the pic / doc from galley pin icon  give it a name in caption  and send it to the bot. Done it's saved there. 

You can get it any time by clicking Documents - get my documents. You get list of all the saved documents, click on the required one and the document is sent to you.

<b>8) Events :</b>
 Official calendar of events pdf.

<b>9) Notes:</b>
No more going to various multiple websites for downloading notes, just click on it, the text box gets active, type the keyword for your required search and multiple options are displayed select the one you need and you are done you have the notes.

<b>10) Vtu notif:</b>
Get the real-time official vtu notifications and the doc link. 

<b>11)Articles : </b> 
Keep your self updated in various available categories like Tech, finance, Sports,Entertainment etc by reading the articles.
(And every day around 8.00 am you'll be getting a Article message to be read if interested. )


<b>12)Bmtc Bus Status : </b> 
Just share your current location to the Bot and you Get to Know the Arrival time Of Bmtc Bus at your current Location Bus stop which is provide by Gov of Karnataka.


<b>13)Calculate Cgpa / Sgpa : </b> 
No need of  using Multiple Online Cgpa/Sgpa Calculators, Just enter your marks and get the accurate Result By the Official Vtu Result Calculation Algorithm.

<b>14)In-built Gpt-3 </b> 
No need of Signup/Login ,just Post your Queries and get responses  directly From Chat-Gpt in the bot .
`,{parse_mode:'HTML'})

}
//Attendance
function attend(ctxcoo){
    try{
    // var axios = require("axios").default;
    ctxcoo.reply("Please wait Your request is under process (10s)")
    let urlm= `http://localhost:9000/api/cookie/view/${ctxcoo.chat.id}`
    // let urlm= `​https://teledatabase.onrender.com/api/cookie/view/${ctxcoo.chat.id}`
    axios.get(urlm)
    .then((resu)=>{  
        if(resu.data.response.length!=0){

     
var options = {method: 'GET', url: `http://localhost:9000/api/view/${resu.data.response[0].Usn}`};

axios.request(options).then(function (response) {
    
    scrapeProduct2(`https://ums.mydsi.org/StudentPanel/TTM_Attendance/TTM_Attendance_StudentAttendance.aspx`,response)
  console.log(response.data);
}).catch(function (error) {
ctxcoo.reply("Your usn is not in out Data-base")
});
}
else{
    ctxcoo.reply("we dont have your credentials.\n You can submit your credentials at https://mansoortelegrambot.epizy.com/studenttelegram.html\n Credentials will get updated within 8-9 hours")
}
     
})

    async function scrapeProduct2(url1,res){
        let browser2= await puppeteer.launch({
            headless:false,
            defaultViewport:null
            // args: ['--no-sandbox', '--disable-setuid-sandbox','--disable-features=site-per-process'],
            // defaultViewport:null
        })
        let page1= await browser2.newPage()
       
        const cookies=JSON.parse(res.data.response[0].Session_id)
   
        await page1.setCookie(...cookies);
        await page1.goto(url1,{waitUntil:'networkidle2',
        // Remove the timeout
              })
  console.log(page1)
    let el=   await page1.$$(`.gradeX`)
    
      
 let attendencearray=[];
 let conducted=0;
 let totalattended=0;
 let grandtotal=0;
           for(const item of el){

        const [si,subname,slot,totalclass,attendedclass,absentclass,percent] = await item.evaluate(
          el => Array.from(el.querySelectorAll('td'), span => span.innerText)
        );
        conducted=conducted+Number(totalclass);
        totalattended=totalattended+Number(attendedclass);

        attendencearray.push({
            subject:subname,

            total:totalclass,
            attended:attendedclass,
            absent:absentclass,
            percentage:percent
        })
        // console.log(`Item Name: ${itemName} ${subname} ${slot} ${f}  ${attendedclass} ${absentclass} ${percent} `);
    }
    console.log(attendencearray)
    if(attendencearray.length==0){
        ctxcoo.telegram.sendMessage(ctxcoo.chat.id,'Please Start  session press. /session',{parse_mode:'HTML'})
    }
    else{

  
    let attendmsg='';
    for ( let attitem of attendencearray){
        attendmsg+=`<strong>${attitem.subject}</strong>\n Total classes :${attitem.total}\t Classes Attended : ${attitem.attended}\n<b>Classes Absent : ${attitem.absent}</b>\n<strong>Total Current : ${attitem.percentage} </strong>\n----------------------------------------\n\n`


    }
    console.log(totalattended)
    console.log(conducted)
    grandtotal=(totalattended/conducted) *100;
    grandtotal=grandtotal.toFixed(1)
    attendmsg+=`<strong>\n Grand Attendence : ${grandtotal} %</strong>`
ctxcoo.telegram.sendMessage(ctxcoo.chat.id,attendmsg,{parse_mode:'HTML'})
    
}  
await browser2.close();

    }
 
}catch(er){
    console.log(er)
    ctxcoo.reply("Some Error Occured During Authentication -> Contact @Mans0orAhmed")

}
}



function bus(ctxbus){
    var option = {
        "parse_mode": "Markdown",
        "reply_markup": {
            "one_time_keyboard": true,
            "keyboard": [[{
                text: "My location",
                request_location: true
            }], ["Cancel"]]
        }
    };
   
    ctxbus.telegram.sendMessage(ctxbus.chat.id, "send your location", option).then(() => {
    
})
bot.on('location',(ctr)=>{

    // var axios = require("axios").default;

    var options = {
      method:'POST',
      url: 'https://adapter.tummoc.in/adapter/api/getNearByBusRoute',
      params: {routeDirection: 'DOWN'},
      headers: {
        userId: '637d1caf538fa293c8a33eb6',
        userType: 'guest',
        city: 'bengaluru',
        token: 'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MzdkMWNhZjUzOGZhMjkzYzhhMzNlYjYiLCJ1c2VyVHlwZSI6Imd1ZXN0IiwiaWF0IjoxNjY5MTQzNzM4LCJleHAiOjE3MDA2Nzk3Mzh9.pGb6aUV8f0Sth1iwzzr8SKf5qAn0a2w2gcbMlgyjYas'
      },
      data: `{"limit":14,"page":1,"sourceLat":${ctr.message.location.latitude},"sourceLong":${ctr.message.location.longitude},"routeDirection": "UP"}}`
    };
    
    axios.request(options).then(function (response) {
        console.log(response)
        console.log(response.data)
        if(response.data.data==null){
            ctr.reply("No data available for the Location");
        }
        else{

        
    umsg='--Direction "UP"--\n';
    dmsg='--Direction "DOWN"--\n';
    
        for(let item of response.data.data){
            if(item.routeDirection=='UP'){
                umsg +=`BUS no:${item.routeName}\nRoute Direction : ${item.routeDescription}\nStandard Arrival Time ~ ${item.staTime}\nBUS Stop Name:${item.busStopName}\n---------------------------\n`
    
            }
            else if(item.routeDirection=='DOWN'){
                dmsg +=`BUS no:${item.routeName}\nRoute Direction : ${item.routeDescription}\nStandard Arrival Time ~ ${item.staTime}\nBUS Stop Name:${item.busStopName}\n---------------------------\n`
            }
    
    
        }
        ctr.telegram.sendMessage(ctr.chat.id,`${umsg}\n================\n\n${dmsg}`,{parse_mode:'HTML'})
    console.log(response.data.data);
    }
    })
    .catch(function (error) {
      console.error(error);
    });

    console.log(ctr.message.location)

})

}


//sgpa

function cgpa(sgpactx){
    sgpactx.telegram.sendMessage(sgpactx.chat.id,`slight hold  on /cgpa and Enter the each sem sgpa from 1st sem till required in order, seperated by comma(,) in input box \n Example : For cgpa of 4 sems\n /sgpa 8.9,9.2,8.7,9.0 and then just send.\n(note: you can get sgpa by checking individual sem marks in  bot)`, 
    {
         reply_markup:{
           
             input_field_placeholder:"\sgpa 8.5,8.56,8",
             force_reply:true,
         }
     }
    )
    bot.command('cgpa',(ctxcgpa)=>{  
        let msg=ctxcgpa.message.text.trim()
        var  msgarr=msg.split(" ");
         msgarr.shift()
         let query=msgarr.toString()
         let arr=query.split(",")
         console.log(arr)

         let sem1=arr[0] || "";
         let sem2=arr[1] || "";
         let sem3=arr[2] || "";
         let sem4=arr[3] || "";
         let sem5=arr[4] || "";
         let sem6=arr[5] || "";
         let sem7=arr[6] || "";
         let sem8=arr[7] || "";
         console.log(sem8)
        
       if (
         sem1 !== "" ||
         sem2 !== "" ||
         sem3 !== "" ||
         sem4 !== "" ||
         sem5 !== "" ||
         sem6 !== "" ||
         sem7 !== "" ||
         sem8 !== ""
       ) {
         var totalSgpa = 0;
         var totalCredits = 0;
         if (sem1 != "") {
           totalSgpa += Number(sem1) * 20;
           totalCredits += 20;
         }
         if (sem2 != "") {
           totalSgpa += Number(sem2) * 20;
           totalCredits += 20;
         }
         if (sem3 != "") {
           totalSgpa += Number(sem3) * 24;
           totalCredits += 24;
         }
         if (sem4 != "") {
           totalSgpa += Number(sem4) * 24;
           totalCredits += 24;
         }
         if (sem5 != "") {
           totalSgpa += Number(sem5) * 25;
           totalCredits += 25;
         }
         if (sem6 != "") {
           totalSgpa += Number(sem6) * 24;
           totalCredits += 24;
         }
         if (sem7 != "") {
           totalSgpa += Number(sem7) * 20;
           totalCredits += 20;
         }
         if (sem8 != "") {
           totalSgpa += Number(sem8) * 18;
           totalCredits += 18;
         }
   }
         let totalCgpa = totalSgpa / totalCredits;
         console.log(totalCgpa);
         ctxcgpa.telegram.sendMessage(ctxcgpa.chat.id,
            `Your Total Cgpa till ${arr.length}th sem is : ${totalCgpa.toFixed(3)}`,{parse_mode:"HTML"})
   
   

    })
}






//vtu
function vtu(ctxnot){
    
    ctxnot.telegram.sendChatAction(ctxnot.chat.id,'typing')
    ctxnot.telegram.sendMessage(ctxnot.chat.id,'Fetching Notifications (please wait)')



    var axios = require("axios").default;

    var options = {method: 'GET', url: 'http://localhost:9000/api/notif/get'};
    
    axios.request(options).then(function (response) {
      console.log(response.data);
      ctxnot.telegram.sendMessage(ctxnot.chat.id,
        response.data.response[0].message,{parse_mode:"HTML"})
     
    }).catch(function (error) {
      console.error(error);
    });
}


//Marks
function marks(ctxM){
  

    let sembuttonarry=[ 
        [{text:"1st ",callback_data:`SEMM_wizard_1st`},{text:"2nd ",callback_data:`SEMM_wizard_2nd`},{text:"3rd ",callback_data:`SEMM_wizard_3rd`}],
        [{text:"4th ",callback_data:`SEMM_wizard_4th`},{text:"5th ",callback_data:`SEMM_wizard_5th`}, {text:"6th ",callback_data:`SEMM_wizard_6th`}],
        [{text:"7th",callback_data:`SEMM_wizard_7th`},{text:"8th ",callback_data:`SEMM_wizard_8th`}]
       
    ]
        ctxM.telegram.sendMessage(ctxM.chat.id,`Choose Semester`, 
        {
             reply_markup:{
              
                inline_keyboard:sembuttonarry
             
                //  input_field_placeholder:"Ex.Mansoor",
                //  force_reply:true,
             }
         }
        )

        bot.action(/SEMM_wizard_+/,(ctxMM)=>{
            ctxMM.deleteMessage();
            let product_id = ctxMM.match.input.substring(12);
          switch(product_id){
                case '1st':getmarks(ctxMM,1);
                break;
                case '2nd':getmarks(ctxMM,2);
                break;
                case '3rd':getmarks(ctxMM,3);
                break;
                case '4th':getmarks(ctxMM,4);
                break;
                case '5th':getmarks(ctxMM,5);
                break;
                case '6th':getmarks(ctxMM,6);
                break;
                case '7th':getmarks(ctxMM,7);
                break;
                case '8th':getmarks(ctxMM,8);
                break;
                default:ctxMM.reply("Invalid request")
            }
        })
function getmarks(ctxmmm,sem){
    var sgpaarr=[];
    
    let urlm= `http://localhost:9000/api/user/${ctxmmm.chat.id}`
    // let urlm= `​https://teledatabase.onrender.com/api/user/${ctxmmm.chat.id}`
    axios.get(urlm)
    .then((res)=>{
        console.log(res.data.response.length)
        if(res.data.response.length!=0){
            var person =res.data.response[0].username;

            var options = {
  method: 'GET',
  url: `https://api.vtuconnect.in/v2/result/${person}`,
  headers: {
    Host: 'api.vtuconnect.in',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzdhOWQ4N2RiODQzODFlZjk2Yzg1MCIsImF2YXRhciI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FJdGJ2bWtmMmx5aTB5c0tBQmhEcUUyd2cxZDBTcHlaaHc3VUVVRExFbDd6PXM5Ni1jIiwiZnVsbE5hbWUiOiJ3ZWIgbWFuYWdlIiwiZW1haWwiOiJ3ZWJkZWFyc3Byb2plY3RAZ21haWwuY29tIiwic2NvcGUiOlsidXNlciJdLCJ1c24iOiIxRFQyMENTMDc1IiwiY2xhc3NJZCI6IjFEVDIwQ1MiLCJjb2xsZWdlIjoiREFZQU5BTkRBIFNBR0FSIEFDQURFTVkgT0YgVEVDSE5PTE9HWSBBTkQgTUFOQUdFTUVOVCAiLCJzY2hlbWUiOiIyMDE4Iiwic2VtZXN0ZXIiOiJJViIsImJyYW5jaCI6IkNTRSIsInR5cGUiOiJzdHVkZW50IiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2ODczOTk1OTEsImV4cCI6MTY4ODAwNDM5MX0.o6FCM91h_rWCXQ4Gc4HyTFAiBHHL4TjuyKNlUrTrA-s',
    Origin: 'https://results.vtuconnect.in',
    'User-Agent': 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
    'Accept-Encoding': 'gzip,deflate'
  }
};
let marksarry=''
let month=''
axios.request(options).then(function (response) {
  console.log(response.data);
  let flag=0;
  for(let i of response.data){
    if(i.semester==sem){
       month= i.resultMonthYear;
       flag=1;
    }

  }
  if(flag==1){

    var options = {
        method: 'GET',
        url: 'https://api.vtuconnect.in/v2/result/sem',
        params: {usn: `${person}`, yearmonth: `${month}`, sem: `${sem}`},
        headers: {
          Host: 'api.vtuconnect.in',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyYzdhOWQ4N2RiODQzODFlZjk2Yzg1MCIsImF2YXRhciI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hL0FJdGJ2bWtmMmx5aTB5c0tBQmhEcUUyd2cxZDBTcHlaaHc3VUVVRExFbDd6PXM5Ni1jIiwiZnVsbE5hbWUiOiJ3ZWIgbWFuYWdlIiwiZW1haWwiOiJ3ZWJkZWFyc3Byb2plY3RAZ21haWwuY29tIiwic2NvcGUiOlsidXNlciJdLCJ1c24iOiIxRFQyMENTMDc1IiwiY2xhc3NJZCI6IjFEVDIwQ1MiLCJjb2xsZWdlIjoiREFZQU5BTkRBIFNBR0FSIEFDQURFTVkgT0YgVEVDSE5PTE9HWSBBTkQgTUFOQUdFTUVOVCAiLCJzY2hlbWUiOiIyMDE4Iiwic2VtZXN0ZXIiOiJJViIsImJyYW5jaCI6IkNTRSIsInR5cGUiOiJzdHVkZW50IiwidmVyaWZpZWQiOmZhbHNlLCJpYXQiOjE2ODczOTk1OTEsImV4cCI6MTY4ODAwNDM5MX0.o6FCM91h_rWCXQ4Gc4HyTFAiBHHL4TjuyKNlUrTrA-s',
          Origin: 'https://results.vtuconnect.in',
          'User-Agent': 'node-fetch/1.0 (+https://github.com/bitinn/node-fetch)',
          'Accept-Encoding': 'gzip,deflate'
        }
      };
      let ind;let flag=0;let outoff=0;
      axios.request(options).then(function (response){
        marksarry+=`<strong>${response.data.name}</strong>\n<ins>${response.data.resultMonthYear}</ins>\n\n`
        for (let item of response.data.subjects){
            outoff+=100;
            sgpaarr.push(item.total)
            marksarry +=`<strong>${item.subjectName}</strong>\n<i>${item.subjectCode}</i>\n<b><ins>IA marks: ${item.iaMarks}</ins>  <ins>External:${item.eMarks}</ins></b>\n Total= <strong>${item.total}</strong>\n------------------------\n\n`

        }
        marksarry+=`<strong><ins> Total Marks :${response.data.total}</ins> / ${outoff}</strong>`
        var s=calculate(sgpaarr,sem,response.branchCode);
        marksarry+=`\n\n CGPA : <strong><ins>${parseFloat(s).toFixed(2)}</ins></strong>\nNote:Backlogs marks may not have  been updated so please verify if any.`
        marksarry+=`\n\n------------------------------------\n\n`
        console.log(s)
        ctxmmm.telegram.sendMessage(ctxmmm.chat.id,
            marksarry,{parse_mode:"HTML"})


      })

  }
  else{
    ctxmmm.telegram.sendMessage(ctxmmm.chat.id,
        "No data Available for the sem in Backup-server",{parse_mode:"HTML"})


  }

}).catch(function (error) {
    if(error.response.data.message=="Unauthorized"){
        ctxmmm.telegram.sendMessage(ctxmmm.chat.id,
            "Vtu BackUp sever is currently under Maintainanace ",{parse_mode:"HTML"})
    }
  console.error(error);
});
    
 
    }
    else{
       ctxmmm.reply("Please register first by clicking /register or Click How Bot works under the /start command")
 
        }     
           }).catch(err=>{
               console.log(err)
           })

}
               


    // bot.command('message',(ctxM)=>{  
    //     // url=`https://results.vtuconnect.in/1DT20CS075/view?ry=FEBRUARY%2FMARCH%202022&sem=3`
    //     let query=ctxM.message.text.trim()
    //     let url=`http://localhost:9000/api/view/${query}`
    //     axios.get(url)
    //     .then((res)=>{
         
    //      if(res.data.response.length==0){
    //         ctxM.reply("No data")
    //      }
    //      else{

        
    //                 for(let item of res.data.response){
                        
    //                     ctxM.reply(item.age)
                  
    //                     }
           
                    
            
    //                 } 
    //                 return;
    //             }).catch((err)=>{
                    
    //             })
            
         
    //   })    
      return;  

}



//Articles
function article(ctxA){

//     let buttonarry=[ 
//     [{text:"Tech",callback_data:`article_wizard_Tech`},{text:"Science",callback_data:`article_wizard_Science`},{text:"Health",callback_data:`article_wizard_Health`}],
//     [{text:"Business",callback_data:`article_wizard_Health`},{text:"Finance",callback_data:`article_wizard_Finance`}],
//     [{text:"Entertainment",callback_data:`article_wizard_Entertainment`},{text:"Sports",callback_data:`article_wizard_Sports`}]
    
// ]

let buttonarry=[ 
    [{text:"Tech",callback_data:`article_wizard_technology`},{text:"National",callback_data:`article_wizard_national`},{text:"Health",callback_data:`article_wizard_health`}],
    [{text:"Business",callback_data:`article_wizard_business`},{text:"Politics",callback_data:`article_wizard_politics`}],
    [{text:"Entertainment",callback_data:`article_wizard_entertainment`},{text:"Sports",callback_data:`article_wizard_sports`}]
    
]
    ctxA.telegram.sendMessage(ctxA.chat.id,`Choose Category`, 
    {
         reply_markup:{
            inline_keyboard:
                            buttonarry
           
            //  input_field_placeholder:"Ex.Mansoor",
            //  force_reply:true,
         }
     }
    )
    bot.action(/article_wizard_+/,(ctxA)=>{
        ctxA.deleteMessage();

        ctxA.telegram.sendChatAction(ctxA.chat.id,'typing')
        ctxA.telegram.sendChatAction(ctxA.chat.id,'typing')
        let product_id = ctxA.match.input.substring(15);
        var dat= new Date()
        // url=`https://newsapi.org/v2/top-headlines?sources=techcrunch&from=${dat.getFullYear}-${dat.getMonth+1}-${dat.getDate}&sortBy=popularity&apiKey=e1cdf5c7ce924eada36074491df3f551`
    //    let url=`https://newsapi.org/v2/everything?q=${product_id}&from=${dat.getFullYear}-${dat.getMonth+1}-${dat.getDate}&sortBy=popularity&apiKey=e1cdf5c7ce924eada36074491df3f551`
    //         axios.get(url)
    //         .then((res)=>{
             
    //          if(res.data.totalResults==0){
    //             ctxA.reply("No data currently")
    //          }
    //          else{
                
               
    //             function shuffleArray(arr) {
    //                 arr.sort(() => Math.random() - 0.5);
    //               }
    //               shuffleArray(res.data.articles)
    //             var result=res.data.articles.slice(0, 5)
            
    //                     for(let item of result){
    
    //                         let msg=`<strong>"${item.title}"</strong>\n\n${item.description}\n${item.url}`
    //                         ctxA.telegram.sendMessage(ctxA.chat.id,
    //                           msg,{parse_mode:"HTML"})
                      
    //                         }
               
                        
                
    //                     } 
    //                 })
    
    
    const currentsapi = new CurrentsAPI('4HXCn9fK9d52lTaM9Uq_GNup2zxitGDsTUngDr9HIyyfYyjj');
 
// To query latest news
// All options passed to search are optional

currentsapi.latestNews({
  category: product_id,
  keywords:product_id,
  language: 'en',
  country: 'IN'
}).then(res => {
    if(res.news.length==0 || res.status=='error'){
                    ctxA.reply("No data currently.................")
                 }
                 else{
                    
                   var shuff=res.news.slice(0, 11)
                    function shuffleArray(arr) {
                         arr.sort(() => Math.random() - 0.5);
                         return arr;
                      }
                      var ran=shuffleArray(shuff)
                    var result=ran.slice(0, 5)
                
                            for(let item of result){
        
                                let msg=`<strong>"${item.title}"</strong>\n\n${item.description}\n${item.url}`
                                ctxA.telegram.sendMessage(ctxA.chat.id,
                                  msg,{parse_mode:"HTML"})
                          
                                }
                   
                            
                    
                            }
//   console.log(response.news.length);
  console.log(result.length);
  /*
    {
      status: "ok",
      news: [...]
    }
  */
})
    
    
    
    
    
    
    
    
    .catch(err=>{
                        console.log(err)
                    })
        // ctx.reply(product_id)
    })
   
    return;          

}

//club details
function club(ctxC){
    let url=`http://localhost:9000/api/club/view`
    // let url=`​https://teledatabase.onrender.com/api/club/view`
    axios.get(url)
    .then((res)=>{
  
     if(res.data.response.length==0){
        ctxC.reply("No data")
     }
     else{

    
                for(let item of res.data.response){
                    
                    let msg=`<strong>"${item.Name}"</strong>\n\n${item.Description}\nCo-ordinator: ${item.member} (${item.Tid})\nFor queries Contact : ${item.contact}`
                    ctxC.telegram.sendMessage(ctxC.chat.id,
                      msg,{parse_mode:"HTML"})
              
                    }
       
                
        
                } 
            }).catch((err)=>{
                console.log(err)
               
            })
            return;
}

//library status

function lib(ctxL){
    // ctxL.telegram.sendMessage(ctxL.chat.id,`Enter your Usn like /library-Usn`, 
    //            {
    //                 reply_markup:{
                      
    //                     input_field_placeholder:"Ex.Mansoor",
    //                     force_reply:true,
    //                 }
    //             }
    //            )
    // bot.command('library',(ctxL2)=>{  
        // let query=ctxL2.message.text.trim();
        let urll= `http://localhost:9000/api/user/${ctxL.chat.id}`
        // let urll= `​https://teledatabase.onrender.com/api/user/${ctxL.chat.id}`
        axios.get(urll)
        .then((res)=>{
            console.log(res.data.response.length)
            if(res.data.response.length!=0){
        //         let msg=ctxL2.message.text.trim()
        // var msgarr=msg.split("-");
        // msgarr.shift()
        // let query=msgarr.toString()
        // console.log(query)
        let url=`http://localhost:9000/api/library/view/${res.data.response[0].username}`
        // let url=`​https://teledatabase.onrender.com/api/library/view/${res.data.response[0].username}`
        axios.get(url)
        .then((res2)=>{
            // console.log(res)
         if(res2.data.response.length==0){
            ctxL.reply("YOU currently own No Book ")
         }
         else{

        
                    for(let item of res2.data.response){
                        
                        let msg=` <strong>${item.name}\n ${item.Usn}</strong>\n\n<strong>"${item.Book}"</strong> \n Due: ${item.Due} `
                    ctxL.telegram.sendMessage(ctxL.chat.id,
                      msg,{parse_mode:"HTML"})
                  
                        }
           
                    
            
                    } 
                
                }).catch(err=>{
                    ctxL.reply("No data Available")
                    console.log(err)
                })

            }
            else{
               ctxL.reply("Please register first by clicking /register or Click How Bot works under the /start command")
         
                }     
                   }).catch(err=>{
                       console.log(err)
                   })
        

        
        
            
         
    //   })      
      return

}

function guide(ctxG){
    let url=`http://localhost:9000/api/guide/view`
    // let url=`​https://teledatabase.onrender.com/api/guide/view`
    axios.get(url)
    .then((res)=>{
        console.log(res)
     if(res.data.response.length==0){
        ctxG.reply("No data")
     }
     else{

    
                for(let item of res.data.response){
                    
                    let msg=`<strong>"${item.Name}"</strong>\n${item.Tid}\n ${item.sem} ${item.branch}\n <b>I can help you with:</b> \n ${item.Guidance}\n\n For queries Contact : ${item.Contact}`
                    ctxG.telegram.sendMessage(ctxG.chat.id,
                      msg,{parse_mode:"HTML"})
              
                    }
       
                
        
                } 
            }).catch(err=>{
                ctxG.reply("No data Available")
                console.log(err)
            })
            return;
}

//.......textbook
function chatGpt(ctxG){
    ctxG.telegram.sendMessage(ctxG.chat.id,`slight hold  on /GPT3 and Enter the query.`, 
               {
                    reply_markup:{
                      
                        input_field_placeholder:"\GPT3 give bubble sort version of python",
                        force_reply:true,
                    }
                }
               )
            
               bot.command("GPT3",(ctxG2)=>{  
                try{
                let msg=ctxG2.message.text.trim()
               var  msgarr=msg.split(" ");
                msgarr.shift()
                let query=msgarr.toString()
                console.log(query)
                ctxG2.telegram.sendMessage(ctxG2.chat.id,"please wait response is being generated -ET 1 min")
                GPTreq(query,ctxG2)
               
                }


                catch(err){
                                    ctxG2.reply("SOME ERROR OCCCURED")
                                    console.log(err)
                                }
                                
                            })

}
function txtbook(ctxT){

    let buttonarry=[ 
        [{text:"1st SEM",callback_data:`SEM_wizard_1st`},{text:"2nd SEM",callback_data:`SEM_wizard_2st`},{text:"3rd SEM",callback_data:`SEM_wizard_3rd`}],
        [{text:"4th SEM",callback_data:`SEM_wizard_4th`},{text:"5th SEM",callback_data:`SEM_wizard_5th`}, {text:"6th SEM",callback_data:`SEM_wizard_6th`}],
        [{text:"7th SEM",callback_data:`SEM_wizard_7th`},{text:"8th SEM",callback_data:`SEM_wizard_8th`}]
        
    ]
        ctxT.telegram.sendMessage(ctxT.chat.id,`Choose SEMESTER`, 
        {
             reply_markup:{
                inline_keyboard:
                                buttonarry
             }
         }
        )
     


        bot.action(/SEM_wizard_+/,(ctxT1)=>{
            ctxT1.deleteMessage();
            let product_id = ctxT1.match.input.substring(11);
            ctxT1.telegram.sendMessage(ctxT1.chat.id,`slight hold  on /text and Enter the subject Code in input box `, 
               {
                    reply_markup:{
                      
                        input_field_placeholder:"\text 18cs53",
                        force_reply:true,
                    }
                }
               )

            // switch(product_id){
            //     case '1st':marks(ctx);
            //     break;
            //     case '2nd':attend(ctx);
            //     break;
            //     case '3rd':club(ctx);
            //     break;
            //     case '4th':guide(ctx);
            //     break;
            //     case '5th':lib(ctx);
            //     break;
            //     case '6th':txtbook(ctx);
            //     break;
            //     case '7th':article(ctx);
            //     break;
            //     case '8th':article(ctx);
            //     break;
            //     default:ctx.reply("Invalid")
            // }
   
        bot.command("text",(ctxT2)=>{  
            let msg=ctxT2.message.text.trim()
           var  msgarr=msg.split(" ");
            msgarr.shift()
            let query=msgarr.toString()
            console.log(query)
           let url= `http://localhost:9000/api/textbook/view/${query}`
        //    let url= `​https://teledatabase.onrender.com/api/textbook/view/${query}`
                axios.get(url)
                .then((res)=>{
                 
                    if(res.data.response.length==0){
                        ctxT2.reply("E-TextBook Currently not available")
                     }
                     else{
            
                                for(let item of res.data.response){
                                    
                                    ctxT2.telegram.sendDocument(ctxT2.chat.id,
                                    `${item.file_id}`,{
                                        caption:`${item.code} : ${item.name}`
                                    })
                              
                                    }
                       
                                
                        
                         }     
                            }).catch(err=>{
                                ctxT2.reply("E-TextBook Currently not available")
                                console.log(err)
                            })
                        })
      
    })
    return;
}



// my documents
function mydocuments(ctxD){
    let buttonarry=[ 
        [{text:"Upload New Documents",callback_data:`doc_wizard_put`},{text:"Get My Documents",callback_data:`doc_wizard_get`}],
        
        
    ]
        ctxD.telegram.sendMessage(ctxD.chat.id,`Choose Option`, 
        {
             reply_markup:{
                inline_keyboard:
                                buttonarry

             }
         }
        )

        bot.action(/doc_wizard_+/,(ctxD1)=>{
            ctxD1.deleteMessage();
            let product_id = ctxD1.match.input.substring(11);
            switch(product_id){
                case 'put':put(ctxD1);
                break;
                case 'get':get(ctxD1);
                break;
               
                default:console.log("Invalid")
            }
        })


        function put(ctxP){
 
            ctxP.reply(`1) Select the Document/Picture you want to save and give a Name for the same in the caption field. \n Note* You can Group Multiple documents/Pictures and send it at once with single name for it. `)
            ctxP.telegram.sendMessage(ctxP.chat.id,`SEND your document`, 
               {
                    reply_markup:{
                      
                        input_field_placeholder:"Ex.Mansoor",
                        force_reply:true,
                    }
                }
               )
               var cap
               bot.on("document",(ctxPd)=>{
              
                let check =ctxPd.message.hasOwnProperty('media_group_id');
                let checkcap =ctxPd.message.hasOwnProperty('caption');
                if(check && checkcap){
                   cap=ctxPd.message.caption;
                }
                else if(check && !checkcap){
                    cap=cap
                }
                else{
                    cap=ctxPd.message.caption
                }

               let url=`http://localhost:9000/api/documents/put`
            //    let url=`​https://teledatabase.onrender.com/api/documents/put`
               if(cap==undefined){
                let dt=new Date().getDate();
                let mt=new Date().getMonth()+1;
                cap=`Doc ${dt}/${mt} `   
            }
                axios.post(url,{
                    text:`${cap}`,
                    callback_data:`${ctxPd.message.document.file_id}`,
                    user_id:`${ctxPd.chat.id}`,
                    type:"document"
                }).then((res)=>{
                    console.log(res)

                }).catch((err)=>{
                            console.log(err)
                })


                // console.log(ctx.message.document)
            })
            var photocap
            bot.on("photo",(ctx2)=>{

                let check =ctx2.message.hasOwnProperty('media_group_id');
                let checkcap =ctx2.message.hasOwnProperty('caption');
              
                if(check && checkcap){
                   photocap=ctx2.message.caption;
                }
                else if(check && !checkcap){
                    photocap=photocap
                }
                else{
                    photocap=ctx2.message.caption
                }
                console.log(photocap)
               let url=`http://localhost:9000/api/documents/put`
            //    let url=`​https://teledatabase.onrender.com/api/documents/put`
               if(photocap==undefined){
                let dt=new Date().getDate();
                let mt=new Date().getMonth()+1;
                photocap=`Doc ${dt}/${mt} `   
            }
            console.log(photocap)
                axios.post(url,{
                    text:`${photocap}`,
                    callback_data:`${ctx2.message.photo[0].file_id}`,
                    user_id:`${ctx2.chat.id}`,
                    type:"photo"
                }).then((res)=>{
                    console.log(res)

                }).catch((err)=>{

                })
               
            })

        }
        function get(ctx2g){
           

            var localarr=[]
            var finalarr=[]
            let chat_id=ctx2g.chat.id
            let url= `http://localhost:9000/api/documents/get/${chat_id}`
            // let url= `​https://teledatabase.onrender.com/api/documents/get/${chat_id}`
                axios.get(url)
                .then((res)=>{
                 
                    if(res.data.response.length==0){
                        ctx2g.reply("NO DOcuments AVAILABLE")
                     }
                     else{

                        let resp=res.data.response
                       
                        
                        
                    
                        localarr=(resp.map((item) => {
                                            return {
                                              text: item.text,
                                              callback_data:`get_wizard_${item.text}`
        
                                            }
                                          
                                          })
                                          
                        )
                        for(let i=0;i<localarr.length;i++){  finalarr[i]=[localarr[i]]}
             
             
                    ctx2g.telegram.sendMessage(ctx2g.chat.id,`Choose document`, 
                        {
                            reply_markup:{
                                inline_keyboard:
                                     
                                      finalarr
                                    
                                    
                            }
                        }
                        )

                        } 
                            }).catch(err=>{
                                console.log(err)
                                ctx2g.reply("NO DOcuments AVAILABLE")
                            })


                            bot.action(/get_wizard_+/,(ctx2gg)=>{
                                ctx2gg.deleteMessage();
                                let product_id = ctx2gg.match.input.substring(11);
                                let url=`http://localhost:9000/api/documents/get?chat_id="${ctx2gg.chat.id}"&text=${product_id}`
                                // let url=`​https://teledatabase.onrender.com/api/documents/get?chat_id="${ctx2gg.chat.id}"&text=${product_id}`
                                axios.get(url)
                                .then((res)=>{
                                    // console.log(res.data.response)
                                    for( item of res.data.response){
                                        if(item.type=="photo"){
                                            ctx2gg.telegram.sendPhoto(ctx2gg.chat.id,`${item.callback_data}`)

                                        }
                                        else{
                                            ctx2gg.telegram.sendDocument(ctx2gg.chat.id,`${item.callback_data}`)

                                        }
                                    }
                
                                }).catch((err)=>{
                                    console.log(err)
                                })
                               
                    
                            
                            })
               

        

                        }
}

///events
function events(ctxe){
    // ctxe.telegram.sendDocument(ctxe.chat.id,'BQACAgUAAxkBAAIFtmLvdciwN6ffk2xwlao1g3NCa2ozAAInBgACkfaAV7Svfs44lnUuKQQ')
    ctxe.telegram.sendDocument(ctxe.chat.id,'BQACAgUAAxkBAAJUvWQYigaAdBf995iX7eLoJEyouz9gAAISCAAC4DTAVJusGNov8FCCLwQ')

    return;
}


const sleep = (millis) => {
    return new Promise(resolve => setTimeout(resolve, millis));
  }
//cron article job
cron.schedule("05 08 * * *", function() {
       let sendurl2= `http://localhost:9000/api/user`
        axios.get(sendurl2).then((res1)=>{
    
    //         if(res1.data.response.length==0){
    //             return
    //         }
    //         else{
    //             for(let item of res1.data.response ){
                   

    //                 let curl=`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=e1cdf5c7ce924eada36074491df3f551`
    //                 axios.get(curl)
    //                     .then((res)=>{
     
    //                 if(res.data.totalResults==0){
    //            globalctx.reply("No data currently")
    //                         }
    //                      else{
        
       
    //                             function shuffleArray(arr) {
    //                              arr.sort(() => Math.random() - 0.5);
    //                                          }
    //                             shuffleArray(res.data.articles)
    //                    let item2=res.data.articles.slice(0, 1)
    // console.log(item2)
                           
    if(res1.data.response.length==0){
        return
    }
    else{
       async function call(){
        for(let item of res1.data.response ){
           
            var cat=['all',
                'national' ,
                'business',
                'sports',
                'world',
                'politics',
                'technology',
                'startup',
                'entertainment',
                'miscellaneous',
            
                'science',
                'automobile'];
                function get_random (list) {
                    return list[Math.floor((Math.random()*list.length))];
                  }
                //   var axios = require("axios").default;

                //   var options = {
                //     method: 'GET',
                //     url: 'https://inshorts.deta.dev/news',
                //     params: {category: 'business'}
                //   };
                  
                //   axios.request(options).then(function (response) {
                //     console.log(response.data);
                //   }).catch(function (error) {
                //     console.error(error);
                //   });         
                  
                  

            let curl=`https://inshorts.deta.dev/news?category=${get_random(cat)}`
            axios.get(curl)
                .then((res)=>{

            if(res.data.data.length==0){
       globalctx.reply("No data currently")
                    }
                 else{

console.log(res.data.data.length);
console.log(res.data.data[0]);
                        function shuffleArray(arr) {
                         arr.sort(() => Math.random() - 0.5);
                         return arr;
                                     }
                        
               let item2=shuffleArray(res.data.data);

               console.log(item2);                         

                            // let msg=`<strong>"${item2[0].title}"</strong>\n\n${item2[0].description}\n${item2[0].url}`
                          

                            let msg=`<strong>"${item2[0].title}"</strong>\n\n${item2[0].content}\n${item2[0].url}`
                            // let encoded = encodeURIComponent("https://api.telegram.org/bot5434355576:AAFBJxlc4jJ5bZpmK9XxzvV2MdflDMq-yIo/sendMessage?chat_id="+item.user_id+"&text="+msg+"&parse_mode=HTML");
                            // request(encoded, function (error, response, body) {
                            //   console.error('error:', error); // Print the error if one occurred
                            //   console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
                            //   console.log('body:', body); // Print the HTML for the Google homepage.
                            // });
                            
                           bot.telegram.sendMessage(item.user_id,msg,{parse_mode:"HTML"})
              
                            
       
                
        
                                 
                                }
                            }).catch(err=>{
                                    console.log(err)
                                 })

                                 await sleep(1500)
                   
                  }
                }
                call();
                                    
                }
           
            }).catch(err=>{
                console.log(err)
             })
        
});



//vtu notif




// cron.schedule("22 * * * *", function() {
// cron.schedule("0 0 */5 * * *", function() {
cron.schedule("05 09 * * *", function() {


    try{
         scrapeProduct(`https://vtu.ac.in/en/#1554889506437-64c3b5d5-d21e`)
     async function scrapeProduct(url){
         // let browser= await puppeteer.launch()
         let browser1= await puppeteer.launch({headless: false},{args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-features=site-per-process'] })
         let page= await browser1.newPage()
         await page.setExtraHTTPHeaders({ 'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.97 Safari/537.36' });
         await page.goto(url,{waitUntil:"domcontentloaded"})
         let array=[]
         let el= await page.$$(`.content a`)
         for(let i=0;i<el.length;i++){
             const element =el[i]
             const link = await page.evaluate(element => element.getAttribute('href'),element)
             const title = await page.evaluate(element => element.textContent,element)
             array.push({
                 title,
                 link
             })
           
         }
         await browser1.close();
         let msgnotif ='<b>VTU OFFICIAL NOTIFICATIONS</b>\n\n'
         for(let item of array){
         
             msgnotif  +=`<strong>"${item.title}"</strong>\n\n${item.link}\n\n\n`;
             
       
             }
             console.log(msgnotif)
             var axios = require("axios").default;
             hr=new Date().getHours()
             min=new Date().getMinutes()
             msgnotif +=`\n\n <b>Updated at ${hr}:${min} </b>`
             var options = {
               method: 'PUT',
               url: 'http://localhost:9000/api/notif/put',
               data: {moment: hr+":"+min , message: msgnotif}
             };
             
             axios.request(options).then(function (response) {
               console.log(response.data);
             }).catch(function (error) {
               console.error(error);
             });

             // ctxnot.telegram.sendMessage(ctxnot.chat.id,
             //     msgnotif,{parse_mode:"HTML"})
                
     }}
     catch(err){
         console.log(err)
     }









})



// bot.command("/er",(ctxc)=>{
//     // ctxc.telegram.sendPoll(ctxc.chat.id, "ewhdsn", ["io","uu"])
//     console.log(ctxc.message.chat.username)

// })
// bot.command("/up",(ctxc)=>{
//     var reg=/[0-9][a-zA-Z]{2}[0-9]{2}[a-zA-Z]{2}[0-9]{3}/
//     var usn='1DT20CS075R5'
//     if(reg.test(usn)){

//         console.log(new Date().getMonth())
//     }
//     else{
//         console.log(false)

//     }
    // request('https://api.telegram.org/bot5434355576:AAFBJxlc4jJ5bZpmK9XxzvV2MdflDMq-yIo/sendMessage?chat_id=1682939793&text=<b>hello</b>&parse_mode=HTML', function (error, response, body) {
    //     console.error('error:', error); // Print the error if one occurred
    //     console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
    //     console.log('body:', body); // Print the HTML for the Google homepage.
    //   });
    // const options = {
    //     method: 'GET',
    //     url: 'https://api.vtuconnect.in/result/1DT20CS075',
    //     headers: {
    //       Host: 'api.vtuconnect.in',
    //       Origin: 'https://results.vtuconnect.in',
    //       Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InNjb3BlIjpbInVzZXIiXSwiZW1haWwiOiJuYW5kYW5AZ21haWwuY29tIn0sImlhdCI6MTU0NzMxODI5N30.ZPO8tf03azhTJ1qmgSVyGV80k9EfomXgGazdLyUC6fw'
    //     }
    //   };
      
    //   axios.request(options).then(function (response) {
    //     // for (let item of response.data){
    //         console.log(response.data[0].subjects);
    //     // }
    //     // console.log(response.data);
    //   }).catch(function (error) {
    //     console.error(error);
    //   });
//  ctxc.telegram.sendMessage('1682939793','jkdfkf')
// })

// function send(){
//     var ui= document.getElementById("item").value

    // let sendurl2= `http://localhost:9000/api/user`
    //     axios.get(sendurl2).then((res1)=>{
    
    //         if(res1.data.response.length==0){
    //             return
    //         }
    //         else{
    //             for(item of res1.data.response ){
    //                try{
    //                 globalctx.telegram.sendMessage(item.user_id,`${ui}`).catch(err=>{
    //                     console.log(err)
    //                 })
    //                }
    //                catch(err){
    //                 console.log("error")
    //                }
    
    //             }
    //         }
    //     })
//         alert("sent")

// }
// bot.command("3456554",(ctxam)=>{
//     ctxe.telegram.sendMessage(ctxe.chat.id,`enter the message you want to send`, 
//     {
//          reply_markup:{
           
//              input_field_placeholder:"Ex.Mansoor",
//              force_reply:true,
//          }
//      }
//     )
// bot.on('text',(ctxam)=>{

//     let ui=ctxam.message.text
//     let sendurl2= `http://localhost:9000/api/user`
//         axios.get(sendurl2).then((res1)=>{
    
//             if(res1.data.response.length==0){
//                 return
//             }
//             else{
//                 for(item of res1.data.response ){
//                    try{
//                     // ctxam.telegram.sendMessage(item.user_id,`${ui}`).catch(err=>{
//                     //     console.log(err)
//                     // })
//                     ctxam.telegram.sendPoll(item.user_id, "What workshop would you lime to choose?", ["Machine Learning","Web-development","Android a-- development"])
//                    }
//                    catch(err){
//                     console.log("error")
//                    }
    
//                 }
//             }
//         })
//     })
//     })

    // bot.on('message',(ctxchk)=>{
    //     console.log(ctxchk.message.hasOwnProperty('document'))
    //     console.log(ctxchk.message)
    //     // if(ctxchk.message.hasOwnProperty('poll')){
    //     //     console.log(ctxchk.message.poll.question)
    //     //     console.log(ctxchk.message.poll.options)

    //     //     bot.telegram.sendMessage(ctxchk.chat.id,'888')
    //     //     bot.telegram.sendQuiz(ctxchk.chat.id, ctxchk.message.poll.question, [ctxchk.message.poll.options[0].text,ctxchk.message.poll.options[1].text],{type:'quiz',correct_option_id:'1'})
    //     // }
        
    // })
// bot.command('sende',(sendctxa)=>{
//     sendctxa.telegram.sendMessage(sendctxa.chat.id,"kkkd")
// })









 bot.on('document',(ctxdocs)=>{
    if(ctxdocs.message.from.id==1413120868){
        var options = {
            method: 'POST',
            url: 'http://localhost:9000/api/notes/put',
            data: {title: `${ctxdocs.message.document.file_name}`, desp: `${ctxdocs.message.document.file_name}`, file_id: `${ctxdocs.message.document.file_id}`}
          };
          
          axios.request(options).then(function (response) {
            console.log(response.data);
            ctxdocs.reply("Successfully added in database")
          }).catch(function (error) {
            console.error(error);
          });
            console.log(ctxdocs.message.document.file_name);
            console.log(ctxdocs.message.document.file_id);
        }

})
//     var axios = require("axios").default;

// var options = {
//   method: 'POST',
//   url: 'http://localhost:9000/api/notes/put',
//   data: {title: `${ctxsend.message.document.file_name}`, desp: `${ctxsend.message.document.file_name}`, file_id: `${ctxsend.message.document.file_id}`}
// };

// axios.request(options).then(function (response) {
//   console.log(response.data);
// }).catch(function (error) {
//   console.error(error);
// });
    // ctx.telegram.sendPoll('1413120868', "ewhdsn", ["io","uu"])
    // let sendurl2= `http://localhost:9000/api/user`
    // axios.get(sendurl2).then((res1)=>{

    //     if(res1.data.response.length==0){
    //         return
    //     }
    //     else{
    //         for(item of res1.data.response ){
    //            try{
    //             ctxsend.telegram.sendMessage(item.user_id,`${ctxsend.message.text}`).catch(err=>{
    //                 console.log(err)
    //             })
    //            }
    //            catch(err){
    //             console.log("error")
    //            }

    //         }
    //     }
  

    // })
    // .catch((err)=>{
    //     console.log(err)
    // })
    //  ctx.telegram.sendMessage('1413120868',`${ctx.message.text}`)
//  })
// //     console.log(ctx.message.chat)
// //     console.log(ctx.message.from)
// //     console.log(ctx.message.entities)
// //    ctx.telegram.sendDocument(ctx.chat.id,'BQACAgUAAxkBAAIE1WLvQq_5gI3gAzS2kIxsTyVpjwnbAAILBgACkfaAVyDgxmRfeMNuKQQ'
// //     )
   

// })

///////sgpa





const getGradeMarks = (marks) => {
    if (marks >= 90) {
      return 10;
    } else if (marks < 90 && marks >= 80) {
      return 9;
    } else if (marks < 80 && marks >= 70) {
      return 8;
    } else if (marks < 70 && marks >= 60) {
      return 7;
    } else if (marks < 60 && marks >= 45) {
      return 6;
      // } else if (grade < 45 && grade >=40) {
      //   return 5;
    } else if (marks < 45 && marks >= 40) {
      return 4;
    } else if (marks < 40) {
      return 0;
    } else {
      return 0;
    }
  };

  const calculate_sgpa_year2 = (sub) => {
      let sub1=sub[0]
      let sub2=sub[1]
      let sub3=sub[2]
      let sub4=sub[3]
      let sub5=sub[4]
      let sub6=sub[5]
      let sub7=sub[6]
      let sub8=sub[7]
      let sub9=sub[8]
    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== "" &&
      sub8 !== "" &&
      sub9 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 3;
      let sub_2 = getGradeMarks(sub2) * 4;
      let sub_3 = getGradeMarks(sub3) * 3;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 3;
      let sub_7 = getGradeMarks(sub7) * 2;
      let sub_8 = getGradeMarks(sub8) * 2;
      let sub_9 = getGradeMarks(sub9) * 1;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7) +
        Number(sub_8) +
        Number(sub_9);
      let totalSgpa = total / 24;
return totalSgpa;
    }
  };

  const calculate_sgpa_year1 = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
    let sub6=sub[5]
    let sub7=sub[6]
    let sub8=sub[7]
    
    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== "" &&
      sub8 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 4;
      let sub_2 = getGradeMarks(sub2) * 4;
      let sub_3 = getGradeMarks(sub3) * 3;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 1;
      let sub_7 = getGradeMarks(sub7) * 1;
      let sub_8 = getGradeMarks(sub8) * 1;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7) +
        Number(sub_8);
      let totalSgpa = total / 20;
      return totalSgpa;
    } 
  };

  const calculate_sgpa_year3_sem5 = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
    let sub6=sub[5]
    let sub7=sub[6]
    let sub8=sub[7]
    let sub9=sub[8]
   
    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== "" &&
      sub8 !== "" &&
      sub9 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 3;
      let sub_2 = getGradeMarks(sub2) * 4;
      let sub_3 = getGradeMarks(sub3) * 4;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 3;
      let sub_7 = getGradeMarks(sub7) * 2;
      let sub_8 = getGradeMarks(sub8) * 2;
      let sub_9 = getGradeMarks(sub9) * 1;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7) +
        Number(sub_8) +
        Number(sub_9);
      let totalSgpa = total / 25;

      return totalSgpa;
    } 
  };

  const calculate_sgpa_year3_sem6 = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
    let sub6=sub[5]
    let sub7=sub[6]
    let sub8=sub[7]

    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== "" &&
      sub8 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 4;
      let sub_2 = getGradeMarks(sub2) * 4;
      let sub_3 = getGradeMarks(sub3) * 4;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 2;
      let sub_7 = getGradeMarks(sub7) * 2;
      let sub_8 = getGradeMarks(sub8) * 2;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7) +
        Number(sub_8);
      let totalSgpa = total / 24;
      return totalSgpa;
     
    } 
  };
  const calculate_sgpa_year4_sem7_cs = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
    let sub6=sub[5]
    let sub7=sub[6]
  
    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 4;
      let sub_2 = getGradeMarks(sub2) * 4;
      let sub_3 = getGradeMarks(sub3) * 3;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 2;
      let sub_7 = getGradeMarks(sub7) * 1;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7);
      let totalSgpa = total / 18;

      return totalSgpa;
    } 
  };
  const calculate_sgpa_year4_sem7_mech = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
    let sub6=sub[5]
    let sub7=sub[6]
    let sub8=sub[7]
  
    if (
      sub1 !== "" &&
      sub2 !== "" &&
      sub3 !== "" &&
      sub4 !== "" &&
      sub5 !== "" &&
      sub6 !== "" &&
      sub7 !== "" &&
      sub8 !== ""
    ) {
      let sub_1 = getGradeMarks(sub1) * 3;
      let sub_2 = getGradeMarks(sub2) * 3;
      let sub_3 = getGradeMarks(sub3) * 3;
      let sub_4 = getGradeMarks(sub4) * 3;
      let sub_5 = getGradeMarks(sub5) * 3;
      let sub_6 = getGradeMarks(sub6) * 2;
      let sub_7 = getGradeMarks(sub7) * 2;
      let sub_8 = getGradeMarks(sub8) * 1;

      let total =
        Number(sub_1) +
        Number(sub_2) +
        Number(sub_3) +
        Number(sub_4) +
        Number(sub_5) +
        Number(sub_6) +
        Number(sub_7) +
        Number(sub_8);
      let totalSgpa = total / 20;

     
    } 
  };
  const calculate_sgpa_year4_sem8 = (sub) => {
    let sub1=sub[0]
    let sub2=sub[1]
    let sub3=sub[2]
    let sub4=sub[3]
    let sub5=sub[4]
  
    if (sub1 !== "" && sub2 !== "" && sub3 !== "" && sub4 !== "" && sub5 !== "") {
      let sub_1 = getGradeMarks(sub1) * 3;
      let sub_2 = getGradeMarks(sub2) * 3;
      let sub_3 = getGradeMarks(sub3) * 8;
      let sub_4 = getGradeMarks(sub4) * 1;
      let sub_5 = getGradeMarks(sub5) * 3;

      let total = Number(sub_1) + Number(sub_2) + Number(sub_3) + Number(sub_4) + Number(sub_5);

      let totalSgpa = total / 18;
      return totalSgpa;
      
    } 
  };

  const calculate = (arr,sem,b) => {
  var resp='';
    if (sem === 1 || sem === 2) {
      resp=calculate_sgpa_year1(arr);
    } else if (sem === 3 || sem === 4) {
      resp=calculate_sgpa_year2(arr);
    } else if (sem === 5) {
        resp=calculate_sgpa_year3_sem5(arr);
    } else if (sem === 6) {
        resp=calculate_sgpa_year3_sem6(arr);
    } else if (sem === 7 && b=="CS") {
        resp= calculate_sgpa_year4_sem7_cs(arr);
    } else if (sem === 7 && b=="Mech") {
        resp=calculate_sgpa_year4_sem7_mech(arr);
    } else if (sem === 8) {
        resp=calculate_sgpa_year4_sem8(arr);
    }
    return resp
  };// Write, Edit and Run your Javascript code using JS Online Compiler






bot.launch()

