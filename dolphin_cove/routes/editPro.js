var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/:id/',(req,res)=>{
    if(req.session.admin_loggedin===true){

        const id= req.params.id
        let sql=`SELECT * FROM programs WHERE id= "${id}"`
        conn.query(sql,(err,results)=>{
            if(err) throw err
            res.render('editPro',{
                page_title: 'Dashboard',
                layout: 'layouts/admin-layout',
                pro: results[0]
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
    let data ={
        p_name: req.body.p_name,
        cost: req.body.cost,
        description: req.body.desc,
        }
    let sql=`UPDATE programs SET ? WHERE id =  + ${req.params.id}`;
    conn.query(sql, data,(err,result)=>{
        if(err) throw err
        res.redirect('/program')
    })
})

router.get('/delete/:id',(req,res)=>{
    let sqlQuery=`DELETE FROM programs WHERE id = + ${req.params.id}`;
    conn.query(sqlQuery,(err,result)=>{
        if(err) throw err
        res.redirect('/program')
    })
})

module.exports = router;