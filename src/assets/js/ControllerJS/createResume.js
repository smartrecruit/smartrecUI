myapp.controller('CreateResumeController', function($scope,$http, $location, $anchorScroll) {
 
  $scope.Clone=function(event){
	var childDiv = angular.element( document.querySelector( '#test1' ) );
	var parentDiv = angular.element( document.querySelector( '#test' ) );
	parentDiv.append('<hr style="border-top: 1px dashed #e9e9e9;" ><button ng-click="Remove()" style="float:right;">remove</button>');	
	var clonedDiv= childDiv.clone();	
	parentDiv.append(clonedDiv);	

	$scope.createProfile.organizationName="";
	$scope.createProfile.designationName="";
	$scope.createProfile.fromDate="";
	$scope.createProfile.toDate="";
	$scope.createProfile.expShortDescription="";
	$scope.createProfile.currentEmployer=true;
	$scope.createProfile.prevEmployer=true;
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
	
	$scope.CheckResumeValid = function (file) {
        $scope.isValidResume = false;  
        if (file.length!=0) {
            for (i = 0; i < file.length; i++) {
                if (file[i] != "") {
                    if (file[i].type == 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
						//application/vnd.openxmlformats-officedocument.wordprocessingml.document
                        $scope.isValidResume = "true";
                    }
                    else {
                        $scope.isValidResume = "false";
                        break;
                    }
                }
            }
        }
        $scope.IsResumeValid = $scope.isValidResume;
    };
    /*-End Check File Valid-*/
	
	
	/*-File Uploading-*/
	$scope.SelectedFileForUpload = [];
	$scope.selectFileforUpload = function (file) {		
        $scope.FileForUpload = file[0];
		$scope.SelectedFileForUpload.push($scope.FileForUpload);
    }
	
	$scope.UploadedResume = [];
	$scope.UploadResume = function (file) {		
        $scope.FileForUploadResume = file[0];
		$scope.UploadedResume.push($scope.FileForUploadResume);
    }
	/*-End of File Uploading-*/ 
  
  
  $scope.SaveProfile=function(createProfile){
	 // $scope.ChechFileValid($scope.SelectedFileForUpload);
	 // $scope.CheckResumeValid($scope.UploadedResume);
	  
	 // if ($scope.IsFileValid &&  $scope.isValidResume) {
		  /*
		var data = {
			id:1711,
			firstname:createProfile.basicInfo.firstName,
			middlename:createProfile.basicInfo.middleName,
			surname:createProfile.basicInfo.surname,
			
			country:createProfile.contactInfo.country,
			city:createProfile.contactInfo.city,
			address:createProfile.contactInfo.address,
			zip:createProfile.contactInfo.zipcode,
			phone:createProfile.contactInfo.phone,
			email:createProfile.contactInfo.email,
			
			//summary:createProfile.summary.notes,
			
			industry:createProfile.keySkills.industry,
			functionalarea:createProfile.keySkills.functionalArea,
			specialization:createProfile.keySkills.specialization,
			
			organization:createProfile.experience.organizationName,
			currentemployer:createProfile.experience.currentEmployer,
			previousemployer:createProfile.experience.prevEmployer,
			designation:createProfile.experience.designationName,
			fromdate:createProfile.experience.fromDate,
			todate:createProfile.experience.toDate,
			expshortdescription:createProfile.experience.expShortDescription,
			
			graduation:createProfile.education.graduation,
			fulltime:createProfile.education.fulltime,
			parttime:createProfile.education.parttime,
			distancelearning:createProfile.education.distance,
			specialization:createProfile.education.specialization,
			institute:createProfile.education.institute,
			fromyear:createProfile.education.fromYear,
			toyear:createProfile.education.toYear,
			edushortdescription:createProfile.education.eduShortDescription
		};
		*/
		//http://localhost:3000/evaluators/removeEvaluator/567  \\\\\\\\\ Delete the record \\\\\\\\\\\\\\\\\

		/////////////////////////////// Contat Details Update ///////////////////
		var data = {
			emailid:createProfile.contactInfo.email,
			country:createProfile.contactInfo.country,
			city:createProfile.contactInfo.city,
			address:createProfile.contactInfo.address,
			phoneno:createProfile.contactInfo.phone,
			zipcode:createProfile.contactInfo.zipcode,
			approved:'yes'
				};
		$http.post('http://localhost:3000/evaluators/contactinfo', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
		////////////////////////////////////////////////////////////////////////////////	
		/////////////////////////////// Summary ///////////////////
		var data = {
			emailid:createProfile.contactInfo.email,
			summary:createProfile.summary.notes,
			approved:'yes'
				};
		$http.post('http://localhost:3000/evaluators/summaryinfo', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
		////////////////////////////////////////////////////////////////////////////////
		/////////////////////////////// Key Skills ///////////////////
		var data = {
			emailid:createProfile.contactInfo.email,
			industry:createProfile.keySkills.industry,
			functionalarea:createProfile.keySkills.functionalArea,
			specialization:createProfile.keySkills.specialization,
			approved:'yes'
				};
		$http.post('http://localhost:3000/evaluators/profilekeyskills', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
		////////////////////////////////////////////////////////////////////////////////
        /////////////////////////////// Experience ///////////////////

		//currentemployer:createProfile.experience.currentEmployer,
		//previousemployer:createProfile.experience.prevEmployer,
			//fromdate:createProfile.experience.fromDate,
			//todate:createProfile.experience.toDate,
		var data = {
			emailid:createProfile.contactInfo.email,
		    organization:createProfile.experience.organizationName,
			currentemployer:'yes',
			designation:createProfile.experience.designationName,
			description:createProfile.experience.expShortDescription,
			approved:'yes'
				};
		$http.post('http://localhost:3000/evaluators/profileexperience', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
		////////////////////////////////////////////////////////////////////////////////
	
		/////////////////////////////// Education ///////////////////
			//fulltime:createProfile.education.fulltime,
			//parttime:createProfile.education.parttime,
			//distancelearning:createProfile.education.distance,
			//fromyear:createProfile.education.fromYear,
			//toyear:createProfile.education.toYear,
		var data = {
			emailid:createProfile.contactInfo.email,
		    graduation:createProfile.education.graduation,
			studytime:0,
			specialization:createProfile.education.specialization,
			university:createProfile.education.institute,
			description:createProfile.education.eduShortDescription,
			approved:'yes'
				};
		$http.post('http://localhost:3000/evaluators/profileeducation', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
		////////////////////////////////////////////////////////////////////////////////

	 // }
  }
   
  $scope.scrollTo = function(id) {
    $location.hash(id);
    console.log($location.hash());
    $anchorScroll();
  };
});