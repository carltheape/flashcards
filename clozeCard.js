var fs = require("fs");

var ClozeCard = function(text, cloze){

		if (!text.includes(cloze)) {
		console.log('cloze does not exist in question: ' + cloze );
		return;
	}

	this.cloze = cloze,
	this.partial = text.replace(cloze, "_______"),
	this.fullText = text,
	this.push = function(){
		            fs.appendFile("logCloze.txt","\nquestion: "+this.partial+" answer: "+this.cloze+" ~" , function(err) {

                if (err) {
                    console.log(err);
                }

                console.log("File saved!");

            });
        }
	};



module.exports = ClozeCard;
// console.log(q1.partial);

// var q2 = new ClozeCard("George was a Beatle", "Paul");