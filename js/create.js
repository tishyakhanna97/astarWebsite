'use strict'

function validateInput() {
    var email = document.input.uemail.value;
    var queue = document.input.queue.value;
    var nodesNumber = document.input.nodes.value;
    var hours = document.input.hours.value;
    var minutes = document.input.minutes.value;
    var seconds = document.input.seconds.value;
    var nameOfProject = document.input.nameP.value;
    var directory = document.input.directory.value;
    var output = document.input.output.value;
    if(email == "" || (!email.includes("@"))) {
        return false;
    } else if (queue == "") {
        return false;
    } else if (isNaN(nodesNumber) || nodesNumber < 1 || nodesNumber > 24) {
        return false;
    } else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        return false;
    } else if (nameOfProject == "") {
        return false;
    } else {
        console.log("No errors");
        console.log(directory);
        console.log(output);
        return [email,
                queue,
                nodesNumber,
                hours,
                minutes,
                seconds,
                nameOfProject,
                directory,
                output];
    }
}

function writeScript(inputArray) {
    var bashDirective = "# !/bin/bash\n\n";
    var pbsDirective = "#PBS -";
    var newLine = "\n";
    var queue = pbsDirective.concat("q ",inputArray[1],newLine);
    var cores = pbsDirective.concat("l ",
        "select=",
        inputArray[2],
        ":ncpus=24:mem=1G",
        newLine);

    var wallTime = pbsDirective.concat("l ",
        "walltime=",
        inputArray[3].padStart(2,'0'),
        ":",
        inputArray[4].padStart(2,'0'),
        ":",
        inputArray[5].padStart(2,'0'),
        newLine);
    
    var nameOfProject = pbsDirective.concat("N ",inputArray[6],newLine);
    var output = "";
    if(inputArray[8] == "yes") {
        output=pbsDirective.concat("j ","oe",newLine);

    }
    var directory = "";
    if(inputArray[7] == "yes") {
        directory = "cd ${PBS_O_WORKDIR}\n"
    }

    return bashDirective.concat(queue,cores,wallTime,nameOfProject,output,directory);
}

function getScript() {
    document.getElementById("outputScript").innerHTML= "";
    var variables = validateInput();
    if(variables == false) {
        return alert("Missing information!");
    }
    var finalString = writeScript(variables);
    document.getElementById("outputScript").innerHTML= finalString;
}

