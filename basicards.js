var fs = require("fs");

var BasicCard = function(front, back) {
    this.front = front,
        this.back = back,
        this.push = function() {
            fs.appendFile("logBasic.txt",this.front+"\n"+this.back+"\n" , function(err) {

                if (err) {
                    console.log(err);
                }

                // console.log("\nFile saved!");

            });
        }
};

module.exports = BasicCard;