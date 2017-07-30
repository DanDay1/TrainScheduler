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
        event.preventDefault;
        var name = $("#nameInput").val().trim();
        console.log(name);
        var destination = $("#destinationInput").val().trim();
        console.log(destination);
        var first = $("#firstInput").val().trim(); // convert to military time
        var frequency = $("frequencyInput");
        var minutesAway;

        database.ref().push({
            dataName: name,
            dataDestination: destination,
            dataFirst: first,
            dataFrequency: frequency,
            dataMinutesAway: minutesAway,
            dataDateAdded: firebase.database.ServerValue.TIMESTAMP
        });

        console.log("branch one");

    });
});




// });