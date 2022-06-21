const port = process.env.PORT || 8080;

var express = require('express');
var expressLayouts = require('express-ejs-layouts')
var path = require('path');

var createError = require('http-errors');

var flash = require('express-flash');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var fileUpload = require('express-fileupload')

var bodyParser = require('body-parser');

var mysql = require('mysql');


var conn  = require('./lib/db');
var app = express();



app.use(expressLayouts)
app.set('layout', './layouts/layout')
//routes

var homeRouter = require('./routes/index');
var addProgramRouter = require('./routes/addProgram');
var bookingRouter =require('./routes/booking');
var tourRouter = require('./routes/tourCompany');
var programRouter = require('./routes/program');
var addTourRouter = require('./routes/addTour');
var reservationRouter = require('./routes/reservation');
var voucherRoute = require('./routes/voucher');
var editTourRouter = require('./routes/editTour');
var editProRouter = require('./routes/editPro');
var editReservationRouter = require('./routes/editReservation');
var loginRouter = require('./routes/login')
var overlayRouter = require('./routes/overlayForm')
var guest_voucherRoute = require('./routes/guest_voucher');


// Setup the Views Templating Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'));
app.use('/js', express.static(__dirname + 'public/js'));
app.use('/uploads', express.static(__dirname + 'public/uploads'))

app.use(fileUpload({
    createParentPath:true
}))

app.use(cookieParser());
 app.use(session({ 
     secret: 'secREt$#code$%3245',
     resave: false,
     saveUninitialized: true,
     cookie: { maxAge: 100000 }
 }))
 

app.use(flash());



app.use('/', homeRouter);
app.use('/addProgram', addProgramRouter);
app.use('/booking', bookingRouter);
app.use('/tourCompany', tourRouter);
app.use('/program', programRouter);
app.use('/addTour', addTourRouter);
app.use('/reservation', reservationRouter);
app.use('/voucher', voucherRoute);
app.use('/editTour', editTourRouter);
app.use('/editPro', editProRouter);
app.use('/editReservation', editReservationRouter)
app.use('/login', loginRouter)
app.use('/addReservation', overlayRouter)
app.use('/guest_voucher', guest_voucherRoute);


app.listen(port, () => console.log(`Listening on port ${port}..`));

module.exports = app;