// Initialize Firebase
  var config = {
    apiKey: "AIzaSyAK4F8cMsIHlgrHAQCqLT2yYpe8k48xGBE",
    authDomain: "timetables-b0a7b.firebaseapp.com",
    databaseURL: "https://timetables-b0a7b.firebaseio.com",
    projectId: "timetables-b0a7b",
    storageBucket: "",
    messagingSenderId: "767292813576"
  };
  firebase.initializeApp(config);

var database = firebase.database();
// variables to push in
var newTrainName = "";
var newDestination = "";
var newFirstTime = "";
var newFrequency = "";

// capture new train entry
  // on submit
  $("#newTrainSubmission").click(function(e) {
    // keep the page from refreshing
    e.preventDefault();

    // grab the form fields into the variables
    newTrainName = $("#trainName").val().trim();
    newDestination = $("#destination").val().trim();
    newFirstTime = $("#firstTrainTime").val().trim();
    newFrequency = $("#frequency").val().trim();

    // send the values to the database
    database.ref().push({
      trainName: newTrainName,
      destination: newDestination,
      startTime: newFirstTime,
      frequency: newFrequency
    });
  });