"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";

/*
  Created 08/01/2025 By Roger Williams

  Data handling/events etc.

  
*/
//export vars
export const cmbID = document.getElementById("cmbID");
export const btnSave = document.getElementById("btnSave");
export const btnNew = document.getElementById("btnNew");
export const btnUndo = document.getElementById("btnUndo");
export const btnDelete = document.getElementById("btnDelete");
export const txtTYP_Type = document.getElementById("txtTYP_Type");
export const lblTYP_Type = document.getElementById("lblTYP_Type");
export const txtHidden = document.getElementById("txtHidden");
//local

//db var
let dbJobSeekerCRM;

//event handlers
const funccmbIDClick = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //show form
    alert(event.target.value);
    cmbID.value = "none";
  }
};

// const funcValidateTextLength = (strValue, intMaxLength) => {
//   /*
//        Created 10/01/2024 By Roger Williams

//        Checks if string passed greater than passed max length

//     */
// };
const functextboxKeyDown = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes textbox changes

   checks if textbox value > maxlength

   if length at max stops any new characters being added

*/
  let elTemp;
  //get text element
  elTemp = document.getElementById(event.target.id);
  console.log(event.target.id);
  console.log(elTemp);
  console.log(event);
  //check if data at max
  if (elTemp.value.length > elTemp.attributes.maxLength - 1) {
    //make sure key pressed is not tab, backspace, delete or left/right cursor move
    //or enter!

    //check if date
    if (elTemp.id.contains("Date")) {
    }
    if (
      event.key !== "ArrowLeft" &&
      event.key !== "ArrowRight" &&
      event.key !== "Backspace" &&
      event.key !== "Delete" &&
      event.key !== "Enter"
    ) {
      event.preventDefault();
    }
  }
};

const funcbtnSaveClick = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
  // const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  // const objTemp = trnTemp.objectStore("Seekers_Types");
  //dont allow submit to work!
  // btnSave.preventDefault();
  let objTemp = modSchema.funcGetFirstRecord("Seekers_Types");

  if (modSchema.funcValidateForm) {
    //save data
  }
};
const funcbtnUndoClick = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

*/

  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
};
const funcbtnDeleteClick = (event) => {
  /*
   proceses delete

*/
  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
};

//other funcs

const funcPopulateCombobox = () => {
  /*
   Created 09/01/2025 By Roger Williams

  fields:

  TYP_ID    - autonumber
  TYP_Type  - string

  */
  const trnTemp = dbJobSeekerCRM.transaction("Seekers_Types", "readonly");
  const objTemp = trnTemp.objectStore("Seekers_Types");
  const qryTemp = objTemp.openCursor();

  qryTemp.onsuccess = (event) => {
    const curTemp = event.target.result;

    if (curTemp) {
      console.log(curTemp.value);

      //curTemp.continue();
    }
  };
};

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

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcOpenDB() {
  /*
  Created 13/01/2025 By Roger Williams

  opens db and stores in local var
*/
  dbJobSeekerCRM = modSchema.funcOpenDatabase();
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("click", funccmbIDClick);
  txtTYP_Type.addEventListener("keydown", functextboxKeyDown);
  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
}
