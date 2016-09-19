	// Initialize Firebase
	var database = new Firebase("https://trainscheduler-34824.firebaseio.com");	

	// Display Add Train Form when Add Train clicked
	$("#displayAddTrainBtn").on("click", function(){
		if ( $("#addTrain" ).hasClass( "hide" ) ) {
			$("#addTrain").removeClass("hide");
			$("#displayAddTrainBtn").html("Cancel Add Train");	
		} else {
			$("#addTrain").addClass("hide");
			$("#displayAddTrainBtn").html("Add Train");
		}	
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
			frequency: frequency,
		}

		// Upload train data to Firebase
		database.push(newTrain);

		// Clears all of the text-boxes
		$("#trainInput").val("");
		$("#trainNameInput").val("");
		$("#destinationInput").val("");
		$("#firstDepartureInput").val("");
		$("#frequencyInput").val("");

		// Hide Add Train Form After adding train to database

		$("#addTrain").addClass("hide");

		// Determine when the next train arrives.
		return false;
	});

	// When a firebase event detected add a row for the new train
		database.on("child_added", function(childSnapshot, prevChildKey){

		console.log(childSnapshot.val());

		// Store everything into a variable.
		var train = childSnapshot.val().train;
		var trainName = childSnapshot.val().trainName;
		var destination = childSnapshot.val().destination;
		var firstDeparture = childSnapshot.val().firstDeparture;
		var frequency = childSnapshot.val().frequency;

		// Calculate mins to next train
		
		var currentTime = moment();
		firstDeparture = moment(firstDeparture,'HH mm');

		if (currentTime < firstDeparture) {
			var arrivalTime = moment(firstDeparture).format('HH:mm');
			var nextTrain = moment.duration(firstDeparture.diff(currentTime));
			var nextTrain = Math.round(nextTrain.asMinutes());
		} else {
			var nextTrain = moment.duration(currentTime.diff(firstDeparture));
			var nextTrain = Math.round(nextTrain.asMinutes());
			var nextTrain = frequency - (nextTrain%frequency);
			// var arrivalTime = moment(currentTime.add(nextTrain)).format('HH:mm');
			var arrivalTime = moment().add(nextTrain, 'minutes').format('HH:mm');
			console.log(nextTrain);
		}

		var status = 'On Time';		

		// Add each train's data into the table 
		$("#trainTable > tbody").append("<tr><td>" + train + "</td><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrivalTime + "</td><td>" + nextTrain + " </td><td>" + status + "</td></tr>");

	});

	// Start Clock With Current Time
	
	function crStartClockNow() {
	    crClockInterval = setInterval(function() {
	        $('#currentTime').html(moment().format('H:mm'));
	        console.log('one min');
	    }, 1000 * 60);

	}	


	$('#currentTime').html(moment().format('H:mm'));
	crStartClockNow()
