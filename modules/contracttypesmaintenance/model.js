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
export const btnNew = document.getElementById("btnNew2");
export const btnUndo = document.getElementById("btnUndo");
export const btnDelete = document.getElementById("btnDelete");
export const txtTYP_Type = document.getElementById("txtTYP_Type");
export const lblTYP_Type = document.getElementById("lblTYP_Type");
export const txtHidden = document.getElementById("txtHidden");
//local

//db var
export let dbJobSeekerCRM;
//table schema var
export let objTable;
//new record
let blnNew = false;

//event handlers
const funccmbIDClick = (event) => {
  /*
   Created 08/01/2025 By Roger Williams

   proceses item selected from combobox

*/

  if (event.target.value != "none") {
    //populate form
    alert(event.target.value);

    //load data into form
    modView.funcLoadData();
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

// const funcPopulateobjData = () => {
//   /*
//   Created 19/01/2025 By Roger Williams

//   puts form data into objData
//   */
// };
const funcbtnSaveClick = () => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes save

*/

  let dbUpdate;
  //check all required fields filled
  const aryErrors = modSchema.funcValidateForm(
    document.getElementsByTagName("input"),
    modSchema.constSeekers_Types
  );

  //see if returned errors object is empty
  if (!aryErrors) {
    alert("Please Enter Data In Required Fields");
    return;
  }

  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Types,
    "readwrite"
  );
  dbRequest.onerror = (event) => {
    alert("error accessing table");
  };

  const objTemp = dbRequest.objectStore(modSchema.constSeekers_Types);

  if (blnNew) {
    dbUpdate = objTemp.add({ TYP_Type: txtTYP_Type.value });

    dbUpdate.onsuccess = (event) => {
      blnNew = false;
      alert("saved!");
    };

    dbUpdate.onerror = (event) => {
      alert("error updating table");
    };
  } else {
    //update data
    const dbQuery = objTemp.get(cmbID.value);

    dbQuery.onsuccess = () => {
      const dbData = dbQuery.result;

      //edit
      dbData.TYP_Type = cmbID.innerText;

      //update
      const dbUpdate = objTable.dbUpdate(dbData);

      dbUpdate.onsuccess = () => {
        blnNew = false;
        alert("saved!");
      };

      dbUpdate.onerror = (event) => {
        alert("error updating table");
      };
    };
  }
};

// let objTemp = modSchema.funcGetFirstRecord(constSeekers_Types);

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

const funcbtnUndoClick = (event) => {
  /*
  Created 08/01/2025 By Roger Williams
  
   processes undo

*/

  const trnTemp = dbJobSeekerCRM.transaction(constSeekers_Types, "readonly");
  const objTemp = trnTemp.objectStore(constSeekers_Types);
};
const funcbtnDeleteClick = (event) => {
  /*
   proceses delete

*/
  const dbRequest = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Types,
    "readwrite"
  );
  const objTemp = dbRequest.objectStore(modSchema.constSeekers_Types);

  let dbQuery = objTemp.delete(cmbID.value);

  dbQuery.onerror = (event) => {
    alert("error accessing table");
  };

  dbQuery.onsuccess = (event) => {
    modMessageBox.funcMessageBox(
      "Saved!",
      modMessageBox.objIcons.information,
      modMessageBox.objButtons.ok,
      -1,
      "none",
      1,
      "btnNew"
    );
  };
};

const funcbtnNewClick = () => {
  /*
  Created 20/01/2025 By Roger Williams
  
   Creates new record by clearing form fields!

*/

  //if Already a new record been created and text entered in a control
  if (blnNew && txtTYP_Type.value.length !== 0) {
    modMessageBox.funcMessageBox(
      "Record Not Saved, Save?",
      modMessageBox.objIcons.exclamation,
      modMessageBox.objButtons.yes,
      modMessageBox.objButtons.no,
      "save",
      1,
      "txtTYP_Type"
    );

    return;
  }

  blnNew = true;
  txtTYP_Type.value = "";
  txtTYP_Type.focus();
};

//other funcs

export function funcPopulateCombobox() {
  /*
   Created 09/01/2025 By Roger Williams

  fields:

  TYP_ID    - autonumber
  TYP_Type  - string

  */
  let elTemp;

  const trnTemp = dbJobSeekerCRM.transaction(
    modSchema.constSeekers_Types,
    "readonly"
  );
  const objTemp = trnTemp.objectStore(modSchema.constSeekers_Types);
  const qryTemp = objTemp.openCursor();

  qryTemp.onsuccess = (event) => {
    const curTemp = event.target.result;

    if (curTemp) {
      //create new option element inside the combobox
      // console.log(curTemp.value);
      //<option value="1">MailShot Summary Report</option>
      elTemp = document.createElement("option");
      elTemp.value = curTemp.key;
      elTemp.innerText = curTemp.value.TYP_Type;
      cmbID.appendChild(elTemp);
      curTemp.continue();
    }
  };
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

      if (modMessageBox.strContext === "save") {
        funcbtnSaveClick();
      }
    }
  }
};

function funcOpenDatabase() {
  let dbopenRequest = indexedDB.open(modSchema.constDBName, 1);

  dbopenRequest.onupgradeneeded = (event) => {
    //if no database create it from the schema file
    funcCreateFromSchema(event);
    alert("Created");
  };

  dbopenRequest.onerror = () => {
    alert(`Error Accessing Database ${dbopenRequest.error}`);
  };

  dbopenRequest.onsuccess = () => {
    dbJobSeekerCRM = dbopenRequest.result;
    //work with database

    dbJobSeekerCRM.onversionchange = () => {
      dbJobSeekerCRM.close();
      alert("Database Version Is Outdated Please Reload Page");
    };

    //activate "action" buttons
    btnSave.style.display = "block";
    btnUndo.style.display = "block";
    btnDelete.style.display = "block";
    btnNew.style.display = "block";
    //populate comboboxc
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
  objTable = modSchema.funcGetSchema(modSchema.constSeekers_Types);
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
  // objData = modSchema.funcGetFirstRecord(modSchema.constSeekers_Where);
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
  btnNew.addEventListener("click", funcbtnNewClick);
}
