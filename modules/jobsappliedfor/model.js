"use strict";

import * as modSchema from "../schema.js";
import * as modMessageBox from "../messageBox.js";
import * as modView from "./view.js";
import * as modGlobalView from "../GlobalView.js";

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
export const txtHidden = document.getElementById("txtHidden");

export const lblJOB_DateApplied = document.getElementById("lblJOB_DateApplied");
export const dteJOB_DateApplied = document.getElementById("dteJOB_DateApplied");
export const lblJOB_DateExpires = document.getElementById("lblJOB_DateExpires");
export const dteJOB_DateExpires = document.getElementById("dteJOB_DateExpires");
export const txtJOB_Company = document.getElementById("txtJOB_Company");
export const lblJOB_Company = document.getElementById("lblJOB_Company");
export const cmbJOB_Company = document.getElementById("cmbJOB_Company");
export const lblJOB_TownCity = document.getElementById("lblJOB_TownCity");
export const cmbJOB_TownCity = document.getElementById("cmbJOB_TownCity");
export const txtJOB_TownCity = document.getElementById("txtJOB_TownCity");
export const lblJOB_Salary = document.getElementById("lblJOB_Salary");
export const cmbJOB_Salary = document.getElementById("cmbJOB_Salary");
export const txtJOB_Salary = document.getElementById("txtJOB_Salary");
export const lblJOB_Sector = document.getElementById("lblJOB_Sector");
export const cmbJOB_Sector = document.getElementById("cmbJOB_Sector");
export const txtJOB_Sector = document.getElementById("txtJOB_Sector");
export const lblJOB_Title = document.getElementById("lblJOB_Title");
export const txtJOB_Title = document.getElementById("txtJOB_Title");
export const lblJOB_Type = document.getElementById("lblJOB_Type");
export const cmbJOB_Type = document.getElementById("cmbJOB_Type");
export const txtJOB_Type = document.getElementById("txtJOB_Type");
export const lblJOB_Hours = document.getElementById("lblJOB_Hours");
export const cmbJOB_Hours = document.getElementById("cmbJOB_Hours");
export const txtJOB_Hours = document.getElementById("txtJOB_Hours");
export const lblJOB_Where = document.getElementById("lblJOB_Where");
export const cmbJOB_Where = document.getElementById("cmbJOB_Where");
export const txtJOB_Where = document.getElementById("txtJOB_Where");
export const lblJOB_Details = document.getElementById("lblJOB_Details");
export const txtJOB_Details = document.getElementById("txtJOB_Details");
export const lblJOB_PhoneNumber = document.getElementById("lblJOB_PhoneNumber");
export const txtJOB_PhoneNumber = document.getElementById("txtJOB_PhoneNumber");
export const lblJOB_Status = document.getElementById("lblJOB_Status");
export const cmbJOB_Status = document.getElementById("cmbJOB_Status");
export const txtJOB_Status = document.getElementById("txtJOB_Status");
export const lblJOB_ContactName = document.getElementById("lblJOB_ContactName");
export const txtJOB_ContactName = document.getElementById("txtJOB_ContactName");
export const lblJOB_Direct = document.getElementById("lblJOB_Direct");
export const chkJOB_Direct = document.getElementById("chkJOB_Direct");

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
        "txtJOB_Company",
        document.getElementsByTagName("html")
      );
    } else {
      modView.funcLoadData();
    }
  }
};

