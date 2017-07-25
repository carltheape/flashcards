var basicCard = require("./basicards.js");
var clozeCard = require("./clozeCard.js");
var inquirer = require("inquirer");
var fs = require("fs");
var question = 0;
var correct = 0;
var incorrect = 0;
var lastQ = "";

function quiz(file) {
    process.stdout.write('\033c');
    console.log(lastQ);
    fs.readFile("./" + file, "utf8", function(error, data) {

        var dataArr = data.split("\n");
        var arrayLength = dataArr.length;
        if (error) {
            return console.log(error);
        } else if (question <= arrayLength) {
            inquirer.prompt([{
                    type: "input",
                    message: dataArr[question],
                    name: "quiz"
                }

            ]).then(function(inquirerResponse) {
                if (inquirerResponse.quiz.toLowerCase() == dataArr[question + 1].toLowerCase()) {
                    console.log("correct");
                    question = question + 2;
                    correct++;
                    lastQ = "correct";
                    quiz(file);

                } else {
                    console.log("incorrect");
                    question = question + 2;
                    incorrect++;
                    lastQ = "incorrect";
                    quiz(file);

                }

            }).catch(function() {
                console.log("\nright: " + correct + "\nwrong: " + incorrect);
                question = 0;
                correct = 0;
                incorrect = 0;
                lastQ = "";
                toDo()
            });

        }
    })
};

function remove(file) {
    fs.readFile("./" + file, 'utf8', function(error, data) {
        var dataArr = data.split("\n");
        var arrayLength = dataArr.length;

        if (error) {
            return console.log(error);
        } else {
            var qNum = 1;
            for (var i = 0; i < arrayLength; i += 2) {
                console.log("\nQ" + qNum + ": " + dataArr[i] + " A: " + dataArr[i + 1]);
                qNum++;
            }
            inquirer
                .prompt([{
                    type: "input",
                    message: "Which question do you want to delete?",
                    name: "deleter"
                }]).then(function(inquirerResponse) {
                    fs.readFile(file, 'utf8', function(err, data) {
                        if (error) {
                            return console.log(error);
                        }
                        var deleterQ = (inquirerResponse.deleter * 2) - 2;
                        var dataArr = data.split("\n");
                        dataArr.splice(deleterQ, 2);
                        if (deleterQ <= dataArr.length && inquirerResponse.deleter != 0) {
                            process.stdout.write('\033c');
                            console.log("**question deleted**");
                            dataArr = dataArr.toString();
                            dataArr = dataArr.replace(/,/g, "\n");
                            fs.writeFile(file, dataArr);
                            toDo();
                        } else {
                            process.stdout.write('\033c');
                            console.log("**question not found**");
                            toDo()
                        }
                    });

                })

        }
    });
};


function toDo() {

    console.log("------------------------")
    inquirer
        .prompt([{
            type: "list",
            message: "WHAT DO YOU WANT TO DO?",
            choices: ["Make a new basic card", "Make a new cloze card", "Quiz me on the basic cards", "Quiz me on the cloze cards", "Delete a basic card", "Delete a cloze card", "Leave"],
            name: "option"
        }])
        .then(function(inquirerResponse) {
            if (inquirerResponse.option == "Make a new basic card") {
                process.stdout.write('\033c');
                inquirer
                    .prompt([{
                        type: "input",
                        message: "What is your question?",
                        name: "questionBasic"
                    }, {
                        type: "input",
                        message: "What is your answer?",
                        name: "answerBasic"
                    }]).then(function(inquirerResponse) {
                        if (inquirerResponse.questionBasic != "" && inquirerResponse.answerBasic != "") {
                            var q1 = new basicCard(inquirerResponse.questionBasic, inquirerResponse.answerBasic);
                            q1.push();
                            console.log("**saved**")
                            toDo();
                        } else {
                            console.log("**not valid entry**");
                            toDo();
                        }
                    });

            } else if (inquirerResponse.option == "Make a new cloze card") {
                process.stdout.write('\033c');
                inquirer
                    .prompt([{
                        type: "input",
                        message: "What is your statement?",
                        name: "questionCloze"
                    }, {
                        type: "input",
                        message: "What are we leaving out of your statement?",
                        name: "answerCloze"
                    }]).then(function(inquirerResponse) {
                        if (inquirerResponse.questionCloze != "" && inquirerResponse.answerCloze != "") {
                            var q1 = new clozeCard(inquirerResponse.questionCloze, inquirerResponse.answerCloze);
                            q1.push();
                            console.log("**saved**")
                            toDo();
                        } else {
                            console.log("**not valid entry**");
                            toDo();
                        }
                    });
            } else if (inquirerResponse.option == "Quiz me on the basic cards") {
                quiz("logBasic.txt");


            } else if (inquirerResponse.option == "Quiz me on the cloze cards") {
                quiz("logCloze.txt");


            } else if (inquirerResponse.option == "Delete a basic card") {
                remove("logBasic.txt");


            } else if (inquirerResponse.option == "Delete a cloze card") {
                remove("logCloze.txt");

            } else if (inquirerResponse.option == "Leave") {

                process.stdout.write('\033c');

            };
        });
};








toDo();