
app.controller('phoneCtrl', ['$scope', 'moment',   function($scope,moment) 
{
	$scope.phonebook ={};
	$scope.lastid='3';
	
	if(!localStorage.getItem("phonebook"))
	{
		$scope.phonebook = 
		{
			entries:[
				{id:'1', name:'André',number:'05507401436',date:moment('2017-10-28').format('L')},
				{id:'2', name:'Peter',number:'0551501555',date:moment('2017-10-28').format('L')},
				{id:'3', name:'Frauke',number:'05518015',date:moment('2017-10-28').format('L')},
			],
			selected:{}
		};
		$scope.lastid = '3';
	}
	else
	{
		$scope.phonebook = JSON.parse(localStorage.getItem("phonebook"));		
		$scope.lastid = localStorage.getItem('lastID');
	}
	
	
	
	
	
	$scope.showAdd = false;
	$scope.inName = '';
	$scope.inNumber = '';
	$scope.showEditName = false;
	$scope.showEditNumber = false;
	
	$scope.addItem = function()
	{
		if($scope.inName != '' && $scope.inNumber != '')
		{
			var id = parseInt($scope.lastid)+1;
			$scope.lastid = id.toString();
			$scope.phonebook.entries.push({id: $scope.lastid,
								name: $scope.inName,
								number: $scope.inNumber,
								date: moment().format('L')});
			
								
			$scope.inName = '';
			$scope.inNumber = '';		
			saveToLocal();				
		}
		$scope.showAdd = !$scope.showAdd;
	};
	
	$scope.removeItem = function(x)
	{
		$scope.phonebook.entries.splice(x,1); //entfernt ab X  "1" Item aus dem Array und gibt das array zurück.	
		saveToLocal();	
	};
	
	$scope.editName = function(x)
	{
		$scope.phonebook.selected = angular.copy(x);
		$scope.showEditName = true;
	};
	$scope.editNumber = function(x)
	{
		$scope.phonebook.selected = angular.copy(x);
		$scope.showEditNumber = true;
	};
	
	$scope.save = function(idx)
	{
		$scope.phonebook.entries[idx] = angular.copy($scope.phonebook.selected);
		$scope.phonebook.selected = {};
		$scope.showEditName = false;
		$scope.showEditNumber = false;
				
	    saveToLocal();			
		
	};
	
	function saveToLocal()
	{
		localStorage.setItem('phonebook',angular.toJson($scope.phonebook)); //Nicht JSON.stringify!
		localStorage.setItem('lastID',$scope.lastid);
	}
	
	$scope.showAddItem = function()
	{
		$scope.showAdd = !$scope.showAdd;
	};
	
	 // gets the template to ng-include for a table row / item
    $scope.getTemplate = function (x)
	{
        if (x.id === $scope.phonebook.selected.id)
		{
			if($scope.showEditName)
				return 'editName';
			else
				return 'editNumber';
		}
        else 
			return 'display';
    };
	
	$scope.clearStorage = function()
	{
		localStorage.clear();
	}
}]);