/**
 * Created by Rakesh on 2/10/17.
 */
(function () {
    angular
        .module("WebApp")
        .controller("profileController", profileController);

    function profileController(UserService, $routeParams, $location) {
        var vm = this;
        var userId = $routeParams['uid'];
        var user = UserService.findUserById(userId);
        init();


        function init() {
            vm.user = user;
            vm.update = updateUser;
            vm.deleteUser = deleteUser;
        }

        function updateUser() {
            var user = UserService.updateUser(userId, vm.user);
            if (user == null) {
                vm.error = "Cannot update user";
            }
            else {
                vm.message = "User updated successfully";
            }
        }

        function deleteUser() {
            UserService.deleteUser(userId);
            $location.url("/login");
        }
    }
})();