'use strict'

function validateInput() {
    var queue = document.input.queue.value;
    var nodesNumber = document.input.nodes.value;
    var memory = document.input.memory.value;
    var hours = document.input.hours.value;
    var minutes = document.input.minutes.value;
    var seconds = document.input.seconds.value;
    var nameOfProject = document.input.nameP.value;
    var directory = document.input.directory.value;
    var output = document.input.output.value;
    var pidCheck = document.input.project.value;
    var outputNameCheck = document.input.outputName.value;
    var module = document.input.module.value;
    if (queue == "") {
        console.log("Missing Queue Information");
        return false;
    } else if (isNaN(nodesNumber) || nodesNumber < 1 || nodesNumber > 2) {
        console.log("Missing number of nodes");
        return false;
    } else if (isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        console.log("Missing time input");
        return false;
    } else if (nameOfProject == "") {
        console.log("Missing project name");
        return false;
    } else if (isNaN(memory) || memory <= 0) {
        console.log("Memory issue");
        return false;
    } else {
        console.log("No errors");
        var pid = "Personal";
        if(pidCheck == "yes") {
            pid = document.input.projectID.value;
        }
        var outputName = "";
        if(outputNameCheck == "yes") {
            outputName = document.input.outputNameInput.value;
        }
        var variables = {queue:queue, 
                         numberOfNodes:nodesNumber,
                         memory:memory, 
                         hours:hours, 
                         minutes:minutes, 
                         seconds:seconds,
                         name:nameOfProject,
                         directory:directory,
                         output:output,
                         outputName:outputName,
                         pid:pid,
                         module:module};
        return variables;
    }
}

function writeScript(input) {
    var bashDirective = "# !/bin/bash\n";
    var pbsDirective = "#PBS -";
    var newLine = "\n";
    var queue = pbsDirective.concat("q ",input.queue,newLine);
    var cores = pbsDirective.concat("l ",
        "select=",
        input.numberOfNodes,
        ":ncpus=24:mem=",
        input.memory,
        "G",
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

    var outputName = "";
    if(input.outputName != "") {
        outputName = pbsDirective.concat("o ", input.outputName,newLine);
    }

    var projectID = pbsDirective.concat("P ", input.pid,newLine,newLine);

    var modules = "";
    if(input.module != "no") {
        modules.concat("module load ",input.module,newLine);
    }

    return bashDirective.concat(queue,cores,wallTime,nameOfProject,output,outputName,projectID,directory,modules);
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

function testScript() {
    document.input.queue.value = "normal";
    document.input.nodes.value = "1";
    document.input.memory.value = "1";
    document.input.hours.value = "0";
    document.input.minutes.value = "10";
    document.input.seconds.value = "0";
    document.input.nameP.value = "Test";
    document.input.directory.value = "yes";
    document.input.output.value = "yes";
    document.input.projectID.value = "";
    document.input.outputNameInput.value = "output.txt";
    document.input.module.value = "tensorflow/1.4";
    var variables = {queue:"normal", 
        numberOfNodes:"1",
        memory:"1", 
        hours:"0", 
        minutes:"10", 
        seconds:"0",
        name:"Test",
        directory:"yes",
        output:"yes",
        outputName:"output.txt",
        pid:"",
        module:"tensorflow/1.4"};
    var script = writeScript(variables);
    document.getElementById("outputScript").innerHTML= script;
}

function clearForm() {
    document.getElementById("outputScript").innerHTML= "";

}