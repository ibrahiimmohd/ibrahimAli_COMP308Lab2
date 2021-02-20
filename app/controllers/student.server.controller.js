var Student = require('mongoose').model('Student');

exports.signup = function(req, res){
    //display signup page
    res.render('signup', { loginMessage: 'Please login' });
}

exports.signin = function(req, res){
    //display signin page
    res.render('signin', { msg: "Sign In"});
}

exports.listAllStudents = function(req, res, next){
    Student.find({}, function(err, users){
        if(err){
            return next(err);
        }else{
             // Use the 'response' object to send a JSON response
             res.render('students', {users: users});
        }
    })
}

exports.submitSignUp = function(req, res, next){
    var user = new Student(req.body);
    user.save(function(err){
        if(err){
            return next(err);
        } else {
            var session = req.session;
            //store the email in session object
            session.email = req.body.email;

            req.user = user;
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser)
            //display comments page and pass user properties to it
            if(jsonUser){
                res.render('submitcomments', { user: jsonUser} );
            }else{
                res.render('signup', { msg: "Pleas try to sign up again"} );
            }
            next();
        }
    });
}

exports.submitSignin = function(req, res, next){
    Student.findOne({email:req.body.email, password:req.body.password}, (err, user) => {
        if(err){
            return next(err);
        }else{
            var session = req.session;
            //store the email in session object
            session.email = req.body.email;

            req.user = user;
            var jsonUser = JSON.parse(JSON.stringify(user));
            console.log(jsonUser)
            //display comments page and pass user properties to it
            if(jsonUser){
                res.render('submitcomments', { user: jsonUser} );
            }else{
                res.render('signin', { msg: "Pleas try to sign in again"} );
            }
            next();
        }
    })
}

