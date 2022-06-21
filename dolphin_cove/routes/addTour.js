var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.admin_loggedin===true){
        res.render('addTour',{
            page_title: 'Dashboard',
            layout: 'layouts/admin-layout'
        })
    }
    if(req.session.tour_loggedin===true){
        res.redirect('/booking')
    }
    if(req.session.tour_loggedin!=true && req.session.admin_loggedin!=true){
    res.redirect('/login')
    }
})

router.post('/add', (req,res)=>{
    let data={
        email: req.body.email,
        comp_name: req.body.c_name,
        password: req.body.pass
    }

    let sql="INSERT INTO tour_comps SET ?";
    conn.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/tourCompany');
    })
})

module.exports = router;