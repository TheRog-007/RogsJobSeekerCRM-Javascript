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
export const txtCVP_Nationality = document.getElementById("txtCVP_Nationality");
export const lblCVP_Nationality = document.getElementById("lblCVP_Nationality");
export const txtCVP_Name = document.getElementById("txtCVP_Name");
export const lblCVP_Name = document.getElementById("lblCVP_Name");
export const txtCVP_Image = document.getElementById("txtCVP_Image");
export const lblCVP_Image = document.getElementById("lblCVP_Image");
export const dteCVP_DOB = document.getElementById("dteCVP_DOB");
export const lblCVP_DOB = document.getElementById("lblCVP_DOB");
export const txtCVP_SalaryRange = document.getElementById("txtCVP_SalaryRange");
export const lblCVP_SalaryRange = document.getElementById("lblCVP_SalaryRange");
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
        "txtCVP_Name",
        document.getElementsByTagName("html")
      );
    } else {
      modView.funcLoadData();
    }
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
      modSchema.constCV_PersonalInfo,
      "readonly"
    );
    const objTemp = trnTemp.objectStore(modSchema.constCV_PersonalInfo);
    const qryTemp = objTemp.openCursor();

    qryTemp.onsuccess = (event) => {
      const curTemp = event.target.result;

      if (curTemp) {
        //create new option element inside the combobox
        // console.log(curTemp.value);
        //<option value="1">MailShot Summary Report</option>
        elTemp = document.createElement("option");
        elTemp.value = curTemp.key;
        elTemp.innerText = curTemp.value.CVP_Name;
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
  // <option value="none" selected disabled hidden>Select ID</option>
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
    modSchema.constCV_PersonalInfo
  );
  const aryErrors2 = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constCV_PersonalInfo
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
    modSchema.constCV_PersonalInfo,
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

  const objTemp = dbRequest.objectStore(modSchema.constCV_PersonalInfo);

  if (blnNew) {
    dbUpdate = objTemp.add({
      CVP_Name: txtCVP_Name.value,
      CVP_Nationality: txtCVP_Nationality.value,
      CVP_DOB: dteCVP_DOB.value,
      CVP_SalaryRange: txtCVP_SalaryRange.value,
      CVP_Image: txtCVP_Image.value,
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
      dbData.CVP_Name = txtCVP_Name.value;
      dbData.CVP_Nationality = txtCVP_Nationality.value;
      dbData.CVP_DOB = dteCVP_DOB.value;
      dbData.CVP_SalaryRange = txtCVP_SalaryRange.value;
      dbData.CVP_Image = txtCVP_Image.value;

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

// let objTemp = modSchema.funcGetFirstRecord(constCV_PersonalInfo);

// if (modSchema.funcValidateForm) {
//   //save data
// }
// funcPopulateobjData();
// modSchema.funcSaveData(objData);
// let transaction = db.transaction("books", "readwrite"); // (1)
// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)
// let book = {
// id: 'js',
// price: 10,
// created: new Date()
// };
// let request = books.add(book); // (3)

//also transaction.oncompleted (event)
// request.onsuccess = function() { // (4)
// console.log("Book added to the store", request.result);
// };
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
    txtCVP_Name.value = objTable.aryFields[1].fieldValue;
    txtCVP_Nationality.value = objTable.aryFields[2].fieldValue;
    dteCVP_DOB.value = objTable.aryFields[3].fieldValue;
    txtCVP_SalaryRange = objTable.aryFields[4].fieldValue;
    txtCVP_Image = objTable.aryFields[5].fieldValue;
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
    modSchema.constCV_PersonalInfo,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constCV_PersonalInfo);

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

  txtCVP_Nationality.value = "";
  txtCVP_Name.value = "";
  txtCVP_SalaryRange.value = "";
  dteCVP_DOB.value = "";
  txtCVP_Image.value = "";
  txtCVP_Name.focus();
};
const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtCVP_Nationality.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "txtCVP_Nationality",
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
  };
}

// let transaction = db.transaction("books", "readwrite"); // (1)
// // get an object store to operate on it
// let books = transaction.objectStore("books"); // (2)
// let book = {
// id: 'js',
// price: 10,
// created: new Date()
// };
// let request = books.add(book); // (3)

