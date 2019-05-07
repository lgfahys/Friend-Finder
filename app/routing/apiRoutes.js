
//    * A GET route with the url `/api/friends`. This will be used to display a JSON of all possible friends.
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will 
//    * also be used to handle the compatibility logic.
var users = require("../data/friends.js");

module.exports = function(app) {
    app.get("/api/friends", function(req, res) {
        res.json(users);
      });

      app.post("/api/friends", function(req, res) {
          var userInput = req.body;
          var userScores = req.body.scores;
          var difference = 0;
          var match = {
              name: "",
              photo: "",
              compatability: 1000
          }

          var x = userScores.map(function(item) {
              return parseInt(item, 10);
          });

          users.push(userInput);
          res.json(true);
      });
};