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

    // When the user posts, it turns the New Profile scores into integers. Then it subtracts each number, in sets of tens, in the arrays and pushes the difference into another array, sum. Afterwards, it finds the index of the smallest number in SUM and compares it to the indices in the friendArray and finds the profile match.

    app.post("/api/friends", function (req, res) {

        var sum = [];
        var slice1 = 0;
        var slice2 = 10;

        const reducer = (accumulator, currentValue) => accumulator + currentValue;

        var newScore = req.body.scores.map(function (x) {
            return parseInt(x, 10);
        });

        for (i = 0; i < friendArray.length; i++) {

            findFriend(newScore, friendArray[i].scores);

            sum.push(totalDiff.slice(slice1, slice2).reduce(reducer));

            slice1 += 10;
            slice2 += 10;

        };

        var matchNumber = sum.indexOf(Math.min(...sum));
        var match = friendArray[matchNumber]

        console.log("\n" + "This is your profile score: " + newScore + "\n");
        console.log("This is the sum of all the differences: " + sum + "\n");
        console.log("This is the index of the smallest number from above ^^^: " + matchNumber + "\n");
        console.log(match);
        res.send({ name: match.name, photo: match.photo })

        //This resets the parameters.
        sum = [];
        totalDiff = [];
        slice1 = 0;
        slice2 = 10;

    });

};