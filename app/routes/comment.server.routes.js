//this function handles routing of requests
module.exports = function (app) {
    //load the controller(s)
    var ctrl = require('../controllers/comment.server.controller');
    
    //handle the routing of get request to the route

    app.get('/comments', function (req, res) {
        ctrl.comments(req, res);
    });
    
    app.get('/index', function (req, res) {
        ctrl.index(req, res);
    });

     //handle the routing of get request to the route
    app.get('/', function (req, res) {
        ctrl.index(req, res);
    });

    app.get('/commentsByStudent', function (req, res) {
        ctrl.commentsByStudent(req, res);
    });

    app.route('/submitComments')
        .post(ctrl.submitComments);

};
