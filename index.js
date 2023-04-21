const express=require('express');
const sqlite3=require('sqlite3').verbose();
const app=express();
const multer=require('multer')
const path=require('path')
app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.set('views','views')



app.listen(3300);