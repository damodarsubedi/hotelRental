
var multer  = require('multer');
var sess;
var imagePath = '';

    var storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './uploads/')
        },
        filename: function (req, file, cb) {
          cb(null, imagePath);
        }
    })
    var upload = multer({ storage: storage })

var route = function(app){

    app.get('/', (req, res) => {
        res.render('login');
    });

    app.post('/', (req, res) => {
        if(req.body.idToken){
            sess = req.session;
            sess.email = req.body.email;
            if(req.body.hotel){
                sess.name = req.body.hotel;
                sess.uid = req.body.uid;
            }
            else{
                sess.name = req.body.firstName + ' ' + req.body.lastName;
                sess.uid = req.body.uid;
            }
        }
        else{
            res.send({msg: req.body.message});
        }
    });
    app.get('/signup', (req, res) => {
        
        res.render('signup');
    });
    app.post('/signup', (req, res) => {
        res.render('signup');
    });

    app.get('/registerHotel', (req, res) => {
        
        res.render('registerHotel');
    });
    app.post('/signup', (req, res) => {
        res.render('signup');
    });

    // app.get('/users/home', (req, res) => {
    //     res.render('home')
    // });

    app.get('/hotel/home', (req, res) => {
        if(sess){
            res.render('hotelHome', {name: sess.name})
        }
        else{
            res.redirect('/');
        }
    });

    app.post('/signout', (req, res) => {
        req.session.destroy();
        sess = null;
    });

    app.get('/hotel/roomandpackage', (req, res) => {
        if(sess){
            res.render('roomAndPackage', {name: sess.name, uid: sess.uid});
        }
        else{
            res.redirect('/');
        }
    })
    app.get('/user/details',(req,res)=>{
        if(sess){
            res.render('',{
                name:sess.name,
                uid:sess.uid,
            })
        }else{
            res.redirect('/')
        }
    })
    app.post('/hotel/addRommImagePath', (req, res) => {
        imagePath = req.body.imagePath;
    });
    app.post('/hotel/roomandpackage', upload.single('photo'), (req, res) => {
        if(sess){
            if(req.file){
                res.redirect('/hotel/roomandpackage');
            }
        }
        else{
            res.redirect('/');
        }
    })

    //booking
    app.get('/users/home', (req, res) => {
        if(sess){
            res.render('home', {name: sess.name, uid: sess.uid});
        }
        else{
            res.redirect('/');
        }
      
    })

    app.post('/users/home', (req, res) => {
        if(sess){
              res.redirect('/users/home');    
        }
        else{
            res.redirect('/');
        }
    })
}

module.exports = route;