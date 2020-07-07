'use strict'

function validateInput() {
    var queue = document.input.queue.value;
    var nodesNumber = document.input.nodes.value;
    var hours = document.input.hours.value;
    var minutes = document.input.minutes.value;
    var seconds = document.input.seconds.value;
    var nameOfProject = document.input.nameP.value;
    var directory = document.input.directory.value;
    var output = document.input.output.value;
    if (queue == "") {
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
        var variables = {queue:queue, numberOfNodes:nodesNumber, hours:hours, minutes:minutes, seconds:seconds,name:nameOfProject,directory:directory,output:output};
        return variables;
    }
}

function writeScript(input) {
    var bashDirective = "# !/bin/bash\n\n";
    var pbsDirective = "#PBS -";
    var newLine = "\n";
    var queue = pbsDirective.concat("q ",input.queue,newLine);
    var cores = pbsDirective.concat("l ",
        "select=",
        input.numberOfNodes,
        ":ncpus=24:mem=1G",
        newLine);

    var wallTime = pbsDirective.concat("l ",
        "walltime=",
        (input.hours).padStart(2,'0'),
        ":",
        (input.minutes).padStart(2,'0'),
        ":",
        (input.seconds).padStart(2,'0'),
        newLine);
    
    var nameOfProject = pbsDirective.concat("N ",input.name,newLine);
    var output = "";
    if(input.output == "yes") {
        output=pbsDirective.concat("j ","oe",newLine);

    }
    var directory = "";
    if(input.directory == "yes") {
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

function yesNoCheck() {
    if (document.getElementById('yesProject').checked) {
        document.getElementById('pid').style.visibility = 'visible';
    } else {
        document.getElementById('pid').style.visibility = 'hidden';
    }
}
function yesNoCheckOutput() {
    if (document.getElementById('yesOutputName').checked) {
        document.getElementById('outputNameInput').style.visibility = 'visible';
    } else {
        document.getElementById('outputNameInput').style.visibility = 'hidden';
    }
}