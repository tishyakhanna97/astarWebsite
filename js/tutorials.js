'use strict'

function toggleAI() {
    var x = document.getElementById("ai");
    var y = document.getElementById("mpi");


    if (x.style.display === "none") {
        y.style.display = "none";
        x.style.display = "block";
    } else {
        x.style.display="none";
        y.style.display = "block";

    }
}

function toggleMPI() {
    var x = document.getElementById("mpi");
    var y = document.getElementById("ai");

    if (x.style.display === "none") {
        y.style.display = "none";
        x.style.display = "block";
    } else {
        x.style.display="none";
        y.style.display = "block";
    }
}