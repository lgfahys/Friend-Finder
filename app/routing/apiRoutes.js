
//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will 
//    * also be used to handle the compatibility logic.
var users = require("../data/friends.js");


module.exports = function (app) {
    app.get("/api/friends", function (req, res) {
        res.json(users);
    });

    app.post("/api/friends", function (req, res) {
        // storing the current user input in a variable
        var userInput = req.body;
        // storing the current user scores in a variable
        var userScores = userInput.scores;
        // creating a match object to later store the best match data
        var match = {
            name: "",
            photo: "",
            compatability: 0
        }
        // creating an array to hold all the compatability scores
        var compatabilityArray = [];

        for (var i = 0; i < users.length; i++) {
            // setting the initial difference between scores to 0
            var difference = 0;
            for (var j = 0; j < userScores.length; j++) {
                // finding the absolute value of all users scores minus current users scores (userScores) and storing it in the 'difference' variable'
                difference += (Math.abs(users[i].scores[j] - userScores[j]));
            }

            console.log("User: " + users[i].name +  "\nUser Scores: " + users[i].scores + "\nCurrent User Scores: " + userScores);
            console.log("Difference: " + difference);
            compatabilityArray.push(difference);
            console.log(compatabilityArray);
            // finding the smallest difference stored in the compatability array
            var bestMatchCompatability = Math.min(...compatabilityArray);
            console.log("Highest Compatability Score: " + bestMatchCompatability);
            if (difference === bestMatchCompatability) {
                match.name = users[i].name;
                match.photo = users[i].photo;
            }
        };

        console.log("Best match name: " + match.name);
        console.log("Best match photo: " + match.photo);


        users.push(userInput);
        res.json(match);
    });
};
