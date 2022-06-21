var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.admin_loggedin===true){

        res.render('addProgram',{
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

router.post('/add',(req,res)=>{
    file = req.files.myimage;
    file.mv('./public/uploads/' + file.name)
    var guest_num = 0
    let data ={
        p_name: req.body.p_name,
        cost: req.body.cost,
        description: req.body.desc,
        image: file.name,
        num_of_guest: guest_num
    }

    let sql="INSERT INTO programs SET ?";
    conn.query(sql, data,(err, results)=>{
        if(err) throw err;
        res.redirect('/program');
    });
});

module.exports = router;