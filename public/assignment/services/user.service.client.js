/**
 * Created by Rakesh on 2/10/17.
 */
(function(){
    angular
        .module("WebApp")
        .factory('UserService', userService);


    function userService(){
        var users = [
            {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
            {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
            {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
            {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
        ]

        var api = {
            "updateUser" : updateUser,
            "findUserByCredentials" : findUserByCredentials,
            "findUserById" : findUserById
        }

        return api;

        function findUserByCredentials(username, password){
            for (var index in users) {
                var user = users[index];
                if(user.username === username && user.password === password){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserById(uid){
            for (var index in users) {
                var user = users[index];
                if(user._id === uid){
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(uid, newUser){
            for (var index in users) {
                var user = users[index];
                if(user._id === uid){
                    user.firstName = newUser.firstName;
                    user.lastName = newUser.lastName;
                    return user
                }
            }
            return null;
        }
    }


})();