//also transaction.oncompleted (event)
// request.onsuccess = function() { // (4)
// console.log("Book added to the store", request.result);
// };
// request.onerror = function(event) {
//     // ConstraintError occurs when an object with the same id already exists
//     if (request.error.name == "ConstraintError") {
//     console.log("Book with such id already exists"); // handle the error
//     event.preventDefault(); // don't abort the transaction
//     // use another key for the book?
//     } else {
//     // unexpected error, can't handle it
//     // the transaction will abort
//     }
//     };
//     transaction.onabort = function() {
//     console.log("Error", transaction.error);
//     };

//search
// get one book
// books.get('js')
// // get books with 'css' <= id <= 'html'
// books.getAll(IDBKeyRange.bound('css', 'html'))
// // get books with id < 'html'
// books.getAll(IDBKeyRange.upperBound('html', true))
// // get all books
// books.getAll()
// // get all keys, where id > 'js'
// books.getAllKeys(IDBKeyRange.lowerBound('js', true))

//use index to search on non key fields
// let index = books.createIndex('price_idx', 'price');
// let priceIndex = books.index("price_idx");
// index.get("Donna").onsuccess = (event) => {
//     console.

//delete by index
// find the key where price = 5
// let request = priceIndex.getKey(5);
// request.onsuccess = function() {
// let id = request.result;
// let deleteRequest = books.delete(id);

//cursor
// called for each book found by the cursor
// request.onsuccess = function() {
//     let cursor = request.result;
//     if (cursor) {
//     let key = cursor.key; // book key (id field)
//     let value = cursor.value; // book object
//     console.log(key, value);
//     cursor.continue();
//     } else {
//     console.log("No more books");
//     }

// The main cursor methods are:
// advance(count) – advance the cursor count times, skipping values.
// continue([key]) – advance the cursor to the next value in range matching (or immediately after key if given).

//exports
export function funcCreateMessageBoxResultHandler() {
  txtHidden.addEventListener("focus", funcHiddenTextBoxHandler);
}

// export function funcOpenDatabase() {
//   let dbopenRequest = indexedDB.open("RogsJobSeekerCRM", 1);

//   // dbopenRequest.onupgradeneeded = (event) => {
//   //   //if no database create it from the schema file
//   //   funcCreateFromSchema(event);
//   // };

//   dbopenRequest.onerror = () => {
//     alert(`Error Accessing Database ${dbopenRequest.error}`);
//   };

//   dbopenRequest.onsuccess = () => {
//    modSchema.dbJobSeekerCRM = dbopenRequest.result;

//     dbJobSeekerCRM.onversionchange = () => {
//       dbJobSeekerCRM.close();
//       alert("Database Version Is Outdated Please Reload Page");
//     };
//     //populate combobox
//     funcPopulateCombobox();
//   };
// }
// export function funcOpenDB() {
//   /*
//   Created 13/01/2025 By Roger Williams

//   opens db and stores in local var
// */
//   modSchema.dbJobSeekerCRM = modSchema.funcOpenDatabase();
// }
export function funcInitSchema() {
  //get schema
  objTable = modSchema.funcGetSchema(modSchema.constCV_PersonalInfo);
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
  // objData = modSchema.funcGetFirstRecord(modSchema.constCV_PersonalInfo);
}
export function funcInitHandlers() {
  /*
   Creates handlers for the detail "treeviews" and print/preview buttons
   
  */

  cmbID.addEventListener("change", funccmbIDSelect);
  txtCVP_Image.addEventListener("keydown", functextboxKeyDown);
  txtCVP_Name.addEventListener("keydown", functextboxKeyDown);
  txtCVP_Nationality.addEventListener("keydown", functextboxKeyDown);
  txtCVP_SalaryRange.addEventListener("keydown", functextboxKeyDown);
  dteCVP_DOB.addEventListener("keydown", functextboxKeyDown);

  btnSave.addEventListener("click", funcbtnSaveClick);
  btnUndo.addEventListener("click", funcbtnUndoClick);
  btnDelete.addEventListener("click", funcbtnDeleteClick);
  btnNew.addEventListener("click", funcbtnNewClick);
}
