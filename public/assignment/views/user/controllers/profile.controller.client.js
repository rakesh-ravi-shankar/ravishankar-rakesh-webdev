/**
 * Created by Rakesh on 2/10/17.
 */
(function(){
    angular
        .module("WebApp")
        .controller("profileController", profileController);

    function profileController(UserService, $routeParams){
        var vm = this;
        var userId = $routeParams['uid'];
        var user = UserService.findUserById(userId);
        vm.user = user;
        vm.update = updateUser;


        function updateUser(newUser){
            var user = UserService.updateUser(userId, newUser);
            if(user == null){
                vm.error = "Cannot update user";
            }
            else{
                vm.message = "User updated successfully";
            }
        }
    }
})();