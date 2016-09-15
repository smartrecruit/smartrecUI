myapp.controller("LoginController",function($scope,$http,$state,$stateParams,$location){
	var loginType = $location.search()['id'];	
	//alert(loginType);
	if(loginType=='Candidate'){
		$scope.pagename='Candidate';
	}
	if(loginType=='Evaluator'){
		$scope.pagename='Evaluator';
	}
	if(loginType=='Company'){
		$scope.pagename='Company';
	}
	
	$scope.IsvisibleLogin=true;
	$scope.IsvisibleForgotPwd=false;
	
	$scope.LoginAccount=function(Login){			
	
		$scope.LoginDetails=[];
		if(Login!=undefined){
			if(Login.username && Login.password)
			{					
				$scope.LoginDetails=Login;
				var user=$scope.LoginDetails.username;			
				//Auth.setUser(user);				
				var data = {						
						username:Login.username,						
						password:Login.password
					};
					$http.post('http://localhost:3000/evaluators/getuser', data) 
						.success(
							function(success){
								var emailid=success.emailid;
								var usertype=success.usertype;
								if (usertype=='Candidate')
								{
								$state.go('Candidate');
								}
								else if (usertype=='Evaluator')
								{
									$state.go('Company');
								}
								//console.log(success);
							})
						.error(function(error){
								$scope.err_login="Invalid Username and Password";
							});
			
			}			
		}

	}
	$scope.ForgotPassword=function(){
		$scope.IsvisibleLogin=false;
		$scope.IsvisibleForgotPwd=true;
	}

	$scope.btnSignup=function(){
		var nextpage=$scope.pagename;
	$state.go('Signup', {id: nextpage});
	}
	$scope.SendMail=function(){
		$scope.IsvisibleLogin=true;
		$scope.IsvisibleForgotPwd=false;
		
		var email= $scope.forgotPassword.email;		
	//	alert(email);
		/*mail sending Code will be here*/
		$scope.forgotPassword.email="";
	}
});



/* myapp.run(['$rootScope', '$location', 'Auth', function ($rootScope, $location, Auth) {
    $rootScope.$on('$routeChangeStart', function (event) {

        if (!Auth.isLoggedIn()) {
            console.log('DENY');
            event.preventDefault();
            $location.path('/login');
        }
        else {
            console.log('ALLOW');
            $location.path('/home');
        }
    });
}]);

myapp.factory('Auth', function(){
var user;

return{
    setUser : function(aUser){
        user = aUser;
    },
    isLoggedIn : function(){
        return(user)? user : false;
    }
  }
}) */





/* myapp.factory("authenticationSvc", function($http, $q, $window) {
  var userInfo;

  function login(userName, password) {
    var deferred = $q.defer();

    $http.post("/api/login", {
      userName: userName,
      password: password
    }).then(function(result) {
      userInfo = {
        accessToken: result.data.access_token,
        userName: result.data.userName
      };
      $window.sessionStorage["userInfo"] = JSON.stringify(userInfo);
      deferred.resolve(userInfo);
    }, function(error) {
      deferred.reject(error);
    });

    return deferred.promise;
  }

  return {
    login: login
  };
}); */
