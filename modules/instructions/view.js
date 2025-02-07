"use strict";
/*
   Created 06/02/2025 By Roger Williams

   Shows the various help information DIVs via a looping timer
   moving the "arrow" to the relevant sections as well

*/
const divArrowLeft = document.getElementById("divArrowLeft");
const divArrowBody = document.getElementById("divArrowBody");
const divData = document.getElementById("divData");
const divReports = document.getElementById("divReports");
const divMain = document.getElementById("divMain");

//arrow top positions for each section
const intTopData = 380;
const intTopReports = 295;
const intTopMain = 210;
let intCycle = 1; //which section to show help for?

const funcTimer = () => {
  /*
   Created 06/02/2025 By Roger Williams

   handles the tinmer event

*/
  if (intCycle > 3) {
    intCycle = 1;
  }

  switch (intCycle) {
    case 1:
      divData.hidden = false;
      divMain.hidden = true;
      divReports.hidden = true;
      divArrowBody.style.top = intTopData + "px";
      divArrowLeft.style.top = intTopData + "px";
      break;
    case 2:
      divData.hidden = true;
      divMain.hidden = false;
      divReports.hidden = true;
      divArrowBody.style.top = intTopMain + "px";
      divArrowLeft.style.top = intTopMain + "px";
      break;
    case 3:
      divData.hidden = true;
      divMain.hidden = true;
      divReports.hidden = false;
      divArrowBody.style.top = intTopReports + "px";
      divArrowLeft.style.top = intTopReports + "px";
      break;
  }

  intCycle++;
};

const funcStart = () => {
  /*
   Created 06/02/2025 By Roger Williams

   starts the "animation" of the instructions text 
*/
  window.setInterval(funcTimer, 12000);
};

funcStart();
