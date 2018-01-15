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

    var newRow = (
    "<tr>" +
    "<td>" + trainTd  + "</td>" +
    "<td>" + destinationTd + "</td>" +
    "<td>" + frequencyTd + "</td>" +
    "<td>" + "nextTime" + "</td>" +
    "<td>" + "minutesUntil" + "</td>" +   
    "</tr>"
    );
    console.log(newRow);

    $("#scheduleTable").append(newRow);
    });  

  // check the snapshot for the new entry
  database.ref().on("child_added", function(childSnapshot) {
    now = moment().format("HH:mm");
    console.log("now: " + now);

  // calculate the next time and minutes to the next train
  var nextTime = "";
  var minutesUntil = "";

  // write out the entry to the timetable div

  // $("scheduleTable").append(
  //   "<tr>" +
  //   "<td>" + childSnapshot.val().newTrainName + "</td>" +
  //   "<td>" + childSnapshot.val().newDestination + "</td>" +
  //   "<td>" + childSnapshot.val().newFirstTime + "</td>" +
  //   "<td>" + nextTime + "</td>" +
  //   "<td>" + minutesUntil + "</td>" +   
  //   "</tr>"
  //   );


  // make an empty row
  // var newRow = $("<tr>");
  // console.log(newRow);
  // make a td for each column
  // var tdTrainName = $("<td>").text("ThisIsTheTrainName");
  // var tdTrainDestination = $("<td>").text("ThisIsTheTrainDestination");
  // var tdTrainFrequency = $("<td>").text("ThisIsTheTrainFrequency");
  // var tdTrainNextArrival = $("<td>").text("ThisIsTheTrainNextArrival");
  // var tdTrainMinutesAway = $("<td>").text("ThisIsTheTrainMinutesAway");

  // var fullRow = newRow.html(tdTrainName, tdTrainDestination, tdTrainFrequency, tdTrainNextArrival, tdTrainMinutesAway);  
  // console.log(fullRow);

  // $("#scheduleTable").append(fullRow);
  // fill the TD's from the D.B or line54 and line55
  // append the TD's to the TR
  // append the TR to the scheduleTable Div

  });
