/**
 * Created by Rakesh on 1/13/17.
 */
angular
    .module("TodoApp", [])
    .controller("TodoController", TodoController)


function TodoController($scope) {
    $scope.todos = [];

    $scope.createPost = createPost;
    $scope.deletePost = deletePost;
    $scope.selectPost = selectPost;

    function selectPost(post)
    {
        var newPost = {'title':post.title, 'body':post.note};
        $scope.post.title = newPost.title;
        $scope.post.body = newPost.body;
        console.log(newPost);
    }

    function createPost(post){
        var blogPost = {'title': post.title, 'body': post.body};
        $scope.todos.push({'title': blogPost.title, 'note': blogPost.body});
    }

    function deletePost(post)
    {
        var postToBeDeleted = $scope.todos.indexOf(post);
        $scope.todos.splice(postToBeDeleted, 1)
    }
}






