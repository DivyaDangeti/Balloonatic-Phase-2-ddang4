"use strict";
/* Execute the function to run and display the countdown clock */
runClock();
setInterval("runClock()", 1000);

/* Function to create and run the countdown clock */
function runClock() {
    /* Store the current date and time */
    var currentDay = new Date();
    var dateStr = currentDay.toLocaleDateString();
    var timeStr = currentDay.toLocaleTimeString();

    /* Display the current date and time */
    document.getElementById("dateNow").innerText = dateStr + " " + timeStr;

}