var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/:id/',(req,res)=>{
    if(req.session.admin_loggedin===true){

        const id= req.params.id
        let sql=`SELECT * FROM tour_comps WHERE id= "${id}"`
        conn.query(sql,(err,results)=>{
            if(err) throw err
            res.render('editTour',{
                page_title: 'Dashboard',
                layout: 'layouts/admin-layout',
                tour: results[0]
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


router.post('/update/:id',(req,res)=>{
    let data={
        email:req.body.email,
        comp_name:req.body.c_name,
        password:req.body.pass
    }
    let sql=`UPDATE tour_comps SET ? WHERE id =  + ${req.params.id}`;
    conn.query(sql, data,(err,result)=>{
        if(err) throw err
        res.redirect('/tourCompany')
    })
})

router.get('/delete/:id',(req,res)=>{
    let sqlQuery=`DELETE FROM tour_comps WHERE id = + ${req.params.id}`;
    conn.query(sqlQuery,(err,result)=>{
        if(err) throw err
        res.redirect('/tourCompany')
    })
})

module.exports = router;