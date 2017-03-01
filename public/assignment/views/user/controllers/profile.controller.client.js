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
        vm.update = updateUser;
        vm.deleteUser = deleteUser;

        init();

        function init() {
            var promise = UserService.findUserById(userId);
            promise.success(function(user){
                vm.user = user;
            });
        }

        function updateUser() {
            UserService
                .updateUser(userId, vm.user)
                .success(function(user){
                    if (user == null) {
                        vm.error = "Cannot update user";
                    }
                    else {
                        vm.message = "User updated successfully";
                    }
                });

        }

        function deleteUser() {
            UserService
                .deleteUser(userId)
                .success(function(){
                    $location.url("/login");
                });

        }
    }
})();