	// Initialize Firebase
	var database = new Firebase("https://trainscheduler-34824.firebaseio.com");	

	// Display Add Train Form when Add Train clicked
	$("#displayAddTrainBtn").on("click", function(){
		$("#addTrain").removeClass("hide");	
	});

	// Add train to Firebase

	$("#addTrainBtn").on("click", function(){

		// Grabs user input
		var train = $("#trainInput").val().trim();
		var trainName = $("#trainNameInput").val().trim();
		var destination = $("#destinationInput").val().trim();
		var firstDeparture = $("#firstDepartureInput").val().trim();
		var frequency = $("#frequencyInput").val().trim();

		// Creates local "temporary" object for holding employee data
		var newTrain = {
			train:  train,
			trainName: trainName,
			destination: destination,
			firstDeparture: firstDeparture,
			frequency: frequency
		}

		// Upload train data to Firebase
		database.push(newTrain);

		// Alert
		alert("Train successfully added");

		// Clears all of the text-boxes
		$("#trainInput").val().trim("");
		$("#trainNameInput").val().trim("");
		$("#destinationInput").val().trim("");
		$("#firstDepartureInput").val().trim("");
		$("#frequencyInput").val().trim("");

		// Determine when the next train arrives.
		return false;
	});