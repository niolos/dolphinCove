var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.tour_loggedin===true || req.session.admin_loggedin===true){

        res.render("voucher",{
            page_title:"admin",
            layout: 'layouts/admin-layout',
        })
    }
    else{
        res.redirect('/login')
    }
})

module.exports = router;