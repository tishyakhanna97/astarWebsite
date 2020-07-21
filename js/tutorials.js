'use strict'

function toggleAI() {
    var x = document.getElementById("ai");
    var y = document.getElementById("mpi");

    y.style.display = "none";
    x.style.display = "block";
    document.getElementById("aiButton").className = "btn btn-success btn-lg btn-block";
    document.getElementById("mpiButton").className = "btn btn-danger btn-lg btn-block";

}

function toggleMPI() {
    var x = document.getElementById("mpi");
    var y = document.getElementById("ai");

    y.style.display = "none";
    x.style.display = "block";
    document.getElementById("mpiButton").className = "btn btn-success btn-lg btn-block";
    document.getElementById("aiButton").className = "btn btn-danger btn-lg btn-block";



}