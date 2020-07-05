'use strict'

function validateInput() {
    var email = document.input.uemail.value;
    var queue = document.input.queue.value;
    var nodesNumber = document.input.nodes.value;
    var hours = document.input.hours.value;
    var minutes = document.input.minutes.value;
    var seconds = document.input.seconds.value;
    var nameOfProject = document.input.nameP.value;
    var yesDirectory = document.input.nodes.value;
    var noDirectory = document.input.nodes.value;
    var yesOutput = document.input.nodes.value;
    var noOutput = document.input.nodes.value;
    var emptyField = ""
    var corrupt = false;
    if(email == "" || (!email.includes("@"))) {
        corrupt = true;
        emptyField = " email";
    } else if (queue == "") {
        corrupt = true;
        emptyField = " queue";
    } else if (isNaN(nodesNumber) || nodesNumber < 1 || nodesNumber > 24) {
        corrupt = true;
        emptyField = " number of nodes";
    } else {
        console.log("No errors");
    }

    if(corrupt) {
        finalString = "You left the" + emptyField + " field empty";
        return alert(finalString);
    } else {
        return [email,
                queue,
                nodesNumber,
                hours,
                minutes,
                seconds,
                nameOfProject,
                yesDirectory,
                noDirectory,
                yesOutput,
                noOutput];
    }
}

function test() {
    var variables = validateInput();
    var finalString = writeScript(variables);
    return alert(finalString);
}

function writeScript(inputArray) {
    var bashDirective = "# !/bin/bash\n";
    var pbsDirective = "PBS -";
    var newLine = "\n";
    var queue = pbsDirective.concat("q ",inputArray[1],newLine);
    var cores = pbsDirective.concat("l ",
        "select=",
        inputArray[2],
        ":ncpus=24:mem=1G",
        newLine);

    var wallTime = pbsDirective.concat("l ",
        "walltime=",
        inputArray[3],
        ":",
        inputArray[4],
        ":",
        inputArray[5],
        newLine);
    
    var nameOfProject = pbsDirective.concat("N ",inputArray[6],newLine);
    return bashDirective.concat(queue,cores,wallTime,nameOfProject);
}