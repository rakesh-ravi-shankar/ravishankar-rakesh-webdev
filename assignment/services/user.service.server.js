/**
 * Created by Rakesh on 2/27/17.
 */
module.exports = function(app) {
    app.get("/api/user", findUser);
    app.get("/api/user/:uid", findUserById);
    app.put("/api/user/:uid", updateUser);
    app.delete("/api/user/:uid", deleteUser);
    app.post("/api/user", createUser);

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
        var user = users.find(function(user){
            return user.password === password && user.username === username
        });
        res.send(user);
        return;
    }

    function findUserByUsername(req, res) {
        var user = users.find(function(u){
            return u.username == req.query.username;
        });
        if (user) {
            res.json(user);
        }
        else {
            res.sendStatus(404).send({message: "User Not Found"});
        }
        return;
    }

    function findUserById(req,res){
        var uid = req.params.uid;
        var user = users.find(function(user){
            return user._id === uid;
        });
        res.json(user);
    }

    function updateUser(req, res){
        var uid = req.params.uid;
        var newUser = req.body;
        for (var index in users) {
            var user = users[index];
            if (user._id === uid) {
                user.username = newUser.username;
                user.firstName = newUser.firstName;
                user.lastName = newUser.lastName;
                user.email = newUser.email;
                res.json(user);
                return;
            }
        }
    }

    function deleteUser(req, res) {
        var uid = req.params.uid;
        for (var index in users) {
            if (users[index]._id === uid) {
                users.splice(index, 1);
                res.sendStatus(200);
                return;
            }
        }

    }

    function createUser(req, res) {
        var user = req.body;
        users.push(user);
        res.sendStatus(200);
    }
};