const funcComboboxSelect = (event) => {
  /*
  Created 30/01/2025 By Roger Williams
  
  when user selects from a combobox change the text control 
  to have text e.g. cmbJOB_Sector.value => txtJOB_Sector
  
*/
  if (event.target.value !== "none") {
    document.getElementById(
      "txt" + event.target.id.substring(3, event.target.id.length)
    ).value = event.target.options[event.target.selectedIndex].text;
    event.target.selectedIndex = 0;
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
      //check?
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
export function funcInitComboboxes() {
  /*
   Created 30/01/2025 By Roger Williams

   Creates combobox items from db

   populates from static list tables:

   Seekers_Hours
   Seekers_Sectors
   Seekers_Status
   Seekers_Types
   Seekers_Where

   populates these combos from Seekers_Jobs data:

   cmbJOB_Company
   cmbJOB_Salary
   cmbJOB_TownCity

  */
  let elFirst;
  let intNum = 0;
  let aryTemp;

  function funcCreateItems(strCombo = "", strTable = "", strField = "") {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(strTable, "readonly");
    const objTemp = trnTemp.objectStore(strTable);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      // create first item = null
      // elFirst = document.createElement("option");
      // elFirst.value = "none";
      // elFirst.innerText = document..getElementById(strCombo).innerText;
      //   .document.getElementById(strCombo)
      //   .appendChild(elFirst);
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value[strField];
        document.getElementById(strCombo).appendChild(elTemp);
        curTemp.continue();
      }
    };
  }

  //first clear any existing items EXCEPT first
  aryTemp = document.getElementsByTagName("select");

  for (intNum = 0; intNum !== aryTemp.length; intNum++) {
    if (aryTemp[intNum].id !== "cmbID") {
      while (aryTemp[intNum].length > 1) {
        aryTemp[intNum].remove(aryTemp[intNum].length - 1);
      }
    }
  }

  intNum = 0;
  //get from static tables
  funcCreateItems("cmbJOB_Hours", modSchema.constSeekers_Hours, "JOB_Hours");
  funcCreateItems(
    "cmbJOB_Sector",
    modSchema.constSeekers_Sectors,
    "JOB_Sector"
  );
  funcCreateItems("cmbJOB_Status", modSchema.constSeekers_Status, "JOB_Status");
  funcCreateItems("cmbJOB_Type", modSchema.constSeekers_Types, "JOB_Type");
  funcCreateItems("cmbJOB_Where", modSchema.constSeekers_Where, "JOB_Where");
  //get fropm jobs table
  funcCreateItems("cmbJOB_Company", modSchema.constSeekers_Jobs, "JOB_Company");
  funcCreateItems("cmbJOB_Salary", modSchema.constSeekers_Jobs, "JOB_Salary");
  funcCreateItems("cmbJOB_Sector", modSchema.constSeekers_Jobs, "JOB_Sector");
  funcCreateItems(
    "cmbJOB_TownCity",
    modSchema.constSeekers_Jobs,
    "JOB_TownCity"
  );
}

