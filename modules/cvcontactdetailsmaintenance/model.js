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
export const txtCVC_Address1 = document.getElementById("txtCVC_Address1");
export const lblCVC_Address1 = document.getElementById("lblCVC_Address1");
export const txtCVC_Address2 = document.getElementById("txtCVC_Address2");
export const lblCVC_Address2 = document.getElementById("lblCVC_Address2");
export const txtCVC_Address3 = document.getElementById("txtCVC_Address3");
export const lblCVC_Address3 = document.getElementById("lblCVC_Address3");
export const txtCVC_TownCity = document.getElementById("txtCVC_TownCity");
export const lblCVC_TownCity = document.getElementById("lblCVC_TownCity");
export const txtCVC_Postcode = document.getElementById("txtCVC_Postcode");
export const lblCVC_Postcode = document.getElementById("lblCVC_Postcode");
export const txtCVC_LandLine = document.getElementById("txtCVC_Landline");
export const lblCVC_LandLine = document.getElementById("lblCVC_Landline");
export const txtCVC_CellPhone = document.getElementById("txtCVC_CellPhone");
export const lblCVC_CellPhone = document.getElementById("lblCVC_CellPhone");
export const txtCVC_Email = document.getElementById("txtCVC_Email");
export const lblCVC_Email = document.getElementById("lblCVC_Email");
export const txtHidden = document.getElementById("txtHidden");

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTable;
//new record
let blnNew = false;

//event handlers
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
        "txtCVC_Name",
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

export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

   Creates combobox items from db

   fields:

   autonumber - hidden
   next primary key

  */
  let elFirst;

  function funcCreateItems() {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(
      modSchema.constCV_Contact,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constCV_Contact);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value.CVC_Address1;
        cmbID.appendChild(elTemp);
        curTemp.continue();
      }
    };
  }

  //first clear any existing items
  if (cmbID.length > 0) {
    while (cmbID.length > 0) {
      cmbID.remove(cmbID.length - 1);
    }
  }
  // create first item
  elFirst = document.createElement("option");
  elFirst.value = "none";
  elFirst.innerText = "Select ID";
  cmbID.appendChild(elFirst);
  //populate from db
  funcCreateItems();
}
const funcSaveData = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/
  let dbUpdate;
  //check all required fields filled
  const aryErrors1 = modSchema.funcValidateForm(
    document.getElementsByTagName("textarea"),
    modSchema.constCV_Contact
  );
  const aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constCV_Contact
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
      "txtCVC_Name",
      document.getElementsByTagName("html")
    );
    return;
  }

  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constCV_Contact,
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

  const objTemp = dbRequest.objectStore(modSchema.constCV_Contact);

  if (blnNew) {
    dbUpdate = objTemp.add({
      CVC_Address1: txtCVC_Address1.value,
      CVC_Address2: txtCVC_Address2.value,
      CVC_Address3: txtCVC_Address3.value,
      CVC_TownCity: txtCVC_TownCity.value,
      CVC_Postcode: txtCVC_Postcode.value,
      CVC_LandLine: txtCVC_LandLine.value,
      CVC_CellPhone: txtCVC_CellPhone.value,
      CVC_Email: txtCVC_Email.value,
    });

    dbUpdate.onsuccess = (event) => {
      //reset new indicator
      blnNew = false;
      //clear form
      funcResetForm();
      //reload combobox with new values
      funcPopulateCombobox();
      objTable.aryFields[0].fieldValue = cmbID.value;
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
  } else {
    //update data
    //find record by key: cmbID.value
    //Note: have to convert to number as get() does not convert string!
    const dbQuery = objTemp.get(Number(cmbID.value));

    dbQuery.onsuccess = () => {
      const dbData = dbQuery.result;

      //edit
      dbData.CVC_Address1 = txtCVC_Address1.value;
      dbData.CVC_Address2 = txtCVC_Address2.value;
      dbData.CVC_Address3 = txtCVC_Address3.value;
      dbData.CVC_TownCity = txtCVC_TownCity.value;
      dbData.CVC_Postcode = txtCVC_Postcode.value;
      dbData.CVC_LandLine = txtCVC_LandLine.value;
      dbData.CVC_CellPhone = txtCVC_CellPhone.value;
      dbData.CVC_Email = txtCVC_Email.value;

      //update
      const dbUpdate = objTemp.put(dbData);

      dbUpdate.onsuccess = () => {
        blnNew = false;
        funcPopulateCombobox();
        //clear form
        funcResetForm();
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
          "Error Updating Record",
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
  }
};
const funcbtnSaveClick = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   checks if anything changes if not returns
   else saves

*/
  //check all required fields filled
  const aryErrors = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constCV_Contact
  );

  //see if returned errors object is empty
  if (!aryErrors) {
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

  if (!blnNew) {
    if (objTable.aryFields[0].fieldValue) {
      funcSaveData();
    }
  } else {
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
    //restore from objTable
    cmbID.value = objTable.aryFields[0].fieldValue;
    txtCVC_Address1.value = objTable.aryFields[1].fieldValue;
    txtCVC_Address2.value = objTable.aryFields[2].fieldValue;
    txtCVC_Address3.value = objTable.aryFields[3].fieldValue;
    txtCVC_TownCity.value = objTable.aryFields[4].fieldValue;
    txtCVC_LandLine.value = objTable.aryFields[5].fieldValue;
    txtCVC_CellPhone.value = objTable.aryFields[6].fieldValue;
    txtCVC_Email.value = objTable.aryFields[7].fieldValue;
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

export function funcDeleteRecord() {
  /*
   proceses delete

*/
  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constCV_Contact,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constCV_Contact);

  let dbQuery = objTemp.delete(Number(cmbID.value));

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

    //update combobox
    funcPopulateCombobox();
    //clear form
    funcResetForm();
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

const funcResetForm = () => {
  /*
 Created 20/01/2025 By Roger Williams
 
 Resets the form
*/

  txtCVC_Address1.value = "";
  txtCVC_Address2.value = "";
  txtCVC_Address3.value = "";
  txtCVC_TownCity.value = "";
  txtCVC_Postcode.value = "";
  txtCVC_LandLine.value = "";
  txtCVC_CellPhone.value = "";
  txtCVC_Email.value = "";
  txtCVC_Address1.focus();
};
const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtCVC_Addrress1.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "txtCVC_Addrress1",
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
      funcDeleteRecord();
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
  objTable = modSchema.funcGetSchema(modSchema.constCV_Contact);
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
  // objData = modSchema.funcGetFirstRecord(modSchema.constCV_Contact);
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  txtCVC_Address1.addEventListener("keydown", functextboxKeyDown);
  txtCVC_Address2.addEventListener("keydown", functextboxKeyDown);
  txtCVC_Address3.addEventListener("keydown", functextboxKeyDown);
  txtCVC_TownCity.addEventListener("keydown", functextboxKeyDown);
  txtCVC_Postcode.addEventListener("keydown", functextboxKeyDown);
  txtCVC_LandLine.addEventListener("keydown", functextboxKeyDown);
  txtCVC_CellPhone.addEventListener("keydown", functextboxKeyDown);
  txtCVC_Email.addEventListener("keydown", functextboxKeyDown);

  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
  btnNew.addEventListener("click", funcbtnNewClick);
}
