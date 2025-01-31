"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modView from "./view.js";

/*
  Created 08/01/2025 By Roger Williams

  Data handling/events etc.

  
*/
//export vars
export const cmbID = document.getElementById("cmbID");
export const btnSave = document.getElementById("btnSave");
//Note: due to unfixable bug btnNew is called btnNew2
export const btnNew = document.getElementById("btnNew");
export const btnUndo = document.getElementById("btnUndo");
export const btnDelete = document.getElementById("btnDelete");

export const btnNewResponsibility = document.getElementById(
  "btnNewResponsibility"
);
export const btnSaveResponsibility = document.getElementById(
  "btnSaveResponsibility"
);
export const btnDeleteResponsibility = document.getElementById(
  "btnDeleteResponsibility"
);
export const btnClearResponsibility = document.getElementById("btnClear");

export const txtCVR_Name = document.getElementById("txtCVR_Name");
export const lblCVR_Name = document.getElementById("lblCVR_Name");
export const txtCVRR_Name = document.getElementById("txtCVRR_Name");
export const lblCVRR_Name = document.getElementById("lblCVRR_Name");
export const txtCVRR_Details = document.getElementById("txtCVRR_Details");
export const lblCVRR_Details = document.getElementById("lblCVRR_Details");
//table
export const divTableheaders = document.getElementById("divTableHeader");
export const divTableResponsibilities = document.getElementById(
  "divTableResponsibilities"
);
export const txtHidden = document.getElementById("txtHidden");
//local

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTable;
//selected row
export let intSelectedRow = -1;
//new record
let blnNew = false;

//event handlers
export function funcSelectButtonClick(event) {
  /*
    Created 27/01/2025 By Roger Williams

    handles address list click
  */
  let elTemp;
  let intNum = 0;
  let strTemp = event.target.id;
  //get row number
  intNum = strTemp.replace(/[^0-9]/g, "");
  //get row div container
  elTemp = document.getElementById("divResponsibilitiesRowContainer" + intNum);
  //clear any existing address data
  funcbtnClearResponsibilityClick();
  //set global selected row indicator
  intSelectedRow = intNum;
  //populate text boxes
  txtCVRR_Name.value = elTemp.childNodes[2].innerText;
  txtCVRR_Details.value = elTemp.childNodes[3].innerText;
}
const funccmbIDSelect = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    if (blnNew) {
      modMessageBox.funcMessageBox(
        "Record Not Saved, Save?",
        modMessageBox.objIcons.exclamation,
        modMessageBox.objButtons.yes,
        modMessageBox.objButtons.no,
        "load",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    } else {
      modView.funcLoadData();
    }
  }
};

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

export const funcClearCombobox = (cmbWhat) => {
  /*
  Created 23/01/2025 By Roger Williams

  clears passed combobox
 */
  if (cmbWhat.length > 0) {
    while (cmbWhat.length > 0) {
      cmbWhat.remove(cmbWhat.length - 1);
    }
  }
};
export function funcPopulateCombobox() {
  /*
     Created 09/01/2025 By Roger Williams
  
     Creates combobox items from db
  
     Note: because it is a many - many relationship filter
          duplicate values BEFORE adding to combos
  
    */
  let elFirst;
  let strTemp = "";

  function funcCreateItems() {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(
      modSchema.constCV_Responsibilites,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constCV_Responsibilites);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        if (strTemp !== curTemp.value.CVR_Name) {
          elTemp = document.createElement("option");
          elTemp.value = curTemp.key;
          elTemp.innerText = curTemp.value.CVR_Name;
          cmbID.appendChild(elTemp);
          curTemp.continue();
        }

        if (strTemp !== curTemp.value.CVR_Name) {
          strTemp = curTemp.value.CVR_Name;
        }
      }
    };
  }

  //first clear any existing items
  funcClearCombobox(cmbID);
  // create first item
  // <option value="none" selected disabled hidden>Select ID</option>
  elFirst = document.createElement("option");
  elFirst.value = "none";
  elFirst.innerText = "Select ID";
  cmbID.appendChild(elFirst);
  //populate from db
  funcCreateItems();
}

const funcbtnSaveResponsibilityClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

    saves new data IF not already in list
    Note: not saved to DB ONLY list!
  */
  let intFound = 0;
  let aryErrors1;
  let aryErrors2;

  function funcExists() {
    /*
    Created 22/01/2025 By Roger Williams

    sees if data to add already exists
    specifically the company name

    returns false if not found else row number
   
  */

    let elTemp;
    let intNum = 0;
    let strTemp = "";
    let aryTemp = [];

    aryTemp = document.getElementsByClassName("clhResponsibilityRowContainer");

    for (intNum = 0; intNum < aryTemp.length; intNum++) {
      elTemp = aryTemp[intNum];
      strTemp = elTemp.childNodes[2].innerText;

      if (strTemp === txtCVRR_Name.value) {
        return ++intNum;
      }
    }

    return false;
  }

  //check required fields completed
  aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constCV_Responsibilites
  );
  aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constCV_Responsibilites
  );

  //see if returned errors object is empty
  if (aryErrors1.length > 0 || aryErrors2.length > 0) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "txtCVRR_Name",
      document.getElementsByTagName("html")
    );
    return;
  }

  //if exists update
  intFound = funcExists();
  //make sure not already in name list
  if (intFound) {
    modView.funcUpdateTableRow(intFound);
  } else {
    //add new row
    modView.funcCreateTableRow(true);
  }
};

export const funcbtnClearResponsibilityClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

  */

  txtCVRR_Name.value = "";
  txtCVRR_Details.value = "";
  txtCVRR_Name.focus();
};
const funcbtnDeleteResponsibilityClick = () => {
  /*
      Created 22/01/2025 By Roger Williams
  
      Deletes the selected item from the list and clears the
      details list 
    */

  let elTemp;

  //get row div container
  elTemp = document.getElementById(
    "divResponsibilityRowContainer" + intSelectedRow
  );
  //delete it
  divTableResponsibilities.removeChild(elTemp);
  //renumber the buttons to reflect actual rows
  modView.funcRenumberRowsResetPositions();
  funcbtnClearResponsibilityClick();
};

const funcbtnNewResponsibilityClick = () => {
  /*
    Created 22/01/2025 By Roger Williams

  */

  funcbtnClearResponsibilityClick();
};

export function funcDeleteRecord(blnSilent = false) {
  /*
   Modified 23/01/2025

   Added parameter: blnSilent

   used when saving an existing record as first deletes matching records 

   proceses delete

   steps:
   - find existing record(s)
   - delete existing record(s)
*/
  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constCV_Responsibilites,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constCV_Responsibilites);
  const idxTemp = objTemp.index("CVR_Name");
  const keyRange = IDBKeyRange.only(txtCVR_Name.value);
  const dbQuery = idxTemp.openCursor(keyRange);

  dbQuery.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbQuery.onsuccess = (event) => {
    //read through data to find the matching record(s)
    const dbCursor = event.target.result;

    if (dbCursor) {
      dbCursor.delete();
      dbCursor.continue();
    }

    if (!blnSilent) {
      //update combobox
      funcPopulateCombobox();
      //clear form
      funcResetForm();
      modMessageBox.funcMessageBox(
        "Record Deleted",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    }
  };
}
const funcbtnDeleteClick = (event) => {
  /*
   asks user if wants to delete
   txtHidden handles response

*/
  modMessageBox.funcMessageBox(
    "Delete Record?",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "delete",
    2,
    "btnNew",
    document.getElementsByTagName("html")
  );
};
const funcSaveData = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
  let dbUpdate;
  let intNum = 0;
  let aryTemp = [];
  let elTemp;

  //check all required fields filled
  const aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constCV_Responsibilites
  );
  const aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constCV_Responsibilites
  );

  //see if returned errors object is empty
  if (!aryErrors1 || !aryErrors2) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "txtCVR_Name",
      document.getElementsByTagName("html")
    );
    return;
  }

  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constCV_Responsibilites,
    "readwrite"
  );
  dbRequest.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Accessing Table",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  const objTemp = dbRequest.objectStore(modSchema.constCV_Responsibilites);

  aryTemp = document.getElementsByClassName("clhResponsibilitiesRowContainer");

  for (intNum = 0; intNum !== aryTemp.length; intNum++) {
    elTemp = aryTemp[intNum];
    dbUpdate = objTemp.add({
      CVR_Name: txtCVR_Name.value,
      CVRR_Name: elTemp.childNodes[2].innerText,
      CVRR_Details: elTemp.childNodes[3].innerText,
    });
  }

  dbUpdate.onsuccess = (event) => {
    //reset new indicator
    blnNew = false;
    //clear form
    funcResetForm();
    //reload combobox with new values
    funcPopulateCombobox();
    modMessageBox.funcMessageBox(
      "Record Saved",
      modMessageBox.objIcons.information,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbUpdate.onerror = (event) => {
    modMessageBox.funcMessageBox(
      "Error Saving Record",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };
};

const funcbtnSaveClick = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   if funcvalidateform returns ok checks if responsibilities 
   combobox has contents if so save

*/
  //check all required fields filled
  const aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Types
  );

  const aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constSeekers_Types
  );

  //see if returned errors object is empty
  if (!aryErrors1 || !aryErrors2) {
    modMessageBox.funcMessageBox(
      "Please Enter Data In All Required Fields",
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
    return;
  }

  if (blnNew) {
    funcSaveData();
  } else {
    //erase existing data THEN save
    funcDeleteRecord(true);
    funcSaveData();
  }
};
export function funcUndoChanges() {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

   if not new record simply populates the form from objTable!

*/
  blnNew = false;

  if (blnNew) {
    //reset form
    funcResetForm();
    blnNew = false;
  } else {
    modView.funcLoadData();
  }
}
const funcbtnUndoClick = (event) => {
  /*
   asks user if wants to undo
   txtHidden handles response

*/
  modMessageBox.funcMessageBox(
    "Undo Changes",
    modMessageBox.objIcons.question,
    modMessageBox.objButtons.yes,
    modMessageBox.objButtons.no,
    "undo",
    2,
    "btnNew",
    document.getElementsByTagName("html")
  );
};

