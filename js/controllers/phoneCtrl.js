// Controller
app.controller('phoneCtrl', ['$scope', 'moment',   function($scope,moment) 
{
	$scope.phonebook ={};
	$scope.lastid='3';
	
	//Versucht die Einträge aus dem lokalen Speicher zu lesen
	if(!localStorage.getItem("phonebook"))
	{
		//Wenn es keine gibt, wird das Telefonbuch mit drei Dummy-Einträgen gefüllt
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
		//Liest das Telefonbuch aus dem lokalen Speicher. Es wird geparsed, da der lokale Speicher nur Strings speichert. Unser Telefonbuch ist aber ein Array von Objekten
		$scope.phonebook = JSON.parse(localStorage.getItem("phonebook"));		
		$scope.lastid = localStorage.getItem('lastID');
	}
	
	
	
	
	
	$scope.showAdd = false;
	$scope.inName = '';
	$scope.inNumber = '';
	$scope.showEditName = false;
	$scope.showEditNumber = false;
	
	//Hinzufügen einer neuen Zeile
	$scope.addItem = function()
	{
		//Nur hinzufügen, wenn die Eingabefelder nicht leer sind
		if($scope.inName != '' && $scope.inNumber != '')
		{
			var id = parseInt($scope.lastid)+1; //Letzte ID wir inkrementiert
			$scope.lastid = id.toString();
			$scope.phonebook.entries.push({id: $scope.lastid,
								name: $scope.inName,
								number: $scope.inNumber,
								date: moment().format('L')}); //Übertragen der Werte in das Objekt-Array
			
			//Zurücksetzen (leeren) der Eingabefelder					
			$scope.inName = '';
			$scope.inNumber = '';		
			saveToLocal();			//Telefonbuch in den lokalen Speicher übernehmen	
		}
		
		
		//Die Input-Felder werden ausgeblendet
		$scope.showAdd = !$scope.showAdd;
	};
	
	//Eintrag löschen
	$scope.removeItem = function(x)
	{
		$scope.phonebook.entries.splice(x,1); //entfernt ab X  "1" Item aus dem Array und gibt das array zurück.	
		saveToLocal();	
	};
	
	//wird ausgeführt, wenn ein Doppelklick auf einen Wert in der Tabelle ausgeführt wird. Übergeben wird die Zeile
	$scope.editName = function(x)
	{
		$scope.phonebook.selected = angular.copy(x); //Kopieren der Zeile in das Array "Selected", für die spätere bearbeitung
		
		//Template zum Editieren wird ausgewählt
		$scope.showEditName = true;
	};
	$scope.editNumber = function(x)
	{
		$scope.phonebook.selected = angular.copy(x);
		$scope.showEditNumber = true;
	};
	
	//Speichern der editierten Zeile. Zeilennummer wird übergeben
	$scope.save = function(idx)
	{
		$scope.phonebook.entries[idx] = angular.copy($scope.phonebook.selected); //Ausgewählte Zeile ersetzt Orginalzeile
		//Zurücksetzten des Templates auf normale Ansicht
		$scope.phonebook.selected = {};
		$scope.showEditName = false;
		$scope.showEditNumber = false;
				
	    saveToLocal();			
		
	};
	
	//Telefonbuch und ID Zähler werden in den lokalen Speicher geschrieben
	function saveToLocal()
	{
		localStorage.setItem('phonebook',angular.toJson($scope.phonebook)); 
		localStorage.setItem('lastID',$scope.lastid);
	}
	
	//Umschalten der Sichtbarkeit der Input-Boxen
	$scope.showAddItem = function()
	{
		$scope.showAdd = !$scope.showAdd;
	};
	
	 // Wählt das Template für die Zeilen der Tabelle aus
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
	
	//Lokalen Speicher löschen. Wurde nur zum Testen verwendet
	$scope.clearStorage = function()
	{
		localStorage.clear();
	}
}]);