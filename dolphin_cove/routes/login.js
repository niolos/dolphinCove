var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    
        res.render('login',{
        page_title: 'Login',
    })
})


router.post('/login',(req,res)=>{
    let sql=`SELECT * FROM admins WHERE username = "${req.body.user}" AND BINARY password = "${req.body.pass}"`
    conn.query(sql,(err,admincheck)=>{
        if(err) throw err
        if(admincheck.length <= 0){
            let sql=`SELECT * FROM tour_comps WHERE email = "${req.body.user}" AND BINARY password = "${req.body.pass}"`
            conn.query(sql,(err, tour_comp_check)=>{
                if(err) throw err
                if(tour_comp_check.length <= 0){
                    req.flash('error', 'Invalid credentials Please try again!')
                    res.redirect('/login')
                }
                else{
                    req.session.tour_loggedin = true;
                    req.session.t_name = tour_comp_check[0].comp_name;
                    req.session.user = tour_comp_check[0].username;
                    req.session.password = tour_comp_check[0].password;
                    req.session.tour_id = tour_comp_check[0].id
                    res.redirect('/booking');
                }
            })
        }
        else{
            req.session.admin_loggedin = true;
            req.session.f_name = admincheck[0].comp_name;
            req.session.user = admincheck[0].username;
            req.session.password = admincheck[0].password;
            console.log(req.session.admin_loggedin)
            res.redirect('/booking');
        }
    })

})


router.get('/logout', function (req, res) {
    req.session.destroy();
    res.redirect('/login');
  });
module.exports = router;