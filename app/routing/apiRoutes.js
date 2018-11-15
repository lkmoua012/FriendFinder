var friendArray = require("../data/friends");
var totalDiff = [];

function findFriend(a, b) {

    for (var i = 0; i < b.length; i++) {

        var difference = a[i] - b[i];

        if (difference < 0) {
            difference = difference * -1;
        };

        totalDiff.push(difference);

    }

}

module.exports = function (app) {

    app.get("/api/friends", function (req, res) {
        res.json(friendArray);
    });

    app.post("/api/friends", function (req, res) {

        var sum = [];
        var slice1 = 0;
        var slice2 = 10;

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        var newScore = req.body.scores.map(function (x) {
            return parseInt(x, 10);
        });

        console.log(newScore);

        for (i = 0; i < friendArray.length; i++) {

            findFriend(newScore, friendArray[i].scores);

            sum.push(totalDiff.slice(slice1, slice2).reduce(reducer));

            slice1+=10;
            slice2+=10;

        };
        console.log(sum);

        var matchNumber = sum.indexOf(Math.min(...sum));
        var match = friendArray[matchNumber]

        console.log(match);

    });

};