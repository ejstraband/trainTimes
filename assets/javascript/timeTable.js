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
  // check the snapshot for the new entry
  database.ref().on("child_added", function(snapshot) {
    console.log("database update detected");
    now = moment().format("HH:mm");
    console.log("now: " + now);

  // calculate the minutes to the next train
    // take now, convert to MS, take start time, convert to MS
    // subtract start time from now
    // convert frequency to MS
    // take the modulous of line50%51
    // convert 52 to minutes
    // display 53
    // add 53 to now and display in "next time"

  // write out the entry to the timetable div

  // make an empty row
  var newRow = $("<tr>");
  console.log(newRow);
  // make a td for each column
  var tdTrainName = $("<td>").text("ThisIsTheTrainName");
  var tdTrainDestination = $("<td>").text("ThisIsTheTrainDestination");
  var tdTrainFrequency = $("<td>").text("ThisIsTheTrainFrequency");
  var tdTrainNextArrival = $("<td>").text("ThisIsTheTrainNextArrival");
  var tdTrainMinutesAway = $("<td>").text("ThisIsTheTrainMinutesAway");

  var fullRow = newRow.html(tdTrainName, tdTrainDestination, tdTrainFrequency, tdTrainNextArrival, tdTrainMinutesAway);  
  console.log(fullRow);

  $("#scheduleTable").append(fullRow);
  // fill the TD's from the D.B or line54 and line55
  // append the TD's to the TR
  // append the TR to the scheduleTable Div

  });
