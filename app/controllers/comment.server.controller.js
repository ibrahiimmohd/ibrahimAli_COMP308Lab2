var Student = require('mongoose').model('Student');
var Comment = require('mongoose').model('Comment');

exports.comments = function (req, res) {
    //display signin page
    res.render('comments');
}

//This function handles the following task
exports.index = function (req, res) {
    //display index page
    res.render('index');
}

exports.commentsByStudent = function (req, res, next) {
    var email = req.session.email;

    if (email) {
        //find the student then its comments using Promise mechanism of Mongoose
        Student.
        findOne({
            email: email
        }, (err, student) => {
            if (err) {
                return getErrorMessage(err);
            }
            //
            req.id = student._id;
            console.log(req.id);
        }).then(function () {
            //find the posts from this author
            Comment.
            find({
                student: req.id
            }, (err, comments) => {
                if (err) {
                    return getErrorMessage(err);
                }

                //res.json(comments);
                res.render('comments', {
                    comments: comments,
                    email: email,
                    totalComments: comments.length ?? 0
                });
            });
        });
    }else{
        res.render('signin', {
            msg: "Please Sign In"
        });
    }

};

exports.submitComments = function (req, res, next) {
    var comment = new Comment(req.body);
    comment.save(function (err) {
        if (err) {
            return next(err);
        } else {
            req.comment = comment;
            var jsonComment = JSON.parse(JSON.stringify(comment));
            console.log(jsonComment)
            //display comments page and pass user properties to it
            if (jsonComment) {
                res.render('thankyou');
            } else {
                res.render('submitcomments', {
                    msg: "Please fill the necessary fields"
                });
            }
            next();
        }
    });
}