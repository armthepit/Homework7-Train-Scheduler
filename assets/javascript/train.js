$(document).ready(function(){

	// Initialize Firebase
	var config = {
	apiKey: "AIzaSyBg9Qgnc-p3dNVNmUwechXZbZj1kI6NygY",
	authDomain: "trainscheduler-34824.firebaseapp.com",
	databaseURL: "https://trainscheduler-34824.firebaseio.com",
	storageBucket: "trainscheduler-34824.appspot.com",
	messagingSenderId: "948524545388"
	};
	firebase.initializeApp(config);

	database = firebase.database();

	// Display Add Train Form when Add Train clicked
	$("#displayAddTrain").on("click", function(){
		$("#addTrain").removeClass("hide");	
	});







});