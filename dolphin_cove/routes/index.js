var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    let sql="SELECT * FROM programs";

    conn.query(sql,(err,rows)=>{
        if(err) throw err
        
        res.render('index',{
            info : rows,
            page_title: 'Dolphin Cove Home',
        })
    })
})

module.exports = router;