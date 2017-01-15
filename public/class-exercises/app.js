/**
 * Created by Rakesh on 1/13/17.
 */
angular
    .module("TodoApp", [])
    .controller("TodoController", TodoController)


function TodoController($scope) {
    $scope.todos = [
        {'title':'title 1', 'note':'note1'},
        {'title':'title 2', 'note':'note2'}
    ];
}




