$(document).ready(function() {
    // var firebase;
    var config = {
        apiKey: "AIzaSyCnLh6N-vYGDhbOOhJ54XER9DjJaRBbStg",
        authDomain: "train-45750.firebaseapp.com",
        databaseURL: "https://train-45750.firebaseio.com",
        projectId: "train-45750",
        storageBucket: "",
        messagingSenderId: "976983011692"
    };

    firebase.initializeApp(config);


    var database = firebase.database();

    $("#submit").on("click", function() {
        console.log("works");
        event.preventDefault();
        var name = $("#nameInput").val().trim();
        console.log(name);
        var destination = $("#destinationInput").val().trim();
        console.log(destination);
        var first = $("#firstInput").val().trim();
        var frequency = $("frequencyInput");
        var minutesAway = 10;
        var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var tRemainder = diffTime % tFrequency;
        var tMinutesTillTrain = tFrequency - tRemainder;
        var nextTrain = moment().add(tMinutesTillTrain, "minutes");
        var nextTrainDisplay = moment(nextTrain).format('hh:mm');

$("#timeTable").append(
       
//         "<tr><td>" + name + "</td>" + 
//         "<td>" + destination + "</td>" + 
//         "<td>" + frequency + "</td>" + 
//         "<td>" + first + "</td>" + 
//         "<td>" + 5 + "</td></tr>");  
        database.ref().push({
            dataName: name,
            dataDestination: destination,
            dataFirst: first,
            dataFrequency: frequency,
            dataMinutesAway: minutesAway
            // dataDateAdded: firebase.database.ServerValue.TIMESTAMP
        }));

        database.ref().on("child_added", function(childSnapshot) {

         $("#timeTable").append(
       
        "<tr><td>" + childSnapshot.val().dataName + "</td>" + 
        "<td>" + childSnapshot.val().dataDestination + "</td>" + 
        "<td>" + childSnapshot.val().dataFirst + "</td>" + 
        "<td>" + childSnapshot.val().dataFrequency + "</td>" + 
        "<td>" + childSnapshot.val().dataMinutesAway + "</td></tr>"); 

         // $("#timeTable").append(
       
        // "<tr><td>" + "Down Easter" + "</td>" + 
        // "<td>" + "Brunswick" + "</td>" + 
        // "<td>" + "0900" + "</td>" + 
        // "<td>" + 10 + "</td>" + 
        // "<td>" + 5 + "</td></tr>"); 
      

    }, function(errorObject) {
      console.log("Errors handled: " + errorObject.code);
    });


    
     

    });
});




// });