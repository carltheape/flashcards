var fs = require("fs");

var ClozeCard = function(text, cloze){

		if (!text.includes(cloze)) {
		console.log('cloze does not exist in question: ' + cloze )
		toDo();
	}

	this.cloze = cloze,
	this.partial = text.replace(cloze, "_______"),
	this.fullText = text,
	this.push = function(){
		            fs.appendFile("logCloze.txt",this.partial+"\n"+this.cloze+"\n", function(err) {

                if (err) {
                    console.log(err);
                }

                // console.log("\nFile saved!");

            });
        }
	};



module.exports = ClozeCard;
// console.log(q1.partial);

// var q2 = new ClozeCard("George was a Beatle", "Paul");