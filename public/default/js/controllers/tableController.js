app.controller('tableprecing', ['$scope','$http', function ($scope,$http) {

	var idSheets = '1bbQA8_mvQiMTgXQRHOqGjK6475hOui7VN7R33XcTsao';

	$http.jsonp('https://spreadsheets.google.com/feeds/cells/' + idSheets + '/od6/public/basic?callback=JSON_CALLBACK&alt=json').success(function(response){
		var dataRow = response.feed.entry;
		var arrayHead = [];
		var arrayColumn = [];
		var arrayAux = [];
		var initialRow = dataRow[0].title.$t;
		var initialNumber = initialRow.slice(1);
		var wildcard = initialNumber;

		for(i=0; i < dataRow.length; i++){
			var numRow = dataRow[i].title.$t;
			var onlyNum = numRow.slice(1);

			if(onlyNum == initialNumber){
				arrayHead.push(dataRow[i].content.$t);
			}else{
				arrayColumn.push(dataRow[i].content.$t);
			} 
		}

		function split_array_for_slides(array, n){
        	response = [];
        	aux_array = [];
        	for(var i = 0; i <  array.length; i++){
        		if(aux_array.length < n){
        			aux_array.push(array[i]);
        		}else{
        			response.push(aux_array);
        			aux_array = [];
        			aux_array.push(array[i])
        		}
        	}
        	if(aux_array.length > 0){
        		response.push(aux_array);
        	}
        	return response;
        }

        $scope.column = split_array_for_slides(arrayColumn,arrayHead.length); 
		$scope.head = arrayHead;
	});		

	
	$http.jsonp('https://spreadsheets.google.com/feeds/list/' + idSheets + '/2/public/basic?callback=JSON_CALLBACK&alt=json').success(function(response){

		function split_data(pos){
			var dataSheets = [];
			var dataSheetsAux = [];
			var quantyUser = response.feed.entry[pos].content.$t;

			var arrayQuantyUser =  quantyUser.split(',');
			for(i=0; i < arrayQuantyUser.length; i++){
				dataSheetsAux.push(arrayQuantyUser[i]);
			}
			for(i=0; i < dataSheetsAux.length; i++){
				dataSheets.push(dataSheetsAux[i].split(':'));
			}
			return dataSheets;
		}

		
		
		$scope.quantyUser = split_data(1);
		$scope.price = split_data(2);

	});


}]);