var express = require('express');
var mysql = require('mysql');
var cors = require('cors');
var bodyparser = require('body-parser');
var app = express();


app.use(cors());
app.use(bodyparser.json());

app.listen('3000',()=>{
    console.log('server is running');
})
var db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database:'student'
 });
db.connect((err)=> {
    if (err) throw err;
    else{
        console.log('database connected');
    }
    
  });

  app.get('/api',(req,res)=>{
      res.send('Api Working');
  });

  app.post('/api/create',(req,res)=>{
      console.log(req.body);

      let sql =`INSERT INTO students(StudentName,StudentID,Subject1,Subject2,Subject3,Subject4,Subject5)
      VALUES('${req.body.StudentName}','${req.body.StudentID}','${req.body.Subject1}','${req.body.Subject2}','${req.body.Subject3}','${req.body.Subject4}','${req.body.Subject5}')
      
      `;
      db.query(sql,(err,result)=>{
          if(err) throw err;
          res.send('data inserted');
      });
  });
  app.get('/api/read',(req,res)=>{
    
    let sql = `SELECT * FROM students`;
    
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})
app.get('/api/read/:StudentID',(req,res)=>{
    console.log(req.params.StudentID);
    let sql = `SELECT * FROM students
                WHERE StudentID = '${req.params.StudentID}'
                `;
    
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send(result);
    });          
})
app.put('/api/update/:StudentID',(req,res)=>{
    console.log(req.params.StudentID);
    let sql = `UPDATE students SET 
    StudentName = '${req.body.StudentName}',Subject1='${req.body.Subject1}',Subject2='${req.body.Subject2}',
    Subject3='${req.body.Subject3}',Subject4='${req.body.Subject4}',
        Subject5='${req.body.Subject5}'
        WHERE StudentID = '${req.body.StudentID}'
        `;

 
    db.query(sql,(err,result)=>{
            if(err) throw err;
            res.send('data updated');
    })            
})
app.delete('/api/delete/:StudentID',(req,res)=>{

     
    let sql = `DELETE FROM students 
                WHERE StudentID = '${req.params.StudentID}'
                `;
    
    db.query(sql,(err,result)=>{
        if(err) throw err;
        res.send('data deleted');
    });         
});