/**
 * Created by Rakesh on 2/11/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("registerController", registerController)

    function registerController(UserService, $location) {
        var vm = this;
        vm.createUser = createUser;


        function createUser(user) {
            if (typeof user === "undefined") {
                vm.error = "Undefined Entry!";
                return;
            }
            if ((typeof user.username === "undefined") ||
                (typeof user.password === "undefined") ||
                (typeof user.verify_password === "undefined")) {
                vm.error = "Undefined Entry!";
                return;
            }

            UserService
                .findUserByUsername(user.username)
                .success(function(userFound){
                    vm.error = "Username already exists! Please select a new username.";
                    return;
                });

            if (user.password === user.verify_password) {
                delete user.verify_password;

                UserService
                    .createUser(user)
                    .success(function(createdUser){
                        console.log(createdUser);
                        $location.url("/user/" + createdUser._id);
                    });

            }
            else {
                vm.error = "Password Mismatch!";
                return;
            }



        }
    }
})();