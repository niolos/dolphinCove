var express = require('express');
var conn  = require('../lib/db');
var router = express.Router();

router.get('/', (req,res)=>{
    if(req.session.tour_loggedin===true || req.session.admin_loggedin===true){
        let sql="SELECT * FROM programs";

        conn.query(sql,(err,rows)=>{
            if(err) throw err

            let hotels="SELECT * FROM hotels";
            
            conn.query(hotels,(err,hRows)=>{
                if(err) throw err
                if(req.session.tour_loggedin===true){
                    let tourComp=`SELECT * FROM tour_comps WHERE id="${req.session.tour_id}"`;

                    conn.query(tourComp,(err,tRows)=>{
                        res.render('reservation',{
                            page_title: 'Dashboard',
                            layout: 'layouts/admin-layout',
                            info:rows,
                            hInfo:hRows,
                            tInfo:tRows
                        })
                    }) 
                }
                if(req.session.admin_loggedin===true){
                    let tourComp="SELECT * FROM tour_comps";

                    conn.query(tourComp,(err,tRows)=>{
                        res.render('reservation',{
                            page_title: 'Dashboard',
                            layout: 'layouts/admin-layout',
                            info:rows,
                            hInfo:hRows,
                            tInfo:tRows
                        })
                    }) 
                }
            })
        })
    }
    else{
        res.redirect('/login')
    }
})


router.post('/add',(req, res)=>{
    let guest_query=`SELECT * FROM guests WHERE f_name="${req.body.f_name}" AND l_name="${req.body.l_name}" AND email="${req.body.email}" AND hotel_id="${req.body.hotel}"`
    conn.query(guest_query,(err,guest_results)=>{
        if(err) throw err

        if(guest_results.length < 1){
            let g_data={
                f_name: req.body.f_name,
                l_name: req.body.l_name,
                email: req.body.email,
                hotel_id: req.body.hotel,
            }
            let guest_insert="INSERT INTO guests SET ?"
            conn.query(guest_insert, g_data,(err,results)=>{
                if(err) throw err
                let guest_query=`SELECT * FROM guests WHERE f_name="${req.body.f_name}" AND l_name="${req.body.l_name}" AND email="${req.body.email}" AND hotel_id="${req.body.hotel}"`
                conn.query(guest_query,(err,guest_results)=>{
                    if(err) throw err
                })
                
            })
        }

        let guest_query=`SELECT * FROM guests WHERE f_name="${req.body.f_name}" AND l_name="${req.body.l_name}" AND email="${req.body.email}" AND hotel_id="${req.body.hotel}"`
        conn.query(guest_query,(err,guest_results)=>{

            if(err) throw err

            let program_check=`SELECT * FROM programs WHERE id = "${req.body.program}"`
            conn.query(program_check,(err,p_results)=>{
                var total_cost = p_results[0].cost * req.body.num_guest;
                var guest = guest_results[0].id

                let booking_data={
                    guest_id: guest,
                    program_id: req.body.program,
                    tour_company_id: req.body.t_comp,
                    date_booked: req.body.date,
                    payment: req.body.pay,
                    num_guest: req.body.num_guest,
                    total_cost: total_cost
                }
    
                let book_insert="INSERT INTO booked_programs SET ?"
    
                conn.query(book_insert, booking_data,(err,booked_info)=>{
                    if(err) throw err
                    let update_programs=`UPDATE programs SET num_of_guest = num_of_guest + ${req.body.num_guest} WHERE programs.id = '${req.body.program}'`;
                    conn.query(update_programs,(err,rows)=>{
                        if(err) throw err

                        let voucher=`SELECT g.f_name AS f_name, g.l_name AS l_name, p.id AS pID, p.p_name AS p_name, p.cost AS cost, tc.comp_name AS comp_name, bp.date_booked AS date_booked, bp.payment AS payment, bp.num_guest AS num_guest, bp.total_cost AS total_cost FROM booked_programs bp, guests g, hotels h, programs p, tour_comps tc WHERE bp.guest_id = g.id AND bp.program_id = p.id AND tc.id = bp.tour_company_id AND h.id= g.hotel_id AND bp.id ="${booked_info.insertId}"`;

                        conn.query(voucher,(err,voucher_results)=>{
                            if(err) throw err
                            res.render("voucher",{
                                voucher_stuff: voucher_results,
                                page_title:"admin",
                                layout: 'layouts/admin-layout',
                            })
                        })
                    })
                })
            })
        })
    })
})

module.exports = router;