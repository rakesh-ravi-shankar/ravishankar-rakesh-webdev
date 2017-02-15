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

            if (UserService.findUserByUsername(user.username)) {
                vm.error = "Username already exists! Please select a new username."
                return;
            }

            if (user.password === user.verify_password) {
                user._id = (new Date()).getTime().toString();
                delete user.verify_password;

                UserService.createUser(user);
                $location.url("/user/" + user._id);
            }
            else {
                vm.error = "Password Mismatch!";
            }
        }
    }
})();