const funcResetForm = () => {
  /*
 Created 20/01/2025 By Roger Williams
 
 Resets the form
*/

  txtCVRR_Name.value = "";
  txtCVRR_Details.value = "";
  txtCVR_Name.value = "";
  modView.funcInitTable();
};
const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtCVR_Name.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "txtCVR_Name",
      document.getElementsByTagName("html")
    );
  } else {
    blnNew = true;
    funcResetForm();
  }
};

//other funcs
export function funcResetblnNew(blnValue = false) {
  /*
   Created 21/01/2025 By Roger Williams

   allows other modules to reset blnNew current modView needs this
   when cmbID is changed to an existing record
  */

  blnNew = blnValue;
}
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
    if (modMessageBox.strContext === "save") {
      funcbtnSaveClick();
    }
    if (modMessageBox.strContext === "load") {
      funcbtnSaveClick();
      //load data into form
      modView.funcLoadData();
    }
    if (modMessageBox.strContext === "new") {
      blnNew = true;
      funcResetForm();
    }
    if (modMessageBox.strContext === "delete") {
      blnNew = false;
      funcDeleteRecord(false);
    }
    if (modMessageBox.strContext === "undo") {
      funcUndoChanges();
    }
  }
  //handle if not blnOk and save is context
  else {
    if (
      modMessageBox.strContext === "save" ||
      modMessageBox.strContext === "new"
    ) {
      blnNew = false;
    }
    if (modMessageBox.strContext === "load") {
      blnNew = false;
      //load data into form
      modView.funcLoadData();
    }
  }
};

function funcOpenDatabase() {
  let dbopenRequest = indexedDB.open(modSchema.constDBName, 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
    modMessageBox.funcMessageBox(
      "Database Created",
      modMessageBox.objIcons.information,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onerror = () => {
    modMessageBox.funcMessageBox(
      `Error Accessing Database ${dbopenRequest.error}`,
      modMessageBox.objIcons.error,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew",
      document.getElementsByTagName("html")
    );
  };

  dbopenRequest.onsuccess = () => {
    dbJobSeekerCRM = dbopenRequest.result;
    //work with database

    dbJobSeekerCRM.onversionchange = () => {
      dbJobSeekerCRM.close();
      modMessageBox.funcMessageBox(
        "Database Version Out of Date Reload Page",
        modMessageBox.objIcons.information,
        modMessageBox.objButtons.ok,
        -1,
        "none",
        1,
        "btnNew",
        document.getElementsByTagName("html")
      );
    };

    //activate "action" buttons
    btnSave.style.display = "block";
    btnUndo.style.display = "block";
    btnDelete.style.display = "block";
    btnNew.style.display = "block";
    //populate combobox
    funcPopulateCombobox();
  };
}

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitSchema() {
  //get schema
  objTable = modSchema.funcGetSchema(modSchema.constCV_Responsibilites);
}
export function funcInitDB() {
  /*
  Created 19/02/2025 By Roger Williams

  gets schema for table
  opens db
  gets first record
 */

  //open db
  dbJobSeekerCRM = funcOpenDatabase();
  // //get first record
  // objData = modSchema.funcGetFirstRecord(modSchema.constCV_Responsibilites);
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  txtCVRR_Name.addEventListener("keydown", functextboxKeyDown);
  txtCVRR_Details.addEventListener("keydown", functextboxKeyDown);
  txtCVR_Name.addEventListener("keydown", functextboxKeyDown);
  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
  btnNew.addEventListener("click", funcbtnNewClick);
  btnClearResponsibility.addEventListener(
    "click",
    funcbtnClearResponsibilityClick
  );
  btnNewResponsibility.addEventListener("click", funcbtnNewResponsibilityClick);
  btnSaveResponsibility.addEventListener(
    "click",
    funcbtnSaveResponsibilityClick
  );
  btnDeleteResponsibility.addEventListener(
    "click",
    funcbtnDeleteResponsibilityClick
  );
}
