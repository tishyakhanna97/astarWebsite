'use strict'
var finalScript = "";
var largeMem = false;

function loadAIOptions() {
    largeMem = false;

    var aiStuff = document.querySelector("#aiOptions");
    aiStuff.style.display = "block";
    aiStuff.scrollIntoView({behavior: 'smooth'});
    console.log("AI Options loaded");
}

function loadGeneralOptions() {
    largeMem = false;

    var generalStuff = document.querySelector("#generalOptions");
    generalStuff.style.display = "block";
    generalStuff.scrollIntoView({behavior: 'smooth'});
    console.log("General Options loaded");
}

function loadGeneralOptionsLM() {
    largeMem = true;
    var generalStuff = document.querySelector("#generalOptions");
    generalStuff.style.display = "block";
    generalStuff.scrollIntoView({behavior: 'smooth'});
    console.log("General Options loaded");
}

function yesNoCheckOutput() {
    if (document.getElementById('yesOutputName').checked) {
        document.getElementById('outputNameInput').style.visibility = 'visible';
    } else {
        document.getElementById('outputNameInput').style.visibility = 'hidden';
    }
}

function genGenScript(typeOfProgram) {
    var nameOfProg = document.getElementById("progNameGen").value;
    console.log(typeOfProgram);

    var q = "normal";
    if(largeMem) {
        q = "largeMem";
    }
    var variables = {queue:q, 
        numberOfNodes:"1",
        memory:"1", 
        hours:"0", 
        minutes:"10", 
        seconds:"0",
        name:nameOfProg,
        progType:typeOfProgram};
    finalScript = writeScriptGen(variables);
}





function writeScriptGen(input) {
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
    var output = pbsDirective.concat("j ","oe",newLine);

    var directory = directory = "cd ${PBS_O_WORKDIR}\n"


    var projectID = pbsDirective.concat("P ", "Personal",newLine,newLine);
    var commands = "";
    if(input.progType == "java") {
        var compileJava = "javac".concat(" ",input.name,newLine);
        var runJava = "java".concat(" ",input.name.slice(0,-5),newLine);
        commands = compileJava.concat(runJava);
    } else {
        commands = "python ".concat(input.name,newLine);
    }

    return bashDirective.concat(queue,cores,wallTime,nameOfProject,output,projectID,directory,commands);
}





function genAIScript(typeOfProgram) {
    var nameOfProg = document.getElementById("progNameAI").value;
    var variables = {queue:"gpu", 
        numberOfNodes:"1",
        memory:"1", 
        hours:"0", 
        minutes:"10", 
        seconds:"0",
        name:nameOfProg,
        progType:typeOfProgram};
    finalScript = writeScriptAI(variables);

}

function writeScriptAI(input) {
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
    var output = pbsDirective.concat("j ","oe",newLine);

    var directory = directory = "cd ${PBS_O_WORKDIR}\n"


    var projectID = pbsDirective.concat("P ", "Personal",newLine,newLine);
    var module = "module load".concat(" ",input.progType,newLine);
    var commands = "python ".concat(input.name,newLine);


    return bashDirective.concat(queue,cores,wallTime,nameOfProject,output,projectID,directory,module,commands);
}






function printScript() {
    var outputContainer = document.querySelector("#thisThing");
    outputContainer.style.display = "block";
    document.getElementById("outputScript").innerHTML= finalScript;
    outputContainer.scrollIntoView({behavior: 'smooth'});
    console.log("script loaded");
    largeMem = false;
}