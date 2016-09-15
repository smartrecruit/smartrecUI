myapp.controller("EvaluationController",function($scope,$http){
	
	$scope.ApplyEvaluation=function(applyEvaluation){
		var data = {
			id:1711,
			date:applyEvaluation.date,
			time:applyEvaluation.time,
			zone:applyEvaluation.zone,
			keyspecialization:applyEvaluation.keySpecialization
			
		};
		//http://localhost:3000/evaluators/removeEvaluator/567  \\\\\\\\\ Delete the record \\\\\\\\\\\\\\\\\

		$http.post('http://localhost:3000/evaluators/register', data) 
			.success(
				function(success){
					console.log(success);
				})
			.error(
				function(error){
					console.log(error);
				});
							 
	}
});