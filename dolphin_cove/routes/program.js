var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.admin_loggedin===true){

        let sql="SELECT * FROM programs";

        conn.query(sql,(err,rows)=>{
            if(err) throw err
            
            res.render('program',{

                info : rows,
                page_title: 'Dashboard',
                layout: 'layouts/admin-layout',            
            })
        })
    }
    if(req.session.tour_loggedin===true){
        res.redirect('/booking')
    }
    if(req.session.tour_loggedin!=true && req.session.admin_loggedin!=true){
    res.redirect('/login')
    }
})

module.exports = router;