/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .factory('UserService', userService);


    function userService() {
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

        var api = {
            "createUser": createUser,
            "updateUser": updateUser,
            "deleteUser": deleteUser,
            "findUserById": findUserById,
            "findUserByUsername": findUserByUsername,
            "findUserByCredentials": findUserByCredentials
        };

        return api;

        function findUserById(uid) {
            for (var index in users) {
                var user = users[index];
                if (user._id === uid) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var index in users) {
                var user = users[index];
                if (user.username === username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var index in users) {
                var user = users[index];
                if (user.username === username && user.password === password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function createUser(user) {
            users.push(user);
        }

        function updateUser(uid, newUser) {
            for (var index in users) {
                var user = users[index];
                if (user._id === uid) {
                    user.username = newUser.username;
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    user.email = newUser.email;
                    return angular.copy(user);
                }
            }
            return null;
        }

        function deleteUser(uid) {
            for (var index in users) {
                if (users[index]._id === uid) {
                    users.splice(index, 1);
                }
            }
        }
    }


})();