const { get } = require('mongoose');
var students = require('../controllers/student.server.controller');

module.exports = function (app) {

    app.route('/submitSignin')
        .post(students.submitSignin);
    app.route('/submitSignUp')
        .post(students.submitSignUp);

    app.get('/signin', function (req, res) {
        students.signin(req, res);
    });
    
    app.get('/signup', function (req, res) {
        students.signup(req, res);
    });

    app.get('/students', function (req, res) {
        students.listAllStudents(req, res);
    });
    
        
};