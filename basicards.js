var fs = require("fs");

var BasicCard = function(front, back) {
    this.front = front,
        this.back = back,
        this.push = function() {
            fs.appendFile("logBasic.txt","\nfront: "+this.front+" back: "+this.back+"~" , function(err) {

                if (err) {
                    console.log(err);
                }

                console.log("File saved!");

            });
        }
};

module.exports = BasicCard;