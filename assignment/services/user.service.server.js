module.exports = function(app) {

    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    app.post("/api/user", createUser);

    var userModel = require("../model/user/user.model.server");

    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: "alice@husky.neu.edu"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: "bob@husky.neu.edu"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: "charly@husky.neu.edu"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: "jannunzi@husky.neu.edu"
        }
    ];

    function findUser(req, res) {
        var username = req.query.username;
        var password = req.query.password;
        if (username && password) {
            findUserByCredentials(req, res);
        }
        else if (username) {
            findUserByUsername(req,res);
        }
    }

    function findUserByCredentials(req,res){
        var username = req.query.username;
        var password = req.query.password;
        userModel
            .findUserByCredentials(username, password)
            .then(function(user){
                res.json(user[0]);
            }, function(err) {
                res.sendStatus(500).send(err)
            });

    }

    function findUserByUsername(req, res) {
        userModel
            .findUserByUsername(req.query.username)
            .then(function(user){
                if (!JSON.stringify(user) === '{}'){
                    res.json(user[0]);
                }
                else{
                    res.sendStatus(500)
                }
            }, function(err) {
                res.sendStatus(500).send(err)
            });
    }

    function findUserById(req,res){
        var uid = req.params.uid;
        userModel
            .findUserById(uid)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function updateUser(req, res){
        var uid = req.params.uid;
        var newUser = req.body;
        userModel
            .updateUser(uid, newUser)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                res.sendStatus(500).send(err);
            });
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        userModel
            .deleteUser(uid)
            .then(function() {
                res.sendStatus(200);
            }, function(err) {
                res.sendStatus(500).send(err);
            });

    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function(user) {
                res.json(user);
            }, function(err) {
                res.sendStatus(500).send(err);
            });

    }
};