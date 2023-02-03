const express = require('express');
const app = express();
const PORT = 4000;
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require("body-parser");
const { AddPhotoAlternate } = require('@mui/icons-material');
let corsOption = {
    origin: "*",
    credential: true
}
app.use(cors(corsOption));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
const db = mysql.createPool({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'hoon0805',
    database: 'animal'
})
app.post("/login", (req, res) => {
     var id = req.body.id;
    var pass = req.body.pass; 

    if (id && pass) {
        db.query("select * from member where id = ? and pass = ?" , [id,pass], function(error,result){
            if(error) throw error;
            if(result.length>0){
                res.redirect("/")
            }
            else{
                res.send("아이디와 비밀번호가 다릅니다.")
            }
        })
    }
})

app.post("/idCheck", (req,res)=>{
    var id = req.body.id;
    if(id){
        db.query("select * from member where id =?" , [id], function(error,result){
            if(error) throw error;
            if(result.length>0){
                res.send(false);
            }
            else{
                res.send(true);
            }
        })
    }
})

app.post("/singUp", (req, res) => {
    var id = req.body.id;
    var pass = req.body.pass;
    var name = req.body.name;
    var tel = req.body.tel;
    var email = req.body.email;
    var sqlQuery = "insert into member (id, pass, name, tel, email) value(?,?,?,?,?)"
    db.query(sqlQuery,[id,pass,name,tel,email], (err, result) => {
        result.redirect("/")
    })
    //console.log("req")
})


app.listen(PORT, () => {
    console.log(`running on port ${PORT}`);
});