$(document).ready(function() {
  
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

        var minutesAway;
        var firstTimeConverted = moment(first, "hh:mm").subtract(1, "years");
        var currentTime = moment();
        var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
        var remainder = diffTime % frequency;
        var dataMinutesAway = frequency - remainder;
        var nextTrain = moment().add(dataMinutesAway, "minutes");
        var nextTrainDisplay = moment(nextTrain).format('hh:mm');

        database.ref().push({
            dataName: name,
            dataDestination: destination,
            dataFirst: first,
            dataFrequency: frequency,
            dataMinutesAway: minutesAway,
            dataNextTrain: nextTrainDisplay
            dateAdded: firebase.database.ServerValue.TIMESTAMP
        });


        database.ref().on("child_added", function(childSnapshot) {

            $("#timeTable").append(

                "<tr><td>" + childSnapshot.val().dataName + "</td>" +
                "<td>" + childSnapshot.val().dataDestination + "</td>" +
                "<td>" + childSnapshot.val().dataFrequency + "</td>" +
                "<td>" + childSnapshot.val().dataNextTrain + "</td>" +
                "<td>" + childSnapshot.val().dataMinutesAway + "</td></tr>");




        }, function(errorObject) {
            console.log("Errors handled: " + errorObject.code);
        });





    });
});




// });