export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

   Creates combobox items from db

   fields:

   autonumber - hidden
   next primary key

  */
  let elFirst;
  let intNum = 0;

  function funcCreateItems() {
    //Creates combobox items from db
    let elTemp;
    const trnTemp = dbJobSeekerCRM.transaction(
      modSchema.constSeekers_Jobs,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constSeekers_Jobs);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value.JOB_Company;
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
  // <option value="none" selected disabled hidden>
  //   Select ID
  // </option>;
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
    modSchema.constSeekers_Jobs
  );
  const aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Jobs
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
      "btnNew",
      document.getElementsByTagName("html")
    );
    return;
  }

  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Jobs,
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

  const objTemp = dbRequest.objectStore(modSchema.constSeekers_Jobs);

  if (blnNew) {
    dbUpdate = objTemp.add({
      JOB_Title: txtJOB_Title.value,
      JOB_Details: txtJOB_Details.value,
      JOB_DateApplied: dteJOB_DateApplied.value,
      JOB_DateExpires: dteJOB_DateExpires.value,
      JOB_Status: txtJOB_Status.value,
      JOB_PhoneNumber: txtJOB_PhoneNumber.value,
      JOB_ContactName: txtJOB_ContactName.value,
      JOB_Direct: chkJOB_Direct.value,
      JOB_Company: txtJOB_Company.value,
      JOB_Salary: txtJOB_Salary.value,
      JOB_TownCity: txtJOB_TownCity.value,
      JOB_Sector: txtJOB_Sector.value,
      JOB_Type: txtJOB_Type.value,
      JOB_Hours: txtJOB_Hours.value,
      JOB_Where: txtJOB_Where.value,
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
      dbData.JOB_Title = txtJOB_Title.value;
      dbData.JOB_Details = txtJOB_Details.value;
      dbData.JOB_DateApplied = dteJOB_DateApplied.value;
      dbData.JOB_DateExpires = dteJOB_DateExpires.value;
      dbData.JOB_Status = txtJOB_Status.value;
      dbData.JOB_PhoneNumber = txtJOB_PhoneNumber.value;
      dbData.JOB_ContactName = txtJOB_ContactName.value;
      dbData.JOB_Direct = chkJOB_Direct.checked;
      dbData.JOB_Company = txtJOB_Company.value;
      dbData.JOB_Salary = txtJOB_Salary.value;
      dbData.JOB_TownCity = txtJOB_TownCity.value;
      dbData.JOB_Sector = txtJOB_Sector.value;
      dbData.JOB_Type = txtJOB_Type.value;
      dbData.JOB_Hours = txtJOB_Hours.value;
      dbData.JOB_Where = txtJOB_Where.value;
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
    txtJOB_Title.value = objTable.aryFields[1].fieldValue;
    txtJOB_Details.value = objTable.aryFields[2].fieldValue;
    dteJOB_DateApplied.value = objTable.aryFields[3].fieldValue;
    dteJOB_DateExpires.value = objTable.aryFields[4].fieldValue;
    txtJOB_Status.value = objTable.aryFields[5].fieldValue;
    txtJOB_PhoneNumber.value = objTable.aryFields[6].fieldValue;
    txtJOB_ContactName.value = objTable.aryFields[7].fieldValue;
    chkJOB_Direct.value = objTable.aryFields[8].fieldValue;
    txtJOB_Company.value = objTable.aryFields[9].fieldValue;
    txtJOB_Salary.value = objTable.aryFields[10].fieldValue;
    txtJOB_TownCity.value = objTable.aryFields[11].fieldValue;
    txtJOB_Sector.value = objTable.aryFields[12].fieldValue;
    txtJOB_Type.value = objTable.aryFields[13].fieldValue;
    txtJOB_Hours.value = objTable.aryFields[14].fieldValue;
    txtJOB_Where.value = objTable.aryFields[15].fieldValue;
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
    modSchema.constSeekers_Jobs,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constSeekers_Jobs);

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
    modView.funcInitComboboxes();
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

export const funcResetForm = () => {
  /*
 Created 20/01/2025 By Roger Williams
 
 Resets the form
*/
  txtJOB_Title.value = "";
  txtJOB_Details.value = "";
  //set to todays date
  dteJOB_DateApplied.value = new Date().toISOString().substring(0, 10);
  dteJOB_DateExpires.value = "";
  txtJOB_Status.value = "";
  txtJOB_PhoneNumber.value = "";
  txtJOB_ContactName.value = "";
  chkJOB_Direct.value = "";
  txtJOB_Company.value = "";
  txtJOB_Salary.value = "";
  txtJOB_TownCity.value = "";
  txtJOB_Sector.value = "";
  txtJOB_Type.value = "";
  txtJOB_Hours.value = "";
  txtJOB_Where.value = "";
  dteJOB_DateApplied.focus();
  funcInitComboboxes();
};
const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtJOB_Company.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "dteDateApplied",
      document.getElementsByTagName("html")
    );
  } else {
    blnNew = true;
    modGlobalView.funcEnableForm(document);
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

    //init data bound comboboxes
    funcInitComboboxes();
  };
}

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

export function funcInitSchema() {
  //get schema
  objTable = modSchema.funcGetSchema(modSchema.constSeekers_Jobs);
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
  // objData = modSchema.funcGetFirstRecord(modSchema.constSeekers_Jobs);
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  txtJOB_Title.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Details.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Status.addEventListener("keydown", functextboxKeyDown);
  txtJOB_PhoneNumber.addEventListener("keydown", functextboxKeyDown);
  txtJOB_ContactName.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Company.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Salary.addEventListener("keydown", functextboxKeyDown);
  txtJOB_TownCity.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Sector.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Type.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Hours.addEventListener("keydown", functextboxKeyDown);
  txtJOB_Where.addEventListener("keydown", functextboxKeyDown);
  //cusom handlers
  cmbJOB_Company.addEventListener("change", funcComboboxSelect);
  cmbJOB_Hours.addEventListener("change", funcComboboxSelect);
  cmbJOB_Salary.addEventListener("change", funcComboboxSelect);
  cmbJOB_Sector.addEventListener("change", funcComboboxSelect);
  cmbJOB_Status.addEventListener("change", funcComboboxSelect);
  cmbJOB_TownCity.addEventListener("change", funcComboboxSelect);
  cmbJOB_Type.addEventListener("change", funcComboboxSelect);
  cmbJOB_Where.addEventListener("change", funcComboboxSelect);

  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
  btnNew.addEventListener("click", funcbtnNewClick);
}
