var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/',(req,res)=>{
    if(req.session.tour_loggedin===true || req.session.admin_loggedin===true){
        if(req.session.tour_loggedin){
            let sql=`SELECT g.f_name AS f_name, g.l_name AS l_name, p.p_name AS p_name, tc.comp_name AS comp_name, bp.date_booked AS date_booked, bp.id AS b_id, bp.tour_company_id AS t_comp, bp.payment AS payment FROM booked_programs bp, guests g, hotels h, programs p, tour_comps tc WHERE bp.guest_id = g.id AND bp.program_id = p.id AND tc.id = bp.tour_company_id AND h.id= g.hotel_id AND bp.tour_company_id="${req.session.tour_id}"`;
            conn.query(sql,(err,results)=>{
                res.render('booking',{
                    info : results,
                    page_title: 'Dashboard',
                    layout: 'layouts/admin-layout',
                    tour_check: req.session.tour_loggedin,
                    tour_id: req.session.tour_id,
                })
            })
        }
        if(req.session.admin_loggedin){
            let sql=`SELECT g.f_name AS f_name, g.l_name AS l_name, p.p_name AS p_name, tc.comp_name AS comp_name, bp.date_booked AS date_booked, bp.id AS b_id, bp.tour_company_id AS t_comp, bp.payment AS payment FROM booked_programs bp, guests g, hotels h, programs p, tour_comps tc WHERE bp.guest_id = g.id AND bp.program_id = p.id AND tc.id = bp.tour_company_id AND h.id= g.hotel_id`;

            conn.query(sql,(err,rows)=>{
                if(err) throw err
                res.render('booking',{
                    info : rows,
                    page_title: 'Dashboard',
                    layout: 'layouts/admin-layout',
                    admin_check: req.session.admin_loggedin,
                })
            })
        }
    }
    else{
        res.redirect('/login')
    }
})


module.exports = router;