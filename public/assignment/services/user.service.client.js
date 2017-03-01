/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .factory('UserService', userService);


    function userService($http) {

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
            return $http.get("/api/user/" + uid);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function updateUser(uid, newUser) {
            return $http.put("/api/user/" + uid, newUser);
        }

        function deleteUser(uid) {
            return $http.delete("/api/user/" + uid);
        }
    }


})();