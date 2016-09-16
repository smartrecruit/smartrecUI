myapp.controller("RegistrationController",function($scope, $http,$location){
	$scope.Checked=true;	
	$scope.errorMessage="";
	
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


	/*-Check FILE Isvalid-*/
    $scope.ChechFileValid = function (file) {
        $scope.isValid = false;  
        if (file.length!=0) {
            for (i = 0; i < file.length; i++) {
                if (file[i] != "") {
                    if ((file[i].type == 'image/png' || file[i].type == 'image/jpeg' || file[i].type == 'image/gif') && file[i].size <= (512 * 1024)) {
                        $scope.isValid = "true";
                    }
                    else {
                        $scope.isValid = "false";
                        break;
                    }
                }
            }
        }
        $scope.IsFileValid = $scope.isValid;
    };
    /*-End Check File Valid-*/
	
	
	/*-File Uploading-*/
	$scope.SelectedFileForUpload = [];
	$scope.selectFileforUpload = function (file) {		
        $scope.FileForUpload = file[0];
		$scope.SelectedFileForUpload.push($scope.FileForUpload);		
    }
	/*-End of File Uploading-*/
	
	/*-Save Registration-*/
	$scope.RegistrationAccount=function(accountRegistration){
		$scope.Registration=[];
		var len=$scope.SelectedFileForUpload.length;
		$scope.ChechFileValid($scope.SelectedFileForUpload);
		
		if ($scope.IsFileValid) {			
			if(accountRegistration!=undefined){
				$scope.Registration=accountRegistration;
				var usertype=$scope.pagename;
				if(accountRegistration.username && accountRegistration.email && accountRegistration.password && accountRegistration.rePassword && accountRegistration.firstName && accountRegistration.surname){
					$scope.errorMessage="";				
					var data = {
						firstname:accountRegistration.firstName,
						lastname:accountRegistration.surname,
						emailid:accountRegistration.email,
						pwd:accountRegistration.password,
						usertype:usertype,
						approved:'Yes'
					};
					//http://localhost:3000/evaluators/removeEvaluator/567  \\\\\\\\\ Delete the record \\\\\\\\\\\\\\\\\
					
					$http.post('http://localhost:3000/evaluators/register', data) 
						.success(
							function(success){
							//	alert("success");
								console.log(success);
								$scope.errorMessage=" You have registered succesfully with Smarteval please verify e-mail to continue";
							})
						.error(
							function(error){
								console.log(error);
								$scope.errorMessage=" Registration failed due to some technical issues please try again";
							});
					 
				}
				else{
					//$scope.errorMessage="All fields are required";
					
					if((accountRegistration.email==undefined )&& (accountRegistration.username && accountRegistration.password && accountRegistration.rePassword && accountRegistration.firstName && accountRegistration.surname)){
						$scope.errorMessage="Email should be valid.";
						return;
					}
					if((accountRegistration.password==undefined)&& (accountRegistration.username && accountRegistration.email && accountRegistration.firstName && accountRegistration.surname)){
						$scope.errorMessage="Password should be in correct format.";
						return;
					}
					if((accountRegistration.rePassword==undefined)&&(accountRegistration.username && accountRegistration.email && accountRegistration.password && accountRegistration.firstName && accountRegistration.surname)){
						$scope.errorMessage="Retype Password should match with Password.";
						return;
					}
					else{
						$scope.errorMessage="All fields are required";
					}
				}
			}			
		}
		else{
			$scope.errorMessage="All fields are required";
		}
	}
	/*-End of Save Registration-*/
});


