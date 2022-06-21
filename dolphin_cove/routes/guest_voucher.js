var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    res.render("voucher",{
        page_title:"admin",
        layout: 'layouts/admin-layout',
    })
})

module.exports = router;