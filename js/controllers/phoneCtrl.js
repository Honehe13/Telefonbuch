
app.controller('phoneCtrl', ['$scope', 'moment',  function($scope,moment) 
{
	
	$scope.exampleDate = moment('2017-10-28').format('L');
    $scope.entries = [
	{name:'André',number:'05507401436',date:moment('2017-10-28').format('L')},
	{name:'Peter',number:'0551501555',date:moment('2017-10-28').format('L')},
	{name:'Frauke',number:'05518015',date:moment('2017-10-28').format('L')},
	];
	$scope.showAdd = false;
	$scope.inName = '';
	$scope.inNumber = '';
	
	$scope.addItem = function()
	{
		if($scope.inName != '' && $scope.inNumber != '')
		{
			$scope.entries.push({name: $scope.inName,
								number: $scope.inNumber,
								date: moment().format('L')});
								
			$scope.inName = '';
			$scope.inNumber = '';
								
								
		}
		$scope.showAdd = !$scope.showAdd;
	}
	
	$scope.removeItem = function(x)
	{
		$scope.entries.splice(x,1); //entfernt ab X  "1" Item aus dem Array und gibt das array zurück.
	}
	
	$scope.editName = function(x)
	{
		
	}
	
	$scope.showAddItem = function()
	{
		$scope.showAdd = !$scope.showAdd;
	}
}]);