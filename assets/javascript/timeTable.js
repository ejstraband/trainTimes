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

    // new train
    var newTrainEntry = {
      trainName: newTrainName,
      destination: newDestination,
      startTime: newFirstTime,
      frequency: newFrequency
      };

    // send the values to the database
    database.ref().push(newTrainEntry);
  });

  // Build out the current schedule

  // get the current DB values
  database.ref().on("child_added", function(currentSnapshot) {

    var trainTd = currentSnapshot.val().trainName;
    console.log(trainTd);
    var destinationTd = (currentSnapshot.val().destination);
    console.log(destinationTd);
    var startTd = (currentSnapshot.val().startTime);
    console.log(startTd);
    var frequencyTd = (currentSnapshot.val().frequency);
    console.log(frequencyTd);

    // calculate times
    var startTimeConverted = moment(startTd, "HH:mm").subtract(1, "years");
    console.log(startTimeConverted);

    var now = moment();
    console.log(moment(now).format("HH:mm"));

    var minutesSinceStart = moment().diff(moment(startTimeConverted), "minutes");
    console.log(minutesSinceStart);

    var minutesDiff  = minutesSinceStart % frequencyTd;
    console.log(minutesDiff);

    var minutesUntil = frequencyTd - minutesDiff;

    var nextTime = moment(now).add(minutesUntil, "minutes").format("HH:mm");
    console.log(nextTime);

    var newRow = (
    "<tr>" +
    "<td>" + trainTd  + "</td>" +
    "<td>" + destinationTd + "</td>" +
    "<td>" + frequencyTd + "</td>" +
    "<td>" + nextTime + "</td>" +
    "<td>" + minutesUntil + "</td>" +   
    "</tr>"
    );
    console.log(newRow);

    $("#scheduleTable").append(newRow);
    });

