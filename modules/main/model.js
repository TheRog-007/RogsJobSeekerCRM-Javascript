"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modTab from "../tab.js";

//local

//db var
const txtHidden = document.getElementById("txtHidden");
const btnClose = document.getElementById("btnClose");
const cmbMaintenance = document.getElementById("cmbMaintenance");
const cmbMainScreens = document.getElementById("cmbMainScreens");
const cmbReports = document.getElementById("cmbReports");

/*
  event handler for "hidden" textbox whoes focus event tells the 
  program a messagebox button has been clicked so modMessageBox.blnOk
  can be checked to see the result
*/
const funcHiddenTextBoxHandler = (event) => {
  let elTemp;
  //"restore" page
  elTemp = document.getElementsByTagName("html");
  elTemp[0].style.opacity = "1";
  //show which button clicked true = ok false = cancel
  if (modMessageBox.blnOk) {
    if (modMessageBox.strContext === "close") {
      window.close();
    }
  }
};

const funcCreateTab = (strPage) => {
  /*
    Creates tab for menu item to open

    To create title strips strpage of .html then replaces
    _ with space

    
  */

  let strChoice = strPage;
  //strip /screens/
  strChoice = strChoice.substring(9, strChoice.length);
  //strip .html
  strChoice = strChoice.substring(0, strChoice.indexOf("."));
  //replace _ with space Note: .replace only replaces FIRST occurrance
  //hence using split/join to replace ALL
  strChoice = strChoice.split("_").join(" ");
  modTab.funcAddTab(strChoice, strPage);
};

const funcCloseClick = (event) => {
  btnClose.preventDefault();
  modMessageBox.funcMessageBox(
    "Close Application?",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "close",
    2,
    "btnClose"
  );
};

const funccmbMaintenanceClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    funcCreateTab(event.target.value);
    cmbMaintenance.value = "none";
  }
};
const funccmbMainScreensClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    funcCreateTab(event.target.value);
    cmbMainScreens.value = "none";
  }
};
const funccmbReportsClick = (event) => {
  /*
   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    funcCreateTab(event.target.value);
    cmbReports.value = "none";
  }
};

export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

function funcDeleteDB_Click() {
  modSchema.funcDeleteDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the comboboxes and close buttons
   
  */

  cmbMaintenance.addEventListener("click", funccmbMaintenanceClick);
  cmbMainScreens.addEventListener("click", funccmbMainScreensClick);
  cmbReports.addEventListener("click", funccmbReportsClick);
  btnClose.addEventListener("click", funcCloseClick);

  //temp handlers
  document
    .getElementById("btnDeleteDB")
    .addEventListener("click", funcDeleteDB_Click);
}
